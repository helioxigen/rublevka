export const RESET_FILTER = 'filter.reset';
export const RESET_SELECTED_FILTERS = 'filter.reset_selected';
export const UPDATE_FILTER = 'filter.update';

export const RESET_FILTER_NOT = 'filterNot.reset';
export const RESET_SELECTED_FILTERS_NOT = 'filterNot.reset_selected';
export const UPDATE_FILTER_NOT = 'filterNot.update';

export const defaults = {
  new: 'now-2w..',
  updatedPrice: '..0,0..',
  filterDropdownFields: {
    'location.mkadDistance': undefined,
    price: undefined,
    'specification.area': undefined,
    'landDetails.area': undefined,
    createdAt: undefined,
    'deals.priceDelta': undefined,
    'specification.renovate': undefined,
    'information.renovate': undefined,
    'specification.floor': undefined,
    'specification.totalArea': undefined,
    'specification.layout': undefined,
    id: undefined,
    subLocality: undefined,
    residentialComplex: undefined,
  },
  filterNotDropdownFields: {
    'information.furniture': undefined,
    equipment: undefined,
  },
};
