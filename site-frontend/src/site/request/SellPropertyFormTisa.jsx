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
import sendAnalytics from 'core/analytics/actions';

import { phoneLength, emailFormat } from './validators';
import Loader from 'site/components/Loader';

import UI from 'site/ui';

import configs from 'site/config/satellites';

import styled from 'styled-components';
import media from 'site/styles/media';

const isJQ = global.config.domain === 'jqestate.ru';

const { Button, Icon, Form, Grid: { Container, Row, Col }, Form: { Group, Input } } = UI;

const Wrapper = styled.div`
  position: relative;
  background: ${p => p.theme.brandWhite};
  padding: 4.5rem 0 6rem;
`;

const RoutesWrapper = styled.div`margin: 2rem 0;`;

const WrapperItems = styled.div`margin: 1.8rem 0 0;`;

const FilterButton = styled.span`
  display: inline-block;
  margin: 0 1.2rem 1rem 0;
  padding: 1rem 1.8rem;
  background: #f5f5f5;
  color: ${p => p.theme.greyBlue};
  font-size: 1.4rem;
  line-height: 1;
  border-radius: 10rem;
  border: none;
  cursor: pointer;
  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.08);
  }
  ${p =>
    p.isActive &&
    `
    background: #697981;
    color: #fff;
    &:hover,
    &:active {
      background: #697981;
      color: #fff;
    }
  `};
`;

const Title = styled.h1`
  font-size: 2.2rem;
  line-height: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.footerBg};
  margin-bottom: 4rem;
`;

const StGroup = styled(Group)`
  padding: 0 2.5rem 1rem;
  ${media.sm`
    padding: 0 4.5rem 1rem;
  `};
`;

const StInput = styled(Input)`
  border-radius: 50rem;
  padding: 1.5rem 2rem;
  margin-bottom: 0;
`;

const StButton = styled(Button)`
  font-size: 1.6rem;
  border-radius: 50rem;
  padding: 1.8rem 6rem;
`;

const FilterTitle = styled.h2`
  font-size: 1.6rem;
  color: #697981;
  margin: 0;
`;

const SuccessWrapper = styled.div`padding-top: 2rem;`;

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

class SellPropertyForm extends Component {
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

    if (this.state.phoneErrors.length === 0 && this.state.emailErrors.length === 0) {
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
          FormDemand: 1005,
          ArticleCode: '',
        }),
      }).then(() => {
        this.setState({ requestSent: true });
      });
    }
  }

  render() {
    const routes = configs.jqestate.routes;
    return (
      <Wrapper>
        <Form.Container onSubmit={this.submit}>
          {!this.state.requestSent && (
            <Container fluid>
              <Row>
                <Col xs="12">
                  <Title>
                    Заполните форму и мы<br />свяжемся с вами
                  </Title>
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
                      type="tel"
                      mask="+7 (111) 111-11-11"
                      placeholder="+7 (___) ___-__-__"
                      value={this.state.phoneNumber}
                      required
                      onChange={e => this.onChange('phoneNumber', e.target.value)}
                    />
                    {this.state.phoneErrors.map(error => <Error>{error}</Error>)}
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
                    {this.state.emailErrors.map(error => <Error>{error}</Error>)}
                  </StGroup>
                  {isJQ && (
                    <RoutesWrapper>
                      <FilterTitle>Выберите направление</FilterTitle>
                      <Row>
                        <Col xs="12">
                          <WrapperItems>
                            {routes.map((route) => {
                              const { id, name } = route;
                              const isActive = this.state.routeId === id;
                              return (
                                <FilterButton
                                  key={id}
                                  isActive={isActive}
                                  onClick={() => this.onChange('routeId', id)}
                                >
                                  {name}
                                </FilterButton>
                              );
                            })}
                          </WrapperItems>
                        </Col>
                      </Row>
                    </RoutesWrapper>
                  )}
                  <StButton disabled={!!this.state.requestSending} kind="success">
                    Отправить
                  </StButton>
                </Col>
              </Row>
            </Container>
          )}

          {!!this.state.requestSending &&
            !this.state.requestSent && (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}

          {!!this.state.requestSent && (
            <SuccessWrapper>
              <Logo icon="jqestate-logo" />
              <SuccessTitle>Заявка отправлена!</SuccessTitle>
              <Message>Через 10 минут наш брокер обязательно свяжется с вами.</Message>
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

const pickActions = (dispatch) => {
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

export default connect(pickState, pickActions)(SellPropertyForm);
