'use strict';

(function () {
  var calculator = document.querySelector('.calculator');
  var calculatorSelect = calculator.querySelector('.calculator__goal');
  var calculatorSelectBlock = document.querySelector('.calculator__select');
  var calculatorList = calculator.querySelector('.calculator__list');
  var calculatorInput = calculator.querySelector('.calculator__input');
  var calculatorLinks = calculator.querySelectorAll('.calculator__link');
  var calculatorCredits = calculator.querySelectorAll('.calculator__credit');
  var priceButtons = calculator.querySelectorAll('.calculator__price-button');
  var initRanges = calculator.querySelectorAll('.calculator__initial-range');
  var termRanges = calculator.querySelectorAll('.calculator__term-range');
  var calculatorInputPrice = calculator.querySelectorAll('.calculator__price-input_price');
  var calculatorInputInitial = calculator.querySelectorAll('.calculator__price-input_initial');
  var calculatorInputTerm = calculator.querySelectorAll('.calculator__price-input_term');
  var calculatorOffer = calculator.querySelector('.calculator__offer');
  var calculatorOfferButton = calculator.querySelector('.calculator__offer-request');
  var calculatorRequest = calculator.querySelector('.calculator__request');
  var calculatorCheckbox = calculator.querySelectorAll('.calculator__checkbox');
  var block;
  var id;
  var addRequest = false;
  var calculatorForm = calculator.querySelector('.calculator__form');
  var myStorage = localStorage;
  var requests = [];

  var sumCreditName = {
    'mortgage': 'Сумма ипотеки',
    'car': 'Сумма автокредита',
    'consumer': 'Сумма кредита'
  };

  var priceName = {
    'mortgage': 'Стоимость недвижимости',
    'car': 'Стоимость автомобиля',
    'consumer': 'Сумма потребительского кредита'
  };

  var makeCounnt = function () {
    var count = 1;
    return function () {
      if (addRequest) {
        return ++count;
      }
      return count;
    };
  };

  var requestNumber = makeCounnt();

  var requestParams;

  calculatorSelect.addEventListener('click', function (e) {
    e.preventDefault();
    calculatorSelect.classList.toggle('calculator__goal_expanded');
    calculatorList.classList.toggle('calculator__list_expanded');
  });

  for (var i = 0; i < calculatorLinks.length; i++) {
    calculatorLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      calculatorOffer.classList.remove('calculator__offer_active');
      calculatorRequest.classList.remove('calculator__request_active');
      calculator.querySelector('.calculator__message_mortgage').classList.remove('calculator__message_active');
      calculator.querySelector('.calculator__message_car').classList.remove('calculator__message_active');
      for (var j = 0; j < calculatorCredits.length; j++) {
        calculatorCredits[j].classList.remove('calculator__credit_active');
        calculatorCredits[j].classList.remove('in');
      }
      var href = e.target.getAttribute('href').slice(1);
      block = document.getElementById(href);
      id = href;
      block.classList.add('calculator__credit_active');
      setTimeout(function () {
        block.classList.add('in');
      }, 150);
      calculatorSelect.classList.remove('calculator__goal_expanded');
      calculatorList.classList.remove('calculator__list_expanded');
      calculatorSelect.innerHTML = e.target.innerHTML;
      calculatorInput.value = e.target.innerHTML;
      calculatorOffer.querySelector('.calculator__offer-text_credit').innerHTML = sumCreditName[href];
      calculatorSelectBlock.classList.add('calculator__select_active');
      calculatorOffer.classList.add('calculator__offer_active');
      requestParams = calcCredit(block, id);
    });
  }

  for (var j = 0; j < priceButtons.length; j++) {
    priceButtons[j].addEventListener('click', function (e) {
      e.preventDefault();
      var price = e.target.parentNode.querySelector('.calculator__price-input');
      if(!(parseInt((Number(price.value) + Number(e.target.dataset.add)), 10) < price.dataset.min ||
      parseInt((Number(price.value) + Number(e.target.dataset.add)), 10) > price.dataset.max || 
      price.classList.contains('calculator__price-input_red'))) {
        price.value = parseInt((Number(price.value) + Number(e.target.dataset.add)), 10);
        priceInput(price);
        requestParams = calcCredit(block, id);
      }
      if (price.classList.contains('calculator__price-input_red')) {
        price.classList.remove('calculator__price-input_red');
        price.parentNode.parentNode.classList.remove('calculator__price_red')
        price.value = (price.dataset.max - price.dataset.min) / 2;
        priceInput(price);
        requestParams = calcCredit(block, id);
      }
    });
  }

  for (var k = 0; k < initRanges.length; k++) {
    initRanges[k].addEventListener('input', function (e) {
      var percent = (Number(e.target.value) / 100);
      var price = e.target.parentNode.parentNode.querySelector('.calculator__price-wrapper').querySelector('.calculator__price-input').value;
      var inputInit = e.target.parentNode.querySelector('.calculator__price-input');
      inputInit.value = parseInt(price * percent, 10);
      e.target.parentNode.querySelector('.calcualor__initial-percent').innerHTML = e.target.value + '%';
      var roubles = inputInit.parentNode.querySelector('.calculator__price-currency');
      declination(parseInt(inputInit.value, 10), roubles, 'roubles');
      requestParams = calcCredit(block, id);
    });
  }

  for (var n = 0; n < termRanges.length; n++) {
    termRanges[n].addEventListener('input', function (e) {
      var input = e.target.parentNode.querySelector('.calculator__price-input');
      input.value = e.target.value;
      var years = input.parentNode.querySelector('.calculator__price-years');
      declination(parseInt(input.value, 10), years, 'years');
      requestParams = calcCredit(block, id);
    });
  }

  for (var m = 0; m < calculatorInputPrice.length; m++) {
    calculatorInputPrice[m].addEventListener('input', function (e) {
      priceInput(e.target);
    });
  }

  for (var x = 0; x < calculatorInputPrice.length; x++) {
    calculatorInputPrice[x].addEventListener('change', function (e) {
      priceChange(e.target);
      var roubles = e.target.parentNode.querySelector('.calculator__price-currency');
      declination(parseInt(e.target.value, 10), roubles, 'roubles');
      requestParams = calcCredit(block, id);
    });
  }

  for (var a = 0; a < calculatorInputPrice.length; a++) {
    calculatorInputPrice[a].addEventListener('focus', function (e) {
      if (e.target.parentNode.parentNode.classList.contains('calculator__price_red') &&
      e.target.classList.contains('calculator__price-input_red')) {
        e.target.parentNode.parentNode.classList.remove('calculator__price_red');
        e.target.classList.remove('calculator__price-input_red');
        e.target.value = (e.target.dataset.max - e.target.dataset.min) / 2;
      }
    });
  }

  for (var b = 0; b < calculatorInputInitial.length; b++) {
    calculatorInputInitial[b].addEventListener('change', function (e) {
      initialChange(e.target);
      var roubles = e.target.parentNode.querySelector('.calculator__price-currency');
      declination(parseInt(e.target.value, 10), roubles, 'roubles');
      requestParams = calcCredit(block, id);
    });
  }

  for (var c = 0; c < calculatorInputTerm.length; c++) {
    calculatorInputTerm[c].addEventListener('change', function (e) {
      var min = parseInt(e.target.parentNode.parentNode.parentNode.querySelector('.calculator__term-range').min, 10);
      var max = parseInt(e.target.parentNode.parentNode.parentNode.querySelector('.calculator__term-range').max, 10);
      if (parseInt(e.target.value, 10) < min) {
        e.target.value = min;
      }
      if (parseInt(e.target.value, 10) > max) {
        e.target.value = max;
      }
      var years = e.target.parentNode.querySelector('.calculator__price-years');
      declination(parseInt(e.target.value, 10), years, 'years');
      requestParams = calcCredit(block, id);
    });
  }

  for (var d = 0; d < calculatorCheckbox.length; d++) {
    calculatorCheckbox[d].addEventListener('change', function () {
      requestParams = calcCredit(block, id);
    });
  }

  var priceInput = function (input) {
    if (input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price-input_initial')) {
      var initial = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price-input_initial');
      var percent = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').value;
      initial.value = parseInt((Number(input.value) * Number(percent / 100)), 10);
      var roubles = initial.parentNode.querySelector('.calculator__price-currency');
      declination(parseInt(initial.value, 10), roubles, 'roubles');
    }
  };

  var priceChange = function (input) {
    var value = parseInt(input.value, 10);
    if ((value < parseInt(input.dataset.min, 10)) || (value > parseInt(input.dataset.max, 10))) {
      input.parentNode.parentNode.classList.add('calculator__price_red');
      input.classList.add('calculator__price-input_red');
      input.value = 'Некорректное значение';
    }
  };

  var initialChange = function (input) {
    var minPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').min, 10);
    var maxPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').max, 10);
    var price = parseInt(input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price-input_price').value, 10);
    if (parseInt(input.value, 10) < parseInt((price * minPercent / 100), 10)) {
      input.value = parseInt((price * minPercent / 100), 10);
    }
    if (parseInt(input.value, 10) > parseInt((price * maxPercent / 100), 10)) {
      input.value = parseInt((price * maxPercent / 100), 10);
    }
  };

  var calcCredit = function (paramsBlock, creditType) {
    var sumCreditField = calculatorOffer.querySelector('.calculator__offer-sum');
    var payCreditField = calculatorOffer.querySelector('.calculator__offer-month');
    var percentageField = calculatorOffer.querySelector('.calculator__offer-percent');
    var salaryField = calculatorOffer.querySelector('.calculator__offer-salary');
    var sumCredit = 0;
    var percentage = 0;
    var payCredit = 0;
    var salary = 0;
    var casco = document.getElementById('calculator-checkbox-casco');
    var insurance = document.getElementById('calculator-checkbox-lifesafe');
    var price = parseInt(paramsBlock.querySelector('.calculator__price-input_price').value, 10);
    if (paramsBlock.querySelector('.calculator__price-input_initial')) {
      var initial = parseInt(paramsBlock.querySelector('.calculator__price-input_initial').value, 10);
    }
    var term = parseInt(paramsBlock.querySelector('.calculator__price-input_term').value, 10);

    calculatorOffer.classList.remove('calculator__offer_active');
    calculatorRequest.classList.remove('calculator__request_active');
    calculator.querySelector('.calculator__message_mortgage').classList.remove('calculator__message_active');
    calculator.querySelector('.calculator__message_car').classList.remove('calculator__message_active');

    switch (creditType) {
      case 'mortgage':
        sumCredit = price - initial;
        if (document.getElementById('calculator-checkbox-mortgage').checked) {
          sumCredit -= document.getElementById('calculator-checkbox-mortgage').dataset.sum;
        }
        if (parseInt(paramsBlock.querySelector('.calculator__initial-range').value, 10) < 15) {
          percentage = 9.4;
        }
        if (parseInt(paramsBlock.querySelector('.calculator__initial-range').value, 10) >= 15) {
          percentage = 8.5;
        }
        break;
      case 'car':
        sumCredit = price - initial;
        if (!casco.checked && !insurance.checked) {
          if (price < 2000000) {
            percentage = 16;
          }
          if (price >= 2000000) {
            percentage = 15;
          }
        }
        if ((casco.checked && !insurance.checked) || (!casco.checked && insurance.checked)) {
          percentage = 8.5;
        }
        if (casco.checked && insurance.checked) {
          percentage = 3.5;
        }
        break;
      case 'consumer':
        sumCredit = price;
        if (price < 750000) {
          percentage = 15;
        }
        if (price >= 750000 && price < 2000000) {
          percentage = 12.5;
        }
        if (price >= 2000000) {
          percentage = 9.5;
        }
        if (document.getElementById('calculator-checkbox-salary').checked) {
          percentage -= 0.5;
        }
        break;
      default:
        sumCredit = price;
    }

    var isSumCredit = false;

    switch (creditType) {
      case 'mortgage':
        if (sumCredit >= 500000) {
          isSumCredit = true;
        }
        break;
      case 'car':
        if (sumCredit >= 200000) {
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

    var percentageMonth = (percentage / 100) / 12;
    var termMonth = term * 12;

    payCredit = parseInt((sumCredit * (percentageMonth + (percentageMonth / (Math.pow((1 + percentageMonth), termMonth) - 1)))), 10);
    salary = parseInt((payCredit / 0.45), 10);

    if (isSumCredit) {
      payCreditField.innerHTML = payCredit;
      sumCreditField.innerHTML = sumCredit;
      percentageField.innerHTML = percentage;
      salaryField.innerHTML = salary;

      declination(payCredit, payCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      declination(sumCredit, sumCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      declination(salary, salaryField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      calculatorOffer.classList.add('calculator__offer_active');
    }

    return {
      'goal': paramsBlock.dataset.type,
      'creditType': creditType,
      'price': price,
      'initial': initial,
      'term': term
    };
  };

  calculatorOfferButton.addEventListener('click', function (e) {
    e.preventDefault();
    var newRequestNumber = requestNumber();
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
    document.getElementById('request-initial').innerHTML = '';
    document.getElementById('request-initial').parentNode.querySelector('.calculator__request-currency').innerHTML = '';
    calculatorRequest.classList.add('calculator__request_active');
    document.getElementById('request-goal').innerHTML = requestParams.goal;
    document.getElementById('request-number').innerHTML = newRequestNumberString;
    document.getElementById('request-price').parentNode.parentNode.querySelector('.calculator__descr').innerHTML = priceName[requestParams.creditType];
    document.getElementById('request-price').innerHTML = requestParams.price;
    document.getElementById('request-price').innerHTML = requestParams.price;
    declination(requestParams.price, document.getElementById('request-price').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    if (requestParams.initial) {
      document.getElementById('request-initial').innerHTML = requestParams.initial;
      declination(requestParams.initial, document.getElementById('request-initial').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    }
    document.getElementById('request-term').innerHTML = requestParams.term;
    declination(requestParams.term, document.getElementById('request-term').parentNode.querySelector('.calculator__request-years'), 'years');
    window.scrollTo({
      top: calculator.offsetTop + calculatorRequest.offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  });

  calculatorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addRequest = true;
    requestNumber();
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

  var declination = function (value, word, type) {
    var rest = value % 10;
    var restH = value % 100;
    var way;
    switch (rest) {
      case 1:
        if (restH !== 11) {
          way = 'a';
        }
        if (restH === 11) {
          way = 'c';
        }
        break;
      case 2:
      case 3:
      case 4:
        if (restH !== 12 && restH !== 13 && restH !== 14) {
          way = 'b';
        }
        if (restH === 12 || restH === 13 || restH === 14) {
          way = 'c';
        }
        break;
      default:
        way = 'c';
    }

    var waysRoubles = {
      'a': 'рубль',
      'b': 'рубля',
      'c': 'рублей'
    };

    var waysYears = {
      'a': 'год',
      'b': 'года',
      'c': 'лет'
    };

    switch (type) {
      case 'roubles':
        word.innerHTML = waysRoubles[way];
        break;
      case 'years':
        word.innerHTML = waysYears[way];
        break;
    }
  };
})();
