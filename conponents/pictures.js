const token = window.localStorage.getItem("token");

async function getItems() {
  const response = await fetch("https://api.petitpierre.net/api/sliders", {
    method: "GET",
  });

  let result = await response.json();

  let firstCollection = [];
  let secondCollection = [];
  let fullPic = result.find(
    (obj) =>
      //obj.picture ===
      //evt.explicitOriginalTarget.offsetParent.children[0].src
      obj.alt === "full"
  );

  for (let i = 0; i < result.length; i++) {
    if (result[i].alt === "first") {
      firstCollection.push(result[i]);
    }
    if (result[i].alt === "second") {
      secondCollection.push(result[i]);
    }
  }
  console.log(firstCollection);

  firstCollection.sort(function (a, b) {
    return a.french_content - b.french_content;
  });

  for (let i = 0; i < 14; i++) {
    document
      .querySelector(".photo" + i)
      .setAttribute("src", firstCollection[i].picture);
  }

  secondCollection.sort(function (a, b) {
    return a.french_content - b.french_content;
  });
  changePic(firstCollection, token);
  //putFullPic(fullPic);
}
getItems();

async function putFullPic(fullPic) {
  document.querySelector(".fullPic").addEventListener("click", (evt) => {
    document.querySelector(".uploadFullPic").click();
  });
  document.querySelector(".uploadFullPic").addEventListener("change", (evt) => {
    //console.log("coucou");
    let id = fullPic.picture_id;
    let slideId = fullPic._id;
    delettePic(id, token, slideId);

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

    let slider = document.querySelector(".uploadFullPic").files[0];
    const formData = new FormData();
    formData.append("imageUrl", "");
    formData.append("image", slider);

    sendPic(formData, token);
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
        alt: "full",
        picture: result.imageUrl,
        picture_id: result._id,
        french_content: "Osef",
        english_content: "Osef",
      };
      await sendItems(slide, token);
    }
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
  });
}

async function changePic(firstCollection, token) {
  let wichPic;
  for (let i = 0; i < 14; i++) {
    document.querySelector(".btn" + i).addEventListener("click", (evt) => {
      wichPic = i;
      document.querySelector(".uploadFullPic").click();
    });
  }
  document.querySelector(".uploadFullPic").addEventListener("change", (evt) => {
    let slide = firstCollection[wichPic];
    console.log(slide);

    let id = slide.picture_id;
    let slideId = slide._id;
    delettePic(id, token, slideId);

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
    }

    let slider = document.querySelector(".uploadFullPic").files[0];
    const formData = new FormData();
    formData.append("imageUrl", "");
    formData.append("image", slider);

    sendPic(formData, token);
    async function sendPic(formData, token) {
      const response = await fetch("https://api.petitpierre.net/api/pictures", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      let result = await response.json();

      slide.picture = result.imageUrl;
      slide.picture_id = result._id;

      await sendItems(slide, token);
    }
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
  });
}
