import React, { Component, PropTypes } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import loadDuties from 'site/currentDuty/actions';
import { createClientLead } from 'site/request/actions';
import { setSharedRetargetingKey } from 'site/retargeting/actions';
import sendAnalytics from 'core/analytics/actions';

import { phoneLength } from './validators';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

import * as analyticsEvents from 'core/analytics/constants';

const {
  Button,
  Icon,
  Form,
  Grid: { Container, Row, Col },
  Form: { Group, Input },
} = UI;

const Wrapper = styled.div`
  background: ${p => p.theme.brandWhite};
  padding: 4.5rem 0 6rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  line-height: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.footerBg};
  margin-bottom: 4rem;
  padding: 0 2.5rem;
  ${media.sm`
    padding: 0;
  `};
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
  margin-top: 2.5rem;
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

class CallbackForm extends Component {
  static propTypes = {
    propertyCategory: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = { requestSent: false, isActive: false, phoneErrors: [] };
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleValidation() {
    const { phoneNumber } = this.state;

    this.setState({
      phoneErrors: [phoneLength(phoneNumber)].filter(i => i !== null),
    });
  }

  async submit(e) {
    e.preventDefault();

    await this.handleValidation();

    if (this.state.phoneErrors.length === 0) {
      this.props.actions.loadDuties(this.props.propertyCategory).then(() => {
        const data = {
          kind: 'online',

          requestDetails: {
            category: this.props.propertyCategory,
            requestKind: 'purchase',
          },

          contactDetails: {
            firstName: this.state.firstName,
            phoneNumber: this.state.phoneNumber,
          },

          clientLeadSource: global.config.domain,
          marketing: {
            utms: {
              source: sbjs.get.current.src,
              medium: sbjs.get.current.mdm,
              campaign: sbjs.get.current.cmp,
              content: sbjs.get.current.cnt,
              term: sbjs.get.current.trm,
            },
          },
        };

        this.props.actions.createClientLead(data).then(() => {
          this.setState({ requestSent: true }, () => {
            this.props.actions.setSharedRetargetingKey('vk');

            this.props.actions.sendAnalytics(
              analyticsEvents.callbackSubmitted(data),
            );

            fbq('track', 'Lead');
          });
        });
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <Form.Container onSubmit={this.submit}>
          {!this.state.requestSent && (
            <Container fluid>
              <Row>
                <Col xs="12">
                  <Title>
                    Заполните форму и мы свяжемся с вами в течении 10&nbsp;минут
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
                      onChange={e =>
                        this.onChange('phoneNumber', e.target.value)
                      }
                    />
                    {this.state.phoneErrors.map(error => (
                      <Error>{error}</Error>
                    ))}
                  </StGroup>
                  <StButton kind="success">Отправить</StButton>
                </Col>
              </Row>
            </Container>
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
)(CallbackForm);
