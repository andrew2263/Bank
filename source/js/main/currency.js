const myHeaders = new Headers();
const BUY = 0.985;
const SELL = 1.015;
myHeaders.append("apikey", "tzJZhovsv9IlRpzzzZAuKFrDbMdEBM8m");

const usdMdl = document.querySelector('#usd-mdl');
const eurMdl = document.querySelector('#eur-mdl');
const ronMdl = document.querySelector('#ron-mdl');
const uahMdl = document.querySelector('#uah-mdl');

const mdlUsd = document.querySelector('#mdl-usd');
const mdlEur = document.querySelector('#mdl-eur');
const mdlRon = document.querySelector('#mdl-ron');
const mdlUah = document.querySelector('#mdl-uah');

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const buyCurrency = (currencyRate, trType, element) => {
  let price = (currencyRate * trType).toFixed(2);
  element.textContent = price;
}

const getCurrencyRate = (currency, onSuccess, onError) => {
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=MDL&from=${currency}&amount=1`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((result) => {
      return JSON.parse(result).result;
    })
    .then((data) => {
      onSuccess(data)
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
