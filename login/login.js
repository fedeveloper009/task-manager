import { allowedUsers } from '../users.js';

function logarUsuario() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("password").value;

  // Check if email and senha are provided
  if (!email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Find user in allowedUsers
  const user = allowedUsers.find((u) => u.email === email && u.senha === senha);
  if (user) {
    window.location.href = "../home/index.html";
  } else {
    alert("Usuário ou senha incorretos");
  }
}

function setup() {
  var btnEntrar = document.getElementById("btn-entrar");
  btnEntrar.addEventListener("click", logarUsuario);
}

setup();

function createNewAccount() {
  var btnCriar = document.getElementById("btn-criar");
  btnCriar.addEventListener("click", redirectToRegister);
}

function redirectToRegister() {
  window.location.href = "../sign/index.html";
}

createNewAccount();