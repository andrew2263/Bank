import { langArr } from "./lang.js";

const langSel = document.querySelector('.header__lang-sel');
const lngInput = document.querySelector('#language');
const langList = document.querySelector('.header__lang-list');
const langButtons = document.querySelectorAll('.header__lang-lang');
const allLang = ['ru', 'ro', 'en'];

langSel.addEventListener('click', (e) => {
  e.preventDefault();
  langSel.classList.toggle('header__lang-sel_expanded');
  langList.classList.toggle('header__lang-list_expanded');
});

langButtons.forEach((lngButton) => {
  lngButton.addEventListener('click', (e) => {
    e.preventDefault();
    onClickLngButton(e.target);
  });
});

const onClickLngButton = (button) => {
  changeURLLanguage(button);
};

const changeURLLanguage = (select) => {
  let lang = select.value;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
};

const changeLanguage = (select) => {
  let hash = window.location.hash;
  hash = hash.slice(1);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#ru';
    location.reload();
  }
  select.value = hash;
  select.textContent = hash.toUpperCase();
  for (let key in langArr) {
    let elements = document.querySelectorAll(`.lang__${ key }`);
    elements.forEach((element) => {
      element.textContent = langArr[key][hash];
    });
  }
};

changeLanguage(langSel);
