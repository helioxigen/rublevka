import React from 'react';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

export default ({ data: { state, stateDetails = {} } }) => {
  const isReasonPresented = !!stateDetails.reason;
  const text = {
    in_progress: 'Возвращено на доработку, причина:',
    rejected: 'Заявка отменена, причина:',
  };

  return (
    <section>
      {isReasonPresented && (
        <Row>
          <Col sm="10" smOffset="5">
            <Heading size="sm">{text[state]}</Heading>
            <p className={sUtils.pushedTop1_5}>{stateDetails.reason}</p>
          </Col>
        </Row>
      )}
    </section>
  );
};
