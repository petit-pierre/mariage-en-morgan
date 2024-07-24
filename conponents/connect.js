const tokenn = window.localStorage.getItem("token");
if (tokenn !== null) {
  document.querySelector(".logOut").classList.remove("hidden");
  document.querySelector(".fullPic").classList.remove("hidden");
  document.querySelector(".plume").classList.remove("hidden");

  for (let i = 0; i < 13; i++) {
    document.querySelector(".firstEdit" + i).classList.remove("hidden");
  }

  document.querySelector(".logOut").addEventListener("click", (evt) => {
    window.localStorage.removeItem("token");
    document.location.href = "./index.html";
  });
}
