const findInput = (wrapper, collection) => {
  for (let i = 0; i < wrapper.length; i++) {
    let inputs = wrapper[i].querySelectorAll('input');
    for (let j = 0; j < inputs.length; j++) {
      collection.push(inputs[j]);
    }
  }
  return collection;
}
// decline — функция для определения падежа существительного в зависимости от числа
// например: 1 рубль, 2 рубля, 5 рублей; 1 год, 2 года, 6 лет и т.д.
// аргументы: value - число, word - поле, куда будет записано слово, type - год или рубль
// type может принимать значения 'roubles' или 'years'
const decline = (value, word, type, lang) => {
  if (!lang) {
    lang = "ru";
  }
  // падеж существительного определяется в зависимости от остатка от деления числа на 10
  let rest = value % 10;
  // т.к. 11, 12, 13, 14 - рублЕЙ, дополнительно проверяем остаток от деления числа на 100
  let restH = value % 100;
  let way;

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

  // объект с вариантами склонения слова "лей"
  let WAYS_MDL = {
    "ru": {
      "a": "лей",
      "b": "лея",
      "c": "леев"
    },
    "en": {
      "a": "MDL",
      "b": "MDL",
      "c": "MDL"
    },
    "ro": {
      "a": "MDL",
      "b": "MDL",
      "c": "MDL"
    }
  };

  let WAYS_YEARS = {
    "ru": {
      "a": "год",
      "b": "года",
      "c": "лет"
    },
    "en": {
      "a": "year",
      "b": "years",
      "c": "years"
    },
    "ro": {
      "a": "an",
      "b": "ani",
      "c": "ani"
    }
  };

  // указываем в поле word существительное в соответствующем падеже
  switch (type) {
    case 'money':
      word.innerHTML = WAYS_MDL[lang][way];
      break;
    case 'years':
      word.innerHTML = WAYS_YEARS[lang][way];
      break;
  }
};

const makeCount = () => {
  let count = 1;
  return (bool) => {
    if (bool) {
      return ++count;
    }
    return count;
  };
};

export { findInput, decline, makeCount };
