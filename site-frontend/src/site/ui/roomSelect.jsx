import React, { Component } from 'react';

import UI from 'site/ui';
const { Button, BtnGroup } = UI;

import cn from 'classnames';

const rooms = ['1', '2', '3', '4+'];

class RoomSelect extends Component {
  handleClick(roomNumber, event) {
    const { value = [], onChange } = this.props;

    if (onChange) {
      if (value.indexOf(roomNumber) > -1) {
        event.target.blur();

        onChange(this.props.reference, value.filter(room => room !== roomNumber));
      } else {
        onChange(this.props.reference, [roomNumber, ...value]);
      }
    }
  }

  render() {
    const {
      children, value = [],
      className, buttonClassName, buttonActiveClassName, lastButtonClassName, showTitle,
    } = this.props;

    return (
      <BtnGroup className={className}>
        {!!showTitle && React.cloneElement(children, { ...children.props })}
        {rooms.map((room, index) =>
          <Button key={index} size="lg" type="button" className={cn(buttonClassName, { [buttonActiveClassName]: value.indexOf(index + 1) > -1 }, index === rooms.length - 1 && lastButtonClassName)} onClick={event => this.handleClick(index + 1, event)}>{room}</Button>,
        )}
      </BtnGroup>
    );
  }
}

export default RoomSelect;
