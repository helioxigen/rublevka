import React, { Component } from 'react';

import cn from 'classnames';
import s from 'cem/styles/components/toastr';

export default class NotificationBox extends Component {
  static defaultProps = {
    timeout: 5000,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.onExpire(this.props.id);
    }, this.props.timeout);
  }

  render() {
    const { title, body, kind } = this.props;
    return (
      <div className={cn(s.notificationBox, s[kind])} onClick={() => this.props.onExpire(this.props.id)}>
        {title && <h4 className={s.title}>{title}</h4>}
        {body && <p className={s.body}>{body}</p>}
      </div>
    );
  }
}
