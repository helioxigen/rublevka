import React from 'react';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';

import media from 'site/styles/media';

const CallBlock = styled.div`
  padding: 12px 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #eeeeee;
  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 3;

  ${media.md`
    display: none;
  `}
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 20px;
  font-weight: 500;

  color: #232323;
`;

const SmallPrice = styled.p`
  margin: 0;
  margin-top: 2px;
  line-height: 16px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.352941px;
  text-transform: lowercase;
`;

const CallButton = styled.button`
  padding: 12px 24px;
  max-width: 182px;
  background: #47b34c;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border: none;

  line-height: 19px;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.2125px;
  text-transform: uppercase;

  color: #ffffff;
`;

export default ({ priceData: { currency, price, priceForBlock }, kind }) => (
  <CallBlock>
    <TextBlock>
      <Price>
        <FormattedNumber
          style="currency"
          maximumSignificantDigits={1}
          currency={currency}
          value={price}
        />
      </Price>
      {kind === 'land' && (
        <SmallPrice>
          <FormattedNumber
            style="currency"
            maximumSignificantDigits={1}
            currency={currency}
            value={priceForBlock}
          />{' '}
          / сот.
        </SmallPrice>
      )}
    </TextBlock>
    <CallButton>забронировать просмотр</CallButton>
  </CallBlock>
);
