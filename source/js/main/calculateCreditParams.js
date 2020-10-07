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
