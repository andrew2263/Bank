const calculateSumCredit = (price, initial, creditType) => {
  let sumCredit = 0;
  let percentage = 0;
  let casco = document.getElementById('calculator-checkbox-casco');
  let insurance = document.getElementById('calculator-checkbox-lifesafe');
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

const calculatePayCredit = (percentage, sumCredit, term) => {
  let percentageMonth = (percentage / 100) / 12;
  let termMonth = term * 12;
  let payCredit = parseInt((sumCredit * (percentageMonth + (percentageMonth / (Math.pow((1 + percentageMonth), termMonth) - 1)))), 10);
  return payCredit;
}

const calculateSalary = (payCredit) => {
  let salary = parseInt((payCredit / 0.45), 10);
  return salary;
}

export { calculateSumCredit, calculatePayCredit, calculateSalary };
