import upperCase from 'lodash/upperCase';

const events = [
  'complexesList.filter.opened',
  'complexesId.propertyCard.opened',
];

export default events.reduce((result, event) => ({ ...result, [upperCase(event).split(' ').join('_')]: event }), {});
