document.querySelector(".enter").addEventListener("click", (event) => {
  event.preventDefault();
  post();
});

async function post() {
  let email = document.querySelector(".e-mail");
  let pass = document.querySelector(".password");
  const login = { email: email.value, password: pass.value };
  const post = await fetch("https://api.petitpierre.net/api/user/log_in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(login),
  });

  let result = await post.json();
  if (result.token == null) {
    document.querySelector(".logError").classList.remove("hidden");
  } else {
    window.localStorage.setItem("token", result.token);
    window.localStorage.setItem("userId", result.userId);
    document.location.href = "../index.html";
  }
}
