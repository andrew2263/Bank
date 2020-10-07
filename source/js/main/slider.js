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
  var tabsPanels = document.querySelectorAll('.tabs__panel');
  var secondSlider;

  document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth < 1200 && !isActiveSwiper) {
      for (var i = 0; i < tabsPanels.length; i++) {
        tabsPanels[i].classList.add('swiper-slide');
      }
      secondSlider = new Swiper('.tabs__container', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.tabs__pagination',
          clickable: true,
          type: 'bullets'
        },
      });
      isActiveSwiper = true;
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth < 1200 && !isActiveSwiper) {
      for (var i = 0; i < tabsPanels.length; i++) {
        tabsPanels[i].classList.add('swiper-slide');
      }
      secondSlider = new Swiper('.tabs__container', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.tabs__pagination',
          clickable: true,
          type: 'bullets'
        },
      });
      isActiveSwiper = true;
    }

    if ((window.innerWidth >= 1200) && isActiveSwiper) {
      secondSlider.destroy(false);
      for (var r = 0; r < tabsPanels.length; r++) {
        tabsPanels[r].classList.remove('swiper-slide');
      }
      isActiveSwiper = false;
    }
  });
})();
