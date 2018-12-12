import React, { Component, PropTypes } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import loadDuties from 'site/currentDuty/actions';
import { createClientLead } from 'site/request/actions';
import { setSharedRetargetingKey } from 'site/retargeting/actions';
import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';

// import PriceSelect from 'site/ui/priceSelect';
import UI from 'site/ui';

import cn from 'classnames';
import s from 'site/styles/complexes/id/request';
// import sSelect from 'site/styles/ui/select';
import sUtils from 'site/styles/utils';

const {
  // BtnGroup,
  Button,
  Icon,
  Form,
  // Select,
  Grid: { Container, Row, Col },
  Form: { Group, Input },
} = UI;

// import * as options from 'site/constants/leads/options';

// const leadData = {
//   ...values,
//   kind: `online`,
//
//   requestDetails: this.state.isOpened ? {
//     ...values.requestDetails,
//     category: `city`,
//     price,
//     requestKind: `selection`,
//     currency: `USD`,
//   } : null,
//
//   clientLeadSource: global.config.domain,
//   utms: {
//     source: sbjs.get.current.src,
//     medium: sbjs.get.current.mdm,
//     campaign: sbjs.get.current.cmp,
//     content: sbjs.get.current.cnt,
//     term: sbjs.get.current.trm,
//   },
// };
//

class ByPropertyForm extends Component {
  static propTypes = {
    propertyCategory: PropTypes.string.isRequired,
    propertyId: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = {
      isOpened: false,
      requestSent: false,
      // offerKind: `purchase`,
      // priceRange: {
      //   min: 0,
      //   max: 30.02,
      // },
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  submit(e) {
    e.preventDefault();

    const { dealType } = this.props;

    this.props.actions.loadDuties(this.props.propertyCategory).then(() => {
      const { staffUserId = 1 } = this.props.state.currentDuty[this.props.propertyCategory];

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
          track(analyticsEvents.propertyRequestSubmitted({ dealType, ...this.props.data }));
        });
      });
    });
  }

  render() {
    return (
      <Form.Container className={this.props.className} onSubmit={::this.submit}>
        {!this.state.requestSent &&
          <Container fluid>
            <Row>
              <Col xs="12">
                <div className={sUtils.pushedBottom4_5}>
                  <h1 className={s.title}>Забронировать просмотр</h1>

                  <p className={s.text}>
                    Заполните форму и мы свяжемся с вами в течение 10 минут, чтобы назначить
                    бесплатный просмотр
                  </p>
                  {/* <p className={s.textGreySm}>
                    Похоже, допущена ошибка при написании номера телефона, попробуйте еще раз
                  </p> */}
                </div>

                <Group className={sUtils.resetFormGroupIndent}>
                  <Input
                    block
                    type="text"
                    placeholder="Имя"
                    value={this.state.firstName}
                    onChange={e => this.onChange('firstName', e.target.value)}
                  />
                </Group>
                <Group className={sUtils.resetFormGroupIndent}>
                  <Input
                    block
                    type="tel"
                    mask="+7 (111) 111-11-11"
                    placeholder="+7 (___) ___-__-__"
                    value={this.state.phoneNumber}
                    required
                    onChange={e => this.onChange('phoneNumber', e.target.value)}
                  />
                </Group>

                {/* <Button className={s.btn} type="button" onClick={() => ::this.setState({ isOpened: !this.state.isOpened })}>
            {this.state.isOpened ? `Не уточнять` : `Уточнить детали`}
          </Button>

          {this.state.isOpened && (
            <div className={cn(s.pushedTop3, s.requestMore, this.state.isOpened && s.isOpen)}>
              <BtnGroup className={s.btnGroup}>
                <Button
                  className={cn(s.btnLg, this.state.offerKind === `purchase` && s.disabled)}
                  onClick={() => ::this.onChange(`offerKind`, `purchase`)}
                  type="button"
                >
                  Купить
                </Button>
                <Button
                  className={cn(s.btnLg, this.state.offerKind === `rent` && s.disabled)}
                  onClick={() => ::this.onChange(`offerKind`, `rent`)}
                  type="button"
                >
                  Снять
                </Button>
              </BtnGroup>
              <Group className={cn(s.positionRelative, s.zIndex4, s.paddingBt1)}>
                <Select
                  className={cn(sSelect.height15)}
                  options={options.kinds.cityComplexes}
                  placeholder="Тип недвижимости"
                  value={this.state.propertyKind}
                  onChange={(value) => this.onChange(`propertyKind`, value) }
                />
              </Group>
              <Group className={cn(s.positionRelative, s.zIndex3, s.paddingBt1)}>
                <PriceSelect
                  offerKind={this.state.offerKind}
                  value={this.state.priceRange}
                  onChange={(value) => this.onChange(`priceRange`, value)}
                />

                 <Select className={cn(s.ranged, sSelect.height15)} options={options.prices[offerKind]} placeholder="От" {...fields.price.from} />
                 <Select className={cn(s.ranged, sSelect.height15)} options={options.prices[offerKind].filter(opt => opt.value > (values.price.from || 0))} placeholder="До" {...fields.price.to} />
              </Group>
            </div>
          )} */}

                <Button className={sUtils.pushedTop3} kind="primary" size="lg" block>
                  Забронировать просмотр
                </Button>

                {/* <p className={cn(s.textGrey, sUtils.pushedTop3_5)}>
                  Мы чтим вашу конфиденциальность и никому ничего не раскроем
                </p> */}
              </Col>
            </Row>
          </Container>}

        {!!this.state.requestSent &&
          <div>
            <Icon className={s.iconLogo} icon="jqestate-logo" />

            <h2 className={cn(s.title, s.pushedTop3_5)}>Заявка отправлена!</h2>
            <p className={cn(s.text, s.textGrey, s.pushedTop1_5)}>
              Через 10 минут наш агент свяжется с вами
            </p>
          </div>}
      </Form.Container>
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
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(ByPropertyForm);
