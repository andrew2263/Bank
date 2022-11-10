const firstSlider = new Swiper('.slider__container', {
  init: false,
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
firstSlider.init();

let isActiveSwiper = false;
const tabsPanels = document.querySelectorAll('.tabs__panel');
let secondSlider;

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 1200 && !isActiveSwiper) {
    tabsPanels.forEach((tabsPanel) => {
      tabsPanel.classList.add('swiper-slide');
    });
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

window.addEventListener('resize', () => {
  if (window.innerWidth < 1200 && !isActiveSwiper) {
    tabsPanels.forEach((tabsPanel) => {
      tabsPanel.classList.add('swiper-slide');
    });
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
    tabsPanels.forEach((tabsPanel) => {
      tabsPanel.classList.remove('swiper-slide');
    });
    isActiveSwiper = false;
  }
});
