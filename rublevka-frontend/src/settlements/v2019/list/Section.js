import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import UI from 'ui';
import media from 'styles/media';

import { nameToSlug } from 'core/helpers/nameToSlug';

const {
  Grid: { Row, Col },
} = UI;

const Wrapper = styled.div`
  margin: 0 -15px;
  padding-bottom: 28px;

  ${media.xs`
    padding-bottom: 32px;
  `}

  ${media.md`
    margin: 0;
    padding-bottom: 37px;
  `}

  &:first-child {
    padding-top: 24px;

    ${media.xs`
      padding-top: 40px;
    `}

    ${media.md`
      padding-top: 46px;
    `}
  }
`;

const Letter = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  line-height: 40px;
  font-size: 32px;
  font-weight: bold;

  color: #232323;

  ${media.xs`
    line-height: 48px;
    font-size: 40px;
    margin-bottom: 8px;
  `}

  ${media.md`
    line-height: 58px;
    font-size: 48px;
    margin-bottom: 9px;
  `}
`;

const StLink = styled(Link)`
  padding-top: 6px;
  padding-bottom: 6px;
  display: block;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: #232323;

  &:hover {
    cursor: pointer;
    color: #f44336;
  }

  ${media.xs`
    padding-top: 8px;
    padding-bottom: 8px;
  `}

  ${media.md`
    padding-top: 9px;
    padding-bottom: 9px;
  `}
`;

const mapState = ({ settlements }) => ({
  state: {
    settlements,
  },
});

export default connect(mapState)(({ state: { settlements }, letter, ids }) => (
  <Wrapper>
    <Letter>{letter}</Letter>
    <Row>
      {ids.map(id => (
        <Col xs="10" sm="6" md="4">
          <StLink
            to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
              settlements[id].data.name,
            )}_${id}`}
          >
            {settlements[id].data.name}
          </StLink>
        </Col>
      ))}
    </Row>
  </Wrapper>
));
