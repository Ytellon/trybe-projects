const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const loginButton = document.querySelector('#login-button');
const checkbox = document.querySelector('#agreement');
const enviar = document.querySelector('#submit-btn');
enviar.disabled = true;

function checkLogin() {
  if (email.value === 'tryber@teste.com' && senha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

loginButton.addEventListener('click', checkLogin);

function goButton() {
  if (checkbox.value === '') {
    enviar.disable = true;
  } else {
    enviar.disabled = false;
  }
}

checkbox.addEventListener('click', goButton);
