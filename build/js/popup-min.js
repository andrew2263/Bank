"use strict";!function(){var e=document.querySelector("#calculator-form"),t=document.querySelector(".popup-container"),o=document.querySelectorAll(".popup__close"),n=document.querySelector(".popup__thanks"),s=document.querySelector(".header__login"),r=document.querySelector(".popup__login"),a=document.getElementById("login"),c=document.getElementById("password"),u=document.getElementById("show-password"),d=document.querySelector("#popup-form"),p=localStorage,i=[];s.addEventListener("click",function(e){e.preventDefault(),t.classList.add("popup-container_active"),r.classList.add("popup__login_active"),document.querySelector("body").style.overflowY="hidden",a.focus()}),u.addEventListener("change",function(e){e.target.checked&&(c.type="text"),e.target.checked||(c.type="password")}),d.addEventListener("submit",function(e){e.preventDefault();var t=!1,o=a.value,n=document.getElementById("password").value;if(p.getItem("passwords")&&v(JSON.parse(p.getItem("passwords")),o,n)&&(t=!0),!p.getItem("passwords")&&v(i,o,n)&&(t=!0),!t&&""!==o&&""!==n){var s={login:o,password:n};if(0===i.length&&p.getItem("passwords"))for(var r=0;r<JSON.parse(p.getItem("passwords")).length;r++)i.push(JSON.parse(p.getItem("passwords"))[r]);i.push(s),p.setItem("passwords",JSON.stringify(i))}m()}),e.addEventListener("submit",function(e){e.preventDefault(),t.classList.add("popup-container_active"),n.classList.add("popup__thanks_active"),document.querySelector("body").style.overflowY="hidden";for(var o=e.target.querySelectorAll("input"),s=0;s<o.length;s++)"submit"!==o[s].type&&(o[s].value="")});for(var l=0;l<o.length;l++)o[l].addEventListener("click",function(){m()});var v=function(e,t,o){for(var n=0;n<e.length;n++)if(e[n].login===t&&e[n].password===o)return!0;return!1};document.addEventListener("keydown",function(e){t.classList.contains("popup-container_active")&&"Escape"===e.code&&m()}),t.addEventListener("click",function(e){e.target===t&&m()});var m=function(){t.classList.remove("popup-container_active"),r.classList.remove("popup__login_active"),n.classList.remove("popup__thanks_active"),document.querySelector("body").style.overflowY="auto",c.value="",a.value="",u.checked=!1,c.type="password"}}();