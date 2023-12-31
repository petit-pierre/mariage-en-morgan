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

document.querySelector(".b0").style.transform = "translatex(0%)";
document.querySelector(".b0").style.zIndex = "1";

const leftArrow = document.querySelector(".arrow_left");
leftArrow.addEventListener("click", () => {
  selected--;
  if (selected < 0) {
    selected = slides.length - 1;
  }
  document.querySelector(".dot_selected").classList.remove("dot_selected");
  document.querySelector(".d" + selected).classList.add("dot_selected");
  for (i = 0; i < 7; i++) {
    if (i < selected) {
      document.querySelector(".b" + i).style.transform = "translatex(+100%)";
      document.querySelector(".b" + i).style.zIndex = "0";
    }
    if (i > selected) {
      document.querySelector(".b" + i).style.transform = "translatex(-100%)";
      document.querySelector(".b" + i).style.zIndex = "1";
    }
  }

  document.querySelector(".b" + selected).style.transform = "translatex(0%)";
  document.querySelector(".b" + selected).style.zIndex = "0";
});

const rightArrow = document.querySelector(".arrow_right");
rightArrow.addEventListener("click", () => {
  selected++;
  if (selected > slides.length - 1) {
    selected = 0;
  }
  document.querySelector(".dot_selected").classList.remove("dot_selected");
  document.querySelector(".d" + selected).classList.add("dot_selected");
  for (i = 0; i < 7; i++) {
    if (i < selected) {
      document.querySelector(".b" + i).style.transform = "translatex(+100%)";
      document.querySelector(".b" + i).style.zIndex = "0";
    }
    if (i > selected) {
      document.querySelector(".b" + i).style.transform = "translatex(-100%)";
      document.querySelector(".b" + i).style.zIndex = "0";
    }
  }

  document.querySelector(".b" + selected).style.transform = "translatex(0%)";
  document.querySelector(".b" + selected).style.zIndex = "1";
});
