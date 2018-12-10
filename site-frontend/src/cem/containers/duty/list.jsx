import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushPath } from 'redux-simple-router';

import PaginationActions from 'core/actions/pagination';

import DutyActions from 'cem/actions/duty';
import UserActions from 'cem/actions/users';
import DepartmentActions from 'cem/actions/settings/departments';
import { pop } from 'cem/actions/toastr';

import Pagination from 'core/components/pagination';

import ListErrorMessage from 'cem/components/common/listErrorMessage';

import UI from 'cem/components/ui';
const {
  Modal, Button, Loading, Heading,
  Grid: { Container, Row, Col },
} = UI;

import Card from 'cem/components/duty/card';
import ModalDutyForm from 'cem/components/duty/modalDutyForm';

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

import { prepareInitialValues } from 'cem/helpers/duty';

class DutyListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  componentWillMount() {
    const limit = this.props.location.query.limit || 32;
    const pagination = this.props.state.pagination.duty || {};
    const queryParams = {
      pagination: {
        ...pagination,
        limit,
      },
    };

    this.props.actions.loadDuties(queryParams);
  }

  componentWillReceiveProps(nextProps) {
    const pagination = this.props.state.pagination.duty || {};
    const nextPagination = nextProps.state.pagination.duty || {};

    if (pagination.offset !== nextPagination.offset) {
      this.props.actions.loadDuties({ pagination: nextPagination });
    }
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(`duty`, { offset });
  }

  toggleModal(state) {
    this.setState({
      isOpen: state,
    });
  }

  render() {
    const {
      actions, state, state: { duty: { list: { items = [], isFetching, errors = [] } } },
      hasRight,
    } = this.props;
    const pagination = state.pagination.duty || {};

    const isCreationAllowed = hasRight(`daily_duty_create`);
    const isUpdateAllowed = hasRight(`daily_duty_update`);

    return (
      <section>
        <Container fluid>
          <div className={s.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  График дежурства {isCreationAllowed && <Button className={sUtils.pushedLeftSm2} kind="accent" size="xs" onClick={() => this.toggleModal(true)}>добавить</Button>}
                </Heading>
                <Modal size="sm" closeOnEsc closeOnOutsideClick onClose={() => this.toggleModal(false)} isOpened={this.state.isOpen} closePortal={() => this.toggleModal(false)}>
                  <ModalDutyForm formKey="create" initialValues={prepareInitialValues()} actions={this.props.actions} closeModal={() => this.toggleModal(false)} />
                </Modal>
              </Col>
            </Row>
          </div>
        </Container>
        {!isFetching && !!errors.length && <ListErrorMessage errors={errors} />}
        {!isFetching && !errors.length && !items.length && <Heading notFound>Не найдено дежурных</Heading>}
        {isFetching && <Loading />}
        {items && !!items.length && items.map((item) => <Card key={item.id} {...item} state={state} actions={actions} isUpdateAllowed={isUpdateAllowed} />)}
        <Container fluid>
          <Row xs="center">
            <Col sm="10" className={sUtils.pushed6_0}>
              {!isFetching && items && !!items.length && <Pagination {...pagination} onUpdate={::this.handlePaginationUpdate} />}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const pickState = ({ duty, users, departments, pagination }) => ({
  state: { duty, users, departments, pagination },
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators({ ...DutyActions, loadUsers: UserActions.loadList, ...PaginationActions, ...DepartmentActions, pushPath, pop }, dispatch),
});

export default connect(pickState, mapDispatch)(DutyListContainer);
