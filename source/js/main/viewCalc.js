const renderCalcOffer = (params) => {
  params.payCreditField.innerHTML = params.payCredit;
  params.sumCreditField.innerHTML = params.sumCredit;
  params.percentageField.innerHTML = params.percentage;
  params.salaryField.innerHTML = params.salary;
};

const renderFormalizationRequest = (params) => {
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
};

export { renderCalcOffer, renderFormalizationRequest };
