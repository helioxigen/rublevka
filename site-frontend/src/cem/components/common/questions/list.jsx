import React, { Component } from 'react';

import { captions } from 'cem/constants/requests/images/dictionaries';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Rating,
  Grid: { Row, Col },
  Form: { Label, Group },
 } = UI;

import sUtils from 'cem/styles/utils';

export default class extends Component {
  render() {
    const { fields } = this.props;

    return (
      <section className={cn(sUtils.pushedTop3, sUtils.height40)}>
        {fields.questions.map((question, index) => (
          <Row key={index} className={sUtils.pushedBottom1}>
            <Col sm="20">
              <Group>
                <Label className={sUtils.pushedBottom1_2}>{question.text.value}</Label>
                <Rating {...question.rate} captions={captions} />
              </Group>
            </Col>
          </Row>
        ))}
      </section>
    );
  }
}
