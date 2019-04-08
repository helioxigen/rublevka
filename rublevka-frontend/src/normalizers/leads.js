import normalizers from 'core/utils/normalizers';

const requestNormalizer = {
  'requestDetails.price.from': normalizers.normalizeNumber,
  'requestDetails.price.to': normalizers.normalizeNumber,
};

export default {
  leadsRequest: requestNormalizer,
};
