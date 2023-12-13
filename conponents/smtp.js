/* SmtpJS.com - v3.0.0 */
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};

// mon code //
send = document.querySelector(".send");
send.addEventListener("click", (e) => {
  e.preventDefault();
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  let telRegExp = new RegExp("(0|\\+33|0033)[1-9][0-9]{8}");
  let email = document.querySelector(".email");
  let error = document.querySelector(".error");
  let tel = document.querySelector(".tel");
  let contenu = document.querySelector(".message");
  let conteneur = contenu.value;
  if (emailRegExp.test(email.value) || telRegExp.test(tel.value)) {
    if (contenu.value.length > 5) {
      Email.send({
        SecureToken: "daa97661-9c0d-42df-b389-0287755e8a3b",
        To: "contact@mariage-en-morgan.fr",
        From: "aubree.pierre2@gmail.com",
        Subject: "Site mariage-en-morgan",
        Body:
          "email : " +
          document.querySelector(".email").value +
          " tel : " +
          document.querySelector(".tel").value +
          " message : " +
          document.querySelector(".message").value,
      }).then(
        (message) =>
          (error.innerText =
            "Message envoyé, je vous repondrai bientot . Merci .")
      );
    } else {
      console.log(contenu.value.length);
      error.innerText = "Votre message doit faire plus de 5 caracteres .";
    }
  } else {
    error.innerText =
      "Pour envoyer un message il faut renseigner un e-mail et/ou un numero de telephone valide .";
  }
});
