import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import FormField from 'cem/helpers/formField';

import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Modal, Heading,
  Grid: { Row, Col },
  Form: { Textarea },
 } = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

const formSettings = {
  form: `imageReuqestChangeState`,
  fields: [`reason`],
  validate: ({ reason }) => ({ reason: !reason && `Обязательно` }),
};

export default reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      constructor(props) {
        super(props);

        this.state = {
          isOpened: false,
        };
      }

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

        this.props.action(values);
      }

      render() {
        const { fields, submitBtn, handleSubmit, kind } = this.props;
        const text = {
          return: {
            heading: `Вернуть на доработку`,
            description: `Почему заявку нужно доработать?`,
          },
          reject: {
            heading: `Отменить заявку`,
            description: `Укажите причину, почему вы отклоняете эту заявку`,
          },
        };

        return (
          <div className={s.modalContainer}>
            {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

            <Modal size="md" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
              <div className={s.container}>
                <Row>
                  <Col xs="20">
                    <Heading size="md">{text[kind].heading}</Heading>
                  </Col>
                </Row>
                <Row className={sUtils.pushedTop1_5}>
                  <Col xs="20">
                    <p className={s.text}>{text[kind].description}</p>
                  </Col>
                </Row>
                <Row className={sUtils.pushedTop3}>
                  <Col sm="20">
                    <FormField field={fields.reason}>
                      <Textarea block rows="9" className={s.textarea} />
                    </FormField>
                  </Col>
                </Row>
              </div>
              {React.cloneElement(submitBtn, { ...submitBtn.props, type: `button`, disabled: !fields.reason.value, onClick: handleSubmit(::this.update) })}
            </Modal>
          </div>
        );
      }
    }
  )
);
