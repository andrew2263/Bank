'use strict';

(function () {
  var firstSlider = new Swiper('.slider__container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,

    pagination: {
      el: '.slider__pagination',
      clickable: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
  });

  var isActiveSwiper = false;

  var secondSlider = new Swiper('.tabs__container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    init: false,
    pagination: {
      el: '.tabs__pagination',
      clickable: true,
      type: 'bullets'
    },

    breakpoints: {
      320: {
        allowSlidePrev: true,
        allowSlideNext: true
      },
      1200: {
        allowSlidePrev: false,
        allowSlideNext: false
      },
    },
  });

  document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth < 1200) {
      secondSlider.init();
      isActiveSwiper = true;
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth < 1200 && !isActiveSwiper) {
      secondSlider.init();
      isActiveSwiper = true;
    }

    if (window.innerWidth >= 1200 && isActiveSwiper) {
      secondSlider.destroy(false);
      isActiveSwiper = false;
      var tabsPanels = document.querySelectorAll('.tabs__panel');
      for (var i = 0; i < tabsPanels.length; i++) {
        tabsPanels[i].style.width = '100%';
      }
    }
  });
})();
