import React, { Component } from 'react';
import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { cloudfront } from 'core/config/resources';

import StaticMask from 'core/components/ui/staticMask';

import { reduxForm } from 'redux-form';

import UI from 'ui';
const {
  Button,
  Icon,
  Form,
  Grid,
  Image,
  Grid: { Row, Col },
  Form: { Group, Input },
} = UI;

import cn from 'classnames';
import s from 'styles/about/request';
import sUtils from 'styles/utils';

import { complexBuildingLeadRequestSettings as formSettings } from 'constants/leads/forms';

class Request extends Component {
  state = {
    requestSent: false,
  };

  componentWillMount() {
    this.props.fields.requestDetails.offerKind.onChange('purchase');
  }

  toggleDetails() {
    this.setState({ showMore: !this.state.showMore });
  }

  switchOfferKind(offerKind) {
    this.props.fields.requestDetails.offerKind.onChange(offerKind);
  }

  createLead() {
    const {
      actions,
      values: { ...values },
      currentBroker,
    } = this.props;
    const currentBrokerId = currentBroker.country.data
      ? currentBroker.country.data.staffUserId
      : 1;

    const leadData = {
      ...values,
      kind: 'online',

      requestDetails: {
        ...values.requestDetails,
        category: 'country',
        requestKind: 'selection',
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

    actions.requestLead(currentBrokerId, leadData).then(() => {
      this.setState({ requestSent: true });
      actions.setSharedRetargetingKey('vk');
    });
  }

  render() {
    const { fields, handleSubmit, currentBroker = {} } = this.props;

    const image =
      currentBroker.country.data &&
      currentBroker.country.data.photo &&
      currentBroker.country.data.photo.id;

    return (
      <Form.Container
        onSubmit={handleSubmit(::this.createLead)}
        className={s.container}
      >
        {!this.state.requestSent && (
          <Grid.Container>
            <Row lg="center">
              {!!image && (
                <Col md="5" className={sUtils.hideXsSm}>
                  <Image
                    className={s.image}
                    src={`${global.config.cloudfront ||
                      cloudfront}/${image}-thumbnail-512`}
                    width="315"
                    height="315"
                    kind="circle"
                  />
                </Col>
              )}

              <Col md="7" className={s.textCenter}>
                <h1 className={s.title}>
                  Обращайтесь <br className={sUtils.hideFromSm} />к нам
                </h1>
                <p className={s.textMd}>Звоните по телефону</p>
                <a
                  href={`tel:+${global.config.phones.country}`}
                  className={s.link}
                >
                  <StaticMask pattern="+1 (111) 111-11-11">
                    {global.config.phones.country}
                  </StaticMask>
                </a>

                <div className={cn(sUtils.pushedTopXs2_5Sm3, s.dividerTop)}>
                  <p className={cn(s.text, s.textBlack)}>
                    Или оставьте номер и мы перезвоним
                  </p>
                  <Row className={sUtils.pushedTop2_5}>
                    <Col sm="5" lg="5">
                      <Group
                        className={sUtils.resetFormGroupIndent}
                        kind={
                          fields.contactDetails.phoneNumber.touched &&
                          fields.contactDetails.phoneNumber.error &&
                          'error'
                        }
                      >
                        <Input
                          className={s.input}
                          block
                          type="tel"
                          mask="+7 (111) 111-11-11"
                          placeholder="+7 (___) ___ __ __"
                          {...fields.contactDetails.phoneNumber}
                        />
                      </Group>
                    </Col>
                    <Col sm="4" lg="3">
                      <Button
                        className={cn(
                          sUtils.pushedTopXs1_5Sm0,
                          sUtils.borderRadius_4,
                        )}
                        kind="primary"
                        size="lg"
                        block
                      >
                        Отправить
                      </Button>
                    </Col>
                  </Row>
                  {fields.contactDetails.phoneNumber.touched &&
                    fields.contactDetails.phoneNumber.error && (
                      <p className={s.textGreySm}>
                        Похоже, допущена ошибка при написании номера телефона,
                        попробуйте еще раз
                      </p>
                    )}
                </div>
              </Col>
            </Row>
          </Grid.Container>
        )}

        {!!this.state.requestSent && (
          <Grid.Container>
            <Row xs="center">
              <Col sm="10">
                <Icon className={s.iconLogo} icon="jqestate-logo" />
                <h2 className={cn(s.title, sUtils.pushedTop3)}>
                  Заявка отправлена!
                </h2>
                <p className={cn(s.text, s.textGrey)}>
                  Через 10 минут наш агент свяжется с Вами
                </p>
              </Col>
            </Row>
          </Grid.Container>
        )}
      </Form.Container>
    );
  }
}

export default reduxForm(formSettings)(Request);
