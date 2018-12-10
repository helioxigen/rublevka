import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pop } from 'cem/actions/toastr';
import CompaniesActions from 'cem/actions/companies';
const Actions = { ...CompaniesActions, pop };

import Header from 'cem/components/companies/id/header';
import About from 'cem/components/companies/id/about';

import UI from 'cem/components/ui';
const { Grid: { Container } } = UI;

class List extends Component {
  componentWillMount() {
    const { params: { id }, actions } = this.props;
    actions.loadCompany(id);
  }

  render() {
    const { state, params: { id }, hasRight } = this.props;
    const { data } = state.companies[id] || {};

    const permissionProps = {
      isUpdateAllowed: hasRight('company_update', data && data.responsibleUserId),
    };

    return (
      <section>
        <Header {...this.props} {...permissionProps} formKey={id} initialValues={data} data={data} />
        <Container fluid>
          <About {...this.props} {...permissionProps} formKey={id} initialValues={data} data={data} />
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, companies }) => ({
  state: { auth, companies },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(pickState, mapDispatch)(List);
