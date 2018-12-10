import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import UI from 'cem/components/ui';
const {
  Form, Grid, Button, Heading,
  Back, Icon, Dropdown,
  Grid: { Row, Col },
} = UI;

import DealDetails from './dealDetails';
import StateControls from './stateControls';
import Timeline from 'cem/components/common/progressTimeline';
import ManagerControls from './managerControls';
import TransferUserModal from 'cem/containers/common/modal/transferUser';

import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDropdown from 'cem/styles/ui/dropdown';

import { settings as timelineSettings } from 'cem/constants/deals/timeline';

const formSettings = {
  form: 'deal',
};

export default reduxForm(formSettings)(
  class extends Component {
    render() {
      const { formKey, fields, data, actions, state, isUpdateAllowed } = this.props;
      const currentState = (data.stateDetails && data.stateDetails.toApprove) || data.state;

      const isDealFinalized = fields.state.value === 'successful' || fields.state.value === 'unsuccessful';
      const isApprovalNeeded = fields.stateDetails.toApprove.value === 'successful' || fields.stateDetails.toApprove.value === 'unsuccessful';

      return (
        <header className={s.header}>
          <Form.Container>
            <Grid.Container fluid>
              <Row>
                <Col xs="20" className={sUtils.positionRelative}>
                  <Heading size="lg">
                    <Back button={<Button type="button" className={sButton.btnBack}><Icon className={s.iconBack} icon="arrow-right" /></Button>} />
                    {formKey !== 'create' && `Сделка (ID: ${data.id || ''})`}
                  </Heading>
                  {isUpdateAllowed && !isApprovalNeeded && !isDealFinalized &&
                    <Dropdown
                      className={sDropdown.header}
                      button={
                        <Button type="button" className={sButton.btnDropdown}>
                          <Icon className={s.iconSubmenu} icon="submenu" />
                        </Button>
                      }
                    >

                      <TransferUserModal className={sUtils.displayBlock} objectKind="deals" destinationKind="users" responsibleUser={this.props.linkedUserData} reloadAction={this.props.actions.load} objectId={formKey}>
                        <Button type="button" className={sButton.btnDropdownInner}>Передать другому сотруднику</Button>
                      </TransferUserModal>
                      <TransferUserModal className={sUtils.displayBlock} objectKind="deals" destinationKind="departments" responsibleUser={this.props.linkedUserData} reloadAction={this.props.actions.load} objectId={formKey}>
                        <Button type="button" className={sButton.btnDropdownInner}>Передать в другой департамент</Button>
                      </TransferUserModal>
                    </Dropdown>
                  }
                </Col>
              </Row>

              <div className={sUtils.extraPadding}>
                <Row>
                  <Col md="16" mdOffset="2" lg="12" lgOffset="4">
                    <DealDetails {...this.props} state={currentState} />
                  </Col>
                </Row>

                {isUpdateAllowed &&
                  <StateControls {...this.props} state={currentState} stateToApprove={data.stateDetails && data.stateDetails.toApprove} />
                }

                <div className={sUtils.scrollX}>
                  <div className={sUtils.minWidthXs70}>
                    <Timeline className={sUtils.maxWidth75_5} settings={timelineSettings} {...data} />
                  </div>
                </div>

                <ManagerControls data={data} actions={actions} isCurrentUserDepartmentManager={state.auth.details.isManager && !state.auth.details.divisionId} />
              </div>
            </Grid.Container>
          </Form.Container>
        </header>
      );
    }
  },
);
