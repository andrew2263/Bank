const BUY = 0.99;
const SELL = 1.01;

const usdMdl = document.querySelector('#usd-mdl');
const eurMdl = document.querySelector('#eur-mdl');
const ronMdl = document.querySelector('#ron-mdl');
const uahMdl = document.querySelector('#uah-mdl');

const mdlUsd = document.querySelector('#mdl-usd');
const mdlEur = document.querySelector('#mdl-eur');
const mdlRon = document.querySelector('#mdl-ron');
const mdlUah = document.querySelector('#mdl-uah');

const buyCurrency = (currencyRate, trType, element) => {
  let price = (currencyRate * trType).toFixed(2);
  element.textContent = price;
};

const getCurrencyRate = (currency, onSuccess, onError) => {
  const headers = new Headers();
  headers.append("apikey", "tzJZhovsv9IlRpzzzZAuKFrDbMdEBM8m");

  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=MDL&from=${currency}&amount=1`,
  {
    method: 'GET',
    redirect: 'follow',
    headers
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      onSuccess(data.result)
    })
    .catch((error) => {
      onError(error)
    });
};

getCurrencyRate('EUR', (data) => {
  buyCurrency(data, BUY, eurMdl);
  buyCurrency(data, SELL, mdlEur);
}, console.log);

getCurrencyRate('USD', (data) => {
  buyCurrency(data, BUY, usdMdl);
  buyCurrency(data, SELL, mdlUsd);
}, console.log);

getCurrencyRate('RON', (data) => {
  buyCurrency(data, BUY, ronMdl);
  buyCurrency(data, SELL, mdlRon);
}, console.log);

getCurrencyRate('UAH', (data) => {
  buyCurrency(data, BUY, uahMdl);
  buyCurrency(data, SELL, mdlUah);
}, console.log);
