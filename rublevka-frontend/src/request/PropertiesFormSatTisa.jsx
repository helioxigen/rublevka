import React, { Component } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { apiPathTisa } from 'request/constants/defaults';

import UI from 'ui';

import formsContent from 'request/constants/formsContent';
import Loader from 'components/Loader';

import cn from 'classnames';
import s from 'styles/modal/propertiesForm';
import st from 'styles/themes';

import capitalize from 'lodash/capitalize';

import loadDuties from 'currentDuty/actions';
import { createClientLead } from 'request/actions';
import { setSharedRetargetingKey } from 'retargeting/actions';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';
import * as EmailActions from 'actions/email';

import { resultPropertiesOpened } from 'core/analytics/constants';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Button,
  CountIndicator,
  Grid: { Row, Col },
  Form: { Container, Input },
} = UI;

const FormContainer = styled(Col)`
  position: relative;
  background: url(${require('site/assets/images/white-pattern.svg')}) repeat
    #566872;
  background-size: 120%;
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

const SubTitle = styled.p`
  margin-bottom: 3rem;
`;

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
      requestSent: false,
      requestSending: false,
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

  createClientLeadOnSubmit(formTypeCode) {
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
        FirstName: this.state.name,
        MiddleName: '',
        Phone: this.state.phoneNumber,
        Email: this.state.email,
        Description: '',
        AdvertisingCode: global.config.domain,
        FormDemand: formTypeCode,
        ArticleCode: '',
      }),
    }).then(() => {
      this.setState({ requestSent: true });
      this.setState({ step: 'step3' });
    });
  }

  submit(e, inputData) {
    e.preventDefault();

    const { step } = this.state;

    const isPrivateFieldsFull =
      this.props.type === 'private' && inputData.name && inputData.phone;
    const isNoPrivateFieldsFull =
      this.props.type !== 'private' && inputData.name;

    if (step === 'step1' && (!inputData.phone && !inputData.email)) {
      this.setState({ requiredFirstField: true });
    }

    if (step === 'step1' && inputData.phone) {
      this.setState({ step: 'step2' });
    }

    if (step === 'step1' && inputData.email) {
      this.setState({ step: 'step2' });

      return fetch(apiPathTisa, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LastName: '',
          FirstName: this.state.name,
          MiddleName: '',
          Phone: this.state.phoneNumber,
          Email: this.state.email,
          Description: '',
          AdvertisingCode: global.config.domain,
          FormDemand: 1001,
          ArticleCode: '',
        }),
      });
    }

    if (step === 'step2' && (!isNoPrivateFieldsFull && !isPrivateFieldsFull)) {
      this.setState({ requiredSecondField: true });
    }

    if (step === 'step2' && (isNoPrivateFieldsFull || isPrivateFieldsFull)) {
      const formTypeCode = isPrivateFieldsFull ? 1002 : 1004;

      this.createClientLeadOnSubmit(formTypeCode);
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
        <Card>
          <Content>
            <h2>
              {step === 'step3' && capitalize(this.state.name)}
              {data.title[step]}
            </h2>
            {!isPrivate && <SubTitle>{data.description[step]}</SubTitle>}

            {isPrivate && isStep1 && (
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

            <Container onSubmit={this.submit}>
              {isStep1 && !isPrivate && (
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
                      onChange={e =>
                        this.onChange('phoneNumber', e.target.value)
                      }
                      required={this.state.requiredFirstField}
                    />
                  </Col>
                </Row>
              )}

              {isStep1 && isPrivate && (
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

              {isStep2 && !isPrivate && (
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

              {isStep2 && isPrivate && (
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
                      onChange={e =>
                        this.onChange('phoneNumber', e.target.value)
                      }
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

        {!!this.state.requestSending && !this.state.requestSent && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
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

const pickActions = dispatch => {
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

export default connect(
  pickState,
  pickActions,
)(Form);
