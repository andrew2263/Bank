'use strict';
(function () {
  var tabsLinks = document.querySelectorAll('.tabs__link');
  var tabsItems = document.querySelectorAll('.tabs__item');
  var anchorLinks = document.querySelectorAll('.anchor-link');

  for (var i = 0; i < tabsLinks.length; i++) {
    tabsLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      var hrefElement = document.querySelector(e.target.getAttribute('href'));
      var tabsPanels = document.querySelectorAll('.tabs__panel');
      for (var j = 0; j < tabsPanels.length; j++) {
        tabsPanels[j].classList.remove('tabs__panel_active');
        tabsPanels[j].classList.remove('in');
      }
      hrefElement.classList.add('tabs__panel_active');
      setTimeout(function () {
        hrefElement.classList.add('in');
      }, 150);
      for (var k = 0; k < tabsItems.length; k++) {
        tabsItems[k].classList.remove('tabs__item_active');
      }
      e.target.parentNode.classList.add('tabs__item_active');
    });
  }

  for (var n = 0; n < anchorLinks.length; n++) {
    anchorLinks[n].addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: document.querySelector(e.target.getAttribute('href')).offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    });
  }
})();