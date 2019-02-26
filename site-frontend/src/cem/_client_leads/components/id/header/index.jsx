import React, { Component } from 'react';

import LeadDetails from './leadDetails';
import StateControls from './stateControls';
import ManagerControls from './managerControls';
import Timeline from 'cem/components/common/progressTimeline';
import TransferUserModal from 'cem/containers/common/modal/transferUser';

import UI from 'cem/components/ui';
const {
  Form,
  Back,
  Icon,
  Dropdown,
  Grid,
  Button,
  Heading,
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDropdown from 'cem/styles/ui/dropdown';

import timelineSettings from 'cem/_client_leads/constants/timeline';

class Header extends Component {
  onSubmitSuccess() {
    this.props.fields.toggle.onChange(undefined);
  }

  createOrUpdate() {
    const { formKey, actions, values } = this.props;

    if (formKey === 'create') return actions.createLead(values);
    if (formKey !== 'create') return actions.updateLead(formKey, values);
  }

  process(action, body, validate) {
    const { handleSubmit } = this.props;
    const submitFn = () =>
      this.props.actions.processLead(this.props.id, action, body);

    if (validate) {
      handleSubmit(submitFn)();
    } else {
      handleSubmit(submitFn, null, null, false)();
    }
  }

  render() {
    const {
      data = {},
      requestKind,
      id,
      state,
      actions,
      formKey,
      handleSubmit,
      pristine,
      error,
      submitting,
      isUpdateAllowed,
    } = this.props;
    const { state: leadState, stateDetails = {}, requestDetails = {} } = data;

    // TODO Extract this flag into container along with similar flags from other components
    // const isStatic = (formKey !== `create` && !isUpdateAllowed) || stateDetails.toApprove || ([`spam`, `processed`, `rejected`].indexOf(leadState) > -1) || (leadState === `new` && data.kind !== `phone_call`) || (leadState === `new` && data.kind === `phone_call` && !requestKind);
    const canTransfer =
      (leadState === 'new' || leadState === 'in_progress') &&
      !stateDetails.toApprove;

    const responsibleUserId = data.responsibleUser && data.responsibleUser.id;
    const responsibleUser = state.users[responsibleUserId] || {};

    return (
      <header className={s.header}>
        <Form.Container
          onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
        >
          <Grid.Container fluid>
            <Row>
              <Col xs="20" className={sUtils.positionRelative}>
                <Heading size="lg">
                  <Back
                    button={
                      <Button type="button" className={sButton.btnBack}>
                        <Icon className={s.iconBack} icon="arrow-right" />
                      </Button>
                    }
                  />

                  {id !== 'create'
                    ? `Лид (ID: ${data.id})`
                    : 'Создать новый лид'}
                </Heading>
                {canTransfer && (
                  <Dropdown
                    className={sDropdown.header}
                    button={
                      <Button type="button" className={sButton.btnDropdown}>
                        <Icon className={s.iconSubmenu} icon="submenu" />
                      </Button>
                    }
                  >
                    <TransferUserModal
                      className={sUtils.displayBlock}
                      objectKind="client_leads"
                      objectId={data.id}
                      destinationKind="users"
                      responsibleUser={responsibleUser.data}
                      reloadAction={actions.loadLead}
                    >
                      <Button
                        type="button"
                        className={sButton.btnDropdownInner}
                      >
                        Передать другому сотруднику
                      </Button>
                    </TransferUserModal>
                    <TransferUserModal
                      className={sUtils.displayBlock}
                      objectKind="client_leads"
                      objectId={data.id}
                      destinationKind="departments"
                      responsibleUser={responsibleUser.data}
                      reloadAction={actions.loadLead}
                    >
                      <Button
                        type="button"
                        className={sButton.btnDropdownInner}
                      >
                        Передать в другой департамент
                      </Button>
                    </TransferUserModal>
                  </Dropdown>
                )}
              </Col>
            </Row>

            <div className={sUtils.extraPadding}>
              <LeadDetails
                {...this.props}
                state={leadState}
                stateToApprove={stateDetails.toApprove}
              />

              {id !== 'create' && isUpdateAllowed && (
                <StateControls
                  state={leadState}
                  stateToApprove={stateDetails.toApprove}
                  requestKind={requestKind}
                  process={::this.process}
                  currentRequestDetails={requestDetails}
                />
              )}

              {id !== 'create' && (
                <Timeline
                  className={sUtils.maxWidth75_5}
                  settings={timelineSettings}
                  {...data}
                />
              )}

              {id !== 'create' && (
                <ManagerControls
                  state={leadState}
                  stateDetails={stateDetails}
                  isCurrentUserDepartmentManager={
                    state.auth.details.isManager &&
                    !state.auth.details.divisionId
                  }
                  process={::this.process}
                  updatedByUserId={data.updatedByUserId}
                  updatedAt={data.updatedAt}
                />
              )}
            </div>
          </Grid.Container>
          {formKey === 'create' && (
            <Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="success"
              size="md"
              block
            >
              Добавить
            </Button>
          )}
          {formKey !== 'create' && (
            <Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="warning"
              size="md"
              block
            >
              Сохранить
            </Button>
          )}
        </Form.Container>
      </header>
    );
  }
}

export default Header;
