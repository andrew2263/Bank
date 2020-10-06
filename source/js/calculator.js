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

  var findInput = function (block, collection) {
    for (var i = 0; i < block.length; i++) {
      var inputs = block[i].querySelectorAll('input');
      for (var j = 0; j < inputs.length; j++) {
        collection.push(inputs[j]);
      }
    }
    return collection;
  };

  calculatorInputPrice = findInput(calculatorPrice, calculatorInputPrice);
  calculatorInputInitial = findInput(calculatorInitial, calculatorInputInitial);
  calculatorInputTerm = findInput(calculatorTerm, calculatorInputTerm);
  initRanges = findInput(initRangesBlock, initRanges);
  termRanges = findInput(termRangesBlock, termRanges);
  calculatorCheckbox = findInput(calculatorCheckboxGroup, calculatorCheckbox);

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

  var onInputPrice = function (input) {
    if (input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial')) {
      var initial = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial').querySelector('input');
      var percent = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').value;
      initial.value = parseInt((Number(input.value) * Number(percent / 100)), 10);
      var roubles = initial.parentNode.querySelector('.calculator__price-currency');
      decline(parseInt(initial.value, 10), roubles, 'roubles');
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
    decline(parseInt(inputPrice.value, 10), roubles, 'roubles');
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
    if(!(parseInt((Number(price.value) + Number(priceButton.dataset.add)), 10) < price.dataset.min ||
    parseInt((Number(price.value) + Number(priceButton.dataset.add)), 10) > price.dataset.max ||
    price.classList.contains('calculator__price-input_red'))) {
      price.value = parseInt((Number(price.value) + Number(priceButton.dataset.add)), 10);
      onInputPrice(price);
      requestParams = calculateCredit(block, id);
    }
    if (price.classList.contains('calculator__price-input_red')) {
      price.classList.remove('calculator__price-input_red');
      price.parentNode.parentNode.classList.remove('calculator__price_red')
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
    initRange.parentNode.querySelector('.calcualor__initial-percent').querySelector('p').innerHTML = initRange.value + '%';
    var roubles = inputInit.parentNode.querySelector('.calculator__price-currency');
    decline(parseInt(inputInit.value, 10), roubles, 'roubles');
    requestParams = calculateCredit(block, id);
  };

  var onInputTermRange = function (termRange) {
    var input = termRange.parentNode.parentNode.querySelector('.calculator__price_term').querySelector('input');
    input.value = termRange.value;
    var years = input.parentNode.querySelector('.calculator__price-years');
    decline(parseInt(input.value, 10), years, 'years');
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
    decline(parseInt(inputInitial.value, 10), roubles, 'roubles');
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
    decline(parseInt(inputTerm.value, 10), years, 'years');
    requestParams = calculateCredit(block, id);
  };

  var calculateCredit = function (paramsBlock, creditType) {
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
    var price = parseInt(paramsBlock.querySelector('.calculator__price_range').querySelector('input').value, 10);
    if (paramsBlock.querySelector('.calculator__price_initial')) {
      var initial = parseInt(paramsBlock.querySelector('.calculator__price_initial').querySelector('input').value, 10);
    }
    var term = parseInt(paramsBlock.querySelector('.calculator__price_term').querySelector('input').value, 10);

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
        if (parseInt(paramsBlock.querySelector('.calculator__initial-range').querySelector('input').value, 10) < 15) {
          percentage = 9.4;
        }
        if (parseInt(paramsBlock.querySelector('.calculator__initial-range').querySelector('input').value, 10) >= 15) {
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

      decline(payCredit, payCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      decline(sumCredit, sumCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      decline(salary, salaryField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
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

  //decline — функция для определения падежа существительного в зависимости от числа
  //например: 1 рубль, 2 рубля, 5 рублей; 1 год, 2 года, 6 лет и т.д.
  //аргументы: value - число, word - поле, куда будет записано слово, type - год или рубль
  //type может принимать значения 'roubles' или 'years'

  var decline = function (value, word, type) {
    //падеж существительного определяется в зависимости от остатка от деления числа на 10
    var rest = value % 10;
    //т.к. 11, 12, 13, 14 - рублЕЙ, дополнительно проверяем остаток от деления числа на 100
    var restH = value % 100;
    var way;
    switch (rest) {
      case 1:
        if (restH !== 11) {
          way = 'a'; //если остаток от деления числа на 100 не 11, то склонение "рубль"
        }
        if (restH === 11) {
          way = 'c'; // если остаток от деления на 100 === 11, то склонение "рублей"
        }
        break;
      case 2:
      case 3:
      case 4:
        if (restH !== 12 && restH !== 13 && restH !== 14) {
          way = 'b'; //то же самое, если остаток от деления на 100 не 12, не 13 и не 14, то склонение "рубля"
        }
        if (restH === 12 || restH === 13 || restH === 14) {
          way = 'c'; //если 12, 13, 14 - склонение "рублей"
        }
        break;
      default:
        way = 'c'; //по умолчанию склонение "рублей"
    }

    //объект с вариантами склонения слова "рубль"
    var waysRoubles = {
      'a': 'рубль',
      'b': 'рубля',
      'c': 'рублей'
    };

    //объект с вариантами склонения слова "год"
    var waysYears = {
      'a': 'год',
      'b': 'года',
      'c': 'лет'
    };

    //указываем в поле word существительное в соответствующем падеже
    switch (type) {
      case 'roubles':
        word.innerHTML = waysRoubles[way];
        break;
      case 'years':
        word.innerHTML = waysYears[way];
        break;
    }
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
    document.getElementById('request-price').parentNode.parentNode.querySelector('.calculator__descr').innerHTML = requestParams.priceName;
    document.getElementById('request-price').innerHTML = requestParams.price;
    document.getElementById('request-price').innerHTML = requestParams.price;
    decline(requestParams.price, document.getElementById('request-price').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    if (requestParams.initial) {
      document.getElementById('request-initial').innerHTML = requestParams.initial;
      decline(requestParams.initial, document.getElementById('request-initial').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    }
    document.getElementById('request-term').innerHTML = requestParams.term;
    decline(requestParams.term, document.getElementById('request-term').parentNode.querySelector('.calculator__request-years'), 'years');
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
})();
