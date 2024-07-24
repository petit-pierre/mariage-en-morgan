const tokenn = window.localStorage.getItem("token");
if (tokenn !== null) {
  document.querySelector(".plume").classList.remove("hidden");
  document.querySelector(".logOut").classList.remove("hidden");
}
