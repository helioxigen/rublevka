import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { pop } from "cem/actions/toastr";
import { pushPath } from "redux-simple-router";

import UI from "cem/components/ui";
const { Grid: { Container } } = UI;

import Header from "cem/components/deals/id/header";
import Tabs from "cem/components/common/tabs";
import About from "cem/components/deals/id/about";
import Tasks from "cem/_tasks/timeline";

import { transformDeal } from "cem/helpers/deals";

import { fields } from "cem/constants/deals/form";

import { idResourcer } from "core/decorators/fetcher";

class IdContainer extends Component {
  render() {
    const {
      children,
      itemData,
      itemData: { responsibleUser = {} },
      params: { id, tab },
      hasRight,
      ...restProps,
    } = this.props; // eslint-disable-line no-unused-vars

    const formProps = {
      formKey: id,
      fields,
      initialValues: itemData,
    };

    const tabs = [
      {
        url: `/deals/${id}/about`,
        title: `Информация`,
        isShown: true,
      },
      {
        url: `/deals/${id}/tasks`,
        title: `Задачи`,
        isShown: true,
      },
    ];

    const finalStates = [`successful`, `unsuccessful`];
    const isStateFinal = finalStates.indexOf(itemData.state) > -1;
    const isToApproveFinal =
      itemData.stateDetails &&
      finalStates.indexOf(itemData.stateDetails.toApprove) > -1;

    const taskProps = {
      taskCreationParams: {
        dealId: id,
        contactId: itemData.contactDetails && itemData.contactDetails.id,
      },
      isTaskCreationAllowed: hasRight(`task_create`) &&
        !isStateFinal &&
        !isToApproveFinal,
    };

    const permissionsProps = {
      isUpdateAllowed: hasRight(
        `deal_update`,
        responsibleUser.id,
        responsibleUser.departmentId,
        responsibleUser.divisionId,
      ),
      isSensitiveDataVisible: hasRight(
        `deal_sensitive_data`,
        responsibleUser.id,
        responsibleUser.departmentId,
        responsibleUser.divisionId,
      ),
    };

    return (
      <section>
        <Header
          {...restProps}
          {...formProps}
          data={itemData}
          {...permissionsProps}
        />
        <Tabs options={tabs} />
        <Container fluid>
          {tab === `about` &&
            <About
              {...restProps}
              {...formProps}
              data={itemData}
              {...permissionsProps}
            />}
          {tab === `tasks` &&
            <Tasks
              {...restProps}
              {...formProps}
              {...taskProps}
              data={itemData}
              {...permissionsProps}
              group={`byDealId.${id}`}
              pk="dealId"
              id={id}
            />}
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth }) => ({
  state: { auth },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ pop, pushPath }, dispatch),
});

export default connect(pickState, pickActions)(
  idResourcer({
    id: `deals`,
    linkedResourcesSchemes: [
      {
        typeId: `users`,
        primaryKeyPath: `responsibleUser.id`,
        apiPath: `/v1/users/staff`,
      },
      {
        typeId: `contacts`,
        primaryKeyPath: `contactDetails.id`,
      },
      {
        typeId: `leads`,
        primaryKeyPath: `clientLeadId`,
        apiPath: `/v1/client_leads`,
      },
    ],
    transform: transformDeal,
  })(IdContainer),
);
