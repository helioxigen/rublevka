import React from 'react';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

export default ({ data: { state, stateDetails = {} } }) => {
  const isReturned = state === 'assigned' && stateDetails.reason;
  const isRejected = state === 'rejected';
  const text = {
    assigned: 'Возвращено на доработку, причина:',
    rejected: 'Заявка отменена, причина:',
  };

  return (
    <section>
      {isReturned &&
        <Row>
          <Col sm="10" smOffset="5">
            <Heading size="sm">{text[state]}</Heading>
            <p className={sUtils.pushedTop1_5}>{stateDetails.reason}</p>
          </Col>
        </Row>
      }
      {isRejected &&
        <Row>
          <Col sm="10" smOffset="5">
            <Heading size="sm">Заявка неактуальна:</Heading>
            <p className={sUtils.pushedTop1_5}>Подходящие объекты уже есть в базе</p>
          </Col>
        </Row>
      }
    </section>
  );
};
