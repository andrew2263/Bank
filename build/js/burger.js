'use strict';
(function () {
  var headerNavContainer = document.querySelector('.header__nav-container');
  var headerBurger = document.querySelector('.header__burger');
  var headerClose = document.querySelector('.header__close');
  var header = document.querySelector('.header');

  headerBurger.addEventListener('click', function (e) {
    e.preventDefault();
    headerNavContainer.style.display = 'block';
    headerBurger.style.display = 'none';
    headerClose.style.display = 'inline-block';
    header.classList.add('header_fixed');
    body.style.overflowY = 'hidden';
  });

  headerClose.addEventListener('click', function (e) {
    e.preventDefault();
    headerNavContainer.style.display = 'none';
    headerBurger.style.display = 'block';
    headerClose.style.display = 'none';
    header.classList.remove('header_fixed');
    body.style.overflowY = 'auto';
  });

  window.addEventListener('resize', function () {
    if ((window.innerWidth > 767) && (headerBurger.style.display === 'block')) {
      headerBurger.style.display = 'none';
      headerNavContainer.style.display = 'block';
    }

    if ((window.innerWidth < 767) && (headerNavContainer.style.display === 'block') && (headerClose.style.display === 'none')) {
      headerBurger.style.display = 'block';
      headerNavContainer.style.display = 'none';
    }

    if ((window.innerWidth > 767) && (headerClose.style.display === 'inline-block')) {
      headerClose.style.display = 'none';
      header.classList.remove('header_fixed');
      body.style.overflowY = 'auto';
    }
  });
})();