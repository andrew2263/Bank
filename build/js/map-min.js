"use strict";ymaps.ready(function(){var e=document.getElementById("offices-russia"),n=document.getElementById("offices-sng"),o=document.getElementById("offices-europe"),a=new ymaps.Map("map",{center:[56.895667,60.552225],zoom:5.4},{searchControlProvider:"yandex#search"}),t=new ymaps.Placemark([59.939847,30.360286],{hintContent:"Собственный значок метки",balloonContent:"ул. Восстания, 28",country:"russia"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),i=new ymaps.Placemark([55.762502,37.644414],{hintContent:"Собственный значок метки с контентом",balloonContent:"Москва, Чистопрудный бульвар, 11с2",country:"russia"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),c=new ymaps.Placemark([51.53573,46.032415],{hintContent:"Собственный значок метки с контентом",balloonContent:"Саратов, ул. имени А.М. Горького, 57",country:"russia"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),m=new ymaps.Placemark([58.593955,49.659345],{hintContent:"Собственный значок метки с контентом",balloonContent:"Вятка, ул. Воровского, 75А",country:"russia"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),g=new ymaps.Placemark([57.154068,65.538855],{hintContent:"Собственный значок метки с контентом",balloonContent:"Тюмень, ул. Республики, 45",country:"russia"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),l=new ymaps.Placemark([54.994011,73.373045],{hintContent:"Собственный значок метки с контентом",balloonContent:"Омск, ул. Герцена, 18",country:"russia"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),s=new ymaps.Placemark([40.382056,49.84827],{hintContent:"Собственный значок метки с контентом",balloonContent:"Баку, ул. Шамиля Азизбекова, 211",country:"CIS"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),r=new ymaps.Placemark([43.242384,76.940417],{hintContent:"Собственный значок метки с контентом",balloonContent:"Алматы, проспект Абая, 51",country:"CIS"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),d=new ymaps.Placemark([41.308374,69.270771],{hintContent:"Собственный значок метки с контентом",balloonContent:"Ташкент, ул. Ислама Каримова, 15",country:"CIS"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),f=new ymaps.Placemark([53.902236,27.549848],{hintContent:"Собственный значок метки с контентом",balloonContent:"Минск, ул. Немига, 5",country:"CIS"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),u=new ymaps.Placemark([51.500926,-.107995],{hintContent:"Собственный значок метки с контентом",balloonContent:"London, Waterloo Road, 157",country:"europe"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),y=new ymaps.Placemark([41.910252,12.49721],{hintContent:"Собственный значок метки с контентом",balloonContent:"Rome, Via Sicilia, 184",country:"europe"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),I=new ymaps.Placemark([50.084299,14.427518],{hintContent:"Собственный значок метки с контентом",balloonContent:"Prague, Panská, 890/7",country:"europe"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),C=new ymaps.Placemark([48.877903,2.351655],{hintContent:"Собственный значок метки с контентом",balloonContent:"Paris, Rue la Fayette",country:"europe"},{iconLayout:"default#image",iconImageHref:"img/location.svg",iconImageSize:[35,40],iconImageOffset:[-18,-40]}),p=new ymaps.GeoObjectCollection;p.add(t),p.add(i),p.add(c),p.add(m),p.add(l),p.add(g);var v=new ymaps.GeoObjectCollection;v.add(f),v.add(s),v.add(d),v.add(r);var b=new ymaps.GeoObjectCollection;b.add(u),b.add(C),b.add(I),b.add(y),a.geoObjects.add(p),a.geoObjects.add(b),a.geoObjects.add(v),e.checked||a.geoObjects.remove(p),n.checked||a.geoObjects.remove(v),o.checked||a.geoObjects.remove(b),e.addEventListener("change",function(e){O(e.target,a,p)}),n.addEventListener("change",function(e){O(e.target,a,v)}),o.addEventListener("change",function(e){O(e.target,a,b)});var O=function(e,n,o){e.checked&&n.geoObjects.add(o),e.checked||n.geoObjects.remove(o)}});