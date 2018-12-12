import React, { Component } from 'react';
import { Circle } from 'rc-progress';

import s from 'cem/styles/ui/progressbar';

export class TimeProgressBar extends Component {
  state = { elapsed: 0, percent: 0 };

  componentDidMount() {
    this.timerId = setInterval(::this.calculatePercent, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  calculatePercent() {
    const { time } = this.props;
    const elapsed = this.state.elapsed + 50;
    const percent = Math.ceil(elapsed / (time / 100));

    if (percent >= 100) {
      clearInterval(this.timerId);
      this.setState({ elapsed, percent: 100 });
    } else {
      this.setState({ elapsed, percent });
    }
  }

  complete() {
    clearInterval(this.timerId);
    this.setState({ percent: 100 });
  }

  reset() {
    this.setState({ percent: 0 });
  }

  render() {
    return (
      <div className={s.container}>
        <Circle percent={this.props.percent || this.state.percent} strokeWidth={2} strokeColor="#03A9F4" trailColor="#E0E0E0" />
        <span className={s.percent}>{this.props.percent || this.state.percent}%</span>
      </div>
    );
  }
}
