import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardForm from './cardForm';

import sendAnalytics from 'core/analytics/actions';
import * as analyticsEvents from 'core/analytics/constants';

import UI from 'site/ui';
const {
  Modal,
  Grid: { Row, Col },
} = UI;

import s from 'landing/styles/request/cardPopUp';

class CardModal extends Component {
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
    const { data = {} } = this.props;

    if (!this.state.isOpened) {
      this.props.actions.sendAnalytics(
        analyticsEvents.PropertyCardOpened({ id: data.id }),
      );
    }

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
    const { propertyCategory = `country`, data = {} } = this.props;

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
              <CardForm
                propertyCategory={propertyCategory}
                propertyId={data.id}
                data={data}
                dealType="sale"
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

// redux connectors
const pickState = () => {
  return {
    state: {},
  };
};

const pickActions = dispatch => {
  const actions = {
    sendAnalytics,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(CardModal);
