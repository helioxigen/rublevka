import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import FormField from 'cem/helpers/formField';

import Uploadcare from 'cem/components/uploadcare';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Daypicker,
  Icon,
  Modal,
  Tooltip,
  Heading,
  Form: { Input },
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/modal/list';
import sMain from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDaypicker from 'cem/styles/ui/daypicker';

const formSettings = {
  form: `bannerActive`,
  fields: [`state`, `image.url`, `dateOfCompletion`],
  validate: values => ({
    image: { url: !values.image.url && `Обязательно` },
    dateOfCompletion: !values.dateOfCompletion && `Обязательно`,
  }),
};

const ModalInner = reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      update() {
        const {
          formKey,
          propertyId,
          category,
          data,
          values: { image, ...values },
          closeModal,
          actions,
        } = this.props;
        const bannerData = { ...data, ...values };

        actions
          .updateBanner(propertyId, category, formKey, bannerData)
          .then(() => {
            actions
              .uploadBanner(propertyId, category, formKey, image.url)
              .then(() => {
                actions.pop(`success`, `Реклама установлена`);
                closeModal();
                actions.loadBanners(propertyId, category, values.state);
                actions.loadBanners(propertyId, category, data.state);
              });
          });
      }

      render() {
        const { fields, handleSubmit } = this.props;

        return (
          <Form.Container onSubmit={handleSubmit(::this.update)}>
            <div className={s.container}>
              <Row>
                <Col xs="20">
                  <Heading size="md">Установить рекламу</Heading>
                </Col>
              </Row>
              <Row className={sUtils.pushedTop3}>
                <Col xs="20">
                  <FormField
                    field={fields.dateOfCompletion}
                    label="Дата установки"
                  >
                    <Daypicker
                      className={cn(
                        sUtils.pushedTop1_2,
                        sUtils.fullWidth,
                        sDaypicker.daypicker,
                      )}
                      restrict="past"
                      control={
                        <Input
                          block
                          {...fields.dateOfCompletion}
                          type="text"
                          required
                        />
                      }
                      button={
                        <Button className={sDaypicker.btn}>
                          <Icon className={sDaypicker.icon} icon="calendar" />
                        </Button>
                      }
                      onDayClick={fields.dateOfCompletion.onBlur}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col xs="20">
                  <FormField
                    className={sUtils.resetIndentation}
                    field={fields.image.url}
                    label="Фотография"
                  >
                    <Uploadcare keepValue>
                      <Button
                        type="button"
                        className={cn(sMain.btnBigPlus, sUtils.pushedTop1_2)}
                        block
                      >
                        <Icon className={s.iconAdd} icon="plus" />
                      </Button>
                    </Uploadcare>
                  </FormField>
                </Col>
              </Row>
            </div>
            <Button className={sButton.btnWide} kind="success" size="lg" block>
              Сохранить
            </Button>
          </Form.Container>
        );
      }
    },
  ),
);

export default class extends Component {
  toggleModal(state) {
    this.setState({ isOpened: state });
  }

  render() {
    return (
      <div className={s.modalWrapper}>
        <Tooltip title="Установить рекламу" position="top">
          <Button
            type="button"
            className={cn(sButton.btnTimes, sUtils.resetIndentation)}
            block
            size="xs"
            onClick={() => this.toggleModal(true)}
          >
            <Icon className={s.btnIcon} icon="checkmark" />
          </Button>
        </Tooltip>
        <Modal
          size="sm"
          closeOnEsc
          onClose={() => this.toggleModal(false)}
          closePortal={() => this.toggleModal(false)}
          {...this.state}
        >
          <ModalInner
            {...this.props}
            closeModal={() => this.toggleModal(false)}
          />
        </Modal>
      </div>
    );
  }
}
