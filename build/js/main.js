'use strict';

(function () {
  function calculateSumCredit(price, initial, creditType) {
    var sumCredit = 0;
    var percentage = 0;
    var casco = document.getElementById('calculator-checkbox-casco');
    var insurance = document.getElementById('calculator-checkbox-lifesafe');
    switch (creditType) {
      case 'mortgage':
        sumCredit = price - initial;
        if (document.getElementById('calculator-checkbox-mortgage').checked) {
          sumCredit -= document.getElementById('calculator-checkbox-mortgage').dataset.sum;
        }
        if (initial / price < 0.15) {
          percentage = 9.4;
        }
        if (initial / price >= 0.15) {
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
    return {
      'sumCredit': sumCredit,
      'percentage': percentage
    };
  }

  function calculatePayCredit(percentage, sumCredit, term) {
    var percentageMonth = (percentage / 100) / 12;
    var termMonth = term * 12;
    var payCredit = parseInt((sumCredit * (percentageMonth + (percentageMonth / (Math.pow((1 + percentageMonth), termMonth) - 1)))), 10);
    return payCredit;
  }

  function calculateSalary(payCredit) {
    var salary = parseInt((payCredit / 0.45), 10);
    return salary;
  }

  window.calculateCreditParams = {
    calculateSumCredit: calculateSumCredit,
    calculatePayCredit: calculatePayCredit,
    calculateSalary: calculateSalary
  };
})();

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

  var findInput = function (wrapper, collection) {
    for (var i = 0; i < wrapper.length; i++) {
      var inputs = wrapper[i].querySelectorAll('input');
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

  var makeCount = function () {
    var count = 1;
    return function () {
      if (addRequest) {
        return ++count;
      }
      return count;
    };
  };

  var requestNumber = makeCount();
  var requestParams;

  var onInputPrice = function (input) {
    if (input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial')) {
      var initial = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial').querySelector('input');
      var percent = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').value;
      initial.value = setSpaces(parseInt(Number(deleteSpaces(input.value)) * Number(percent / 100)), 10);
      var roubles = initial.parentNode.querySelector('.calculator__price-currency');
      decline(parseInt(deleteSpaces(initial.value), 10), roubles, 'roubles');
    }
  };

  var onChangePrice = function (inputPrice) {
    var value = parseInt(inputPrice.value, 10);
    if ((value < parseInt(inputPrice.dataset.min, 10)) || (value > parseInt(inputPrice.dataset.max, 10))) {
      inputPrice.parentNode.parentNode.classList.add('calculator__price_red');
      inputPrice.value = 'Некорректное значение';
    }
    var roubles = inputPrice.parentNode.querySelector('.calculator__price-currency');
    decline(parseInt(inputPrice.value, 10), roubles, 'roubles');
    requestParams = calculateCredit(block, id);
  };

  var onChangeInitial = function (input) {
    var minPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').min, 10);
    var maxPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').max, 10);
    var price = parseInt(deleteSpaces(input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_range').querySelector('input').value), 10);
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
    if (!(parseInt((Number(deleteSpaces(price.value)) + Number(priceButton.dataset.add)), 10) < price.dataset.min ||
    parseInt((Number(deleteSpaces(price.value)) + Number(priceButton.dataset.add)), 10) > price.dataset.max ||
    price.parentNode.parentNode.classList.contains('calculator__price_red'))) {
      price.value = setSpaces(parseInt((Number(deleteSpaces(price.value)) + Number(priceButton.dataset.add)), 10));
      onInputPrice(price);
      requestParams = calculateCredit(block, id);
    }
    if (price.parentNode.parentNode.classList.contains('calculator__price_red')) {
      price.parentNode.parentNode.classList.remove('calculator__price_red');
      price.value = setSpaces((price.dataset.max - price.dataset.min) / 2);
      onInputPrice(price);
      requestParams = calculateCredit(block, id);
    }
  };

  var onInputInitRange = function (initRange) {
    var percent = (Number(initRange.value) / 100);
    var price = deleteSpaces(initRange.parentNode.parentNode.parentNode.querySelector('.calculator__price-wrapper').querySelector('input').value);
    var inputInit = initRange.parentNode.parentNode.querySelector('.calculator__price_initial').querySelector('input');
    inputInit.value = setSpaces(parseInt(price * percent, 10));
    initRange.parentNode.querySelector('.calculator__initial-percent').querySelector('p').innerHTML = initRange.value + '%';
    var roubles = inputInit.parentNode.querySelector('.calculator__price-currency');
    decline(parseInt(deleteSpaces(inputInit.value), 10), roubles, 'roubles');
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
    inputPrice.value = deleteSpaces(inputPrice.value);
    if (inputPrice.parentNode.parentNode.classList.contains('calculator__price_red')) {
      inputPrice.parentNode.parentNode.classList.remove('calculator__price_red');
      inputPrice.value = (inputPrice.dataset.max - inputPrice.dataset.min) / 2;
      onInputPrice(inputPrice);
      requestParams = calculateCredit(block, id);
    }
  };

  var onInputInitial = function (inputInitial) {
    var roubles = inputInitial.parentNode.querySelector('.calculator__price-currency');
    decline(parseInt(deleteSpaces(inputInitial.value), 10), roubles, 'roubles');
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

  var setSpaces = function (str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  var deleteSpaces = function (str) {
    var strArr = str.split('');
    for (var i = 0; i < strArr.length; i++) {
      if (strArr[i] === ' ') {
        strArr.splice(i, 1);
      }
    }
    return strArr.join("");
  };

  var calculateCredit = function (paramsBlock, creditType) {
    var sumCreditField = document.querySelector('.calculator__offer-sum');
    var payCreditField = document.querySelector('.calculator__offer-month');
    var percentageField = document.querySelector('.calculator__offer-percent');
    var salaryField = document.querySelector('.calculator__offer-salary');
    var price = parseInt(deleteSpaces(paramsBlock.querySelector('.calculator__price_range').querySelector('input').value), 10);
    if (paramsBlock.querySelector('.calculator__price_initial')) {
      var initial = parseInt(deleteSpaces(paramsBlock.querySelector('.calculator__price_initial').querySelector('input').value), 10);
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
      decline(calcOfferParams.payCredit, payCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      decline(calcOfferParams.sumCredit, sumCreditField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
      decline(calcOfferParams.salary, salaryField.parentNode.querySelector('.calculator__offer-currency'), 'roubles');
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

  // decline — функция для определения падежа существительного в зависимости от числа
  // например: 1 рубль, 2 рубля, 5 рублей; 1 год, 2 года, 6 лет и т.д.
  // аргументы: value - число, word - поле, куда будет записано слово, type - год или рубль
  // type может принимать значения 'roubles' или 'years'

  var decline = function (value, word, type) {
    // падеж существительного определяется в зависимости от остатка от деления числа на 10
    var rest = value % 10;
    // т.к. 11, 12, 13, 14 - рублЕЙ, дополнительно проверяем остаток от деления числа на 100
    var restH = value % 100;
    var way;
    switch (rest) {
      case 1:
        if (restH !== 11) {
          way = 'a'; // если остаток от деления числа на 100 не 11, то склонение "рубль"
        }
        if (restH === 11) {
          way = 'c'; // если остаток от деления на 100 === 11, то склонение "рублей"
        }
        break;
      case 2:
      case 3:
      case 4:
        if (restH !== 12 && restH !== 13 && restH !== 14) {
          way = 'b'; // то же самое, если остаток от деления на 100 не 12, не 13 и не 14, то склонение "рубля"
        }
        if (restH === 12 || restH === 13 || restH === 14) {
          way = 'c'; // если 12, 13, 14 - склонение "рублей"
        }
        break;
      default:
        way = 'c'; // по умолчанию склонение "рублей"
    }

    // объект с вариантами склонения слова "рубль"
    var WAYS_ROUBLES = {
      'a': 'рубль',
      'b': 'рубля',
      'c': 'рублей'
    };

    // объект с вариантами склонения слова "год"
    var WAYS_YEARS = {
      'a': 'год',
      'b': 'года',
      'c': 'лет'
    };

    // указываем в поле word существительное в соответствующем падеже
    switch (type) {
      case 'roubles':
        word.innerHTML = WAYS_ROUBLES[way];
        break;
      case 'years':
        word.innerHTML = WAYS_YEARS[way];
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
    calculatorInputPrice[m].addEventListener('blur', function (e) {
      e.target.value = setSpaces(e.target.value);
    });
  }

  for (var b = 0; b < calculatorInputInitial.length; b++) {
    calculatorInputInitial[b].addEventListener('change', function (e) {
      onChangeInitial(e.target);
      onInputInitial(e.target);
    });
    calculatorInputInitial[b].addEventListener('focus', function (e) {
      e.target.value = deleteSpaces(e.target.value);
    });
    calculatorInputInitial[b].addEventListener('blur', function (e) {
      e.target.value = setSpaces(e.target.value);
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
    calculatorRequest.classList.add('calculator__request_active');
    requestParams.requestNumber = newRequestNumberString;
    window.viewCalc.renderFormalizationRequest(requestParams);
    decline(requestParams.price, document.getElementById('request-price').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    if (requestParams.initial) {
      decline(requestParams.initial, document.getElementById('request-initial').parentNode.querySelector('.calculator__request-currency'), 'roubles');
    }
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

'use strict';
ymaps.ready(function () {
  var checkboxRussia = document.getElementById('offices-russia');
  var checkboxCIS = document.getElementById('offices-sng');
  var checkboxEurope = document.getElementById('offices-europe');

  var myMap = new ymaps.Map('map', {
    center: [56.895667, 60.552225],
    zoom: 5.4
  }, {
    searchControlProvider: 'yandex#search'
  });

  var placemarkSpb = new ymaps.Placemark([59.939847, 30.360286], {
    hintContent: 'Собственный значок метки',
    balloonContent: 'ул. Восстания, 28',
    country: 'russia'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'img/location.svg',
    // Размеры метки.
    iconImageSize: [35, 40],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-18, -40]
  });

  var placemarkMsk = new ymaps.Placemark([55.762502, 37.644414], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Москва, Чистопрудный бульвар, 11с2',
    country: 'russia'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkSaratov = new ymaps.Placemark([51.535730, 46.032415], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Саратов, ул. имени А.М. Горького, 57',
    country: 'russia'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkVyatka = new ymaps.Placemark([58.593955, 49.659345], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Вятка, ул. Воровского, 75А',
    country: 'russia'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkTyumen = new ymaps.Placemark([57.154068, 65.538855], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Тюмень, ул. Республики, 45',
    country: 'russia'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkOmsk = new ymaps.Placemark([54.994011, 73.373045], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Омск, ул. Герцена, 18',
    country: 'russia'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkBaku = new ymaps.Placemark([40.382056, 49.848270], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Баку, ул. Шамиля Азизбекова, 211',
    country: 'CIS'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkAlmaty = new ymaps.Placemark([43.242384, 76.940417], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Алматы, проспект Абая, 51',
    country: 'CIS'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkTashkent = new ymaps.Placemark([41.308374, 69.270771], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Ташкент, ул. Ислама Каримова, 15',
    country: 'CIS'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkMinsk = new ymaps.Placemark([53.902236, 27.549848], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Минск, ул. Немига, 5',
    country: 'CIS'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkLondon = new ymaps.Placemark([51.500926, -0.107995], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'London, Waterloo Road, 157',
    country: 'europe'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkRome = new ymaps.Placemark([41.910252, 12.497210], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Rome, Via Sicilia, 184',
    country: 'europe'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkPrague = new ymaps.Placemark([50.084299, 14.427518], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Prague, Panská, 890/7',
    country: 'europe'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var placemarkParis = new ymaps.Placemark([48.877903, 2.351655], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'Paris, Rue la Fayette',
    country: 'europe'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [35, 40],
    iconImageOffset: [-18, -40]
  });

  var russiaGroup = new ymaps.GeoObjectCollection();
  russiaGroup.add(placemarkSpb);
  russiaGroup.add(placemarkMsk);
  russiaGroup.add(placemarkSaratov);
  russiaGroup.add(placemarkVyatka);
  russiaGroup.add(placemarkOmsk);
  russiaGroup.add(placemarkTyumen);

  var cisGroup = new ymaps.GeoObjectCollection();
  cisGroup.add(placemarkMinsk);
  cisGroup.add(placemarkBaku);
  cisGroup.add(placemarkTashkent);
  cisGroup.add(placemarkAlmaty);

  var europeGroup = new ymaps.GeoObjectCollection();
  europeGroup.add(placemarkLondon);
  europeGroup.add(placemarkParis);
  europeGroup.add(placemarkPrague);
  europeGroup.add(placemarkRome);

  myMap.geoObjects.add(russiaGroup);
  myMap.geoObjects.add(europeGroup);
  myMap.geoObjects.add(cisGroup);

  if (!checkboxRussia.checked) {
    myMap.geoObjects.remove(russiaGroup);
  }

  if (!checkboxCIS.checked) {
    myMap.geoObjects.remove(cisGroup);
  }

  if (!checkboxEurope.checked) {
    myMap.geoObjects.remove(europeGroup);
  }

  checkboxRussia.addEventListener('change', function (e) {
    addRemoveGroup(e.target, myMap, russiaGroup);
  });

  checkboxCIS.addEventListener('change', function (e) {
    addRemoveGroup(e.target, myMap, cisGroup);
  });

  checkboxEurope.addEventListener('change', function (e) {
    addRemoveGroup(e.target, myMap, europeGroup);
  });

  var addRemoveGroup = function (checkbox, map, groupName) {
    if (checkbox.checked) {
      map.geoObjects.add(groupName);
    }
    if (!checkbox.checked) {
      map.geoObjects.remove(groupName);
    }
  };
});

'use strict';
(function () {
  var calculatorForm = document.querySelector('#calculator-form');
  var popupContainer = document.querySelector('.popup-container');
  var popupClose = document.querySelectorAll('.popup__close');
  var popupThanks = document.querySelector('.popup__thanks');
  var loginButton = document.querySelector('.header__login');
  var popupLogin = document.querySelector('.popup__login');
  var loginInput = document.getElementById('login');
  var passwordInput = document.getElementById('password');
  var passwordCheckbox = document.getElementById('show-password');
  var passwordForm = document.querySelector('#popup-form');
  var myStorage = localStorage;
  var passwords = [];

  loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    popupContainer.classList.add('popup-container_active');
    popupLogin.classList.add('popup__login_active');
    document.querySelector('body').classList.add('body-hidden');
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
    document.querySelector('body').classList.add('body-hidden');
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
    document.querySelector('body').classList.remove('body-hidden');
    passwordInput.value = '';
    loginInput.value = '';
    passwordCheckbox.checked = false;
    passwordInput.type = 'password';
  };
})();

'use strict';

(function () {
  var firstSlider = new Swiper('.slider__container', {
    init: false,
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,

    pagination: {
      el: '.slider__pagination',
      clickable: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
  });
  firstSlider.init();

  var isActiveSwiper = false;
  var tabsPanels = document.querySelectorAll('.tabs__panel');
  var secondSlider;

  document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth < 1200 && !isActiveSwiper) {
      for (var i = 0; i < tabsPanels.length; i++) {
        tabsPanels[i].classList.add('swiper-slide');
      }
      secondSlider = new Swiper('.tabs__container', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.tabs__pagination',
          clickable: true,
          type: 'bullets'
        },
      });
      isActiveSwiper = true;
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth < 1200 && !isActiveSwiper) {
      for (var i = 0; i < tabsPanels.length; i++) {
        tabsPanels[i].classList.add('swiper-slide');
      }
      secondSlider = new Swiper('.tabs__container', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.tabs__pagination',
          clickable: true,
          type: 'bullets'
        },
      });
      isActiveSwiper = true;
    }

    if ((window.innerWidth >= 1200) && isActiveSwiper) {
      secondSlider.destroy(false);
      for (var r = 0; r < tabsPanels.length; r++) {
        tabsPanels[r].classList.remove('swiper-slide');
      }
      isActiveSwiper = false;
    }
  });
})();

'use strict';
(function () {
  var tabsLinks = document.querySelectorAll('.tabs__link');
  var tabsItems = document.querySelectorAll('.tabs__item');
  var anchorLinks = document.querySelectorAll('.anchor-link');
  var tabsPanels = document.querySelectorAll('.tabs__panel');

  for (var i = 0; i < tabsLinks.length; i++) {
    tabsLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      var hrefElement = document.querySelector(e.target.getAttribute('href'));
      for (var j = 0; j < tabsPanels.length; j++) {
        tabsPanels[j].classList.remove('tabs__panel_active');
        tabsPanels[j].classList.remove('in');
      }
      hrefElement.classList.add('tabs__panel_active');
      setTimeout(function () {
        hrefElement.classList.add('in');
      }, 150);
      for (var k = 0; k < tabsItems.length; k++) {
        tabsItems[k].classList.remove('tabs__item_active');
      }
      e.target.parentNode.classList.add('tabs__item_active');
    });
  }

  for (var n = 0; n < anchorLinks.length; n++) {
    anchorLinks[n].addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: document.querySelector(e.target.getAttribute('href')).offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    });
  }
})();

'use strict';

(function () {
  function renderCalcOffer(params) {
    params.payCreditField.innerHTML = params.payCredit;
    params.sumCreditField.innerHTML = params.sumCredit;
    params.percentageField.innerHTML = params.percentage;
    params.salaryField.innerHTML = params.salary;
  }

  function renderFormalizationRequest(params) {
    document.getElementById('request-initial').innerHTML = '';
    document.getElementById('request-initial').parentNode.querySelector('.calculator__request-currency').innerHTML = '';
    document.getElementById('request-goal').innerHTML = params.goal;
    document.getElementById('request-number').innerHTML = params.requestNumber;
    document.getElementById('request-price').parentNode.parentNode.querySelector('.calculator__descr').innerHTML = params.priceName;
    document.getElementById('request-price').innerHTML = params.price;
    document.getElementById('request-term').innerHTML = params.term;
    if (params.initial) {
      document.getElementById('request-initial').innerHTML = params.initial;
    }
  }

  window.viewCalc = {
    renderCalcOffer: renderCalcOffer,
    renderFormalizationRequest: renderFormalizationRequest
  };
})();
