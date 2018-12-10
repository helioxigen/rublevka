import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import loadDeal from 'cem/actions/deals/id/load';

import UI from 'cem/components/ui';
const {
  Icon, Loading, Heading,
  ParamList,
  Grid: { Row, Col },
 } = UI;

import { FormattedDate, FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import * as dict from 'cem/constants/deals/dictionaries';

const AgentFee = ({ data: { budget, currency, expectedAgentFee, expectedAgentFixedPrice } }) => {
  if (expectedAgentFee) {
    return <FormattedCurrency symbol={currency} value={Math.floor((budget / 100) * expectedAgentFee)} />;
  } else if (expectedAgentFixedPrice) {
    return <FormattedCurrency symbol={expectedAgentFixedPrice.currency} value={expectedAgentFixedPrice.price} />;
  }
  return <span>&nbsp;</span>;
};

const DealDescription = ({ data: { id, state, details = {}, createdAt } }) => (
  <div>
    <Row>
      <Col sm="6" md="5" lg="4">
        <ParamList label="ID" big>
          {id}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Тип" big>
          {details.offerKind && dict.offerKinds[details.offerKind]}
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Стадия" big>
          <span className={cn(state && s[dict.states[state] && dict.states[state].style])}>{state && dict.states[state] && dict.states[state].title}</span>
        </ParamList>
      </Col>
    </Row>
    <Row className={sUtils.pushedTop2}>
      <Col sm="6" md="5" lg="4">
        <ParamList label="Дата начала" big>
          <FormattedDate value={createdAt} mask="dd.mm.yyyy" />
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Дата завершения" big>
          <FormattedDate value={details.expectedFinishDateAt} mask="dd.mm.yyyy" />
        </ParamList>
      </Col>
      <Col sm="7" md="5" lg="4">
        <ParamList label="Комиссия" big>
          <AgentFee data={details} />
        </ParamList>
      </Col>
    </Row>
  </div>
);

class Deal extends Component {
  componentWillMount() {
    const { id, actions } = this.props;

    actions.loadDeal(id);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, id } = this.props;

    if (nextProps.id !== id) {
      actions.loadDeal(nextProps.id);
    }
  }

  render() {
    const { id, state, title = 'Сделка' } = this.props;
    const { data = {}, isFetching } = state.deals[id] || {};

    if (!id) return null;

    return (
      <section>
        <Heading size="md">
          {title}
          <Link className={s.linkIcon} to={`/deals/${id}`}>
            <Icon className={s.icon} icon="arrow" />
          </Link>
        </Heading>
        {!!isFetching && <Loading />}
        {!isFetching &&
          <Row>
            <Col xs="20">
              <DealDescription data={data} />
            </Col>
          </Row>
        }
      </section>
    );
  }
}

const pickState = ({ deals }) => ({
  state: { deals },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ loadDeal }, dispatch),
});

export default connect(pickState, pickActions)(Deal);
