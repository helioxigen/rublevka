import React from 'react';
import styled from 'styled-components';
import pluralize from 'pluralize-ru';

import { WrapperBase } from './styled';
import UI from 'site/ui';
import media from 'site/styles/media';

const { Icon, Visibility } = UI;

const Wrapper = styled(WrapperBase)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${media.xs`
    align-items: flex-start;
  `}
`;

const TextBlock = styled.div`
  display: flex;
  align-items: center;
`;

const ParamWrapper = styled.section`
  display: flex;

  ::after {
    content: '·';
    margin: 0 8px;
    line-height: 21px;
    font-size: 16px;
    font-weight: 500;
  }

  &:last-child::after {
    content: '';
    margin: 0;
  }

  ${media.xs`
    margin: 0px 24px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    ::after {
      content: '';
      margin: 0;
    }
  `}
`;

const Param = styled.div`
  display: flex;
  flex-direction: column;

  ${media.xs`
    margin: 0 48px;
    &:first-child, &:last-child {
      margin: 0;
    }
  `}
`;

const Value = styled.p`
  margin: 0;
  line-height: 21px;
  font-size: 16px;
  font-weight: 500;

  color: #232323;

  ${media.xs`
    line-height: 28px;
    font-size: 21px;
  `}

  ${media.md`
    margin-top: 12px;
  `}
`;

const Name = styled.p`
  display: none;
  margin: 0;
  margin-top: 2px;
  line-height: 18px;
  font-size: 15px;
  text-transform: capitalize;
  font-weight: 500;

  color: rgba(35, 35, 35, 0.5);

  ${media.xs`
    display: block;
  `}

  ${media.md`
    margin-bottom: 16px;
  `}
`;

const Views = styled.div`
  display: flex;
  align-items: center;

  ${media.md`
    display: none;
  `}
`;

const StIcon = styled(Icon)`
  margin-right: 5px;
  width: 17px;
  height: 10px;
  fill: #979797;

  ${media.xs`
    width: 20px;
    height: 12px;
  `}
`;

const Count = styled.p`
  margin: 0;
  line-height: 16px;
  font-size: 13px;
  font-weight: 500;

  color: rgba(35, 35, 35, 0.5);

  ${media.xs`
    line-height: 18px;
    font-size: 15px;
  `}
`;

export default ({ data: { specification = {}, landDetails = {} } }) => (
  <Wrapper>
    <TextBlock>
      {!!landDetails.area && (
        <ParamWrapper>
          <Param>
            <Value>
              {pluralize(landDetails.area, 'Нет информации', '%d сотка', '%d сотки', '%d соток')}
            </Value>
            <Name>Участок</Name>
          </Param>
        </ParamWrapper>
      )}
      {!!specification.area && (
        <ParamWrapper>
          <Param>
            <Value>{specification.area} м²</Value>
            <Name>Дом</Name>
          </Param>
        </ParamWrapper>
      )}
      {!!specification.bedrooms && (
        <ParamWrapper>
          <Visibility sm="hidden" md="hidden" lg="hidden">
            <Param>
              <Value>
                {pluralize(
                  specification.bedrooms,
                  'Нет информации',
                  '%d спальня',
                  '%d спальни',
                  '%d спален',
                )}
              </Value>
            </Param>
          </Visibility>
          <Visibility xs="hidden">
            <Param>
              <Value>{specification.bedrooms}</Value>
              <Name>
                {pluralize(specification.bedrooms, 'Спален', 'Cпальня', 'Cпальни', 'Cпален')}
              </Name>
            </Param>
          </Visibility>
        </ParamWrapper>
      )}
    </TextBlock>
    {/* <Views>
      <StIcon icon="eye" />
      <Count>256</Count>
    </Views> */}
  </Wrapper>
);
