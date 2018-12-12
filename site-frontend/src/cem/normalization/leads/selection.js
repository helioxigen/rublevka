import normalizers from 'core/utils/normalizers';
import common from './common';
const { normalizeNumber } = normalizers;

export default {
  ...common,
  'requestDetails.price.from': normalizeNumber,
  'requestDetails.price.to': normalizeNumber,
  'requestDetails.countryProperty.area.from': normalizeNumber,
  'requestDetails.countryProperty.area.to': normalizeNumber,
  'requestDetails.countryProperty.bedrooms.from': normalizeNumber,
  'requestDetails.countryProperty.bedrooms.to': normalizeNumber,
  'requestDetails.countryProperty.landArea.from': normalizeNumber,
  'requestDetails.countryProperty.landArea.to': normalizeNumber,
  'requestDetails.countryProperty.location.mkadDistance.from': normalizeNumber,
  'requestDetails.countryProperty.location.mkadDistance.to': normalizeNumber,
  'requestDetails.cityProperty.area.from': normalizeNumber,
  'requestDetails.cityProperty.area.to': normalizeNumber,
  'requestDetails.cityProperty.livingArea.from': normalizeNumber,
  'requestDetails.cityProperty.livingArea.to': normalizeNumber,
  'requestDetails.cityProperty.rooms.from': normalizeNumber,
  'requestDetails.cityProperty.rooms.to': normalizeNumber,
};
