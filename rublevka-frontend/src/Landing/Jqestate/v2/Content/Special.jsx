import React from 'react';

import { Link } from 'react-router';

import UI from 'ui';

import {
  BlockWrapperSpec,
  WithPattern,
  TitleSpec,
  SubTitle,
  SpecBreak,
  TextWrapper,
} from './styled';

const {
  Grid: { Col },
} = UI;

export default () => (
  <Col xs="12" md="6">
    <Link to="/podborky/spetspredlozhenyia_10">
      <BlockWrapperSpec>
        <WithPattern>
          <TextWrapper>
            <TitleSpec>Спецпредложения</TitleSpec>
            <SubTitle>
              Посмотрите наши специальные
              <SpecBreak />
              предложения
            </SubTitle>
          </TextWrapper>
        </WithPattern>
      </BlockWrapperSpec>
    </Link>
  </Col>
);
