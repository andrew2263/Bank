"use strict";!function(){var e,r,t=document.querySelector(".calculator"),a=t.querySelector(".calculator__goal"),c=document.querySelector(".calculator__select"),l=t.querySelector(".calculator__list"),o=t.querySelector("#calculator-select"),n=t.querySelectorAll(".calculator__link"),u=t.querySelectorAll(".calculator__credit"),s=t.querySelectorAll(".calculator__price-button"),i=t.querySelectorAll(".calculator__initial-range"),_=t.querySelectorAll(".calculator__term-range"),d=t.querySelectorAll(".calculator__price_range"),p=t.querySelectorAll(".calculator__price_initial"),m=t.querySelectorAll(".calculator__price_term"),v=t.querySelector(".calculator__offer"),y=t.querySelector(".calculator__offer-request"),q=t.querySelector(".calculator__request"),g=t.querySelectorAll(".calculator__checkbox-group"),f=!1,S=t.querySelector("#calculator-form"),N=localStorage,L=[],I=[],h=[],b=[],E=[],k=[],T=[],B=function(e,r){for(var t=0;t<e.length;t++)for(var a=e[t].querySelectorAll("input"),c=0;c<a.length;c++)r.push(a[c]);return r};L=B(d,L),I=B(p,I),h=B(m,h),b=B(i,b),E=B(_,E),k=B(g,k);var M,H,x=(M=1,function(){return f?++M:M}),A=function(e){if(e.parentNode.parentNode.parentNode.parentNode.querySelector(".calculator__price_initial")){var r=e.parentNode.parentNode.parentNode.parentNode.querySelector(".calculator__price_initial").querySelector("input"),t=e.parentNode.parentNode.parentNode.parentNode.querySelector(".calculator__initial-range").querySelector("input").value;r.value=parseInt(Number(e.value)*Number(t/100),10);var a=r.parentNode.querySelector(".calculator__price-currency");C(parseInt(r.value,10),a,"roubles")}},w=function(t){var a=parseInt(t.value,10);(a<parseInt(t.dataset.min,10)||a>parseInt(t.dataset.max,10))&&(t.parentNode.parentNode.classList.add("calculator__price_red"),t.classList.add("calculator__price-input_red"),t.value="Некорректное значение");var c=t.parentNode.querySelector(".calculator__price-currency");C(parseInt(t.value,10),c,"roubles"),H=z(e,r)},D=function(n){v.classList.remove("calculator__offer_active"),q.classList.remove("calculator__request_active"),t.querySelector(".calculator__message_mortgage").classList.remove("calculator__message_active"),t.querySelector(".calculator__message_car").classList.remove("calculator__message_active");for(var s=0;s<u.length;s++)u[s].classList.remove("calculator__credit_active"),u[s].classList.remove("in");var i=n.getAttribute("href").slice(1);e=document.getElementById(i),r=i,e.classList.add("calculator__credit_active"),setTimeout(function(){e.classList.add("in")},150),a.classList.remove("calculator__goal_expanded"),l.classList.remove("calculator__list_expanded"),a.innerHTML=n.innerHTML,o.value=n.innerHTML,v.querySelector(".calculator__offer-text_credit").querySelector("p").innerHTML=n.dataset.sumcredit,c.classList.add("calculator__select_active"),v.classList.add("calculator__offer_active"),H=z(e,r)},J=function(t){var a=Number(t.value)/100,c=t.parentNode.parentNode.parentNode.querySelector(".calculator__price-wrapper").querySelector("input").value,l=t.parentNode.parentNode.querySelector(".calculator__price_initial").querySelector("input");l.value=parseInt(c*a,10),t.parentNode.querySelector(".calcualor__initial-percent").querySelector("p").innerHTML=t.value+"%";var o=l.parentNode.querySelector(".calculator__price-currency");C(parseInt(l.value,10),o,"roubles"),H=z(e,r)},O=function(t){var a=t.parentNode.parentNode.querySelector(".calculator__price_term").querySelector("input");a.value=t.value;var c=a.parentNode.querySelector(".calculator__price-years");C(parseInt(a.value,10),c,"years"),H=z(e,r)},j=function(t){var a=parseInt(t.parentNode.parentNode.parentNode.querySelector(".calculator__term-range").querySelector("input").min,10),c=parseInt(t.parentNode.parentNode.parentNode.querySelector(".calculator__term-range").querySelector("input").max,10);parseInt(t.value,10)<a&&(t.value=a),parseInt(t.value,10)>c&&(t.value=c);var l=t.parentNode.querySelector(".calculator__price-years");C(parseInt(t.value,10),l,"years"),H=z(e,r)},z=function(e,r){var a,c,l=v.querySelector(".calculator__offer-sum"),o=v.querySelector(".calculator__offer-month"),n=v.querySelector(".calculator__offer-percent"),u=v.querySelector(".calculator__offer-salary"),s=0,i=0,_=document.getElementById("calculator-checkbox-casco"),d=document.getElementById("calculator-checkbox-lifesafe"),p=parseInt(e.querySelector(".calculator__price_range").querySelector("input").value,10);if(e.querySelector(".calculator__price_initial"))var m=parseInt(e.querySelector(".calculator__price_initial").querySelector("input").value,10);var y=parseInt(e.querySelector(".calculator__price_term").querySelector("input").value,10);switch(v.classList.remove("calculator__offer_active"),q.classList.remove("calculator__request_active"),t.querySelector(".calculator__message_mortgage").classList.remove("calculator__message_active"),t.querySelector(".calculator__message_car").classList.remove("calculator__message_active"),r){case"mortgage":s=p-m,document.getElementById("calculator-checkbox-mortgage").checked&&(s-=document.getElementById("calculator-checkbox-mortgage").dataset.sum),parseInt(e.querySelector(".calculator__initial-range").querySelector("input").value,10)<15&&(i=9.4),parseInt(e.querySelector(".calculator__initial-range").querySelector("input").value,10)>=15&&(i=8.5);break;case"car":s=p-m,_.checked||d.checked||(p<2e6&&(i=16),p>=2e6&&(i=15)),(_.checked&&!d.checked||!_.checked&&d.checked)&&(i=8.5),_.checked&&d.checked&&(i=3.5);break;case"consumer":s=p,p<75e4&&(i=15),p>=75e4&&p<2e6&&(i=12.5),p>=2e6&&(i=9.5),document.getElementById("calculator-checkbox-salary").checked&&(i-=.5);break;default:s=p}var g=!1;switch(r){case"mortgage":s>=5e5&&(g=!0);break;case"car":s>=2e5&&(g=!0);break;case"consumer":g=!0;break;default:g=!1}if(!g)switch(r){case"mortgage":t.querySelector(".calculator__message_mortgage").classList.add("calculator__message_active");break;case"car":t.querySelector(".calculator__message_car").classList.add("calculator__message_active")}var f=i/100/12,S=12*y;return a=parseInt(s*(f+f/(Math.pow(1+f,S)-1)),10),c=parseInt(a/.45,10),g&&(o.innerHTML=a,l.innerHTML=s,n.innerHTML=i,u.innerHTML=c,C(a,o.parentNode.querySelector(".calculator__offer-currency"),"roubles"),C(s,l.parentNode.querySelector(".calculator__offer-currency"),"roubles"),C(c,u.parentNode.querySelector(".calculator__offer-currency"),"roubles"),v.classList.add("calculator__offer_active")),{goal:e.dataset.type,priceName:e.dataset.pricename,creditType:r,price:p,initial:m,term:y}},C=function(e,r,t){var a,c=e%100;switch(e%10){case 1:11!==c&&(a="a"),11===c&&(a="c");break;case 2:case 3:case 4:12!==c&&13!==c&&14!==c&&(a="b"),12!==c&&13!==c&&14!==c||(a="c");break;default:a="c"}switch(t){case"roubles":r.innerHTML={a:"рубль",b:"рубля",c:"рублей"}[a];break;case"years":r.innerHTML={a:"год",b:"года",c:"лет"}[a]}};a.addEventListener("click",function(e){e.preventDefault(),a.classList.toggle("calculator__goal_expanded"),l.classList.toggle("calculator__list_expanded")});for(var F=0;F<n.length;F++)n[F].addEventListener("click",function(e){e.preventDefault(),D(e.target)});for(var G=0;G<s.length;G++)s[G].addEventListener("click",function(t){var a,c;t.preventDefault(),a=t.target,c=a.parentNode.querySelector("input"),parseInt(Number(c.value)+Number(a.dataset.add),10)<c.dataset.min||parseInt(Number(c.value)+Number(a.dataset.add),10)>c.dataset.max||c.classList.contains("calculator__price-input_red")||(c.value=parseInt(Number(c.value)+Number(a.dataset.add),10),A(c),H=z(e,r)),c.classList.contains("calculator__price-input_red")&&(c.classList.remove("calculator__price-input_red"),c.parentNode.parentNode.classList.remove("calculator__price_red"),c.value=(c.dataset.max-c.dataset.min)/2,A(c),H=z(e,r))});for(var K=0;K<b.length;K++)b[K].addEventListener("input",function(e){J(e.target)});for(var P=0;P<E.length;P++)E[P].addEventListener("input",function(e){O(e.target)});for(var Q=0;Q<L.length;Q++)L[Q].addEventListener("input",function(e){A(e.target)}),L[Q].addEventListener("change",function(e){w(e.target)}),L[Q].addEventListener("focus",function(t){var a;(a=t.target).parentNode.parentNode.classList.contains("calculator__price_red")&&a.classList.contains("calculator__price-input_red")&&(a.parentNode.parentNode.classList.remove("calculator__price_red"),a.classList.remove("calculator__price-input_red"),a.value=(a.dataset.max-a.dataset.min)/2,A(a),H=z(e,r))});for(var R=0;R<I.length;R++)I[R].addEventListener("change",function(t){var a,c,l,o,n,u;a=t.target,c=parseInt(a.parentNode.parentNode.parentNode.querySelector(".calculator__initial-range").querySelector("input").min,10),l=parseInt(a.parentNode.parentNode.parentNode.querySelector(".calculator__initial-range").querySelector("input").max,10),o=parseInt(a.parentNode.parentNode.parentNode.parentNode.querySelector(".calculator__price_range").querySelector("input").value,10),parseInt(a.value,10)<parseInt(o*c/100,10)&&(a.value=parseInt(o*c/100,10)),parseInt(a.value,10)>parseInt(o*l/100,10)&&(a.value=parseInt(o*l/100,10)),n=t.target,u=n.parentNode.querySelector(".calculator__price-currency"),C(parseInt(n.value,10),u,"roubles"),H=z(e,r)});for(var U=0;U<h.length;U++)h[U].addEventListener("change",function(e){j(e.target)});for(var V=0;V<k.length;V++)k[V].addEventListener("change",function(){H=z(e,r)});y.addEventListener("click",function(e){e.preventDefault();var r=x(),a=r.toString().length,c="";if(a<4)for(var l=4-a;0!==l;)c+="0",l--;c+=r.toString(),document.getElementById("request-initial").innerHTML="",document.getElementById("request-initial").parentNode.querySelector(".calculator__request-currency").innerHTML="",q.classList.add("calculator__request_active"),document.getElementById("request-goal").innerHTML=H.goal,document.getElementById("request-number").innerHTML=c,document.getElementById("request-price").parentNode.parentNode.querySelector(".calculator__descr").innerHTML=H.priceName,document.getElementById("request-price").innerHTML=H.price,document.getElementById("request-price").innerHTML=H.price,C(H.price,document.getElementById("request-price").parentNode.querySelector(".calculator__request-currency"),"roubles"),H.initial&&(document.getElementById("request-initial").innerHTML=H.initial,C(H.initial,document.getElementById("request-initial").parentNode.querySelector(".calculator__request-currency"),"roubles")),document.getElementById("request-term").innerHTML=H.term,C(H.term,document.getElementById("request-term").parentNode.querySelector(".calculator__request-years"),"years"),window.scrollTo({top:t.offsetTop+q.offsetTop,left:0,behavior:"smooth"})}),S.addEventListener("submit",function(e){e.preventDefault(),f=!0,x(),q.classList.remove("calculator__request_active"),v.classList.remove("calculator__offer_active"),f=!1;var r={name:document.getElementById("request-name").value,email:document.getElementById("request-email").value,tel:document.getElementById("request-tel").value};if(0===T.length&&N.getItem("requests"))for(var t=0;t<JSON.parse(N.getItem("requests")).length;t++)T.push(JSON.parse(N.getItem("requests"))[t]);T.push(r),N.setItem("requests",JSON.stringify(T))})}();