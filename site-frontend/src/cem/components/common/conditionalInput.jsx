import React, { Component } from 'react';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form: { Group, Label, Static, Input, Helper },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: !!props.value.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value.value !== this.props.value.value) {
      this.setState({
        isChecked: !!nextProps.value.value,
      });
    }
  }

  setChecked(value) {
    this.setState({
      isChecked: value,
    });
  }

  handleCheckClick() {
    this.setState({
      isChecked: true,
    });
  }

  handleUncheckClick() {
    this.setState({
      isChecked: false,
    });
    this.props.value.onChange(undefined);
  }

  render() {
    const { checkboxLabel, inputLabel, value, disabled } = this.props;
    return (
      <Row>
        <Col sm="10">
          <Group className={cn(sUtils.resetIndentation, sUtils.pushedBottom2)}>
            <Label className={sUtils.pushedBottom1} block>
              {checkboxLabel}
            </Label>
            <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
              <Input
                type="radio"
                checked={this.state.isChecked}
                onChange={::this.handleCheckClick}
                disabled={disabled}
              />
              Есть
            </Label>
            <Label className={s.radioLabel}>
              <Input
                type="radio"
                checked={!this.state.isChecked}
                onChange={::this.handleUncheckClick}
                disabled={disabled}
              />
              Нет
            </Label>
          </Group>
        </Col>
        <Col sm="10">
          {!disabled && this.state.isChecked && (
            <Group float kind={value.touched && !!value.error && `error`}>
              <Input
                valueClassName="floatLabel"
                placeholder={inputLabel}
                block
                type="text"
                {...value}
              />
              <Label>{inputLabel}</Label>
              {value.touched && value.error && <Helper>{value.error}</Helper>}
            </Group>
          )}
          {disabled && this.state.isChecked && (
            <Group>
              <Label block>{inputLabel}</Label>
              <Static>{value.value}</Static>
            </Group>
          )}
        </Col>
      </Row>
    );
  }
}
