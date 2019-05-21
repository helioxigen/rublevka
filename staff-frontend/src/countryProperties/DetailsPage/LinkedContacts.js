import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Col, Row } from 'react-flexbox-grid';
import { SubTitle } from './styled';
import { loadLinkedContacts } from '../actions/contacts';

const StLinkedContacts = styled.div`
  background-color: #eeeeee;
  margin: 0 -42px;
  padding: 42px;
  padding-bottom: 26px;
`;

const Table = styled.div`
  margin-top: 2px;
  padding-bottom: 8px;
`;

const Concact = styled.div`
  padding-bottom: 16px;
`;

const Name = styled.div`
  font-size: 20px;
  line-height: 19px;
  font-weight: 600;
`;

const Kind = styled.div`
  font-size: 20px;
  line-height: 26px;
  font-weight: 300;
`;

const Phone = styled(Kind)`
  color: black;
`;

const EmptyListWarning = styled(Kind)`
  color: black;
`;

const createContact = ({ contactTitle, kindTitle, phoneNumber }) => (
  <Concact>
    <Row>
      <Col xs={4}>
        <Name>{contactTitle}</Name>
      </Col>
      <Col xs={4}>
        <Kind>{kindTitle}</Kind>
      </Col>
      <Col xs={4}>
        <Phone>{phoneNumber}</Phone>
      </Col>
    </Row>
  </Concact>
);

class LinkedContacts extends React.Component {
  componentWillMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      property: { id },
    } = this.props;
    const {
      property: { id: prevId },
    } = prevProps;
    if (id !== prevId) {
      this.loadData();
    }
  }

  loadData = () => {
    const {
      dispatch,
      property: { id },
    } = this.props;
    if (id) {
      dispatch(loadLinkedContacts(id));
    }
  };

  render() {
    const {
      contactsByPropertyId,
      property: { id },
    } = this.props;
    const contacts = contactsByPropertyId[id] || [];
    const isEmpty = contacts.length === 0;

    return (
      <StLinkedContacts>
        <SubTitle>Контакты</SubTitle>
        {isEmpty ? (
          <EmptyListWarning>Нет связанных контактов</EmptyListWarning>
        ) : (
          <Table>{contacts.map(el => createContact(el))}</Table>
        )}
      </StLinkedContacts>
    );
  }
}

const mapStateToProps = ({ contactsByPropertyId }) => ({
  contactsByPropertyId,
});

export default connect(mapStateToProps)(LinkedContacts);
