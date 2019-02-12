import React, { Component, PropTypes } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { apiPathTisa } from 'site/request/constants/defaults';

// actions
import loadDuties from 'site/currentDuty/actions';
import { createClientLead } from 'site/request/actions';
import { setSharedRetargetingKey } from 'site/retargeting/actions';
import { track } from 'core/analytics';
import sendAnalytics from 'core/analytics/actions';

import Loader from 'site/components/Loader';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const {
  Button,
  Icon,
  Form,
  Grid: { Row, Col },
  Form: { Group, Input },
} = UI;

const Wrapper = styled.div`
  position: relative;
  padding: 0.3rem 0 0;
  text-align: center;
  ${media.sm`
    padding: 0.3rem 2.5rem 0;
  `};
`;

const StGroup = styled(Group)`
  padding: 0 0 1rem;
  ${media.sm`
    padding: 0 0 1rem;
  `};
`;

const StInput = styled(Input)`
  border-radius: 50rem;
  border: 1px solid #e5e5e5;
  padding: 1.3rem 2.5rem;
  margin-bottom: 0;
  &:focus {
    border: 1px solid #c3c3c3;
  }
  ${media.sm`
    padding: 1.5rem 2.5rem;
  `};
`;

const StButton = styled(Button)`
  position: relative;
  font-size: 1.6rem;
  font-weight: 300;
  border-radius: 50rem;
  width: 100%;
  padding: 1.5rem 2rem;
  z-index: 1;
  ${media.sm`
    font-weight: 400;
    padding: 1.8rem 2rem;
  `};
`;

const SuccessWrapper = styled.div`
  padding-top: 2rem;
`;

const Logo = styled(Icon)`
  width: 5rem;
  height: 4.2rem;
  fill: ${p => p.theme.brandPrimary};
`;

const SuccessTitle = styled.h2`
  font-size: 2.2rem;
  color: #262626;
  margin-bottom: 0;
`;

const Message = styled.p`
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: #697981;
  margin: 1.2rem 0 0.4rem;
  padding: 0 2rem;
`;

const Error = styled.div`
  font-size: 1.4rem;
  color: ${p => p.theme.brandPrimary};
  padding: 1rem 0 0 0.5rem;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
`;

function phoneLength(phoneNumber) {
  if (phoneNumber.match(/\d/g).length !== 11) {
    return 'Телефон введен неправильно';
  }
  return null;
}

function emailFormat(email) {
  const regexEmail = /\S+@\S+\.\S+/;
  const matchEmail = regexEmail.exec(email);

  if (matchEmail === null) {
    return 'Неверный формат почты';
  }
  return null;
}

class ReserveForm extends Component {
  static propTypes = {
    propertyCategory: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = {
      requestSent: false,
      requestSending: false,
      isActive: false,
      selecterRoute: null,
      phoneErrors: [],
      emailErrors: [],
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  onUpdate(id) {
    this.setState({
      selectedRoute: id,
    });
  }

  handleValidation() {
    const { phoneNumber, email } = this.state;

    this.setState({
      phoneErrors: [phoneLength(phoneNumber)].filter(i => i !== null),
      emailErrors: [emailFormat(email)].filter(i => i !== null),
    });
  }

  async submit(e) {
    e.preventDefault();

    await this.handleValidation();

    if (
      this.state.phoneErrors.length === 0 &&
      this.state.emailErrors.length === 0
    ) {
      this.setState({
        requestSending: true,
      });

      fetch(apiPathTisa, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LastName: '',
          FirstName: this.state.firstName,
          MiddleName: '',
          Phone: this.state.phoneNumber,
          Email: this.state.email,
          Description: '',
          AdvertisingCode: global.config.domain,
          FormDemand: 1003,
          ArticleCode: this.props.propertyId,
        }),
      }).then(() => {
        this.setState({ requestSent: true });
      });
    }
  }

  render() {
    const { phoneErrors, emailErrors } = this.state;

    return (
      <Wrapper>
        <Form.Container onSubmit={this.submit}>
          {!this.state.requestSent && (
            <Row>
              <Col xs="12">
                <StGroup>
                  <StInput
                    block
                    type="text"
                    placeholder="Имя"
                    value={this.state.firstName}
                    onChange={e => this.onChange('firstName', e.target.value)}
                  />
                </StGroup>
                <StGroup>
                  <StInput
                    block
                    name="email"
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={e => this.onChange('email', e.target.value)}
                    required
                  />
                  {emailErrors !== 0 &&
                    emailErrors.map(error => <Error>{error}</Error>)}
                </StGroup>
                <StGroup>
                  <StInput
                    block
                    type="tel"
                    mask="+7 (111) 111-11-11"
                    placeholder="+7 (___) ___-__-__"
                    value={this.state.phoneNumber}
                    required
                    onChange={e => this.onChange('phoneNumber', e.target.value)}
                  />
                  {phoneErrors !== 0 &&
                    phoneErrors.map(error => <Error>{error}</Error>)}
                </StGroup>
                <StButton disabled={!!this.state.requestSending} kind="success">
                  Забронировать просмотр
                </StButton>
              </Col>
            </Row>
          )}

          {!!this.state.requestSending && !this.state.requestSent && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}

          {!!this.state.requestSent && (
            <SuccessWrapper>
              <Logo icon="jqestate-logo" />
              <SuccessTitle>Заявка отправлена!</SuccessTitle>
              <Message>
                Через 10 минут наш брокер обязательно свяжется с вами.
              </Message>
            </SuccessWrapper>
          )}
        </Form.Container>
      </Wrapper>
    );
  }
}

// redux connectors
const pickState = ({ currentDuty }) => ({
  state: {
    currentDuty,
  },
});

const pickActions = dispatch => {
  const actions = {
    loadDuties,
    createClientLead,
    setSharedRetargetingKey,
    sendAnalytics,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(ReserveForm);
