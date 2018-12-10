import React, { Component } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UI from 'site/ui';
const { Grid, Button, CountIndicator, Grid: { Row, Col }, Form: { Container, Input } } = UI;

import formsContent from 'site/request/constants/formsContent';

import cn from 'classnames';
import s from 'site/styles/modal/propertiesForm';
import sUtils from 'site/styles/utils';
import st from 'site/styles/themes';

import capitalize from 'lodash/capitalize';

import loadDuties from 'site/currentDuty/actions';
import { createClientLead } from 'site/request/actions';
import { setSharedRetargetingKey } from 'site/retargeting/actions';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';
import * as EmailActions from 'site/actions/email';

import { resultPropertiesOpened } from 'core/analytics/constants';

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
      <Grid.Col
        xs="12"
        sm="6"
        md="4"
        className={cn(s.background, !backgroundUrl && st.forms.background)}
        style={{ backgroundImage: backgroundUrl, backgroundSize: 'cover' }}
      >
        <div className={s.card}>
          <div className={s.content}>
            <p style={{ fontSize: '2.2rem' }}>
              <strong>
                {step === 'step3' && capitalize(this.state.name)}
                {data.title[step]}
              </strong>
            </p>
            {!isPrivate && <p className={sUtils.pushedBottom3}>{data.description[step]}</p>}

            {isPrivate &&
            isStep1 && (
              <p className={sUtils.pushedBottom3}>
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
              </p>
            )}

            <Container onSubmit={::this.submit}>
              {isStep1 &&
              !isPrivate && (
                <Row>
                  <Col xs="10" xsOffset="1">
                    <Input
                      className={cn(s.input, sUtils.borderRadius10)}
                      type="tel"
                      mask="+7 (111) 111-11-11"
                      name="phone"
                      size="lg"
                      block
                      placeholder={this.state.phonePlaceholder}
                      onFocus={::this.changePlaceholderOnFocus}
                      onBlur={::this.changePlaceholderOnBlur}
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
                    <Input
                      className={cn(s.input, sUtils.borderRadius10)}
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
                    <Input
                      className={cn(s.input, sUtils.borderRadius10)}
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
                    <Input
                      className={cn(s.input, sUtils.borderRadius10)}
                      type="text"
                      name="name"
                      size="lg"
                      block
                      placeholder="Ваше имя"
                      onChange={e => this.onChange('name', e.target.value)}
                      required={this.state.requiredSecondField}
                    />
                    <Input
                      className={cn(s.input, sUtils.borderRadius10)}
                      type="tel"
                      mask="+7 (111) 111-11-11"
                      name="phone"
                      size="lg"
                      block
                      placeholder={this.state.phonePlaceholder}
                      onFocus={::this.changePlaceholderOnFocus}
                      onBlur={::this.changePlaceholderOnBlur}
                      onChange={e => this.onChange('phoneNumber', e.target.value)}
                      required={this.state.requiredSecondField}
                    />
                  </Col>
                </Row>
              )}

              {!isStep3 && (
                <Button
                  className={cn(sUtils.borderRadius10, sUtils.pushedTop1)}
                  type="submit"
                  size="sm"
                  kind="success"
                >
                  {data.button[step]}
                </Button>
              )}
            </Container>
          </div>
        </div>
      </Grid.Col>
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
