import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import LeadForm from 'cem/components/requests/search/id/about/lead';
import UI from 'cem/components/ui';
const {
  Modal, Button,
} = UI;

import s from 'cem/styles/modal/list';
import sButton from 'cem/styles/buttons';

import formSettings from 'cem/constants/requests/search/leads/form';

export default reduxForm(formSettings)(submitValidator()(
    class extends Component {
      state = { isOpened: false };

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

      createOrUpdate() {
        const {
          formKey, values, resetForm,
          actions, searchRequestId,
        } = this.props;

        if (formKey === `create`) {
          return actions.createLead(searchRequestId, values).then(lead => {
            actions.processLead(lead.id, `in_progress`).then(() => actions.loadLeads(searchRequestId));
            resetForm();
          });
        } else {
          return actions.updateLead(searchRequestId, formKey, values).then(() => {
            actions.loadLeads(searchRequestId);
          });
        }
      }

      render() {
        const { formKey, handleSubmit, pristine, error, submitting } = this.props;

        return (
          <div className={s.modalContainer}>
            {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

            <Modal size="lg" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
              <LeadForm {...this.props} isUpdateAllowed isSensitiveDataVisible />
              <Button className={sButton.btnWide} kind="success" type="button" size="lg" block disabled={pristine || error || submitting} onClick={handleSubmit(::this.createOrUpdate)}>{formKey === `create` ? `Создать` : `Обновить`} лид</Button>
            </Modal>
          </div>
        );
      }
    }
  )
);
