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

for (let i = 0; i < langButtons.length; i++) {

}

langButtons.forEach((lngButton) => {
  lngButton.addEventListener('click', (e) => {
    e.preventDefault();
    onClickLngButton(e.target);
  });
});

const onClickLngButton = (button) => {
  changeURLLanguage(button);
  /*langSel.value = button.value;
  langSel.textContent = button.value.toUpperCase();*/
};

const changeURLLanguage = (select) => {
  let lang = select.value;
  console.log(langSel.textContent);
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
    //console.log(document.querySelector(`.lang__${ key }`));
    let elements = document.querySelectorAll(`.lang__${ key }`);
    elements.forEach((element) => {
      element.textContent = langArr[key][hash];
    });
    //document.querySelector(`.lang__${ key }`).textContent = langArr[key][hash];
  }
};

changeLanguage(langSel);
