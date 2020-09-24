'use strict';
(function () {
  var calculatorSubmit = document.querySelector('.calculator__submit');
  var calculatorForm = document.querySelector('.calculator__form');
  var popupContainer = document.querySelector('.popup-container');
  var popupClose = document.querySelectorAll('.popup__close');
  var popupThanks = document.querySelector('.popup__thanks');
  var loginButton = document.querySelector('.header__login');
  var popupLogin = document.querySelector('.popup__login');
  var loginInput = document.getElementById('login');
  var passwordInput = document.getElementById('password');
  var passwordCheckbox = document.getElementById('show-password');

  loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    popupContainer.classList.add('popup-container_active');
    popupLogin.classList.add('popup__login_active');
    document.querySelector('body').style.overflowY = 'hidden';
  });

  passwordCheckbox.addEventListener('change', function (e) {
    if (e.target.checked) {
      passwordInput.type = 'text';
    }
    if (!e.target.checked) {
      passwordInput.type = 'password';
    }
  });

  calculatorSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    popupContainer.classList.add('popup-container_active');
    popupThanks.classList.add('popup__thanks_active');
    document.querySelector('body').style.overflowY = 'hidden';
    var inputs = calculatorForm.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  });

  for (var i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener('click', function () {
      popupContainer.classList.remove('popup-container_active');
      popupThanks.classList.remove('popup__thanks_active');
      document.querySelector('body').style.overflowY = 'auto';
      passwordInput.value = '';
      loginInput.value = '';
      passwordCheckbox.checked = false;
      passwordInput.type = 'password';
    });
  }
})();
