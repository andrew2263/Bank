import { markers } from "./markers.js";

const map = L.map('map');
const layer = L.layerGroup().addTo(map);

const checkboxGroup = document.querySelector('.offices__checkbox-group').querySelectorAll('input[type=checkbox]');
const checkboxATM = document.querySelector('#offices-atm');
const checkboxCashin = document.querySelector('#offices-cashin');
const checkboxOffices = document.querySelector('#offices-offices');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const iconOffice = L.icon({
  iconUrl: 'img/location.svg',
  iconSize: [35, 40],
  iconAnchor: [20, 40],
});

const iconAtm = L.icon({
  iconUrl: 'img/locationBankomat.svg',
  iconSize: [30, 34],
  iconAnchor: [20, 40],
});

const createMarker = (marker, map, icon) => {
  const bankMarker = L.marker(
    {
      lat: marker.location.lat,
      lng: marker.location.lng,
    },
    {
      icon: icon,
    },
  );

  bankMarker
    .addTo(map)
    .bindPopup(marker.address);
};

const renderMarker = (marker) => {
  if (marker.features.isOffice) {
    createMarker(marker, layer, iconOffice);
  }
  if (!marker.features.isOffice) {
    createMarker(marker, layer, iconAtm);
  }
};

const getRank = (obj) => {
  let rank = 0;
  for (let checkbox of checkboxGroup) {
    if (obj.features && checkbox.checked) {
      for (let feature in obj.features) {
        if (obj.features[feature] === true && feature === checkbox.value) {
          rank +=1;
        }
      }
    }
  }
  obj.rank = rank;
  return rank;
};

const compareMarkers = (markerA, markerB) => {
  let rankA = getRank(markerA);
  let rankB = getRank(markerB);
  return rankB - rankA;
};

const addRemoveGroup = function () {
  layer.clearLayers();
  markers.sort(compareMarkers);
  let index;
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].rank === 0) {
      index = i;
      break;
    }
    index = i;
  }
  markers
    .slice(0, index)
    .forEach((marker) => renderMarker(marker));
};

map
  .on('load', addRemoveGroup)
  .setView([47.0158, 28.8456], 13);

for (let checkbox of checkboxGroup) {
  checkbox.addEventListener('change', () => {
    addRemoveGroup();
  });
}
