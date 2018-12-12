import React from 'react';
import styled from 'styled-components';
import { FormattedNumber } from 'react-formatted';

import { offerKinds } from 'cem/constants/properties/dictionaries'; // TODO: fix
import UI from 'site/ui';

const { Grid: { Container } } = UI;

const Header = styled.div`
  background-color: #fff;
  padding: 1rem 0;

  @media screen and (min-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 1.8rem;

  @media screen and (min-width: 768px) {
    font-size: 2.4rem;
  }
`;

const pluralizedKinds = {
  flat: 'квартиры',
  apartment: 'апартаментов',
  house: 'дома',
  townhouse: 'таунхауса',
  penthouse: 'пентхауса',
  land: 'участка',
};

export default ({ data, dealType }) => {
  const { location = {}, landDetails = {}, specification = {}, kind } = data;
  const isLand = kind === 'land';

  return (
    <Header>
      <Container>
        <Title>
          {offerKinds[dealType]} {pluralizedKinds[kind]} в посёлке {location.settlementName},{' '}
          {isLand && (
            <span>
              <FormattedNumber value={Math.floor(landDetails.area)} />&nbsp;сот
            </span>
          )}
          {!isLand && (
            <span>
              <FormattedNumber value={Math.floor(specification.area)} />&nbsp;м²
            </span>
          )}
        </Title>
      </Container>
    </Header>
  );
};
