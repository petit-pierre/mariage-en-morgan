const slides = [
  {
    image: "pic01.jpg",
  },
  {
    image: "pic02.jpg",
  },
  {
    image: "pic03.jpg",
  },
  {
    image: "pic04.jpg",
  },
  {
    image: "pic05.jpg",
  },
  {
    image: "pic06.jpg",
  },
  {
    image: "pic07.jpg",
  },
];

document.querySelector(".b6").style.transform = "translatex(-100%)";
document.querySelector(".b5").style.transform = "translatex(-100%)";

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
    document.querySelector(".b" + selected).style.transform = "translatex(0%)";

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
    document.querySelector(".b" + selected).style.transform = "translatex(0%)";

    setTimeout(() => {
      rightArrow.style.opacity = "1";
    }, 500);
    setTimeout(() => {
      cooldown = false;
    }, 1000);
  }
});
