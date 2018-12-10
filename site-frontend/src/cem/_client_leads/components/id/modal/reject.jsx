import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Modal, Heading,
  Grid: { Row, Col },
  Form: { Group, Textarea },
 } = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

export default class extends Component {
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

  handleOnClick() {
    this.props.onClick(this.state.reason);
    this.close();
  }

  render() {
    return (
      <div className={s.modalContainer}>
        {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

        <Modal size="md" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
          <div className={s.container}>
            <Row>
              <Col xs="20">
                <Heading size="md">Отклонить лид</Heading>
              </Col>
            </Row>
            <Row>
              <Col xs="20" className={sUtils.pushedTop3}>
                <p className={s.text}>Опишите, почему вы хотите отклонить лид. Руководитель проверит и подтвердит.</p>
              </Col>
            </Row>
            <Row className={sUtils.pushedTop3}>
              <Col xs="20">
                <Group>
                  <Textarea className={s.textarea} rows="9" block kind="primary" value={this.state.reason} onChange={(event) => this.setState({ reason: event.target.value })} />
                </Group>
              </Col>
            </Row>
          </div>
          {React.cloneElement(this.props.submitBtn, { onClick: ::this.handleOnClick, disabled: !this.state.reason })}
        </Modal>
      </div>
    );
  }
}
