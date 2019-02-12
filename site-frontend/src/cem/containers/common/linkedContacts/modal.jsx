import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createContact } from 'cem/actions/properties/contacts';

import UI from 'cem/components/ui';
const { Modal, Button, Icon } = UI;

import ContactCreationForm from 'cem/components/common/linkedContacts/modalForm.jsx';

import cn from 'classnames';
import s from 'cem/styles/modal/list';
import sButton from 'cem/styles/buttons';

class ContactCreationModal extends Component {
  state = { isOpened: false };

  close() {
    this.setState({ isOpened: false });
  }

  toggle() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    return (
      <div className={cn(s.modalWrapper, this.props.className)}>
        <Button
          type="button"
          className={sButton.btnRoundPlus}
          onClick={::this.toggle}
        >
          <Icon className={s.icon} icon="modal" />
        </Button>
        <Modal
          size="sm"
          closePortal={::this.close}
          isOpened={this.state.isOpened}
          onClose={::this.close}
          closeOnEsc
          closeOnOutsideClick
        >
          <ContactCreationForm {...this.props} closeModal={::this.close} />
        </Modal>
      </div>
    );
  }
}

const pickState = () => ({});
const mapDispatch = dispatch => ({
  actions: bindActionCreators({ createContact }, dispatch),
});

export default connect(
  pickState,
  mapDispatch,
)(ContactCreationModal);
