import React from 'react';
import styled from 'styled-components';

import Title from './Title';

import media from 'site/styles/media';
import UI from 'site/ui';

const { Icon } = UI;

const Header = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
  margin-left: 10px;
  margin-right: 10px;

  ${media.xs`
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
  `}

  ${media.sm`
    margin-left: -3px;
    margin-right: -3px;
  `}

  ${media.md`
    margin: 0;
  `}
`;

const InfoBlock = styled.div`
  display: none;

  ${media.md`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;

const Id = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  letter-spacing: 0.535714px;
  font-weight: 500;

  color: #919191;
`;

const Views = styled.div`
  display: flex;
  align-items: center;
`;

const StIcon = styled(Icon)`
  margin-right: 6px;
  width: 17px;
  height: 10px;
  fill: #979797;
`;

const Count = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  font-weight: 500;

  color: rgba(35, 35, 35, 0.5);
`;

const TitleWrapper = styled.h1`
  margin: 0;
  font-weight: 500;
  line-height: 28px;
  font-size: 21px;

  color: #000000;

  ${media.xs`
    line-height: 36px;
    font-size: 28px;
  `}

  ${media.md`
    line-height: 32px;
    font-size: 24px;
    margin-top: 8px;
    margin-bottom: 16px;
  `}
`;

export default ({ data, dealType, propertyId }) => (
  <Header>
    <InfoBlock>
      <Id>№ {propertyId}</Id>
      {/* <Views>
        <StIcon icon="eye" />
        <Count>256</Count>
      </Views> */}
    </InfoBlock>
    <TitleWrapper>
      {' '}
      <Title withOffer data={data} dealType={dealType} />{' '}
    </TitleWrapper>
  </Header>
);
