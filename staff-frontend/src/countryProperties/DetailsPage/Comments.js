import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-flexbox-grid';
import { SubTitle } from './styled';
import CommentsBlock from '../../comments/Block';

const StComments = styled.div`
  margin-top: 64px;
  padding-bottom: 20px;
`;

const Title = styled(SubTitle)`
  margin-bottom: 24px;
`;

const Note = styled.div`
  padding: 24px;
  background: white;
  font-size: 16px;
  line-height: 23px;
  color: #808080;
  margin-bottom: 38px;
`;

export default ({ property: { id, note } }) => (
  <StComments>
    <Row>
      <Col xs={12}>
        <Title>Комментарии</Title>
      </Col>
    </Row>
    {note && <Note>{note}</Note>}
    <CommentsBlock
      entity={{ key: 'countryProperties', id }}
      isSubscriptionAvailable
    />
  </StComments>
);
