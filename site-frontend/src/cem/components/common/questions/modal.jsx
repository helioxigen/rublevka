import React, { Component } from 'react';

import { validatorShortcut } from 'core/decorators/submitValidator';
import formSettings from 'cem/constants/csi/form';

import Questions from './list';
import UI from 'cem/components/ui';
const {
  Modal, Heading,
  Grid: { Container, Row, Col },
 } = UI;

import s from 'cem/styles/modal/list';

export default validatorShortcut(formSettings)(
  class extends Component {
    state = { isOpened: false };
    toggle() { this.setState({ isOpened: !this.state.isOpened }); }
    close() { this.setState({ isOpened: false }); }

    update() {
      const { values } = this.props;
      const csiAnswers = values.questions.map(({ questionId, rate }) => ({ questionId, rate }));

      this.props.action({ csiAnswers });
    }

    render() {
      const { submitBtn, handleSubmit } = this.props;

      return (
        <div className={s.modalContainer}>
          {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

          <Modal size="extra50" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
            <Container fluid className={s.container}>
              <Row>
                <Col sm="20">
                  <Heading size="md">Оцените качество</Heading>
                </Col>
              </Row>
              <Questions {...this.props} />
            </Container>
            {React.cloneElement(submitBtn, { ...submitBtn.props, type: `button`, onClick: handleSubmit(::this.update) })}
          </Modal>
        </div>
      );
    }
  }
);
