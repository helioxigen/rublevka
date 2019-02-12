import React, { Component } from 'react';
import cn from 'classnames';

import { reduxForm } from 'redux-form';
import formSettings from 'cem/constants/settlements/form';
import validate from 'cem/validators/settlements';

import UI from 'cem/components/ui';
const {
  Checklist,
  Heading,
  Form: { Label, Input },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Address extends Component {
  componentWillMount() {
    this.props.actions.loadWordsByKind('settlement_internal_infrastructure');
    this.props.actions.loadWordsByKind('settlement_external_infrastructure');
  }
  render() {
    const {
      fields: { details },
      hasRight,
    } = this.props;
    const { items: externalItems = [] } =
      this.props.state.dictionaries.settlement_internal_infrastructure || {};
    const { items: internalItems = [] } =
      this.props.state.dictionaries.settlement_external_infrastructure || {};

    return (
      <section className={this.props.className}>
        <Heading size="sm">Внутренняя инфраструктура</Heading>
        <Row className={sUtils.pushedBottom1}>
          {externalItems.map((item, index) => (
            <Col sm="6" key={index}>
              <Label className={cn(s.checkboxLabel, sUtils.pushedBottom2_5)}>
                <Checklist
                  {...details.externalInfrastructure}
                  option={item.title}
                  checkbox={
                    <Input
                      type="checkbox"
                      disabled={!hasRight('settlement_update')}
                    />
                  }
                />{' '}
                {item.title}
              </Label>
            </Col>
          ))}
        </Row>

        <Heading size="sm">Внешняя инфраструктура</Heading>
        <Row className={sUtils.pushedBottom1}>
          {internalItems.map((item, index) => (
            <Col sm="6" key={index}>
              <Label className={cn(s.checkboxLabel, sUtils.pushedBottom2_5)}>
                <Checklist
                  {...details.internalInfrastructure}
                  option={item.title}
                  checkbox={
                    <Input
                      type="checkbox"
                      disabled={!hasRight('settlement_update')}
                    />
                  }
                />{' '}
                {item.title}
              </Label>
            </Col>
          ))}
        </Row>
      </section>
    );
  }
}

export default reduxForm({ ...formSettings, validate })(Address);
