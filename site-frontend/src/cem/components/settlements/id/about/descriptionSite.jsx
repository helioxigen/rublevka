import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import formSettings from 'cem/constants/settlements/form';
import validate from 'cem/validators/settlements';

import UI from 'cem/components/ui';
const {
  Heading,
  Form: { Group, Textarea },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class SiteDescription extends Component {
  render() {
    const { fields, hasRight } = this.props;

    return (
      <section className={this.props.className}>
        <Heading size="md">Описание для основного сайта</Heading>
        <Row className={sUtils.pushedBottom1}>
          <Col xs="10">
            <Group>
              <Heading size="sm">Продажа</Heading>
              <Textarea
                {...fields.description.main.sale}
                className={s.textarea}
                rows="9"
                block
                kind="primary"
                disabled={!hasRight('settlement_update')}
              />
            </Group>
          </Col>
          <Col xs="10">
            <Group>
              <Heading size="sm">Аренда</Heading>
              <Textarea
                {...fields.description.main.rent}
                className={s.textarea}
                rows="9"
                block
                kind="primary"
                disabled={!hasRight('settlement_update')}
              />
            </Group>
          </Col>
        </Row>

        <Heading size="md">Описание для сайта-спутника</Heading>
        <Row>
          <Col xs="10">
            <Group>
              <Heading size="sm">Продажа</Heading>
              <Textarea
                {...fields.description.satellite.sale}
                className={s.textarea}
                rows="9"
                block
                kind="primary"
                disabled={!hasRight('settlement_update')}
              />
            </Group>
          </Col>
          <Col xs="10">
            <Group>
              <Heading size="sm">Аренда</Heading>
              <Textarea
                {...fields.description.satellite.rent}
                className={s.textarea}
                rows="9"
                block
                kind="primary"
                disabled={!hasRight('settlement_update')}
              />
            </Group>
          </Col>
        </Row>
      </section>
    );
  }
}

export default reduxForm({ ...formSettings, validate })(SiteDescription);
