import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import transfer from 'cem/actions/transfer';

import UI from 'cem/components/ui';
const { Modal } = UI;

import TransferUserForm from 'cem/components/common/transferUserForm';

import cn from 'classnames';
import s from 'cem/styles/modal/list';

class TransferModal extends Component {
  state = {
    isOpened: false,
  }

  close() {
    this.setState({ isOpened: false });
  }

  toggle() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const { actions, transferAction: customTransferAction, className } = this.props;
    const transferAction = customTransferAction || actions.transfer;

    return (
      <div className={cn(s.modalContainer, className)}>
        {React.cloneElement(this.props.children, { onClick: ::this.toggle })}
        <Modal size="sm" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
          <TransferUserForm {...this.props} transferAction={transferAction} closeModal={::this.close} />
        </Modal>
      </div>
    );
  }
}

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ transfer }, dispatch),
});

export default connect(() => ({}), pickActions)(TransferModal);
