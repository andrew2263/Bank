'use strict';

(function () {
  var calculator = document.querySelector('.calculator');
  var calculatorSelect = calculator.querySelector('.calculator__goal');
  var calculatorSelectBlock = document.querySelector('.calculator__select');
  var calculatorList = calculator.querySelector('.calculator__list');
  var calculatorInput = calculator.querySelector('#calculator-select');
  var calculatorLinks = calculator.querySelectorAll('.calculator__link');
  var calculatorCredits = calculator.querySelectorAll('.calculator__credit');
  var priceButtons = calculator.querySelectorAll('.calculator__price-button');
  var initRangesBlock = calculator.querySelectorAll('.calculator__initial-range');
  var termRangesBlock = calculator.querySelectorAll('.calculator__term-range');
  var calculatorPrice = calculator.querySelectorAll('.calculator__price_range');
  var calculatorInitial = calculator.querySelectorAll('.calculator__price_initial');
  var calculatorTerm = calculator.querySelectorAll('.calculator__price_term');
  var calculatorOffer = calculator.querySelector('.calculator__offer');
  var calculatorOfferButton = calculator.querySelector('.calculator__offer-request');
  var calculatorRequest = calculator.querySelector('.calculator__request');
  var calculatorCheckboxGroup = calculator.querySelectorAll('.calculator__checkbox-group');
  var block;
  var id;
  var addRequest = false;
  var calculatorForm = calculator.querySelector('#calculator-form');
  var myStorage = localStorage;
  var calculatorInputPrice = [];
  var calculatorInputInitial = [];
  var calculatorInputTerm = [];
  var initRanges = [];
  var termRanges = [];
  var calculatorCheckbox = [];
  var requests = [];

  calculatorInputPrice = window.helper.findInput(calculatorPrice, calculatorInputPrice);
  calculatorInputInitial = window.helper.findInput(calculatorInitial, calculatorInputInitial);
  calculatorInputTerm = window.helper.findInput(calculatorTerm, calculatorInputTerm);
  initRanges = window.helper.findInput(initRangesBlock, initRanges);
  termRanges = window.helper.findInput(termRangesBlock, termRanges);
  calculatorCheckbox = window.helper.findInput(calculatorCheckboxGroup, calculatorCheckbox);

  var requestNumber = window.helper.makeCount();
  var requestParams;

  var onInputPrice = function (input) {
    if (input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial')) {
      var initial = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial').querySelector('input');
      var percent = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').value;
      initial.value = parseInt((Number(input.value) * Number(percent / 100)), 10);
      var roubles = initial.parentNode.querySelector('.calculator__price-currency');
      window.helper.decline(parseInt(initial.value, 10), roubles, 'roubles');
    }
  };

  var onChangePrice = function (inputPrice) {
    var value = parseInt(inputPrice.value, 10);
    if ((value < parseInt(inputPrice.dataset.min, 10)) || (value > parseInt(inputPrice.dataset.max, 10))) {
      inputPrice.parentNode.parentNode.classList.add('calculator__price_red');
      inputPrice.classList.add('calculator__price-input_red');
      inputPrice.value = 'Некорректное значение';
    }
    var roubles = inputPrice.parentNode.querySelector('.calculator__price-currency');
    window.helper.decline(parseInt(inputPrice.value, 10), roubles, 'roubles');
    requestParams = calculateCredit(block, id);
  };

  var onChangeInitial = function (input) {
    var minPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').min, 10);
    var maxPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').max, 10);
    var price = parseInt(input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_range').querySelector('input').value, 10);
    if (parseInt(input.value, 10) < parseInt((price * minPercent / 100), 10)) {
      input.value = parseInt((price * minPercent / 100), 10);
    }
    if (parseInt(input.value, 10) > parseInt((price * maxPercent / 100), 10)) {
      input.value = parseInt((price * maxPercent / 100), 10);
    }
  };

  var onClickCalculatorLink = function (calculatorLink) {
    calculatorOffer.classList.remove('calculator__offer_active');
    calculatorRequest.classList.remove('calculator__request_active');
    calculator.querySelector('.calculator__message_mortgage').classList.remove('calculator__message_active');
    calculator.querySelector('.calculator__message_car').classList.remove('calculator__message_active');
    for (var j = 0; j < calculatorCredits.length; j++) {
      calculatorCredits[j].classList.remove('calculator__credit_active');
      calculatorCredits[j].classList.remove('in');
    }
    var href = calculatorLink.getAttribute('href').slice(1);
    block = document.getElementById(href);
    id = href;
    block.classList.add('calculator__credit_active');
    setTimeout(function () {
      block.classList.add('in');
    }, 150);
    calculatorSelect.classList.remove('calculator__goal_expanded');
    calculatorList.classList.remove('calculator__list_expanded');
    calculatorSelect.innerHTML = calculatorLink.innerHTML;
    calculatorInput.value = calculatorLink.innerHTML;
    calculatorOffer.querySelector('.calculator__offer-text_credit').querySelector('p').innerHTML = calculatorLink.dataset.sumcredit;
    calculatorSelectBlock.classList.add('calculator__select_active');
    calculatorOffer.classList.add('calculator__offer_active');
    requestParams = calculateCredit(block, id);
  };

  var onClickPriceButton = function (priceButton) {
    var price = priceButton.parentNode.querySelector('input');
    if (!(parseInt((Number(price.value) + Number(priceButton.dataset.add)), 10) < price.dataset.min ||
    parseInt((Number(price.value) + Number(priceButton.dataset.add)), 10) > price.dataset.max ||
    price.classList.contains('calculator__price-input_red'))) {
      price.value = parseInt((Number(price.value) + Number(priceButton.dataset.add)), 10);
      onInputPrice(price);
      requestParams = calculateCredit(block, id);
    }
    if (price.classList.contains('calculator__price-input_red')) {
      price.classList.remove('calculator__price-input_red');
      price.parentNode.parentNode.classList.remove('calculator__price_red');
      price.value = (price.dataset.max - price.dataset.min) / 2;
      onInputPrice(price);
      requestParams = calculateCredit(block, id);
    }
  };

  var onInputInitRange = function (initRange) {
    var percent = (Number(initRange.value) / 100);
    var price = initRange.parentNode.parentNode.parentNode.querySelector('.calculator__price-wrapper').querySelector('input').value;
    var inputInit = initRange.parentNode.parentNode.querySelector('.calculator__price_initial').querySelector('input');
    inputInit.value = parseInt(price * percent, 10);
    initRange.parentNode.querySelector('.calculator__initial-percent').querySelector('p').innerHTML = initRange.value + '%';
    var roubles = inputInit.parentNode.querySelector('.calculator__price-currency');
    window.helper.decline(parseInt(inputInit.value, 10), roubles, 'roubles');
    requestParams = calculateCredit(block, id);
  };

  var onInputTermRange = function (termRange) {
    var input = termRange.parentNode.parentNode.querySelector('.calculator__price_term').querySelector('input');
    input.value = termRange.value;
    var years = input.parentNode.querySelector('.calculator__price-years');
    window.helper.decline(parseInt(input.value, 10), years, 'years');
    requestParams = calculateCredit(block, id);
  };

  var onFocusInputPrice = function (inputPrice) {
    if (inputPrice.parentNode.parentNode.classList.contains('calculator__price_red') &&
    inputPrice.classList.contains('calculator__price-input_red')) {
      inputPrice.parentNode.parentNode.classList.remove('calculator__price_red');
      inputPrice.classList.remove('calculator__price-input_red');
      inputPrice.value = (inputPrice.dataset.max - inputPrice.dataset.min) / 2;
      onInputPrice(inputPrice);
      requestParams = calculateCredit(block, id);
    }
  };

  var onInputInitial = function (inputInitial) {
    var roubles = inputInitial.parentNode.querySelector('.calculator__price-currency');
    window.helper.decline(parseInt(inputInitial.value, 10), roubles, 'roubles');
    requestParams = calculateCredit(block, id);
  };

  var onInputTerm = function (inputTerm) {
    var min = parseInt(inputTerm.parentNode.parentNode.parentNode.querySelector('.calculator__term-range').querySelector('input').min, 10);
    var max = parseInt(inputTerm.parentNode.parentNode.parentNode.querySelector('.calculator__term-range').querySelector('input').max, 10);
    if (parseInt(inputTerm.value, 10) < min) {
      inputTerm.value = min;
    }
    if (parseInt(inputTerm.value, 10) > max) {
      inputTerm.value = max;
    }
    var years = inputTerm.parentNode.querySelector('.calculator__price-years');
    window.helper.decline(parseInt(inputTerm.value, 10), years, 'years');
    requestParams = calculateCredit(block, id);
  };

  var calculateCredit = function (paramsBlock, creditType) {
    var sumCreditField = document.querySelector('.calculator__offer-sum');
    var payCreditField = document.querySelector('.calculator__offer-month');
    var percentageField = document.querySelector('.calculator__offer-percent');
    var salaryField = document.querySelector('.calculator__offer-salary');
    var price = parseInt(paramsBlock.querySelector('.calculator__price_range').querySelector('input').value, 10);
    if (paramsBlock.querySelector('.calculator__price_initial')) {
      var initial = parseInt(paramsBlock.querySelector('.calculator__price_initial').querySelector('input').value, 10);
    }
    var term = parseInt(paramsBlock.querySelector('.calculator__price_term').querySelector('input').value, 10);

    calculatorOffer.classList.remove('calculator__offer_active');
    calculatorRequest.classList.remove('calculator__request_active');
    calculator.querySelector('.calculator__message_mortgage').classList.remove('calculator__message_active');
    calculator.querySelector('.calculator__message_car').classList.remove('calculator__message_active');

    var calcOfferParams = {};
    var calcSum = window.calculateCreditParams.calculateSumCredit(price, initial, creditType);
    calcOfferParams.sumCredit = calcSum.sumCredit;
    calcOfferParams.percentage = calcSum.percentage;

    var isSumCredit = false;

    switch (creditType) {
      case 'mortgage':
        if (calcOfferParams.sumCredit >= 500000) {
          isSumCredit = true;
        }
        break;
      case 'car':
        if (calcOfferParams.sumCredit >= 200000) {
          isSumCredit = true;
        }
        break;
      case 'consumer':
        isSumCredit = true;
        break;
      default:
        isSumCredit = false;
    }

    if (!isSumCredit) {
      switch (creditType) {
        case 'mortgage':
          calculator.querySelector('.calculator__message_mortgage').classList.add('calculator__message_active');
          break;
        case 'car':
          calculator.querySelector('.calculator__message_car').classList.add('calculator__message_active');
          break;
        default:
          break;
      }
    }

    calcOfferParams.payCredit =
      window.calculateCreditParams.calculatePayCredit(calcOfferParams.percentage,
          calcOfferParams.sumCredit,
          term);
    calcOfferParams.salary =
      window.calculateCreditParams.calculateSalary(calcOfferParams.payCredit);
    calcOfferParams.payCreditField = payCreditField;
    calcOfferParams.sumCreditField = sumCreditField;
    calcOfferParams.percentageField = percentageField;
    calcOfferParams.salaryField = salaryField;

    if (isSumCredit) {
      window.viewCalc.renderCalcOffer(calcOfferParams);
      window.helper.decline(calcOfferParams.payCredit, payCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      window.helper.decline(calcOfferParams.sumCredit, sumCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      window.helper.decline(calcOfferParams.salary, salaryField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      calculatorOffer.classList.add('calculator__offer_active');
    }

    return {
      'goal': paramsBlock.dataset.type,
      'priceName': paramsBlock.dataset.pricename,
      'creditType': creditType,
      'price': price,
      'initial': initial,
      'term': term
    };
  };

  calculatorSelect.addEventListener('click', function (e) {
    e.preventDefault();
    calculatorSelect.classList.toggle('calculator__goal_expanded');
    calculatorList.classList.toggle('calculator__list_expanded');
  });

  for (var i = 0; i < calculatorLinks.length; i++) {
    calculatorLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      onClickCalculatorLink(e.target);
    });
  }

  for (var j = 0; j < priceButtons.length; j++) {
    priceButtons[j].addEventListener('click', function (e) {
      e.preventDefault();
      onClickPriceButton(e.target);
    });
  }

  for (var k = 0; k < initRanges.length; k++) {
    initRanges[k].addEventListener('input', function (e) {
      onInputInitRange(e.target);
    });
  }

  for (var n = 0; n < termRanges.length; n++) {
    termRanges[n].addEventListener('input', function (e) {
      onInputTermRange(e.target);
    });
  }

  for (var m = 0; m < calculatorInputPrice.length; m++) {
    calculatorInputPrice[m].addEventListener('input', function (e) {
      onInputPrice(e.target);
    });
    calculatorInputPrice[m].addEventListener('change', function (e) {
      onChangePrice(e.target);
    });
    calculatorInputPrice[m].addEventListener('focus', function (e) {
      onFocusInputPrice(e.target);
    });
  }

  for (var b = 0; b < calculatorInputInitial.length; b++) {
    calculatorInputInitial[b].addEventListener('change', function (e) {
      onChangeInitial(e.target);
      onInputInitial(e.target);
    });
  }

  for (var c = 0; c < calculatorInputTerm.length; c++) {
    calculatorInputTerm[c].addEventListener('change', function (e) {
      onInputTerm(e.target);
    });
  }

  for (var d = 0; d < calculatorCheckbox.length; d++) {
    calculatorCheckbox[d].addEventListener('change', function () {
      requestParams = calculateCredit(block, id);
    });
  }

  calculatorOfferButton.addEventListener('click', function (e) {
    e.preventDefault();
    var newRequestNumber = requestNumber(addRequest);
    var newRequestNumberLength = newRequestNumber.toString().length;
    var newRequestNumberString = '';
    if (newRequestNumberLength < 4) {
      var f = 4 - newRequestNumberLength;
      while (f !== 0) {
        newRequestNumberString += '0';
        f--;
      }
    }
    newRequestNumberString += newRequestNumber.toString();
    calculatorRequest.classList.add('calculator__request_active');
    requestParams.requestNumber = newRequestNumberString;
    window.viewCalc.renderFormalizationRequest(requestParams);
    window.helper.decline(requestParams.price, document.getElementById('request-price').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    if (requestParams.initial) {
      window.helper.decline(requestParams.initial, document.getElementById('request-initial').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    }
    window.helper.decline(requestParams.term, document.getElementById('request-term').parentNode.querySelector('.calculator__request-years'), 'years');
    window.scrollTo({
      top: calculator.offsetTop + calculatorRequest.offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  });

  calculatorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addRequest = true;
    requestNumber(addRequest);
    calculatorRequest.classList.remove('calculator__request_active');
    calculatorOffer.classList.remove('calculator__offer_active');
    addRequest = false;
    var request = {
      'name': document.getElementById('request-name').value,
      'email': document.getElementById('request-email').value,
      'tel': document.getElementById('request-tel').value
    };
    if (requests.length === 0 && myStorage.getItem('requests')) {
      for (var l = 0; l < JSON.parse(myStorage.getItem('requests')).length; l++) {
        requests.push(JSON.parse(myStorage.getItem('requests'))[l]);
      }
    }
    requests.push(request);
    myStorage.setItem('requests', JSON.stringify(requests));
  });
})();
