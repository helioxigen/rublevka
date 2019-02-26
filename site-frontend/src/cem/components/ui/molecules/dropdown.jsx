import React, { Component } from 'react';
import cn from 'classnames';

export default (s = {}) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this.clickOutside = ::this.clickOutside;
    }

    componentDidUpdate(prevProps, prevStates) {
      const isOpen = this.props.controllable
        ? this.props.isOpen
        : this.state.isOpen;
      const prevIsOpen = this.props.controllable
        ? prevProps.isOpen
        : prevStates.isOpen;
      if (isOpen === prevIsOpen) {
        return;
      }

      if (isOpen) {
        document.addEventListener(`click`, this.clickOutside);
      } else {
        document.removeEventListener(`click`, this.clickOutside);
      }
    }

    componentWillUnmount() {
      document.removeEventListener(`click`, this.clickOutside);
    }

    toggle(isOpen) {
      this.setState({ isOpen });
    }

    open() {
      const toggle = this.props.controllable
        ? this.props.toggle
        : ::this.toggle;

      toggle(true);
    }

    clickOutside(event) {
      if (this.refs.dropdown) {
        if (
          this.state.isOpen &&
          this.refs.dropdown &&
          !this.refs.dropdown.contains(event.target)
        ) {
          this.setState({
            isOpen: false,
          });
        }
      }
    }

    render() {
      const isOpen = this.props.controllable
        ? this.props.isOpen
        : this.state.isOpen;

      return (
        <div {...this.props} className={cn(s.dropdown, this.props.className)}>
          {React.cloneElement(this.props.button, {
            className: cn(this.props.button.props.className, {
              [s.active]: isOpen,
            }),
            onClick: ::this.open,
          })}

          <div
            ref="dropdown"
            className={cn(s.container, { [s.active]: isOpen })}
          >
            {this.props.children}
          </div>
        </div>
      );
    }
  };
};
