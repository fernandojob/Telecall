const form = document.getElementById("form");
const username = document.getElementById("username");
const senha = document.getElementById("senha");
limparLocalStorageLogin();
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (checkInputs()) {
    let login = JSON.parse(localStorage.getItem("login") || "[]");

    login.push({
      nomeLogin: username.value,
      senhaLoggin: senha.value,
    });

    localStorage.setItem("login", JSON.stringify(login));

    setTimeout(() => {
      // Todos os inputs estão com a classe de sucesso, redirecionando para a index
      window.location.href = "index.html";
    }, 1500);
  }
});

function limparLocalStorageLogin() {
  localStorage.removeItem("login");
}

// Função que checa se todos os inputs estão devidamente preenchidos
function checkInputs() {
  const usernameValue = username.value;
  const senhaValue = senha.value;
  let allInputsAreValid = true;

  if (usernameValue === "") {
    setErrorFor(username, "Nome de usuário vazio ");
    allInputsAreValid = false;
  } else if (!validarLogin(usernameValue)) {
    setErrorFor(username, "Informe o mesmo usuario com 6 letras ");
    allInputsAreValid = false;
  } else {
    setSuccessFor(username);
  }

  if (senhaValue === "") {
    setErrorFor(senha, "A senha é obrigatória");
    allInputsAreValid = false;
  } else if (!validarSenha(senhaValue)) {
    setErrorFor(senha, "A senha deve conter apenas letras, mínimo 8");
    allInputsAreValid = false;
  } else {
    setSuccessFor(senha);
  }

  return allInputsAreValid;
}

function validarLogin(login) {
  const regex = /^[a-zA-Z]{6}$/; // expressão regular para validar 6 letras
  if (regex.test(login)) {
    return true; // login válido
  } else {
    return false; // login inválido
  }
}

function validarSenha(senha) {
  // Verifica se a senha tem menos de 8 caracteres
  if (senha.length < 8) {
    return false;
  }

  // Verifica se a senha contém caracteres que não são letras
  if (/[^a-zA-Z]/.test(senha)) {
    return false;
  }

  // Se chegou aqui, a senha é válida
  return true;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  //Adiciona a mensagem de erro
  small.innerText = message;

  //Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adiciona a classe de sucesso
  formControl.className = "form-control success";
}

// dark mode
const body = document.querySelector("body"),
  container = document.querySelector(".container"),
  modeToggle = document.querySelector(".dark-light"),
  header = document.querySelector(".header");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
  body.classList.add("dark");
  container.classList.add("dark");
  header.classList.add("dark");
}

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  container.classList.add("dark");
  header.classList.add("dark");
  //usando localstorage para continuar o modo selecionado pelo usuario mesmo apos recarregar ou reabrir o site
  if (!body.classList.contains("dark")) {
    container.classList.remove("dark");
    header.classList.remove("dark");
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});
//fim dark mode
