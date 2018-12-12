import React from 'react';

import UI from 'site/ui';

import styled from 'styled-components';

const { Button, Grid: { Row, Col } } = UI;

const Wrapper = styled.div`
  background: ${p => p.theme.bodyBg};
  padding: 6rem 3rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  text-align: center;
  border-bottom: 1px solid ${p => p.theme.grey};
  border-top: 1px solid ${p => p.theme.grey};
`;

const StButton = styled(Button)`
  display: inline-block;
  margin: 0;
  border: none;
  padding: 0.1rem 1.5rem 0.4rem;
  font-size: 1.6rem;
  color: rgba(104, 121, 129, 1);
  background: none;
  &:hover {
    background: none;
    color: rgba(84, 97, 103, 1);
  }
`;

export default props => (
  <Wrapper>
    <Row xs="center">
      <Col xs="12">
        <span>По вашему запросу ничего не найдено.</span>
        <StButton onClick={props.resetFilter}>Сбросить фильтр</StButton>
      </Col>
    </Row>
  </Wrapper>
);
