import React, { Component } from 'react';

import { Link } from 'react-router';

import { states } from 'cem/constants/deals/dictionaries';
import { offerKinds } from 'cem/constants/properties/dictionaries';

import UI from 'cem/components/ui';
const {
  Label,
  ParamList,
  Grid: { Container, Row, Col },
} = UI;
import { FormattedDate, FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/deals/card';
import sUtils from 'cem/styles/utils';

import isEqual from 'lodash/isEqual';

const AgentFee = ({
  budget,
  currency,
  expectedAgentFee,
  expectedAgentFixedPrice,
}) => {
  if (expectedAgentFee) {
    const fee = Math.floor((budget / 100) * expectedAgentFee);
    return <FormattedCurrency symbol={currency} value={fee} />;
  } else if (expectedAgentFixedPrice) {
    return (
      <FormattedCurrency
        symbol={expectedAgentFixedPrice.currency}
        value={expectedAgentFixedPrice.price}
      />
    );
  }
  return <span>&nbsp;</span>;
};

class Card extends Component {
  shouldComponentUpdate(nextProps) {
    const { data, linkedContact } = this.props;
    return (
      !isEqual(data, nextProps.data) ||
      !isEqual(linkedContact, nextProps.linkedContact)
    );
  }

  render() {
    const { data, linkedContact } = this.props;
    const isToApprove = !!data.stateDetails.toApprove;
    const isArchive = false; // TODO fix this
    const isActive = !isToApprove && !isArchive;

    return (
      <Link
        to={`/deals/${data.id}`}
        className={cn(
          s.card,
          data.stateDetails &&
            data.stateDetails.toApprove &&
            s[states[data.stateDetails.toApprove].style],
        )}
      >
        <Container fluid>
          <Row>
            <Col xs="20">
              <h4 className={s.title}>
                {offerKinds[data.details.offerKind]}

                {/* {isToApprove && (
                  <div className={sUtils.labelRight}>
                    <Label kind="warning" className={sUtils.textUppercase}>ожидает подтверждения</Label>
                  </div>
                )} */}
                <div className={sUtils.labelRight}>
                  {isActive && data.tasks && data.tasks.overdue && (
                    <div className={sUtils.textRight}>
                      <Label kind="warning" className={sUtils.textUppercase}>
                        задачи просрочены
                      </Label>
                    </div>
                  )}
                  {isActive && data.tasks && !data.tasks.scheduled && (
                    <div className={sUtils.textRight}>
                      <Label kind="danger" className={sUtils.textUppercase}>
                        нет задач
                      </Label>
                    </div>
                  )}
                </div>
              </h4>
              <p className={s.price}>
                <AgentFee {...data.details} />
              </p>
              <ParamList label="Клиент" small>
                {linkedContact &&
                  linkedContact.data &&
                  `${linkedContact.data.details.firstName || ''} ${linkedContact
                    .data.details.lastName || ''}`}
              </ParamList>
            </Col>
          </Row>
          <Row>
            <Col sm="10">
              <ParamList label="Дата начала" small>
                <FormattedDate mask="dd.mm.yyyy" value={data.createdAt} />
              </ParamList>
            </Col>
            <Col sm="10">
              <ParamList label="Дата завершения" small>
                <FormattedDate
                  mask="dd.mm.yyyy"
                  value={data.details && data.details.expectedFinishDateAt}
                />
              </ParamList>
            </Col>
          </Row>
          <Row>
            <Col sm="10">
              <ParamList label="ID" small>
                {data.id}
              </ParamList>
            </Col>
            {(!isActive || !isArchive) && data.tasks && (
              <Col sm="10">
                <ParamList label="Объём задач" small>
                  <span className={s.textPrimary}>{data.tasks.toDo}</span>
                  &nbsp;/&nbsp;
                  <span className={s.textSuccess}>{data.tasks.done}</span>
                </ParamList>
              </Col>
            )}
          </Row>
        </Container>
      </Link>
    );
  }
}

export default Card;
