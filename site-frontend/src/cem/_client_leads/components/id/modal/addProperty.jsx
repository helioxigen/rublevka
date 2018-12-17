import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Modal,
  Heading,
  Grid: { Row, Col },
  Form: { Group, Input },
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
    this.props.onClick(this.state.id);
    this.setState({ isOpened: false });
  }

  render() {
    return (
      <div className={s.modalContainer}>
        {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

        <Modal
          size="md"
          closePortal={::this.close}
          isOpened={this.state.isOpened}
          onClose={::this.close}
          closeOnEsc
          closeOnOutsideClick
        >
          <div className={s.container}>
            <Row>
              <Col xs="20">
                <Heading size="md">Добавить объект по ID</Heading>
              </Col>
            </Row>
            <Row className={sUtils.pushedTop3}>
              <Col xs="20">
                <Group>
                  <Input
                    block
                    kind="primary"
                    value={this.state.id || undefined}
                    onChange={event => this.setState({ id: Number(event.target.value) })}
                  />
                </Group>
              </Col>
            </Row>
          </div>
          {React.cloneElement(this.props.submitBtn, {
            onClick: ::this.handleOnClick,
            disabled: !this.state.id,
          })}
        </Modal>
      </div>
    );
  }
}
