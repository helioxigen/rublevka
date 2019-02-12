import React, { Component } from 'react';

import { connect } from 'react-redux';

import UI from 'site/ui';
const {
  Button,
  Icon,
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'site/styles/settlements/list';
import sUtils from 'site/styles/utils';

// import { fields as filterFields } from 'core/constants/settlements/filter';
// import events from 'site/constants/analytics/events';

const excludeFields = [];

class FilterBtn extends Component {
  handleClick() {
    const { /* isOpened, actions, */ toggle } = this.props;

    // if (!isOpened) {
    //   // track(events.COMPLEXES_LIST_FILTER_OPENED);
    // }

    if (typeof window !== `undefined`) window.scrollTo(0, 0);
    toggle();
  }

  render() {
    const { isOpened, count, resource, isFetching, className } = this.props;

    const hasItems = !!count;
    const state = this.props.state.filters[resource] || {};
    const filterCount = Object.keys(state).filter(
      key => excludeFields.indexOf(key) === -1,
    ).length;

    return (
      <Row sm="center" className={cn(sUtils.pushedTopSm5Md4_7, className)}>
        <Col xs="12">
          <Button
            className={s.btn}
            kind="primary"
            size="lg"
            disabled={!hasItems || isFetching}
            onClick={::this.handleClick}
          >
            {!isOpened ? `Открыть` : `Скрыть`} фильтр
            <Icon className={s.iconFilter} icon="filter" />
            {!!filterCount && (
              <span className={s.filterXsLabel}>
                <span className={s.value}>{filterCount}</span>
              </span>
            )}
            <Icon
              className={cn(s.iconArrow, !isOpened ? s.down : s.up)}
              icon="arrow-down"
            />
          </Button>
        </Col>
      </Row>
    );
  }
}

const pickState = ({ filters }) => {
  return {
    state: {
      filters,
    },
  };
};

export default connect(pickState)(FilterBtn);
