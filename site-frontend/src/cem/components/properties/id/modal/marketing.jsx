import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import validate from 'cem/validators/propertyBanner';
import submitValidator from 'core/decorators/submitValidator';
import FormField from 'cem/helpers/formField';

import Uploadcare from 'cem/components/uploadcare';

import { bannerStates } from 'cem/constants/properties/options';
import { fetchDictionary } from 'cem/helpers/autocomplete';

import { PROPERTY_BANNERS_OPENED, PROPERTY_BANNERS_CREATED, PROPERTY_BANNERS_GAVE_ACTIVE } from 'cem/constants/analytics';

import UI from 'cem/components/ui';
const {
  Form, Modal, Button, Icon, Heading,
  AsyncSelect, Select, Daypicker,
  Grid: { Container, Row, Col },
  Form: { Input, Textarea },
 } = UI;

import cn from 'classnames';
import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDaypicker from 'cem/styles/ui/daypicker';

const formSettings = {
  form: `createBanner`,
  fields: [`state`, `kindId`, `reason`, `image.url`, `expectedDateOfCompleteion`, `dateOfCompletion`],
  validate,
};

const ModalInner = reduxForm(formSettings)(submitValidator()(
  class extends Component {
    componentDidMount() {
      const { propertyId, category } = this.props;

      this.props.actions.sendAnalytics(PROPERTY_BANNERS_OPENED, {
        propertyId,
        category,
      });
    }

    create() {
      const { propertyId, category, values: { image, state, ...values }, actions, responsibleUserId } = this.props;
      const messages = { ordered: `Реклама заказана`, denied: `В рекламе отказано`, active: `Реклама размещена` };

      actions.createBanner(propertyId, category, { responsibleUserId, ...values })
        .then(({ bannerId }) => {
          actions.sendAnalytics(PROPERTY_BANNERS_CREATED, {
            propertyId,
            category,
            state,
            bannerId,
          });

          if (state === `active`) {
            actions.sendAnalytics(PROPERTY_BANNERS_GAVE_ACTIVE, {
              propertyId,
              category,
              bannerId,
            });

            actions.uploadBanner(propertyId, category, bannerId, image.url)
              .then(() => {
                actions.pop(`success`, messages[state]);
                this.props.closeModal();
                actions.loadBanners(propertyId, category, state);
              });
          } else {
            actions.pop(state === `ordered` ? `success` : `info`, messages[state]);
            this.props.closeModal();
            actions.loadBanners(propertyId, category, state);
          }
        });
    }

    render() {
      const { fields, handleSubmit } = this.props;

      return (
        <Form.Container onSubmit={handleSubmit(::this.create)}>
          <div className={s.container}>
            <Row className={sUtils.pushedBottom3}>
              <Col xs="20">
                <Heading size="md">Добавить внешнюю рекламу</Heading>
              </Col>
            </Row>

            <Row>
              <Col xs="20">
                <FormField field={fields.state} label="Статус" float>
                  <Select options={bannerStates} />
                </FormField>
              </Col>
            </Row>

            <Row>
              <Col xs="20">
                <FormField field={fields.kindId} label="Тип" float>
                  <AsyncSelect labelKey="title" valueKey="id" asyncOptions={fetchDictionary(`property_banner`)} />
                </FormField>
              </Col>
            </Row>

            {fields.state.value === `ordered` &&
              <Row>
                <Col xs="20">
                  <FormField field={fields.expectedDateOfCompleteion} label="Ожидаемая дата установки">
                    <Daypicker className={cn(sUtils.fullWidth, sDaypicker.daypicker)} restrict="past"
                      control={<Input block {...fields.expectedDateOfCompleteion} type="text" />}
                      button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                      onDayClick={fields.expectedDateOfCompleteion.onBlur}
                    />
                  </FormField>
                </Col>
              </Row>
            }

            {fields.state.value === `active` &&
              <section>
                <Row>
                  <Col xs="20">
                    <FormField field={fields.dateOfCompletion} label="Дата установки">
                      <Daypicker className={cn(sUtils.fullWidth, sDaypicker.daypicker)} restrict="past"
                        control={<Input block {...fields.dateOfCompletion} type="text" />}
                        button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                        onDayClick={fields.dateOfCompletion.onBlur}
                      />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col xs="20">
                    <FormField field={fields.image.url} label="Фотография">
                      <Uploadcare keepValue>
                        <Button type="button" className={cn(sButton.btnBigPlus, sUtils.pushedTop1_2)} block>
                          <Icon className={s.iconAdd} icon="plus" />
                        </Button>
                      </Uploadcare>
                    </FormField>
                  </Col>
                </Row>
              </section>
            }

            {fields.state.value === `denied` &&
              <FormField field={fields.reason} label="Причина">
                <Textarea className={cn(s.textarea, sUtils.pushedTop1_2)} block rows="3" />
              </FormField>
            }
          </div>
          <Button className={sButton.btnWide} kind="success" size="lg" block>Записать</Button>
        </Form.Container>
      );
    }
  }
));

export default class extends Component {
  state = {};

  toggleModal(state) {
    this.setState({
      isOpened: state,
    });
  }

  render() {
    return (
      <div className={s.modalWrapper}>
        <Button type="button" className={cn(sButton.btnRoundPlus, sUtils.pushedLeft1)} onClick={() => this.toggleModal(true)}>
          <Icon className={s.icon} icon="modal" />
        </Button>

        <Modal size="sm" closeOnEsc onClose={() => this.toggleModal(false)} closePortal={() => this.toggleModal(false)} {...this.state}>
          <ModalInner {...this.props} closeModal={() => this.toggleModal(false)} />
        </Modal>
      </div>
    );
  }
}
