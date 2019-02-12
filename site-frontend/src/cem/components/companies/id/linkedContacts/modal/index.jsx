import React, { Component } from 'react';

import UI from 'cem/components/ui';
const { Modal, Button, Icon } = UI;

import ContactLinkingForm from './linkingForm';
import ContactCreationForm from './creationForm';

import cn from 'classnames';
import s from 'cem/styles/modal/list';
import sButton from 'cem/styles/buttons';

class ContactLinkingModal extends Component {
  state = {
    isOpened: false,
    isLinkingStepSelected: true,
    selectedPhoneNumber: undefined,
  };

  onNextStep(phoneNumber) {
    this.setState({
      isLinkingStepSelected: false,
      selectedPhoneNumber: phoneNumber,
    });
  }

  onPreviousStep() {
    this.setState({
      isLinkingStepSelected: true,
    });
  }

  resetPhoneNumber() {
    this.setState({
      selectedPhoneNumber: undefined,
    });
  }

  close() {
    this.setState({ isOpened: false });
  }

  toggle() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const initialValues = {
      details: {
        phoneNumber: this.state.selectedPhoneNumber,
      },
    };
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
          <div>
            {this.state.isLinkingStepSelected && (
              <ContactLinkingForm
                {...this.props}
                closeModal={::this.close}
                onNextStep={::this.onNextStep}
                initialValues={initialValues}
                resetPhoneNumber={::this.resetPhoneNumber}
              />
            )}
            {!this.state.isLinkingStepSelected && (
              <ContactCreationForm
                {...this.props}
                closeModal={::this.close}
                onPreviousStep={::this.onPreviousStep}
                initialValues={initialValues}
              />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default ContactLinkingModal;
