"use strict";!function(){new Swiper(".slider__container",{direction:"horizontal",loop:!0,slidesPerView:1,pagination:{el:".slider__pagination",clickable:!0},autoplay:{delay:4e3,disableOnInteraction:!1}});var i,e=!1,n=document.querySelectorAll(".tabs__panel");document.addEventListener("DOMContentLoaded",function(){if(window.innerWidth<1200&&!e){for(var t=0;t<n.length;t++)n[t].classList.add("swiper-slide");i=new Swiper(".tabs__container",{direction:"horizontal",loop:!0,slidesPerView:1,pagination:{el:".tabs__pagination",clickable:!0,type:"bullets"}}),e=!0}}),window.addEventListener("resize",function(){if(window.innerWidth<1200&&!e){for(var t=0;t<n.length;t++)n[t].classList.add("swiper-slide");i=new Swiper(".tabs__container",{direction:"horizontal",loop:!0,slidesPerView:1,pagination:{el:".tabs__pagination",clickable:!0,type:"bullets"}}),e=!0}if(window.innerWidth>=1200&&e&&void 0!==i){i.destroy(!1),i=void 0;for(var o=0;o<n.length;o++)n[o].classList.remove("swiper-slide");e=!1;for(var a=0;a<n.length;a++)n[a].style.width="100%"}})}();