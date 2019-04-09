import React, { Component, PropTypes } from 'react';

import cn from 'classnames';

import ByPropertyForm from './byPropertyFormTisa';

import UI from 'ui';

import s from 'styles/modal/request';
import sUtils from 'styles/utils';

const {
  Modal,
  Grid: { Row, Col },
} = UI;

class ByPropertyModal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    propertyCategory: PropTypes.string.isRequired,
    propertyId: PropTypes.number.isRequired,
    dealType: PropTypes.string.isRequired,
  };

  state = {
    isOpened: false,
  };

  toggle() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  // handleOpen() {
  //   track(`SearchRequest`, { offerKind: analyticsDealType[this.props.offerKind] || null });
  // }

  close() {
    this.setState({
      isOpened: false,
    });
  }

  render() {
    const { propertyCategory = 'country' } = this.props;

    return (
      <div className={s.modalContainer}>
        {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

        <Modal
          className={s.modal}
          contentClassName={s.modalContent}
          size="sm"
          closePortal={::this.close}
          isOpened={this.state.isOpened}
          onClose={::this.close}
          closeOnEsc
          closeOnOutsideClick
          // onOpen={::this.handleOpen}
        >
          <Row sm="center">
            <Col sm="10">
              <ByPropertyForm
                propertyCategory={propertyCategory}
                propertyId={this.props.propertyId}
                dealType={this.props.dealType}
                className={cn(sUtils.paddingTopXs5Sm3, sUtils.paddingBottom6)}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ByPropertyModal;
