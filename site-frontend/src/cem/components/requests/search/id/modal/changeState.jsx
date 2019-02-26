import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import ResponsibleUser from '../responsible';
import UI from 'cem/components/ui';
const { Modal } = UI;

import s from 'cem/styles/modal/list';

const formSettings = {
  form: `imageReuqestChangeState`,
  fields: [`responsibleUserId`],
  validate: ({ responsibleUserId }) => ({
    responsibleUserId: !responsibleUserId && `Обязательно`,
  }),
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
        const { fields, submitBtn, handleSubmit } = this.props;

        return (
          <div className={s.modalContainer}>
            {React.cloneElement(this.props.children, {
              onClick: ::this.toggle,
            })}
            <Modal
              size="sm"
              closePortal={::this.close}
              isOpened={this.state.isOpened}
              onClose={::this.close}
              closeOnEsc
              closeOnOutsideClick
            >
              <ResponsibleUser field={fields.responsibleUserId} />
              {React.cloneElement(submitBtn, {
                ...submitBtn.props,
                type: `button`,
                onClick: handleSubmit(::this.update),
              })}
            </Modal>
          </div>
        );
      }
    },
  ),
);
