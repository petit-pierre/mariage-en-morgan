for (i = 0; i < 14; i++) {
  photo[i] = document.querySelector(".photo" + [i]);

  photo[i].addEventListener("click", (e) => {
    //console.log(e.target.src);
    document.querySelector(".body").classList.add("grey");
    document.querySelector(".modale").classList.remove("hidden");
    document.querySelector(".photoModal").src = e.target.src;
  });
}

document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".body").classList.remove("grey");
  document.querySelector(".modale").classList.add("hidden");
});

document.querySelector(".sliderEdit").addEventListener("click", () => {
  document.location.href = "./slider-edit/index.html";
});
