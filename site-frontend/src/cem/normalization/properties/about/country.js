import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString, normalizeYear } = normalizers;

export default {
  'specification.builtYear': normalizeYear({ isLimitedToPast: true }),
  'specification.floors': normalizeNumber,
  'specification.area': normalizeNumber,
  'specification.bedrooms': normalizeNumber,
  'specification.balconies': normalizeNumber,
  'specification.loggias': normalizeNumber,
  'specification.ceilingHeight': normalizeNumber,
  'specification.elevators': normalizeNumber,
  'specification.rooms': normalizeNumber,
  'specification.wcs': normalizeNumber,
  'specification.layouts.wine_room': normalizeNumber,
  'specification.layouts.dressing_room': normalizeNumber,
  'specification.layouts.living_room': normalizeNumber,
  'specification.layouts.childrens_room': normalizeNumber,
  'specification.layouts.movie_theater': normalizeNumber,
  'specification.layouts.winter_garden': normalizeNumber,
  'specification.layouts.game_room': normalizeNumber,
  'specification.layouts.office': normalizeNumber,
  'specification.layouts.storage': normalizeNumber,
  'specification.layouts.kitchen': normalizeNumber,
  'specification.layouts.staff_room': normalizeNumber,
  'specification.layouts.working_kitchen': normalizeNumber,
  'specification.layouts.spa_zone': normalizeNumber,
  'specification.layouts.dining_room': normalizeNumber,
  'specification.layouts.technical_room': normalizeNumber,
  'specification.layouts.gym': normalizeNumber,
  'specification.layouts.utility_room': normalizeNumber,
  'specification.layouts.loft': normalizeNumber,

  'landDetails.area': normalizeNumber,

  'additionalDetails.guestHouseArea': normalizeNumber,
  'additionalDetails.securityHouseArea': normalizeNumber,
  'additionalDetails.staffHouseArea': normalizeNumber,
  'additionalDetails.spaArea': normalizeNumber,
  'additionalDetails.bathhouseArea': normalizeNumber,
  'additionalDetails.garageArea': normalizeNumber,
  'additionalDetails.parkingArea': normalizeNumber,

  'communication.powerSupply': normalizeNumber,

  'location.street': normalizeString,
  'location.house': normalizeString,
};
