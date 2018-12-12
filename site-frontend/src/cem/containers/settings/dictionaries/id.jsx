import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dictionariesList } from 'cem/constants/dictionaries';
import DictionariesActions from 'cem/actions/settings/dictionaries/id';
import Words from 'cem/components/settings/dictionaries/id';

import styles from 'cem/styles/id/content';
import stylesUtils from 'cem/styles/utils';

import Pagination from 'core/components/pagination';
import UI from 'cem/components/ui';
const { Grid, Heading } = UI;

class KindContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePaginationUpdate = this.handlePaginationUpdate.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadWordsByKind(this.props.params.kind);
  }

  componentWillReceiveProps(nextProps) {
    const { params: { kind }, state: { dictionaries }, actions } = this.props;
    const { pagination } = dictionaries[kind] || {};

    const { params: { kind: newKind }, state: { dictionaries: nextDictionaries } } = nextProps;
    const { pagination: nextPagination } = nextDictionaries[newKind] || {};

    if (nextPagination && pagination && nextPagination.offset !== pagination.offset) {
      actions.loadWordsByKind(kind, nextPagination);
    }
  }

  handlePaginationUpdate(offset) {
    const { actions, params: { kind }, state: { dictionaries: { pagination } } } = this.props;

    actions.updatePagination({
      kind,
      pagination: {
        ...pagination,
        offset,
      },
    });
  }

  render() {
    const { params: { category, kind }, state: { dictionaries } } = this.props;
    const { items = [], pagination = {} } = dictionaries[kind] || {};

    if (dictionaries[kind] && dictionaries[kind].isFetching) {
      return <UI.Loading />;
    }

    return (
      <section className={styles.section}>
        <Grid.Container fluid>
          <Words {...this.props} kind={kind} items={items} />

          {dictionaries &&
            dictionaries[kind] &&
            <Grid.Row xs="center">
              <Grid.Col sm="10" className={stylesUtils.pushed6_0}>
                {items &&
                  !!items.length &&
                  <Pagination {...pagination} onUpdate={this.handlePaginationUpdate} />}
              </Grid.Col>
            </Grid.Row>}
        </Grid.Container>
      </section>
    );
  }
}

const pickState = ({ dictionaries }) => ({
  state: { dictionaries },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(DictionariesActions, dispatch),
});

export default connect(pickState, pickActions)(KindContainer);
