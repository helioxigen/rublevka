import React from 'react';

import Comments from 'cem/containers/common/comments';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

export default ({ formKey }) => (
  <Row className={sUtils.pushedBottom6}>
    <Col sm="20">
      <Comments
        entity={{ key: 'settlements', id: formKey.toString() }}
        isSubscriptionAvailable
      />
    </Col>
  </Row>
);
