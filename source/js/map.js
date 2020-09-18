ymaps.ready(function () {
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
            balloonContent: 'ул. Восстания, 28'
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
            iconImageOffset: [-18, -40],
            country: 'russia'
        }),

        myPlacemarkMsk = new ymaps.Placemark([55.762502, 37.644414], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Москва, Чистопрудный бульвар, 11с2'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'russia'
        }),

        myPlacemarkSaratov = new ymaps.Placemark([51.535730, 46.032415], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Саратов, ул. имени А.М. Горького, 57'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'russia'
        }),
        
        myPlacemarkVyatka = new ymaps.Placemark([58.593955, 49.659345], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Вятка, ул. Воровского, 75А'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'russia'
        }),
        
        myPlacemarkTyumen = new ymaps.Placemark([57.154068, 65.538855], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Тюмень, ул. Республики, 45'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'russia'
        }),
        
        myPlacemarkOmsk = new ymaps.Placemark([54.994011, 73.373045], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Омск, ул. Герцена, 18'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'russia'
        }),
        
        myPlacemarkBaku = new ymaps.Placemark([40.382056, 49.848270], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Баку, ул. Шамиля Азизбекова, 211'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'CIS'
        }),
        
        myPlacemarkAlmaty = new ymaps.Placemark([43.242384, 76.940417], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Алматы, проспект Абая, 51'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'CIS'
        }),
        
        myPlacemarkTashkent = new ymaps.Placemark([41.308374, 69.270771], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Ташкент, ул. Ислама Каримова, 15'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'CIS'
        }),
        
        myPlacemarkMinsk = new ymaps.Placemark([53.902236, 27.549848], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Минск, ул. Немига, 5'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'CIS'
        }),
        
        myPlacemarkLondon = new ymaps.Placemark([51.500926, -0.107995], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'London, Waterloo Road, 157'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'europe'
        }),
        
        myPlacemarkRome = new ymaps.Placemark([41.910252, 12.497210], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Rome, Via Sicilia, 184'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'europe'
        }),
        
        myPlacemarkPrague = new ymaps.Placemark([50.084299, 14.427518], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Prague, Panská, 890/7'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'europe'
        }),
        
        myPlacemarkParis = new ymaps.Placemark([48.877903, 2.351655], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'Paris, Rue la Fayette'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/location.svg',
            iconImageSize: [35, 40],
            iconImageOffset: [-18, -40],
            country: 'europe'
        });

    myMap.geoObjects
        .add(myPlacemarkSpb)
        .add(myPlacemarkMsk)
        .add(myPlacemarkSaratov)
        .add(myPlacemarkVyatka)
        .add(myPlacemarkOmsk)
        .add(myPlacemarkTyumen)
        .add(myPlacemarkMinsk)
        .add(myPlacemarkAlmaty)
        .add(myPlacemarkBaku)
        .add(myPlacemarkTashkent)
        .add(myPlacemarkLondon)
        .add(myPlacemarkParis)
        .add(myPlacemarkPrague)
        .add(myPlacemarkRome);
});