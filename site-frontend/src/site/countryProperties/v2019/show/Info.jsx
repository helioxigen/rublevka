import React from 'react';
import styled from 'styled-components';

import { WrapperBase, Title as TitleBase } from './styled';
import UI from 'site/ui';
import media from 'site/styles/media';

import {
  wallMaterials,
  renovateKinds,
  gasSupply,
  sewerageSupply,
  waterSupply,
} from 'core/countryProperties/constants/dictionaries';

const {
  Grid: { Col },
} = UI;

const Wrapper = styled(WrapperBase)`
  padding-bottom: 8px;
`;

const Title = styled(TitleBase)`
  margin: 0px -15px;
`;

const List = styled.ul`
  padding: 0;
  margin: 0px -15px;
  margin-top: 4px;
  list-style: none;
  margin-bottom: 16px;
`;

const Param = styled.li`
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.xs`
    margin-top: 12px;
  `}
`;

const Name = styled.p`
  margin: 0;
  line-height: 23px;
  font-size: 15px;

  color: #8f8f8f;

  ${media.xs`
    line-height: 26px;
    font-size: 16px;
  `}
`;

const Value = styled.p`
  margin: 0;
  line-height: 23px;
  font-size: 15px;

  color: #232323;

  ${media.xs`
    line-height: 26px;
    font-size: 16px;
  `}
`;

export default ({ data: { specification = {}, landDetails = {}, communication = {} } }) => (
  <Wrapper>
    <Col xs="12" sm="6">
      <Title>Общая информация</Title>
      <List>
        {!!landDetails.area && (
          <Param>
            <Name>Площадь участка</Name>
            <Value>{landDetails.area} сот.</Value>
          </Param>
        )}
        {!!specification.area && (
          <Param>
            <Name>Площадь дома</Name>
            <Value>{specification.area} м²</Value>
          </Param>
        )}
        {!!specification.wallMaterial && (
          <Param>
            <Name>Тип дома</Name>
            <Value>{wallMaterials[specification.wallMaterial]}</Value>
          </Param>
        )}
        {!!specification.renovate && (
          <Param>
            <Name>Ремонт</Name>
            <Value>{renovateKinds[specification.renovate]}</Value>
          </Param>
        )}
      </List>
    </Col>
    {Object.keys(communication).length !== 0 && (
      <Col xs="12" sm="6">
        <Title>Коммуникации</Title>
        <List>
          {!!communication.gasSupply && (
            <Param>
              <Name>Тип газа</Name>
              <Value>{gasSupply[communication.gasSupply]} </Value>
            </Param>
          )}
          {!!communication.powerSupply && (
            <Param>
              <Name>Электричество</Name>
              <Value>{communication.powerSupply} кВт</Value>
            </Param>
          )}
          {!!communication.sewerageSupply && (
            <Param>
              <Name>Канализация</Name>
              <Value>{sewerageSupply[communication.sewerageSupply]}</Value>
            </Param>
          )}
          {!!communication.waterSupply && (
            <Param>
              <Name>Источник воды</Name>
              <Value>{waterSupply[communication.waterSupply]}</Value>
            </Param>
          )}
        </List>
      </Col>
    )}
  </Wrapper>
);
