import React, { Component } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UI from 'site/ui';

import formsContent from 'site/request/constants/formsContent';

import cn from 'classnames';
import s from 'site/styles/modal/propertiesForm';
import st from 'site/styles/themes';

import capitalize from 'lodash/capitalize';

import loadDuties from 'site/currentDuty/actions';
import { createClientLead } from 'site/request/actions';
import { setSharedRetargetingKey } from 'site/retargeting/actions';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';
import * as EmailActions from 'site/actions/email';

import { resultPropertiesOpened } from 'core/analytics/constants';

import styled from 'styled-components';
import media from 'site/styles/media';

const { Button, CountIndicator, Grid: { Row, Col }, Form: { Container, Input } } = UI;

const FormContainer = styled(Col)`
  position: relative;
  background: url(${require('site/assets/images/white-pattern.svg')}) repeat #566872;
  background-size: 120%;

  ${media.xlg`
    flex-basis: 25%;
    max-width: 25%;
  `};
`;

const Overlay = styled.div`
  content: '';
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: rgba(86, 104, 114, 0.7);
  z-index: 1;
`;

const Card = styled.div`
  position: relative;
  z-index: 1;
  display: block;
  margin: 0 -1.5rem;
  color: ${p => p.theme.brandWhite};
  font-weight: 300;
  font-size: 1.6rem;
  transition: all 0.3s;

  ${media.sm`
    margin: -1px -1.5rem 0 -1.6rem;
  `};
`;

const Content = styled.div`
  padding: 2rem 2.5rem 3rem;
  width: 100%;
  height: 100%;
  text-align: center;

  ${media.sm`
    padding: 5rem 2.5rem 3rem;
  `};
`;

const StInput = styled(Input)`
  background: rgba(255, 255, 255, 0.1);
  color: ${p => p.theme.brandWhite};
  margin-bottom: 1rem;
  text-align: center;
  border-radius: 10rem;
  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid ${p => p.theme.brandWhite};
  }
  &:invalid {
    background: rgba(232, 77, 77, 0.1);
    border-color: ${p => p.theme.brandPrimary};
  }
`;

const StButton = styled(Button)`
  border-radius: 10rem;
  margin-top: 1rem;
`;

const SubTitle = styled.p`margin-bottom: 3rem;`;

const privatePropertiesCount = Math.floor(Math.random() * (30 - 11 + 1)) + 11;

function getImgUrl(type) {
  if (type === 'private') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/private-form-bg.jpg)';
  }

  if (type === 'help') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/help-form-bg.jpg)';
  }
}

class Form extends Component {
  constructor() {
    super();

    this.submit = this.submit.bind(this);
    this.changePlaceholderOnFocus = this.changePlaceholderOnFocus.bind(this);
    this.changePlaceholderOnBlur = this.changePlaceholderOnBlur.bind(this);

    this.state = {
      step: 'step1',
      phonePlaceholder: 'Номер телефона',
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  changePlaceholderOnFocus() {
    this.setState({ phonePlaceholder: '+7 (___) ___ __ __' });
  }

  changePlaceholderOnBlur() {
    this.setState({ phonePlaceholder: 'Номер телефона' });
  }

  createClientLeadOnSubmit(step) {
    this.props.actions.loadDuties(this.props.propertyCategory).then(() => {
      const data = {
        kind: 'online',

        requestDetails: {
          category: this.props.propertyCategory,
          requestKind: 'purchase',
        },

        contactDetails: {
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
          firstName: this.state.name,
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
          const eventName = formsContent[this.props.type].eventName[step];

          track(resultPropertiesOpened(eventName, data));
        });
      });
    });
  }

  submit(e, inputData) {
    e.preventDefault();

    const { step } = this.state;

    const isPrivateFieldsFull = this.props.type === 'private' && inputData.name && inputData.phone;
    const isNoPrivateFieldsFull = this.props.type !== 'private' && inputData.name;

    if (step === 'step1' && (!inputData.phone && !inputData.email)) {
      this.setState({ requiredFirstField: true });
    }

    if (step === 'step1' && inputData.phone) {
      this.setState({ step: 'step2' });
    }

    if (step === 'step1' && inputData.email) {
      this.setState({ step: 'step2' });

      return this.props.actions.subscribe(inputData.name, inputData.email).then(() => {
        this.props.actions.setSharedRetargetingKey('vk');
        track(analyticsEvents.subscribeSubmitted(inputData));
      });
    }

    if (step === 'step2' && (!isNoPrivateFieldsFull && !isPrivateFieldsFull)) {
      this.setState({ requiredSecondField: true });
    }

    if (step === 'step2' && (isNoPrivateFieldsFull || isPrivateFieldsFull)) {
      this.setState({ step: 'step3' });

      this.createClientLeadOnSubmit(step);
    }
  }

  render() {
    const { type } = this.props;
    const { step } = this.state;
    const data = formsContent[type];

    const isPrivate = type === 'private';
    const isStep1 = step === 'step1';
    const isStep2 = step === 'step2';
    const isStep3 = step === 'step3';

    const backgroundUrl = getImgUrl(type);

    return (
      <FormContainer
        xs="12"
        sm="6"
        md="4"
        className={cn(s.background, !backgroundUrl && st.forms.background)}
        style={{ backgroundImage: backgroundUrl, backgroundSize: 'cover' }}
      >
        <Overlay />
        <Card>
          <Content>
            <h2>
              {step === 'step3' && capitalize(this.state.name)}
              {data.title[step]}
            </h2>
            {!isPrivate && <SubTitle>{data.description[step]}</SubTitle>}

            {isPrivate &&
              isStep1 && (
                <SubTitle>
                  Мы нашли{' '}
                  <CountIndicator
                    count={privatePropertiesCount}
                    declensionForms={[
                      'закрытое предложение',
                      'закрытых предложения',
                      'закрытых предложений',
                    ]}
                  />{' '}
                  по вашему запросу — отправим их на почту
                </SubTitle>
              )}

            <Container onSubmit={::this.submit}>
              {isStep1 &&
                !isPrivate && (
                  <Row>
                    <Col xs="10" xsOffset="1">
                      <StInput
                        type="tel"
                        mask="+7 (111) 111-11-11"
                        name="phone"
                        size="lg"
                        block
                        placeholder={this.state.phonePlaceholder}
                        onFocus={this.changePlaceholderOnFocus}
                        onBlur={this.changePlaceholderOnBlur}
                        onChange={e => this.onChange('phoneNumber', e.target.value)}
                        required={this.state.requiredFirstField}
                      />
                    </Col>
                  </Row>
                )}

              {isStep1 &&
                isPrivate && (
                  <Row>
                    <Col xs="10" xsOffset="1">
                      <StInput
                        type="email"
                        name="email"
                        size="lg"
                        block
                        placeholder="E-mail"
                        onChange={e => this.onChange('email', e.target.value)}
                        required={this.state.requiredFirstField}
                      />
                    </Col>
                  </Row>
                )}

              {isStep2 &&
                !isPrivate && (
                  <Row>
                    <Col xs="10" xsOffset="1">
                      <StInput
                        type="text"
                        name="name"
                        size="lg"
                        blocks
                        placeholder="Ваше имя"
                        onChange={e => this.onChange('name', e.target.value)}
                        required={this.state.requiredSecondField}
                      />
                    </Col>
                  </Row>
                )}

              {isStep2 &&
                isPrivate && (
                  <Row>
                    <Col xs="10" xsOffset="1">
                      <StInput
                        type="text"
                        name="name"
                        size="lg"
                        block
                        placeholder="Ваше имя"
                        onChange={e => this.onChange('name', e.target.value)}
                        required={this.state.requiredSecondField}
                      />
                      <StInput
                        type="tel"
                        mask="+7 (111) 111-11-11"
                        name="phone"
                        size="lg"
                        block
                        placeholder={this.state.phonePlaceholder}
                        onFocus={this.changePlaceholderOnFocus}
                        onBlur={this.changePlaceholderOnBlur}
                        onChange={e => this.onChange('phoneNumber', e.target.value)}
                        required={this.state.requiredSecondField}
                      />
                    </Col>
                  </Row>
                )}

              {!isStep3 && (
                <StButton type="submit" size="sm" kind="success">
                  {data.button[step]}
                </StButton>
              )}
            </Container>
          </Content>
        </Card>
      </FormContainer>
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
    ...EmailActions,
    loadDuties,
    createClientLead,
    setSharedRetargetingKey,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(Form);
