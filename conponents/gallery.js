const token = window.localStorage.getItem("token");
if (token === null) {
  document.location.href = "../index.html";
}

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
  //console.log(collection);
  if (collection.length > 8) {
    document.querySelector(".upload").classList.add("hidden");
  }

  for (i = 0; i < collection.length; i++) {
    const div = document.createElement("div");
    div.classList.add("item" + [i]);
    div.classList.add("item");
    const picture = document.createElement("img");
    picture.setAttribute("src", collection[i].picture);
    document.querySelector(".collection").appendChild(div);
    document.querySelector(".item" + [i]).appendChild(picture);
    const trash = document.createElement("img");
    trash.classList.add("trash" + [i]);
    trash.classList.add("trash");
    trash.setAttribute("src", "../logos/trash.png");
    document.querySelector(".item" + [i]).appendChild(trash);

    const arrow_left = document.createElement("img");
    arrow_left.classList.add("arrow_left" + [i]);
    arrow_left.classList.add("arrow_left");
    arrow_left.setAttribute("src", "../logos/arrow_left.png");
    document.querySelector(".item" + [i]).appendChild(arrow_left);

    const arrow_right = document.createElement("img");
    arrow_right.classList.add("arrow_right" + [i]);
    arrow_right.classList.add("arrow_right");
    arrow_right.setAttribute("src", "../logos/arrow_right.png");
    document.querySelector(".item" + [i]).appendChild(arrow_right);
    if (collection.length < 4) {
      if (collection.length !== 0) {
        console.log(collection.length);
        document.querySelector(".trash" + i).classList.add("hidden");
      }
    }
  }
  if (document.querySelector(".arrow_left") !== null) {
    document.querySelector(".arrow_left").classList.add("hidden");
  }
  let count = collection.length - 1;
  if (document.querySelector(".arrow_right") !== null) {
    document.querySelector(".arrow_right" + count).classList.add("hidden");
  }

  document.querySelector(".upload").addEventListener("change", (event) => {
    if (document.querySelector(".upload").value !== "") {
      /*const picture = document.createElement("img");
    picture.setAttribute(
      "src",
      URL.createObjectURL(document.querySelector(".upload").files[0])
    );
    document.querySelector(".collection").appendChild(picture);*/

      /*let slider = URL.createObjectURL(
      document.querySelector(".upload").files[0]
    );*/
      let slider = document.querySelector(".upload").files[0];
      /*const slide = {
      alt: alt.current.value,
      french_content: french_content.current.value,
      english_content: english_content.current.value,
    };*/
      const formData = new FormData();
      formData.append("imageUrl", "");
      formData.append("image", slider);

      sendPic(formData, token);
    }
  });

  async function sendItems(slide, token) {
    const response = await fetch("https://api.petitpierre.net/api/sliders", {
      method: "POST",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(slide),
    });

    let result = await response.json();
    document.location.href = "./index.html";
  }

  async function sendPic(formData, token) {
    const response = await fetch("https://api.petitpierre.net/api/pictures", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    let result = await response.json();
    const slide = {
      alt: "slider",
      picture: result.imageUrl,
      picture_id: result._id,
      french_content: collection.length,
      english_content: collection.length,
    };
    await sendItems(slide, token);
  }
  trash(collection, token);
  moveLeft(collection, token);
  moveRight(collection, token);
}
getItems();

async function delettePic(id, token, slideId) {
  const response = await fetch(
    "https://api.petitpierre.net/api/pictures/" + id,
    {
      method: "DELETE",

      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  let result = await response.json();
  deletteSlide(slideId, token);
}

async function deletteSlide(slideId, token) {
  const response = await fetch(
    "https://api.petitpierre.net/api/sliders/" + slideId,
    {
      method: "DELETE",

      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  let result = await response.json();

  document.location.href = "./index.html";
}

async function removeSlide(newslideId, token, newslide, refresh) {
  const response = await fetch(
    "https://api.petitpierre.net/api/sliders/" + newslideId,
    {
      method: "DELETE",

      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  let result = await response.json();
  sendSlide(newslide, token, refresh);
}

async function sendSlide(newslide, token, refresh) {
  const response = await fetch("https://api.petitpierre.net/api/sliders", {
    method: "POST",

    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newslide),
  });

  let result = await response.json();
  //console.log(result);
  if (refresh === 1) {
    document.location.href = "./index.html";
  }
  return result;
}

function trash(collection, token) {
  for (i = 0; i < collection.length; i++) {
    document.querySelector(".trash" + i).addEventListener("click", (evt) => {
      //console.log(evt.target.classList[0].slice(5, 7));
      const found = collection.find(
        (obj) =>
          //obj.picture ===
          //evt.explicitOriginalTarget.offsetParent.children[0].src
          obj.french_content === evt.target.classList[0].slice(5, 7)
      );

      for (let i = 0; i < collection.length; i++) {
        if (i > found.french_content) {
          const newslideId = collection[i]._id;
          collection[i].french_content = collection[i].french_content - 1;
          /*document
                .querySelector(".trash" + [i])
                .classList.add(".trash" + [i] - 1);
              document
                .querySelector(".trash" + [i])
                .classList.remove(".trash" + [i]);
  
              document
                .querySelector(".item" + [i])
                .classList.add(".item" + [i] - 1);
              document
                .querySelector(".item" + [i])
                .classList.remove(".item" + [i]);
  
              document
                .querySelector(".arrow_left" + [i])
                .classList.add(".arrow_left" + [i] - 1);
              document
                .querySelector(".arrow_left" + [i])
                .classList.remove(".arrow_left" + [i]);
  
              document
                .querySelector(".arrow_right" + [i])
                .classList.add(".arrow_right" + [i] - 1);
              document
                .querySelector(".arrow_right" + [i])
                .classList.remove(".arrow_right" + [i]);*/

          let newslide = collection[i];
          removeSlide(newslideId, token, newslide);
        }
      }
      let id = found.picture_id;
      let slideId = found._id;

      delettePic(id, token, slideId);
      //delettePic(id, token, slideId);
    });
  }
}

function moveLeft(collection, token) {
  for (let i = 1; i < collection.length; i++) {
    document
      .querySelector(".arrow_left" + i)
      .addEventListener("click", (evt) => {
        const modifiedSlide = collection.find(
          (obj) => obj.french_content === evt.target.classList[0].slice(10)
        );
        /*const previousSlide = collection.find(
            (obj) => obj.french_content === evt.target.classList[0].slice(10) - 1
            );*/
        const previousSlide =
          collection[
            collection.findIndex((obj) => obj._id === modifiedSlide._id) - 1
          ];
        modifiedSlide.french_content = modifiedSlide.french_content - 1;
        previousSlide.french_content =
          parseInt(previousSlide.french_content) + 1;
        let newslide = modifiedSlide;
        let newslideId = modifiedSlide._id;
        removeSlide(newslideId, token, newslide);
        newslide = previousSlide;
        newslideId = previousSlide._id;
        let refresh = 1;
        removeSlide(newslideId, token, newslide, refresh);
      });
  }
}

function moveRight(collection, token) {
  for (let i = 0; i < collection.length - 1; i++) {
    document
      .querySelector(".arrow_right" + i)
      .addEventListener("click", (evt) => {
        const modifiedSlide = collection.find(
          (obj) =>
            parseInt(obj.french_content) ===
            parseInt(evt.target.classList[0].slice(11))
        );
        /*const previousSlide = collection.find(
              (obj) => obj.french_content === evt.target.classList[0].slice(10) - 1
              );*/
        console.log(modifiedSlide);
        const nextSlide =
          collection[
            collection.findIndex((obj) => obj._id === modifiedSlide._id) + 1
          ];
        console.log(nextSlide);
        modifiedSlide.french_content =
          parseInt(modifiedSlide.french_content) + 1;
        nextSlide.french_content = parseInt(nextSlide.french_content) - 1;
        let newslide = modifiedSlide;
        let newslideId = modifiedSlide._id;
        removeSlide(newslideId, token, newslide);
        newslide = nextSlide;
        newslideId = nextSlide._id;
        let refresh = 1;
        removeSlide(newslideId, token, newslide, refresh);
      });
  }
}
