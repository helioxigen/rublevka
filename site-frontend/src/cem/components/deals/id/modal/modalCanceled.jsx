import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import { fields as formFields } from 'cem/constants/deals/form';
import { cancelValidate } from 'cem/validators/deals';

import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Form,
  Modal,
  Heading,
  Grid: { Row, Col },
  Form: { Group, Textarea },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

const formSettings = {
  form: `cancelDeal`,
  fields: formFields,
  validate: cancelValidate,
};

export default reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      constructor(...args) {
        super(args);

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
        this.props.actions.load();
        this.props.actions.pop(`success`, `Сделка не заключена!`);
      }

      onSubmitFail() {
        this.props.actions.pop(`error`, `Ошибка изменения состояния сделки!`);
      }

      update(values) {
        const { actions } = this.props;
        const {
          expectedAgentFee,
          expectedAgentFixedPrice,
          ...otherDetails
        } = values.details; // eslint-disable-line no-unused-vars
        return Promise.resolve(
          actions.changeState(`unsuccessful`, {
            reason: values.stateDetails.reason,
          }),
        );
      }

      render() {
        const { fields, submitBtn, handleSubmit } = this.props;

        return (
          <div className={s.modalContainer}>
            {React.cloneElement(this.props.children, {
              onClick: ::this.toggle,
            })}

            <Modal
              size="md"
              closePortal={::this.close}
              isOpened={this.state.isOpened}
              onClose={::this.close}
              closeOnEsc
              closeOnOutsideClick
            >
              <Form.Container
                onSubmit={handleSubmit(
                  ::this.update,
                  ::this.onSubmitSuccess,
                  ::this.onSubmitFail,
                )}
              >
                <div className={s.container}>
                  <Row>
                    <Col xs="20">
                      <Heading size="md">Причина</Heading>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="20" className={sUtils.pushedTop3}>
                      <p className={s.text}>
                        Пожалуйста, опишите, как можно подробнее, причину, по
                        которой данная сделка не состоялась. Данное описание
                        будет отправлено вашему руководителю, после чего будет
                        принято окончательное решение по закрытию данной сделке.
                      </p>
                    </Col>
                  </Row>
                  <Row className={sUtils.pushedTop3}>
                    <Col xs="20">
                      <Group>
                        <Textarea
                          className={s.textarea}
                          rows="9"
                          block
                          kind="primary"
                          {...fields.stateDetails.reason}
                          value={fields.stateDetails.reason.value || ``}
                        />
                      </Group>
                    </Col>
                  </Row>
                </div>
                {submitBtn}
              </Form.Container>
            </Modal>
          </div>
        );
      }
    },
  ),
);
