function parseAddress(location) {
  return (
    location.routeName +
    ' ш., ' +
    location.localityName +
    ', ' +
    location.mkadDistance +
    ' км.'
  );
}

const kinds = {
  flat: 'Квартира',
  apartment: 'Апартаменты',
  house: 'Дом',
  townhouse: 'Таунхаус',
  penthouse: 'Пентхаус',
  land: 'Участок',
  office: 'Офис',
};

const pluralizedKinds = {
  flat: 'квартиры',
  apartment: 'апартаментов',
  house: 'дома',
  townhouse: 'таунхауса',
  penthouse: 'пентхауса',
  land: 'участка',
};

module.exports = {
  parseAddress,
  kinds,
  pluralizedKinds,
};
