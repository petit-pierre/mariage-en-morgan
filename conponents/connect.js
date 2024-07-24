const token = window.localStorage.getItem("token");
if (token !== null) {
  document.querySelector(".plume").classList.remove("hidden");
  document.querySelector(".logOut").classList.remove("hidden");
}
