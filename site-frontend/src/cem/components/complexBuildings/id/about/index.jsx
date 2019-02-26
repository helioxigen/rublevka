import React, { Component } from 'react';

import Complex from 'cem/containers/common/complex';
import Comments from 'cem/containers/common/comments';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
} = UI;

import Description from './description';
import Status from './status';
import Address from './address';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  render() {
    const { formKey, complexId } = this.props;

    return (
      <Row>
        <section className={s.section}>
          <Row className={sUtils.pushedBottom6}>
            <Col sm="20">
              <Complex id={complexId} />
            </Col>
          </Row>
          <Address {...this.props} />
          <Description {...this.props} />
          {formKey !== 'create' && (
            <Row className={sUtils.pushedBottom6}>
              <Col sm="20">
                <Comments
                  entity={{ key: 'complexBuildings', id: formKey.toString() }}
                  isSubscriptionAvailable
                />
              </Col>
            </Row>
          )}
          <Status {...this.props} />
        </section>
      </Row>
    );
  }
}

export default About;
