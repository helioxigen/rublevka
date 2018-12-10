import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { cloudfront } from 'core/config/resources';

import { FormattedCurrency } from 'react-formatted';

import * as dict from 'site/constants/places/index';
import * as analyticsEvents from 'core/analytics/constants';

// actions
import loadDuties from 'site/currentDuty/actions';
import { createClientLead } from 'landing/request/actions';
import { setSharedRetargetingKey } from 'site/retargeting/actions';
import sendAnalytics from 'core/analytics/actions';

import UI from 'site/ui';
const {
  Carousel,
  ParamList,
  Button,
  Form,
  Grid: { Container, Row, Col },
  Form: { Input },
} = UI;

import cn from 'classnames';
import s from 'landing/styles/request/cardPopUp';
import sUtils from 'site/styles/utils';

class CardForm extends Component {
  static propTypes = {
    propertyCategory: PropTypes.string.isRequired,
    propertyId: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    isOpened: false,
    requestSent: false,
    requiredPhone: false,
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  toggleModal(modalState, currentSlide = 0) {
    this.setState({
      isOpen: modalState,
      currentSlide,
    });
  }

  submit(e) {
    e.preventDefault();

    const data = {
      kind: `online`,

      requestDetails: {
        requestKind: `purchase`,
        objects: [
          {
            klass: `${this.props.propertyCategory}_property`,
            id: this.props.propertyId,
          },
        ],
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
        this.props.actions.setSharedRetargetingKey(`vk`);

        this.props.actions.sendAnalytics(analyticsEvents.PropertyCardFormSubmitted(data));
      });
    });
  }

  render() {
    const { data = {} } = this.props;
    const { saleOffer = {}, specification = {}, landDetails = {}, images = [] } = data;
    const { multiCurrencyPrice = {} } = saleOffer;

    const publicImages = images
      .filter(({ isPublic }) => !!isPublic)
      .map(({ id }) => ({
        id,
        src: `${global.config.cloudfront || cloudfront}/${id}-${global.config.postfix}`,
      }));

    return (
      <Container fluid className={s.container}>
        <Row>
          <Col xs="12">
            <div className={s.price}>
              <FormattedCurrency value={multiCurrencyPrice.usd} symbol="USD" />
            </div>
          </Col>

          <Col xs="12" sm="6">
            <div className={s.detailsContainer}>
              {specification.renovate && (
                <ParamList label="Отделка:" titleClassName={s.text} itemClassName={s.fontSizeMd}>
                  &nbsp;{dict.renovateKinds[specification.renovate]}
                </ParamList>
              )}

              {specification.area && (
                <ParamList label="Площадь:" titleClassName={s.text} itemClassName={s.fontSizeMd}>
                  &nbsp;{specification.area} м²
                </ParamList>
              )}

              {landDetails.area && (
                <ParamList label="Участок:" titleClassName={s.text} itemClassName={s.fontSizeMd}>
                  &nbsp;{Math.round(landDetails.area)} сот
                </ParamList>
              )}
            </div>
          </Col>

          <Col xs="12" sm="6">
            <div className={s.detailsContainer}>
              {specification.bedrooms && (
                <ParamList label="Комнат:" titleClassName={s.text} itemClassName={s.fontSizeMd}>
                  &nbsp;{specification.bedrooms}
                </ParamList>
              )}

              {data.id && (
                <ParamList label="ID:" titleClassName={s.text} itemClassName={s.fontSizeMd}>
                  &nbsp;{data.id}
                </ParamList>
              )}
            </div>
          </Col>

          <Col xs="12">
            <div className={s.carouselContainer}>
              <Carousel images={publicImages} currentSlide={this.state.currentSlide} hideNav onClose={() => ::this.toggleModal(false)} />
            </div>
          </Col>
        </Row>

        {!this.state.requestSent && (
          <Form.Container>
            <Row xs="center" className={s.formContainer}>
              <Col xs="12">
                <div>
                  <p className={s.formTitle}>Обратный звонок</p>
                </div>
              </Col>

              <Col xs="10" sm="3" className={s.resetPadding}>
                  <Input
                    block
                    type="text"
                    placeholder="Имя"
                    value={this.state.firstName}
                    onChange={(e) => this.onChange(`firstName`, e.target.value) }
                    className={s.inputName}
                  />
              </Col>

              <Col xs="10" sm="3" className={s.resetPadding}>
                  <Input
                    block
                    type="tel"
                    mask="+7 (111) 111-11-11"
                    placeholder="+7 (___) ___-__-__"
                    value={this.state.phoneNumber}
                    required={this.state.requiredPhone}
                    onChange={(e) => this.onChange(`phoneNumber`, e.target.value) }
                    className={s.inputPhone}
                  />
              </Col>

              <Col xs="10" sm="3" className={s.resetPadding}>
                <Button kind="success" size="sm" block className={s.btn} onClick={(e) => this.submit(e)}>
                  Отправить
                </Button>
              </Col>
            </Row>
          </Form.Container>
        )}

        {!!this.state.requestSent && (
          <Row>
            <Col xs="12">
              <p className={s.title}>
                Ваша заявка отправлена!
              </p>
              <p className={cn(s.text, sUtils.pushedTop1_5)}>
                Наш агент свяжется с вами в ближайшее время
              </p>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

// redux connectors
const pickState = () => {
  return {
    state: {},
  };
};

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

export default connect(pickState, pickActions)(CardForm);
