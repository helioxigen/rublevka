/* eslint-disable react/style-prop-object */
import React from 'react';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';

import media from '../../../styles/media';

import UI from '../../../ui';

const { Icon } = UI;

const CallBlock = styled.div`
  max-height: 85px;
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

  z-index: 15000;

  ${media.sm`
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

const CallLink = styled.a`
  text-decoration: none;
`;

const CallButton = styled.button`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  max-width: 182px;
  background: #47b34c;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border: none;

  line-height: 19px;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;

  color: #ffffff;
`;

const PhoneIcon = styled(Icon)`
  margin-right: 8px;

  width: 16px;
  height: 16px;
  fill: #fff;
`;

export default ({ dealType, priceData: { currency, price, priceForBlock }, kind }) => (
  <CallBlock>
    <TextBlock>
      <Price>
        <FormattedNumber
          style="currency"
          currency={currency}
          value={price}
          maximumSignificantDigits={12}
        />
        {dealType === 'rent' ? ' / месяц' : ''}
      </Price>
      {kind === 'land' && (
        <SmallPrice>
          <FormattedNumber
            style="currency"
            currency={currency}
            value={Math.round(priceForBlock)}
            maximumSignificantDigits={12}
          />{' '}
          / сот.
        </SmallPrice>
      )}
    </TextBlock>
    <CallLink href={`tel:+${global.config.phones.country}`}>
      <CallButton>
        <PhoneIcon icon="new-phone" />
        позвонить
      </CallButton>
    </CallLink>
  </CallBlock>
);
