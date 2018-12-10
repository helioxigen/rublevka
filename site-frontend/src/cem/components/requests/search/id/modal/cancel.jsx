import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Modal, Heading,
  Grid: { Row, Col },
 } = UI;

import Properties from 'cem/containers/common/properties';
import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

const formSettings = {
  form: `imageReuqestChangeState`,
  fields: [`propertyIds[]`],
};

export default reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      state = { isOpened: false };

      toggle() {
        this.setState({
          isOpened: !this.state.isOpened,
        });
      }

      close() {
        this.setState({
          isOpened: false,
        });
      }

      onSubmitSuccess() {
        this.close();
        this.props.actions.pop(`success`, `Состояние заявки изменено!`);
      }

      onSubmitFail() {
        this.props.actions.pop(`error`, `Ошибка изменения состояния заявки!`);
      }

      update() {
        const { values } = this.props;

        return this.props.action(values);
      }

      render() {
        const { values, submitBtn, handleSubmit, propertyCategory = `country` } = this.props;

        return (
          <div className={s.modalContainer}>
            {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

            <Modal size="lg" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
              <div className={s.container}>
                <Row>
                  <Col xs="20">
                    <Heading size="md">Отклонить заявку</Heading>
                  </Col>
                </Row>
                <Row className={sUtils.pushedTop1}>
                  <Col xs="20">
                    <p className={s.text}>Укажите подходящие объекты из нашей базы</p>
                  </Col>
                </Row>
                <Row className={sUtils.pushedTop1}>
                  <Col xs="20">
                    <Properties field={this.props.fields.propertyIds} propertyCategory={propertyCategory} />
                  </Col>
                </Row>
              </div>
              {React.cloneElement(submitBtn, { ...submitBtn.props, type: `button`, disabled: !values.propertyIds.length, onClick: handleSubmit(::this.update) })}
            </Modal>
          </div>
        );
      }
    }
  )
);
