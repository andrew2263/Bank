'use strict';
(function () {
  var calculatorForm = document.querySelector('.calculator__form');
  var popupContainer = document.querySelector('.popup-container');
  var popupClose = document.querySelectorAll('.popup__close');
  var popupThanks = document.querySelector('.popup__thanks');
  var loginButton = document.querySelector('.header__login');
  var popupLogin = document.querySelector('.popup__login');
  var loginInput = document.getElementById('login');
  var passwordInput = document.getElementById('password');
  var passwordCheckbox = document.getElementById('show-password');
  var passwordForm = document.querySelector('.popup__form');
  var myStorage = localStorage;
  var passwords = [];

  loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    popupContainer.classList.add('popup-container_active');
    popupLogin.classList.add('popup__login_active');
    document.querySelector('body').style.overflowY = 'hidden';
    loginInput.focus();
  });

  passwordCheckbox.addEventListener('change', function (e) {
    if (e.target.checked) {
      passwordInput.type = 'text';
    }
    if (!e.target.checked) {
      passwordInput.type = 'password';
    }
  });

  passwordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var passwordInTheList = false;
    var login = loginInput.value;
    var password = document.getElementById('password').value;

    if (myStorage.getItem('passwords') && isPassword(JSON.parse(myStorage.getItem('passwords')), login, password)) {
      passwordInTheList = true;
    }
    if (!myStorage.getItem('passwords') && isPassword(passwords, login, password)) {
      passwordInTheList = true;
    }
    if (!passwordInTheList && (login !== '') && (password !== '')) {
      var newPassword = {
        'login': login,
        'password': password
      };
      if (passwords.length === 0 && myStorage.getItem('passwords')) {
        for (var i = 0; i < JSON.parse(myStorage.getItem('passwords')).length; i++) {
          passwords.push(JSON.parse(myStorage.getItem('passwords'))[i]);
        }
      }
      passwords.push(newPassword);
      myStorage.setItem('passwords', JSON.stringify(passwords));
    }
    close();
  });

  calculatorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    popupContainer.classList.add('popup-container_active');
    popupThanks.classList.add('popup__thanks_active');
    document.querySelector('body').style.overflowY = 'hidden';
    var inputs = e.target.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type !== 'submit') {
        inputs[i].value = '';
      }
    }
  });

  for (var i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener('click', function () {
      close();
    });
  }

  var isPassword = function (myPasswords, myLogin, myPassword) {
    for (var j = 0; j < myPasswords.length; j++) {
      if (myPasswords[j].login === myLogin && myPasswords[j].password === myPassword) {
        return true;
      }
    }
    return false;
  };

  document.addEventListener('keydown', function (e) {
    if (popupContainer.classList.contains('popup-container_active') && e.code === 'Escape') {
      close();
    }
  });

  popupContainer.addEventListener('click', function (e) {
    if (e.target === popupContainer) {
      close();
    }
  });

  var close = function () {
    popupContainer.classList.remove('popup-container_active');
    popupLogin.classList.remove('popup__login_active');
    popupThanks.classList.remove('popup__thanks_active');
    document.querySelector('body').style.overflowY = 'auto';
    passwordInput.value = '';
    loginInput.value = '';
    passwordCheckbox.checked = false;
    passwordInput.type = 'password';
  };
})();
