var myHeaders = new Headers();
const BUY = 0.985;
const SELL = 1.015;
myHeaders.append("apikey", "tzJZhovsv9IlRpzzzZAuKFrDbMdEBM8m");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const buyCurrency = (currencyRate, trType) => {
  let price = (currencyRate * trType).toFixed(2);
  console.log(price)
}

const getCurrencyRate = (currency, onSuccess, onError) => {
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=MDL&from=${currency}&amount=1`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((result) => {
      console.log(JSON.parse(result).result)
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
  buyCurrency(data, BUY);
  buyCurrency(data, SELL);
}, alert);

getCurrencyRate('USD', (data) => {
  buyCurrency(data, BUY);
  buyCurrency(data, SELL);
}, alert);

getCurrencyRate('RON', (data) => {
  buyCurrency(data, BUY);
  buyCurrency(data, SELL);
}, alert);

getCurrencyRate('UAH', (data) => {
  buyCurrency(data, BUY);
  buyCurrency(data, SELL);
}, alert);

getCurrencyRate('RUB', (data) => {
  buyCurrency(data, BUY);
  buyCurrency(data, SELL);
}, alert);

