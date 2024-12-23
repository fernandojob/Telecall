const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose");

// Aumentar e Diminuir fonte

var btnAumentar = document.getElementById("btnAumentar");
var btnDiminuir = document.getElementById("btnDiminuir");
var textos = document.getElementsByClassName("texto");

btnAumentar.addEventListener("click", function () {
  for (var i = 0; i < textos.length; i++) {
    var fontSize = window.getComputedStyle(textos[i]).fontSize;
    var currentSize = parseFloat(fontSize);
    var newSize = currentSize + 2;
    textos[i].style.fontSize = newSize + "px";
  }
});

btnDiminuir.addEventListener("click", function () {
  for (var i = 0; i < textos.length; i++) {
    var fontSize = window.getComputedStyle(textos[i]).fontSize;
    var currentSize = parseFloat(fontSize);
    var newSize = currentSize - 2;
    textos[i].style.fontSize = newSize + "px";
  }
});

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
}

//alternar para modo escuro ou claro
modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  //usando localstorage para continuar o modo selecionado pelo usuario mesmo apos recarregar ou reabrir o site
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

// ativando class active na navbar para aparecer a barra lateral
sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});

body.addEventListener("click", (e) => {
  let clickedElm = e.target;

  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

// pegando o Login do usuario no localstorage

let JsonLogin = JSON.parse(localStorage.login);
var nomeLogin = JsonLogin[0].nomeLogin;
verificarLogin();

function verificarLogin() {
  if (nomeLogin.length > 5) {
    const usuario = document.querySelector(".usuario");
    const Deslogarativo = document.querySelector(".deslogar");

    Deslogarativo.classList.add("ativo");
    usuario.textContent = nomeLogin;
  }
}

function deslogar() {
  window.location.href = "login.html";
}
