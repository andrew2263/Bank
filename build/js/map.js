'use strict';
ymaps.ready(function () {
  var checkboxRussia = document.getElementById('offices-russia');
  var checkboxCIS = document.getElementById('offices-sng');
  var checkboxEurope = document.getElementById('offices-europe');

  var myMap = new ymaps.Map('map', {
      center: [56.895667, 60.552225],
      zoom: 5.4
    }, {
      searchControlProvider: 'yandex#search'
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemarkSpb = new ymaps.Placemark([59.939847, 30.360286], {
      hintContent: 'Собственный значок метки',
      balloonContent: 'ул. Восстания, 28',
      country: 'russia'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: '../img/location.svg',
      // Размеры метки.
      iconImageSize: [35, 40],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkMsk = new ymaps.Placemark([55.762502, 37.644414], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Москва, Чистопрудный бульвар, 11с2',
      country: 'russia'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkSaratov = new ymaps.Placemark([51.535730, 46.032415], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Саратов, ул. имени А.М. Горького, 57',
      country: 'russia'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkVyatka = new ymaps.Placemark([58.593955, 49.659345], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Вятка, ул. Воровского, 75А',
      country: 'russia'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkTyumen = new ymaps.Placemark([57.154068, 65.538855], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Тюмень, ул. Республики, 45',
      country: 'russia'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkOmsk = new ymaps.Placemark([54.994011, 73.373045], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Омск, ул. Герцена, 18',
      country: 'russia'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkBaku = new ymaps.Placemark([40.382056, 49.848270], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Баку, ул. Шамиля Азизбекова, 211',
      country: 'CIS'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkAlmaty = new ymaps.Placemark([43.242384, 76.940417], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Алматы, проспект Абая, 51',
      country: 'CIS'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkTashkent = new ymaps.Placemark([41.308374, 69.270771], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Ташкент, ул. Ислама Каримова, 15',
      country: 'CIS'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkMinsk = new ymaps.Placemark([53.902236, 27.549848], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Минск, ул. Немига, 5',
      country: 'CIS'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkLondon = new ymaps.Placemark([51.500926, -0.107995], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'London, Waterloo Road, 157',
      country: 'europe'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkRome = new ymaps.Placemark([41.910252, 12.497210], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Rome, Via Sicilia, 184',
      country: 'europe'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkPrague = new ymaps.Placemark([50.084299, 14.427518], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Prague, Panská, 890/7',
      country: 'europe'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    }),

    myPlacemarkParis = new ymaps.Placemark([48.877903, 2.351655], {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'Paris, Rue la Fayette',
      country: 'europe'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [35, 40],
      iconImageOffset: [-18, -40]
    });

  var russiaGroup = new ymaps.GeoObjectCollection();
  russiaGroup.add(myPlacemarkSpb);
  russiaGroup.add(myPlacemarkMsk);
  russiaGroup.add(myPlacemarkSaratov);
  russiaGroup.add(myPlacemarkVyatka);
  russiaGroup.add(myPlacemarkOmsk);
  russiaGroup.add(myPlacemarkTyumen);

  var cisGroup = new ymaps.GeoObjectCollection();
  cisGroup.add(myPlacemarkMinsk);
  cisGroup.add(myPlacemarkBaku);
  cisGroup.add(myPlacemarkTashkent);
  cisGroup.add(myPlacemarkAlmaty);

  var europeGroup = new ymaps.GeoObjectCollection();
  europeGroup.add(myPlacemarkLondon);
  europeGroup.add(myPlacemarkParis);
  europeGroup.add(myPlacemarkPrague);
  europeGroup.add(myPlacemarkRome);

  myMap.geoObjects.add(russiaGroup);
  myMap.geoObjects.add(europeGroup);
  myMap.geoObjects.add(cisGroup);

  if (!checkboxRussia.checked) {
    myMap.geoObjects.remove(russiaGroup);
  }

  if (!checkboxCIS.checked) {
    myMap.geoObjects.remove(cisGroup);
  }

  if (!checkboxEurope.checked) {
    myMap.geoObjects.remove(europeGroup);
  }

  checkboxRussia.addEventListener('change', function (e) {
    if (e.target.checked) {
      myMap.geoObjects.add(russiaGroup);
    }
    if (!e.target.checked) {
      myMap.geoObjects.remove(russiaGroup);
    }
  });

  checkboxCIS.addEventListener('change', function (e) {
    if (e.target.checked) {
      myMap.geoObjects.add(cisGroup);
    }
    if (!e.target.checked) {
      myMap.geoObjects.remove(cisGroup);
    }
  });

  checkboxEurope.addEventListener('change', function (e) {
    if (e.target.checked) {
      myMap.geoObjects.add(europeGroup);
    }
    if (!e.target.checked) {
      myMap.geoObjects.remove(europeGroup);
    }
  });
});
