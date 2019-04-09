import React, { Component } from 'react';

import cn from 'classnames';
import s from 'styles/ui/affix';

export class AffixBottom extends Component {
  constructor(props) {
    super(props);

    this.state = { affix: false };
    this.handleScroll = ::this.handleScroll;
  }

  componentWillMount() {
    if (typeof window !== 'undefined')
      window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined')
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const rect = this.refs.parent.getBoundingClientRect();
    const innerHeight =
      (typeof window !== 'undefined' && window.innerHeight) || 0;
    const isInView =
      rect.bottom <= (innerHeight || document.documentElement.clientHeight);

    if (!isInView) this.setState({ affix: false });
    if (isInView) this.setState({ affix: true });
  }

  render() {
    const {
      children,
      height,
      position = 'bottom',
      className: parentClassName,
      ...props
    } = this.props; // eslint-disable-line no-unused-vars
    const className = cn(
      { [s.affixBottom]: this.state.affix },
      children.props.className,
    );
    const style = { height: `${height}px` };

    return (
      <div ref="parent" style={style}>
        {React.cloneElement(children, {
          ...children.props,
          ...props,
          className,
        })}
      </div>
    );
  }
}
