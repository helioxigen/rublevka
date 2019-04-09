import React, { Component } from 'react';

import { connect } from 'react-redux';

// components
import Search from 'components/Search';

// actions
import loadSettlements from 'core/settlements/actions/list/load';

import { Bg, Title, Content, HideXsSm } from './styled';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

// constants
import { resourceName } from 'core/settlements/constants/defaults';

const group = 'all';
const resource = `${resourceName}.${group}`;

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: false };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(resource, this.props, nextProps)) {
      this.load(nextProps);
    }
  }

  load({ state, dispatch }, params = {}) {
    const options = {
      pagination: { ...state.pagination[this.resource], ...params.pagination },
      filter: {
        ...state.filters[resource],
        totalProperties: { min: 1 },
      },
      orderBy: { ...state.order[this.resource], ...params.orderBy },
    };

    dispatch(loadSettlements(options, group));
  }

  render() {
    return (
      <HideXsSm>
        <Bg>
          <Content>
            <Title>
              Агентство&nbsp;загородной&nbsp;недвижимости&nbsp;JQ&nbsp;Estate
            </Title>
            <Search
              withoutBorder
              placeholder="Введите ID объекта или название посёлка"
            />
          </Content>
        </Bg>
      </HideXsSm>
    );
  }
}

const mapState = ({ settlements, filters, pagination, order }) => ({
  state: {
    settlements,
    filters,
    pagination,
    order,
  },
});

const mapDispatch = dispatch => ({
  dispatch,
});

export default connect(
  mapState,
  mapDispatch,
)(Banner);
