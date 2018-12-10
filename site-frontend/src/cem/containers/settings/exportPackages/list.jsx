import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import PaginationActions from 'core/actions/pagination';
import FilterActions from 'core/actions/filters';
import * as ExportPackagesActions from 'cem/actions/settings/exportPackages';

import UI from 'cem/components/ui';
const {
  Loading,
  Button, Heading,
  Grid: { Container, Row, Col },
} = UI;

import Card from 'cem/components/settings/exportPackages/card';
import Pagination from 'core/components/pagination';
import ListErrorMessage from 'cem/components/common/listErrorMessage';

import sHeader from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';

// Helpers
import { isPaginationOrFiltersOrOrderByUpdated } from 'core/helpers/shouldLoad';

// Settings
const group = `all`;
const resource = `exportPackages.${group}`;

class ExportPackages extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isPaginationOrFiltersOrOrderByUpdated(resource, this.props, nextProps)) {
      this.load(nextProps);
    }
  }

  load({ state, actions }) {
    const options = {
      pagination: state.pagination[resource],
      filter: state.filters[resource],
    };

    actions.loadPackages(options, group);
  }

  handlePaginationUpdate(offset) {
    window.scrollTo(0, 0);

    this.props.actions.updatePagination(resource, { offset });
  }

  render() {
    const { state, hasRight } = this.props;
    const { ids = [], isFetching, errors = [] } = state.exportPackages[group] || {};

    const isCreateAllowed = hasRight(`export_create`);

    const pagination = state.pagination[resource] || {};

    const isErrorsPresented = !isFetching && !!errors.length;
    const isNotFound = !isFetching && !errors.length && !ids.length;
    const isNotEmpty = !isFetching && !!ids.length;

    return (
      <section>
        <Container fluid>
          <div className={sHeader.header}>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  Пакеты выгрузок
                  {isCreateAllowed && (
                    <Button className={sUtils.pushedLeftSm2} kind="success" size="xs" to={`/settings/export_packages/create`}>
                      добавить
                    </Button>
                  )}
                </Heading>
              </Col>
            </Row>
          </div>
        </Container>

        {isErrorsPresented && <ListErrorMessage errors={errors} />}
        {isNotFound && <Heading notFound>Пакеты не найдены</Heading>}
        {!isFetching && ids.map(id => <Card key={id} data={state.exportPackages[id] && state.exportPackages[id].data} />)}
        {isFetching && <Loading />}
        {isNotEmpty &&
          <Container fluid>
            <Row xs="center">
              <Col sm="10" className={sUtils.pushed6_0}>
                <Pagination {...pagination} onUpdate={::this.handlePaginationUpdate} />
              </Col>
            </Row>
          </Container>
        }
      </section>
    );
  }
}

const pickState = ({ exportPackages, filters, pagination, order }) => ({
  state: { exportPackages, filters, pagination, order },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ ...ExportPackagesActions, ...FilterActions, ...PaginationActions }, dispatch),
});

export default connect(pickState, pickActions)(ExportPackages);
