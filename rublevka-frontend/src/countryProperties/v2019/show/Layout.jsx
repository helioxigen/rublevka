import React from 'react';
import styled from 'styled-components';

import { WrapperBase, Title as TitleBase } from './styled';
import UI from 'ui';
import media from 'styles/media';

import { layouts } from 'core/config/constants';
import { kinds } from 'core/countryProperties/constants/dictionaries';

const {
  Grid: { Col, Row },
  CountIndicator,
} = UI;

const Wrapper = styled(WrapperBase)`
  ${media.md`
    margin-bottom: 16px;
  `}
`;

const Title = styled(TitleBase)`
  ${media.xs`
    margin-bottom: 4px;
  `}
`;

const RoomName = styled.p`
  margin: 0;
  margin-top: 8px;
  line-height: 23px;
  font-size: 15px;

  color: #232323;
  ${media.xs`
    margin-top: 12px;
    line-height: 26px;
    font-size: 16px;
  `}
`;

export default ({ kind, layout = {} }) => (
  <Wrapper>
    <Title>{kinds[kind]}</Title>
    <Row>
      {Object.keys(layout).map(key => (
        <Col xs="6" sm="4">
          <RoomName>
            <CountIndicator
              count={layout[key]}
              declensionForms={layouts[key].declensions}
              firstNumberHidden
            />
          </RoomName>
        </Col>
      ))}
    </Row>
  </Wrapper>
);
