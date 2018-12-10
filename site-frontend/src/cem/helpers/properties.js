import { floorsDescription } from 'cem/constants/properties/options';

export const extractSettlementAddress = (settlement) => {
  const route = settlement.location.routeName ? settlement.location.routeName : undefined;
  return [settlement.location.regionName, settlement.location.districtName, route, settlement.location.localityName, settlement.name].filter(Boolean).join(', ');
};

export const mapToFloor = (kind, number) => (
  floorsDescription.filter(item => item.kind === kind && item.number === number)[0]
);
