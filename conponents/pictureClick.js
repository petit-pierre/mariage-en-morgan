for (let i = 0; i < slides.length; i++) {
  let nouvelleDiv = document.createElement("div");
  dots.appendChild(nouvelleDiv);
  nouvelleDiv.classList.add("dot");
  nouvelleDiv.classList.add("d" + i);
  if (i == 0) {
    nouvelleDiv.classList.add("dot_selected");
  }
}
for (i = 0; i < 11; i++) {
  photo[i] = document.querySelector(".photo" + [i]);

  photo[i].addEventListener("click", (e) => {
    console.log(e.target.src);
    document.querySelector(".body").classList.add("grey");
    document.querySelector(".modale").classList.remove("hidden");
    document.querySelector(".photoModal").src = e.target.src;
  });
}

document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".body").classList.remove("grey");
  document.querySelector(".modale").classList.add("hidden");
});
