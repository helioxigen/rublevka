import React, { Component, PropTypes } from 'react';

import PrimaryCardForm from './primaryCardForm';

import UI from 'site/ui';
const {
  Modal,
  Grid: { Row, Col },
} = UI;

import s from 'site/styles/modal/request';
import sUtils from 'site/styles/utils';

class ByPropertyModal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    propertyCategory: PropTypes.string.isRequired,
    propertyId: PropTypes.number.isRequired,
    dealType: PropTypes.string.isRequired,
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
      <div className={s.modalContainerLg}>
        {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

        <Modal
          className={s.modal}
          contentClassName={s.modalContent}
          size="md"
          closePortal={::this.close}
          isOpened={this.state.isOpened}
          onClose={::this.close}
          closeOnEsc
          closeOnOutsideClick
        >
          <Row sm="center">
            <Col sm="12">
              <PrimaryCardForm
                propertyCategory={propertyCategory}
                propertyId={this.props.propertyId}
                dealType={this.props.dealType}
                className={sUtils.paddingTopXs5Sm3}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ByPropertyModal;
