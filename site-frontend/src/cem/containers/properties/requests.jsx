import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PaginationActions from 'core/actions/pagination';
import ImagesRequestsActions from 'cem/actions/requests/images';

import UI from 'cem/components/ui';
const {
  Loading, Heading, Button,
  Grid: { Row, Col },
} = UI;

import Card from 'cem/components/properties/id/photos/requests/card.jsx';
import CountIndicator from 'cem/components/common/countIndicator';

import cn from 'classnames';
import sCard from 'cem/styles/ui/card2';
import sUtils from 'cem/styles/utils';

const group = (kind, objectId) => `${kind}.byPropertyId.${objectId}`;
const recordsLimit = 5;

class Requests extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  handlePaginationUpdate(offset) {
    this.load(this.props, { pagination: { offset } }, { append: true });
  }

  load({ actions, kind, objectId }, queryParams = { pagination: {} }, options = {}) {
    const params = {
      filter: { kind, objectId },
      pagination: { ...queryParams.pagination, limit: recordsLimit },
    };

    actions.loadImagesRequests(group(kind, objectId), params, options.append);
  }

  render() {
    const { state, kind, objectId, objectKlass, className, isImagesOrderingAllowed } = this.props;
    const { items = [], isFetching } = state.imagesRequests.list[`${group(kind, objectId)}`] || {};

    const pagination = state.pagination[`imagesRequests.${group(kind, objectId)}`] || {};

    return (
      <div className={cn(className)}>
        <Heading size="sm" className={sUtils.pushedBottom3}>
          <span>
            {!!pagination.total && <CountIndicator count={pagination.total} declensionForms={['заказ', 'заказа', 'заказов']} />}
            {!!pagination.total && isImagesOrderingAllowed &&
            <Button className={sUtils.pushedLeftSm2} kind="accent" size="xs" to={`/requests/properties/images/create?kind=${kind}&objectId=${objectId}&objectKlass=${objectKlass}`}>заказать</Button>
              }
          </span>
        </Heading>
        {items.map(item =>
          (<Card
            key={item.id} data={item}
            responsibleUserData={state.users[item.responsibleUserId] && state.users[item.responsibleUserId].data}
            createdByUserData={state.users[item.createdByUserId] && state.users[item.createdByUserId].data}
          />),
        )}
        {isFetching && <Loading />}
        {!isFetching && !items.length &&
          <Row xs="center">
            <Col xs="20">
              <Heading notFound>
                Нет заказов
              </Heading>
              {!isFetching && !pagination.total && isImagesOrderingAllowed &&
                <Button className={sUtils.pushedTop2} kind="accent" size="xs" to={`/requests/properties/images/create?kind=${kind}&objectId=${objectId}&objectKlass=${objectKlass}`}>заказать</Button>
              }
            </Col>
          </Row>
        }
        {!isFetching && pagination && pagination.total > pagination.limit && pagination.total > items.length &&
          <Button size="md" className={sCard.button} onClick={() => this.handlePaginationUpdate(pagination.offset + pagination.limit)}>
            Загрузить ещё
          </Button>
        }
      </div>
    );
  }
}

const pickState = ({ auth, pagination, users, imagesRequests }) => ({
  state: { auth, pagination, users, imagesRequests },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ImagesRequestsActions, ...PaginationActions }, dispatch),
});

export default connect(pickState, pickActions)(Requests);
