const popupContainer = document.querySelector('.popup-container');
const popupClose = document.querySelectorAll('.popup__close');
const popupThanks = document.querySelector('.popup__thanks');
const loginButton = document.querySelector('.header__login');
const popupLogin = document.querySelector('.popup__login');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const passwordCheckbox = document.getElementById('show-password');
const passwordForm = document.querySelector('#popup-form');
const myStorage = localStorage;
let passwords = [];

const close = () => {
  popupContainer.classList.remove('popup-container_active');
  popupLogin.classList.remove('popup__login_active');
  popupThanks.classList.remove('popup__thanks_active');
  document.querySelector('body').classList.remove('body-hidden');
  passwordInput.value = '';
  loginInput.value = '';
  passwordCheckbox.checked = false;
  passwordInput.type = 'password';
};

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  popupContainer.classList.add('popup-container_active');
  popupLogin.classList.add('popup__login_active');
  document.querySelector('body').classList.add('body-hidden');
  loginInput.focus();
});

passwordCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    passwordInput.type = 'text';
  }
  if (!e.target.checked) {
    passwordInput.type = 'password';
  }
});

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let passwordInTheList = false;
  let login = loginInput.value;
  let password = document.getElementById('password').value;

  const isPassword = (myPasswords, myLogin, myPassword) => {
    return myPasswords.some(el => el.login === myLogin && el.password === myPassword);
  };

  if (myStorage.getItem('passwords') && isPassword(JSON.parse(myStorage.getItem('passwords')), login, password)) {
    passwordInTheList = true;
  }
  if (!myStorage.getItem('passwords') && isPassword(passwords, login, password)) {
    passwordInTheList = true;
  }
  if (!passwordInTheList && (login !== '') && (password !== '')) {
    let newPassword = {
      'login': login,
      'password': password
    };
    if (passwords.length === 0 && myStorage.getItem('passwords')) {
      for (let i = 0; i < JSON.parse(myStorage.getItem('passwords')).length; i++) {
        passwords.push(JSON.parse(myStorage.getItem('passwords'))[i]);
      }
    }
    passwords.push(newPassword);
    myStorage.setItem('passwords', JSON.stringify(passwords));
  }
  close();
});

popupClose.forEach((popup) => {
  popup.addEventListener('click', () => {
    close();
  });
});

document.addEventListener('keydown', (e) => {
  if (popupContainer.classList.contains('popup-container_active') && e.code === 'Escape') {
    close();
  }
});

popupContainer.addEventListener('click', (e) => {
  if (e.target === popupContainer) {
    close();
  }
});

export { popupContainer, popupThanks, myStorage };
