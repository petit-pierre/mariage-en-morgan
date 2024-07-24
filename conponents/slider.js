async function getItems() {
  const response = await fetch("https://api.petitpierre.net/api/sliders", {
    method: "GET",
  });

  let result = await response.json();

  let collection = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i].alt === "slider") {
      collection.push(result[i]);
    }
  }
  collection.sort(function (a, b) {
    return a.french_content - b.french_content;
  });
  diplayItems(collection);
}
getItems();
function diplayItems(collection) {
  for (let i = 0; i < collection.length; i++) {
    const picture = document.createElement("img");
    picture.classList.add("banner-img");
    picture.classList.add("b" + i);
    picture.setAttribute("src", collection[i].picture);
    picture.setAttribute("alt", "Banner picture " + i);
    document.querySelector(".slider").appendChild(picture);
  }
  const slides = collection;
  slider(slides);
}
function slider(slides) {
  document.querySelector(".b" + (slides.length - 1)).style.transform =
    "translatex(-100%)";
  document.querySelector(".b" + (slides.length - 2)).style.transform =
    "translatex(-100%)";

  const dots = document.querySelector(".dots");
  let cooldown = false;

  for (let i = 0; i < slides.length; i++) {
    let nouvelleDiv = document.createElement("div");
    dots.appendChild(nouvelleDiv);
    nouvelleDiv.classList.add("dot");
    nouvelleDiv.classList.add("d" + i);
    if (i == 0) {
      nouvelleDiv.classList.add("dot_selected");
    }
  }

  let selected = 0;
  let previous = slides.length - 1;
  let next = 1;
  const text = document.querySelector(".text");

  document.querySelector(".b0").style.transform = "translatex(0%)";
  document.querySelector(".b0").style.zIndex = "1";

  let touchstartX = 0;
  let touchendX = 0;

  function checkDirection() {
    if (touchendX < touchstartX) document.querySelector(".arrow_right").click();
    if (touchendX > touchstartX) document.querySelector(".arrow_left").click();
  }

  document.getElementById("banner").addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  document.getElementById("banner").addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  });
  let leftArrow = document.querySelector(".arrow_left");
  leftArrow.addEventListener("click", () => {
    if (cooldown === false) {
      cooldown = true;
      leftArrow.style.opacity = "0";
      selected--;
      previous--;
      next--;
      if (selected < 0) {
        selected = slides.length - 1;
      }
      if (previous < 0) {
        previous = slides.length - 1;
      }
      if (next < 0) {
        next = slides.length - 1;
      }
      document.querySelector(".dot_selected").classList.remove("dot_selected");
      document.querySelector(".d" + selected).classList.add("dot_selected");

      for (i = 0; i < slides.length; i++) {
        document.querySelector(".b" + i).style.zIndex = "0";
        document.querySelector(".b" + i).style.opacity = "0";
      }
      document.querySelector(".b" + next).style.opacity = "1";
      document.querySelector(".b" + next).style.zIndex = "1";
      document.querySelector(".b" + previous).style.transform =
        "translatex(-100%)";
      document.querySelector(".b" + next).style.transform = "translatex(+100%)";

      document.querySelector(".b" + selected).style.zIndex = "1";
      document.querySelector(".b" + selected).style.opacity = "1";
      document.querySelector(".b" + selected).style.transform =
        "translatex(0%)";

      setTimeout(() => {
        leftArrow.style.opacity = "1";
      }, 500);

      setTimeout(() => {
        cooldown = false;
      }, 1000);
    }
  });

  const rightArrow = document.querySelector(".arrow_right");
  rightArrow.addEventListener("click", () => {
    if (cooldown === false) {
      cooldown = true;
      rightArrow.style.opacity = "0";
      selected++;
      previous++;
      next++;
      if (selected > slides.length - 1) {
        selected = 0;
      }
      if (previous > slides.length - 1) {
        previous = 0;
      }
      if (next > slides.length - 1) {
        next = 0;
      }
      document.querySelector(".dot_selected").classList.remove("dot_selected");
      document.querySelector(".d" + selected).classList.add("dot_selected");

      for (i = 0; i < slides.length; i++) {
        document.querySelector(".b" + i).style.zIndex = "0";
        document.querySelector(".b" + i).style.opacity = "0";
      }

      document.querySelector(".b" + previous).style.opacity = "1";
      document.querySelector(".b" + previous).style.zIndex = "1";
      document.querySelector(".b" + next).style.transform = "translatex(+100%)";
      document.querySelector(".b" + previous).style.transform =
        "translatex(-100%)";

      document.querySelector(".b" + selected).style.zIndex = "1";
      document.querySelector(".b" + selected).style.opacity = "1";
      document.querySelector(".b" + selected).style.transform =
        "translatex(0%)";

      setTimeout(() => {
        rightArrow.style.opacity = "1";
      }, 500);
      setTimeout(() => {
        cooldown = false;
      }, 1000);
    }
  });
}
