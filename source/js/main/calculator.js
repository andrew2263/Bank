import { findInput, makeCount, decline } from './helper.js';
import { calculateSumCredit, calculatePayCredit, calculateSalary } from './calculateCreditParams.js';
import { renderCalcOffer, renderFormalizationRequest } from './viewCalc.js';
import { popupContainer, popupThanks, myStorage } from './popup.js';

const calculator = document.querySelector('.calculator');
const calculatorSelect = calculator.querySelector('.calculator__goal');
const calculatorSelectBlock = document.querySelector('.calculator__select');
const calculatorList = calculator.querySelector('.calculator__list');
const calculatorInput = calculator.querySelector('#calculator-select');
const calculatorLinks = calculator.querySelectorAll('.calculator__link');
const calculatorCredits = calculator.querySelectorAll('.calculator__credit');
const priceButtons = calculator.querySelectorAll('.calculator__price-button');
const initRangesBlock = calculator.querySelectorAll('.calculator__initial-range');
const termRangesBlock = calculator.querySelectorAll('.calculator__term-range');
const calculatorPrice = calculator.querySelectorAll('.calculator__price_range');
const calculatorInitial = calculator.querySelectorAll('.calculator__price_initial');
const calculatorTerm = calculator.querySelectorAll('.calculator__price_term');
const calculatorOffer = calculator.querySelector('.calculator__offer');
const calculatorOfferButton = calculator.querySelector('.calculator__offer-request');
const calculatorRequest = calculator.querySelector('.calculator__request');
const calculatorCheckboxGroup = calculator.querySelectorAll('.calculator__checkbox-group');
const calculatorForm = calculator.querySelector('#calculator-form');
let block;
let id;
let addRequest = false;
let calculatorInputPrice = [];
let calculatorInputInitial = [];
let calculatorInputTerm = [];
let initRanges = [];
let termRanges = [];
let calculatorCheckbox = [];
let requests = [];

calculatorInputPrice = findInput(calculatorPrice, calculatorInputPrice);
calculatorInputInitial = findInput(calculatorInitial, calculatorInputInitial);
calculatorInputTerm = findInput(calculatorTerm, calculatorInputTerm);
initRanges = findInput(initRangesBlock, initRanges);
termRanges = findInput(termRangesBlock, termRanges);
calculatorCheckbox = findInput(calculatorCheckboxGroup, calculatorCheckbox);

let requestNumber = makeCount();
let requestParams;

const onInputPrice = (input) => {
  if (input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial')) {
    let initial = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_initial').querySelector('input');
    let percent = input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').value;
    initial.value = parseInt((Number(input.value) * Number(percent / 100)), 10);
    let roubles = initial.parentNode.querySelector('.calculator__price-currency');
    decline(parseInt(initial.value, 10), roubles, 'money');
  }
};

const onChangePrice = (inputPrice) => {
  let value = parseInt(inputPrice.value, 10);
  if ((value < parseInt(inputPrice.dataset.min, 10)) || (value > parseInt(inputPrice.dataset.max, 10))) {
    inputPrice.parentNode.parentNode.classList.add('calculator__price_red');
    inputPrice.classList.add('calculator__price-input_red');
    inputPrice.value = 'Некорректное значение';
  }
  let roubles = inputPrice.parentNode.querySelector('.calculator__price-currency');
  decline(parseInt(inputPrice.value, 10), roubles, 'money');
  requestParams = calculateCredit(block, id);
};

const onChangeInitial = (input) => {
  let minPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').min, 10);
  let maxPercent = parseInt(input.parentNode.parentNode.parentNode.querySelector('.calculator__initial-range').querySelector('input').max, 10);
  let price = parseInt(input.parentNode.parentNode.parentNode.parentNode.querySelector('.calculator__price_range').querySelector('input').value, 10);
  if (parseInt(input.value, 10) < parseInt((price * minPercent / 100), 10)) {
    input.value = parseInt((price * minPercent / 100), 10);
  }
  if (parseInt(input.value, 10) > parseInt((price * maxPercent / 100), 10)) {
    input.value = parseInt((price * maxPercent / 100), 10);
  }
};

const onClickCalculatorLink = (calculatorLink) => {
  calculatorOffer.classList.remove('calculator__offer_active');
  calculatorRequest.classList.remove('calculator__request_active');
  calculator.querySelector('.calculator__message_mortgage').classList.remove('calculator__message_active');
  calculator.querySelector('.calculator__message_car').classList.remove('calculator__message_active');
  for (let j = 0; j < calculatorCredits.length; j++) {
    calculatorCredits[j].classList.remove('calculator__credit_active');
    calculatorCredits[j].classList.remove('in');
  }
  let href = calculatorLink.getAttribute('href').slice(1);
  block = document.getElementById(href);
  id = href;
  block.classList.add('calculator__credit_active');
  setTimeout(() => {
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

const onClickPriceButton = (priceButton) => {
  let price = priceButton.parentNode.querySelector('input');
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

const onInputInitRange = (initRange) => {
  let percent = (Number(initRange.value) / 100);
  let price = initRange.parentNode.parentNode.parentNode.querySelector('.calculator__price-wrapper').querySelector('input').value;
  let inputInit = initRange.parentNode.parentNode.querySelector('.calculator__price_initial').querySelector('input');
  inputInit.value = parseInt(price * percent, 10);
  initRange.parentNode.querySelector('.calculator__initial-percent').querySelector('p').innerHTML = initRange.value + '%';
  let roubles = inputInit.parentNode.querySelector('.calculator__price-currency');
  decline(parseInt(inputInit.value, 10), roubles, 'money');
  requestParams = calculateCredit(block, id);
};

const onInputTermRange = (termRange) => {
  let input = termRange.parentNode.parentNode.querySelector('.calculator__price_term').querySelector('input');
  input.value = termRange.value;
  let years = input.parentNode.querySelector('.calculator__price-years');
  decline(parseInt(input.value, 10), years, 'years');
  requestParams = calculateCredit(block, id);
};

const onFocusInputPrice = (inputPrice) => {
  if (inputPrice.parentNode.parentNode.classList.contains('calculator__price_red') &&
  inputPrice.classList.contains('calculator__price-input_red')) {
    inputPrice.parentNode.parentNode.classList.remove('calculator__price_red');
    inputPrice.classList.remove('calculator__price-input_red');
    inputPrice.value = (inputPrice.dataset.max - inputPrice.dataset.min) / 2;
    onInputPrice(inputPrice);
    requestParams = calculateCredit(block, id);
  }
};

const onInputInitial = (inputInitial) => {
  let roubles = inputInitial.parentNode.querySelector('.calculator__price-currency');
  decline(parseInt(inputInitial.value, 10), roubles, 'money');
  requestParams = calculateCredit(block, id);
};

const onInputTerm = (inputTerm) => {
  let min = parseInt(inputTerm.parentNode.parentNode.parentNode.querySelector('.calculator__term-range').querySelector('input').min, 10);
  let max = parseInt(inputTerm.parentNode.parentNode.parentNode.querySelector('.calculator__term-range').querySelector('input').max, 10);
  if (parseInt(inputTerm.value, 10) < min) {
    inputTerm.value = min;
  }
  if (parseInt(inputTerm.value, 10) > max) {
    inputTerm.value = max;
  }
  let years = inputTerm.parentNode.querySelector('.calculator__price-years');
  decline(parseInt(inputTerm.value, 10), years, 'years');
  requestParams = calculateCredit(block, id);
};

const calculateCredit = (paramsBlock, creditType) => {
  let sumCreditField = document.querySelector('.calculator__offer-sum');
  let payCreditField = document.querySelector('.calculator__offer-month');
  let percentageField = document.querySelector('.calculator__offer-percent');
  let salaryField = document.querySelector('.calculator__offer-salary');
  let price = parseInt(paramsBlock.querySelector('.calculator__price_range').querySelector('input').value, 10);
  let initial;
  if (paramsBlock.querySelector('.calculator__price_initial')) {
    initial = parseInt(paramsBlock.querySelector('.calculator__price_initial').querySelector('input').value, 10);
  }
  let term = parseInt(paramsBlock.querySelector('.calculator__price_term').querySelector('input').value, 10);

  calculatorOffer.classList.remove('calculator__offer_active');
  calculatorRequest.classList.remove('calculator__request_active');
  calculator.querySelector('.calculator__message_mortgage').classList.remove('calculator__message_active');
  calculator.querySelector('.calculator__message_car').classList.remove('calculator__message_active');

  let calcOfferParams = {};
  let calcSum = calculateSumCredit(price, initial, creditType);
  calcOfferParams.sumCredit = calcSum.sumCredit;
  calcOfferParams.percentage = calcSum.percentage;

  let isSumCredit = false;

  switch (creditType) {
    case 'mortgage':
      if (calcOfferParams.sumCredit >= 150000) {
        isSumCredit = true;
      }
      break;
    case 'car':
      if (calcOfferParams.sumCredit >= 70000) {
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
    calculatePayCredit(calcOfferParams.percentage,
        calcOfferParams.sumCredit,
        term);
  calcOfferParams.salary =
    calculateSalary(calcOfferParams.payCredit);
  calcOfferParams.payCreditField = payCreditField;
  calcOfferParams.sumCreditField = sumCreditField;
  calcOfferParams.percentageField = percentageField;
  calcOfferParams.salaryField = salaryField;

  if (isSumCredit) {
    renderCalcOffer(calcOfferParams);
    decline(calcOfferParams.payCredit, payCreditField.parentNode.querySelector('.calculator__offer-currency'), 'money');
    decline(calcOfferParams.sumCredit, sumCreditField.parentNode.querySelector('.calculator__offer-currency'), 'money');
    decline(calcOfferParams.salary, salaryField.parentNode.querySelector('.calculator__offer-currency'), 'money');
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

calculatorSelect.addEventListener('click', (e) => {
  e.preventDefault();
  calculatorSelect.classList.toggle('calculator__goal_expanded');
  calculatorList.classList.toggle('calculator__list_expanded');
});

calculatorLinks.forEach((calculatorLink) => {
  calculatorLink.addEventListener('click', (e) => {
    e.preventDefault();
    onClickCalculatorLink(e.target);
  });
});

priceButtons.forEach((priceButton) => {
  priceButton.addEventListener('click', (e) => {
    e.preventDefault();
    onClickPriceButton(e.target);
  });
});

initRanges.forEach((initRange) => {
  initRange.addEventListener('input', (e) => {
    onInputInitRange(e.target);
  });
});

termRanges.forEach((termRange) => {
  termRange.addEventListener('input', (e) => {
    onInputTermRange(e.target);
  });
});

calculatorInputPrice.forEach((price) => {
  price.addEventListener('input', (e) => {
    onInputPrice(e.target);
  });
  price.addEventListener('change', (e) => {
    onChangePrice(e.target);
  });
  price.addEventListener('focus', (e) => {
    onFocusInputPrice(e.target);
  });
});

calculatorInputInitial.forEach((input) => {
  input.addEventListener('change', (e) => {
    onChangeInitial(e.target);
    onInputInitial(e.target);
  });
});

calculatorInputTerm.forEach((input) => {
  input.addEventListener('change', (e) => {
    onInputTerm(e.target);
  });
});

calculatorCheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    requestParams = calculateCredit(block, id);
  });
});

calculatorOfferButton.addEventListener('click', (e) => {
  e.preventDefault();
  let newRequestNumber = requestNumber(addRequest);
  let newRequestNumberLength = newRequestNumber.toString().length;
  let newRequestNumberString = '';
  if (newRequestNumberLength < 4) {
    let f = 4 - newRequestNumberLength;
    while (f !== 0) {
      newRequestNumberString += '0';
      f--;
    }
  }
  newRequestNumberString += newRequestNumber.toString();
  calculatorRequest.classList.add('calculator__request_active');
  requestParams.requestNumber = newRequestNumberString;
  renderFormalizationRequest(requestParams);
  decline(requestParams.price, document.getElementById('request-price').parentNode.querySelector('.calculator__request-currency'), 'money');
  if (requestParams.initial) {
    decline(requestParams.initial, document.getElementById('request-initial').parentNode.querySelector('.calculator__request-currency'), 'money');
  }
  decline(requestParams.term, document.getElementById('request-term').parentNode.querySelector('.calculator__request-years'), 'years');
  window.scrollTo({
    top: calculator.offsetTop + calculatorRequest.offsetTop,
    left: 0,
    behavior: 'smooth'
  });
});

calculatorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addRequest = true;
  requestNumber(addRequest);
  calculatorRequest.classList.remove('calculator__request_active');
  calculatorOffer.classList.remove('calculator__offer_active');
  addRequest = false;
  let request = {
    'name': document.getElementById('request-name').value,
    'email': document.getElementById('request-email').value,
    'tel': document.getElementById('request-tel').value
  };
  if (requests.length === 0 && myStorage.getItem('requests')) {
    for (let l = 0; l < JSON.parse(myStorage.getItem('requests')).length; l++) {
      requests.push(JSON.parse(myStorage.getItem('requests'))[l]);
    }
  }
  requests.push(request);
  myStorage.setItem('requests', JSON.stringify(requests));
  popupContainer.classList.add('popup-container_active');
  popupThanks.classList.add('popup__thanks_active');
  document.querySelector('body').classList.add('body-hidden');
  let inputs = e.target.querySelectorAll('input');
  inputs.forEach((inp) => {
    if (inp.type !== 'submit') {
      inp.value = '';
    }
  });
});
