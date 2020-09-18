'use strict';
(function () {
  var calculator = document.querySelector('.calculator');
  var calculatorSelect = calculator.querySelector('.calculator__goal');
  var calculatorList = calculator.querySelector('.calculator__list');
  var calculatorInput = calculator.querySelector('.calculator__input');
  var calculatorLinks = calculator.querySelectorAll('.calculator__link');
  var calculatorCredits = calculator.querySelectorAll('.calculator__credit');
  var priceButtons = calculator.querySelectorAll('.calculator__price-button');
  var initRanges = calculator.querySelectorAll('.calculator__initial-range');
  var termRanges = calculator.querySelectorAll('.calculator__term-range');

  calculatorSelect.addEventListener('click', function (e) {
    e.preventDefault();
    calculatorSelect.classList.toggle('calculator__goal_expanded');
    calculatorList.classList.toggle('calculator__list_expanded');
  })

  for (var i = 0; i < calculatorLinks.length; i++) {
    calculatorLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      for (var j = 0; j < calculatorCredits.length; j++) {
        calculatorCredits[j].classList.remove('calculator__credit_active');
        calculatorCredits[j].classList.remove('in');
      }
      calculator.querySelector(e.target.getAttribute('href')).classList.add('calculator__credit_active');
      setTimeout(function () {
        calculator.querySelector(e.target.getAttribute('href')).classList.add('in');
      }, 150);
      calculatorSelect.classList.remove('calculator__goal_expanded');
      calculatorList.classList.remove('calculator__list_expanded');
      calculatorSelect.innerHTML = e.target.innerHTML;
      calculatorInput.value = e.target.innerHTML;
    });
  }

  for (var j = 0; j < priceButtons.length; j++) {
    priceButtons[j].addEventListener('click', function (e) {
      e.preventDefault();
      var price = Number(e.target.parentNode.querySelector('.calculator__price-input').value);
      e.target.parentNode.querySelector('.calculator__price-input').value = price + Number(e.target.dataset.add);
    })
  }

  for (var k = 0; k < initRanges.length; k++) {
    initRanges[k].addEventListener('input', function (e) {
      var percent = (Number(e.target.value) / 100);
      var price = e.target.parentNode.parentNode.querySelector('.calculator__price-wrapper').querySelector('.calculator__price-input').value;
      var inputInit = e.target.parentNode.querySelector('.calculator__price-input');
      inputInit.value = (price * percent);
    })
  }

  for (var n = 0; n < termRanges.length; n++) {
    termRanges[n].addEventListener('input', function (e) {
      var input = e.target.parentNode.querySelector('.calculator__price-input');
      input.value = e.target.value;
    })
  }
})();