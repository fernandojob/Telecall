const form = document.getElementById("form");
const nomecompleto = document.getElementById("nomecompleto");
const datanascimento = document.getElementById("data-nascimento");
const nomematerno = document.getElementById("nomematerno");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const celular = document.getElementById("celular");
const endereco = document.getElementById("endereco");
const login = document.getElementById("login");
const senha = document.getElementById("senha");
const confirmarsenha = document.getElementById("confirmar-senha");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (checkInputs()) {
    let user = JSON.parse(localStorage.getItem("user") || "[]");

    user.push({
      nomeCad: nomecompleto.value,
      userCad: login.value,
      senhaCad: senha.value,
    });

    localStorage.setItem("user", JSON.stringify(user));

    setTimeout(() => {
      // Todos os inputs estão com a classe de sucesso, redirecionando para o formulario de login
      window.location.href = "login.html";
    }, 1500);
  }
});

// desenvolvendo o dark mode
const body = document.querySelector("body"),
  container = document.querySelector(".container"),
  modeToggle = document.querySelector(".dark-light"),
  header = document.querySelector(".header");

//criando o localstorage
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

// fim dark mode

//função que checa se todos os inputs foram devidamente preenchidos
function checkInputs() {
  const loginValue = login.value;
  const senhaValue = senha.value;
  const confirmarsenhaValue = confirmarsenha.value;
  const nomecompletoValue = nomecompleto.value;
  const nomematernoValue = nomematerno.value;
  const cpfValue = cpf.value;
  const telefoneValue = telefone.value;
  const celularValue = celular.value;
  const enderecoValue = endereco.value;
  const datanascimentoValue = datanascimento.value;
  let allInputsAreValid = true;

  if (nomecompletoValue === "") {
    setErrorFor(nomecompleto, "O nome completo é obrigatório");
    allInputsAreValid = false;
  } else if (!validarNome(nomecompletoValue)) {
    setErrorFor(nomecompleto, "O nome precisa ter entre 15 a 60 letras");
    allInputsAreValid = false;
  } else {
    setSuccessFor(nomecompleto);
  }

  if (datanascimentoValue === "") {
    setErrorFor(datanascimento, "Prencha a data de nascimento");
  } else {
    setSuccessFor(datanascimento);
  }

  if (nomematernoValue === "") {
    setErrorFor(nomematerno, "O nome materno é obrigatório");
    allInputsAreValid = false;
  } else if (!validarNome(nomematernoValue)) {
    setErrorFor(nomematerno, "O nome precisa ter entre 15 a 60 letras");
    allInputsAreValid = false;
  } else {
    setSuccessFor(nomematerno);
  }

  if (cpfValue === "") {
    setErrorFor(cpf, "O CPF é obrigatório");
    allInputsAreValid = false;
  } else if (!validarCPF(cpfValue)) {
    setErrorFor(cpf, "Por favor insira um CPF válido");
    allInputsAreValid = false;
  } else {
    setSuccessFor(cpf);
  }

  if (telefoneValue === "") {
    setErrorFor(telefone, " O telefone é obrigatório");
    allInputsAreValid = false;
  } else if (!validarTelefone(telefoneValue)) {
    setErrorFor(telefone, "O formato deve ser (+55)XX-XXXXXXXX");
    allInputsAreValid = false;
  } else {
    setSuccessFor(telefone);
  }

  if (celularValue === "") {
    setErrorFor(celular, " O celular é obrigatório");
    allInputsAreValid = false;
  } else if (!validarCelular(celularValue)) {
    setErrorFor(celular, "O formato deve ser (+55)XX-XXXXXXXXX");
    allInputsAreValid = false;
  } else {
    setSuccessFor(celular);
  }

  if (enderecoValue === "") {
    setErrorFor(endereco, " O endereço completo é obrigatório");
    allInputsAreValid = false;
  } else {
    setSuccessFor(endereco);
  }
  if (loginValue === "") {
    setErrorFor(login, "O nome de usuário é obrigatório");
    allInputsAreValid = false;
  } else if (!validarLogin(loginValue)) {
    setErrorFor(login, "Informe um usuário com 6 letras e nenhum número");
    allInputsAreValid = false;
  } else {
    setSuccessFor(login);
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

  if (confirmarsenhaValue === "") {
    setErrorFor(confirmarsenha, "A confirmação de senha é obrigatória");
    allInputsAreValid = false;
  } else if (confirmarsenhaValue !== senhaValue) {
    setErrorFor(confirmarsenha, "As senhas não são iguais");
    allInputsAreValid = false;
  } else {
    setSuccessFor(confirmarsenha);
  }

  return allInputsAreValid;
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

//Funcões que validam os campos do formulario utilizando regex
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ""); // remove caracteres não numéricos
  if (cpf == "") return false; // verifica se o CPF está vazio
  // Verifica se o CPF tem 11 dígitos
  if (cpf.length != 11 || cpf.match(/(\d)\1{10}/)) return false;
  var soma = 0;
  var resto;
  for (var i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (var i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function validarNome(nomecompleto) {
  const regex = /^[a-zA-Z ]{15,60}$/; // Expressão regular para validar o formato do nome
  return regex.test(nomecompleto);
}

function validarTelefone(telefone) {
  const telefoneRegex = /^\(\+55\)\d{2}-\d{8}$/;
  return telefoneRegex.test(telefone);
}

function validarCelular(celular) {
  const regex = /^\(\+55\)\d{2}-\d{9}$/; // Expressão regular para validar o formato
  return regex.test(celular); // Testa se o celular corresponde ao formato esperado
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
