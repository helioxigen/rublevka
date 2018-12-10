import React, { Component, PropTypes } from 'react';

import cn from 'classnames';

import SelectionForm from './selectionForm';

import UI from 'site/ui';
const {
  Modal,
  Grid: { Row, Col },
} = UI;

import s from 'site/styles/modal/request';
import sUtils from 'site/styles/utils';

class SelectionModal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    propertyCategory: PropTypes.string.isRequired,
  }

  state = {
    isOpened: false,
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

  render() {
    const { propertyCategory = `country` } = this.props;

    return (
      <div className={s.modalContainer}>
        {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

        <Modal
          className={s.modal}
          contentClassName={s.modalContentLanding}
          size="sm"
          closePortal={::this.close}
          isOpened={this.state.isOpened}
          onClose={::this.close}
          closeOnEsc
          closeOnOutsideClick
        >
          <Row sm="center">
            <Col sm="10">
              <SelectionForm
                propertyCategory={propertyCategory}
                className={cn(sUtils.paddingTopXs5Sm3, sUtils.paddingBottom6)}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default SelectionModal;
