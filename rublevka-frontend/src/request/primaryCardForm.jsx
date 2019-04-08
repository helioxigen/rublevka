import React, { Component, PropTypes } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { cloudfront } from 'core/config/resources';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FormattedCurrency } from 'react-formatted';

// actions
import loadDuties from 'currentDuty/actions';
import { createClientLead } from 'request/actions';
import { setSharedRetargetingKey } from 'retargeting/actions';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';

import * as dict from 'constants/places/index';

import UI from 'ui';
const {
  Button,
  Form,
  Image,
  ParamList,
  Grid: { Container, Row, Col },
  Form: { Group, Input },
} = UI;

import cn from 'classnames';
import s from 'styles/settlements/id/request';
import st from 'styles/themes';
import sInput from 'styles/modal/subscribe';
import sUtils from 'styles/utils';

class ByPropertyForm extends Component {
  static propTypes = {
    propertyCategory: PropTypes.string.isRequired,
    propertyId: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
  };

  state = {
    isOpened: false,
    requestSent: false,
    requiredPhone: false,
  };

  componentDidMount() {
    const { dealType } = this.props;

    track(
      analyticsEvents.propertyRequestSubmitted({
        dealType,
        ...this.props.data,
      }),
    );
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();

    if (!this.state.phoneNumber) {
      this.setState({ requiredPhone: true });
    } else {
      this.submit();
    }
  }

  submit() {
    const { dealType } = this.props;

    this.props.actions.loadDuties(this.props.propertyCategory).then(() => {
      const { staffUserId = 1 } = this.props.state.currentDuty[
        this.props.propertyCategory
      ];

      const data = {
        kind: 'online',

        requestDetails: {
          // offerKind: this.state.offerKind,
          // category: this.props.propertyCategory,
          // price,
          requestKind: 'purchase',
          objects: [
            {
              klass: `${this.props.propertyCategory}_property`,
              id: this.props.propertyId,
            },
          ],
          // currency: `USD`,
          // kind: this.state.propertyKind,
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

      this.props.actions.createClientLead(data, staffUserId).then(() => {
        this.setState({ requestSent: true }, () => {
          this.props.actions.setSharedRetargetingKey('vk');
          track(
            analyticsEvents.propertyRequestSubmitted({
              dealType,
              ...this.props.data,
            }),
          );
        });
      });
    });
  }

  render() {
    const { state, propertyId } = this.props;
    const { countryProperties = {} } = state;
    const { data = {} } = countryProperties[propertyId];
    const {
      saleOffer = {},
      specification = {},
      landDetails = {},
      communication = {},
      layoutImages = [],
    } = data;

    const publicLayoutImages = layoutImages.filter(image => !!image.isPublic);
    const hasLayouts = publicLayoutImages.length > 0;

    return (
      <Form.Container className={this.props.className} onSubmit={::this.submit}>
        <Container fluid>
          {hasLayouts && (
            <Row sm="middle">
              <Col xs="12" sm="5">
                <div className={s.detailsContainer}>
                  <p className={s.text}>Стоимость</p>
                  <p className={cn(s.price, sUtils.pushedBottom1)}>
                    <FormattedCurrency
                      value={saleOffer.price}
                      symbol={saleOffer.currency}
                    />
                  </p>

                  {data.kind && (
                    <ParamList
                      label="Тип:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{dict.kinds[data.kind]}
                    </ParamList>
                  )}

                  {specification.area && (
                    <ParamList
                      label="Дом:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{specification.area} м²
                    </ParamList>
                  )}

                  {landDetails.area && (
                    <ParamList
                      label="Участок:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{Math.round(landDetails.area)} сот
                    </ParamList>
                  )}

                  {specification.bedrooms && (
                    <ParamList
                      label="Комнат:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{specification.bedrooms}
                    </ParamList>
                  )}

                  {communication.powerSupply && (
                    <ParamList
                      label="Электричество:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{communication.powerSupply} кВт
                    </ParamList>
                  )}

                  {propertyId && (
                    <ParamList
                      label="ID:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{propertyId}
                    </ParamList>
                  )}
                </div>
              </Col>

              <Col xs="12" sm="7">
                <Image
                  src={`${global.config.cloudfront || cloudfront}/${
                    publicLayoutImages[0].id
                  }-thumbnail-512`}
                  alt="Планировка"
                  responsive
                />
              </Col>
            </Row>
          )}

          {!hasLayouts && (
            <Row xs="start" className={s.detailsContainer}>
              <Col xs="12">
                <p className={s.text}>Стоимость</p>
                <p className={cn(s.price, sUtils.pushedBottom3)}>
                  <FormattedCurrency
                    value={saleOffer.price}
                    symbol={saleOffer.currency}
                  />
                </p>
              </Col>

              {(data.kind || specification.area) && (
                <Col xs="12" sm="4">
                  {data.kind && (
                    <ParamList
                      label="Тип:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{dict.kinds[data.kind]}
                    </ParamList>
                  )}

                  {specification.area && (
                    <ParamList
                      label="Дом:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{specification.area} м²
                    </ParamList>
                  )}
                </Col>
              )}

              {(landDetails.area || specification.bedrooms) && (
                <Col xs="12" sm="4">
                  {landDetails.area && (
                    <ParamList
                      label="Участок:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{Math.round(landDetails.area)} сот
                    </ParamList>
                  )}

                  {specification.bedrooms && (
                    <ParamList
                      label="Комнат:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{specification.bedrooms}
                    </ParamList>
                  )}
                </Col>
              )}

              {(communication.powerSupply || propertyId) && (
                <Col xs="12" sm="4">
                  {communication.powerSupply && (
                    <ParamList
                      label="Электричество:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{communication.powerSupply} кВт
                    </ParamList>
                  )}

                  {propertyId && (
                    <ParamList
                      label="ID:"
                      titleClassName={s.text}
                      itemClassName={s.fontSizeMd}
                    >
                      &nbsp;{propertyId}
                    </ParamList>
                  )}
                </Col>
              )}
            </Row>
          )}
        </Container>

        {!this.state.requestSent && (
          <Container fluid className={st.forms.settlementForm}>
            <Row>
              <Col xs="12">
                <div className={sUtils.pushedBottom4_5}>
                  <p className={s.textWhite}>
                    Понравился {data.kind === 'land' ? 'участок' : 'дом'}?
                    Запишитесь на просмотр прямо сейчас!
                  </p>
                </div>
              </Col>

              <Col xs="12" sm="4">
                <Group className={sUtils.resetFormGroupIndent}>
                  <Input
                    block
                    type="text"
                    placeholder="Имя"
                    value={this.state.firstName}
                    onChange={e => this.onChange('firstName', e.target.value)}
                    className={sInput.input}
                  />
                </Group>
              </Col>

              <Col xs="12" sm="4">
                <Group className={sUtils.resetFormGroupIndent}>
                  <Input
                    block
                    type="tel"
                    mask="+7 (111) 111-11-11"
                    placeholder="+7 (___) ___-__-__"
                    value={this.state.phoneNumber}
                    required={this.state.requiredPhone}
                    onChange={e => this.onChange('phoneNumber', e.target.value)}
                    className={sInput.input}
                  />
                </Group>
              </Col>

              <Col xs="12" sm="4">
                <Button
                  kind="success"
                  size="sm"
                  block
                  className={sUtils.borderRadius10}
                  onClick={e => this.handleClick(e)}
                >
                  Записаться
                </Button>
              </Col>
            </Row>
          </Container>
        )}

        {!!this.state.requestSent && (
          <Container fluid className={st.forms.settlementForm}>
            <Row>
              <Col xs="12">
                <h2 className={s.title}>Заявка отправлена!</h2>
                <p className={cn(s.text, s.textWhite, sUtils.pushedTop1_5)}>
                  Через 10 минут наш агент свяжется с вами
                </p>
              </Col>
            </Row>
          </Container>
        )}
      </Form.Container>
    );
  }
}

// redux connectors
const pickState = ({ currentDuty, countryProperties }) => ({
  state: {
    currentDuty,
    countryProperties,
  },
});

const pickActions = dispatch => {
  const actions = {
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
)(ByPropertyForm);
