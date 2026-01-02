import { allowedUsers } from "../users.js";

function registrarUsuario() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("password").value;

  // Check if email and senha are provided
  if (!email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Check if user already exists
  const existingUser = allowedUsers.find((u) => u.email === email);
  if (existingUser) {
    alert("Usuário já existe com este email.");
    return;
  }

  // Add new user
  allowedUsers.push({ email, senha });
  alert("Usuário registrado com sucesso!");

  // Redirect to login page
  window.location.href = "../login/index.html";
}

function setup() {
  var btnCriar = document.getElementById("btn-criar");
  btnCriar.addEventListener("click", registrarUsuario);
}

setup();

function redirectToLogin() {
  var btnEntrar = document.getElementById("btn-entrar");
  btnEntrar.addEventListener("click", function () {
    window.location.href = "../login/index.html";
  });
}
redirectToLogin();
