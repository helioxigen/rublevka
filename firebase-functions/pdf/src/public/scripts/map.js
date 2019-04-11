ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    'map',
    {
      center: [latitude, longitude],
      zoom: 16,
      controls: [],
    },
    {
      searchControlProvider: 'yandex#search',
    },
  );

  myMap.geoObjects.add(new ymaps.Placemark([latitude, longitude]));
}
