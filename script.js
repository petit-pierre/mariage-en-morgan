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

const dots = document.querySelector(".dots");
let selected = 0;
const text = document.querySelector(".text");

const leftArrow = document.querySelector(".arrow_left");
leftArrow.addEventListener("click", () => {
  console.log("j'ai cliqué a gauche");
  selected--;
  if (selected < 0) {
    selected = slides.length - 1;
  }
  document.querySelector(".dot_selected").classList.remove("dot_selected");
  document.querySelector(".d" + selected).classList.add("dot_selected");
  document.querySelector(".banner-img").src =
    "./photos_voiture/gallery/" + slides[selected].image;
  text.innerHTML = slides[selected].tagLine;
});

const rightArrow = document.querySelector(".arrow_right");
rightArrow.addEventListener("click", () => {
  console.log("j'ai cliqué a droite");
  selected++;
  if (selected > slides.length - 1) {
    selected = 0;
  }
  document.querySelector(".dot_selected").classList.remove("dot_selected");
  document.querySelector(".d" + selected).classList.add("dot_selected");
  document.querySelector(".banner-img").src =
    "./photos_voiture/gallery/" + slides[selected].image;
  text.innerHTML = slides[selected].tagLine;
});

for (let i = 0; i < slides.length; i++) {
  let nouvelleDiv = document.createElement("div");
  dots.appendChild(nouvelleDiv);
  nouvelleDiv.classList.add("dot");
  nouvelleDiv.classList.add("d" + i);
  if (i == 0) {
    nouvelleDiv.classList.add("dot_selected");
  }
}
