import React, { Component } from 'react';

import UI from 'cem/components/ui';

import cn from 'classnames';

export default (s = {}) => {
  return class extends Component {
    static defaultProps = {
      filterIcon: `chevron-down`,
      isFilterIconAlwaysShown: false,
    };

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
        if (this.props.onOpen) this.props.onOpen();
      } else {
        document.removeEventListener(`click`, this.clickOutside);
      }
    }

    toggle(isOpen) {
      this.setState({ isOpen });
    }

    open(event) {
      const toggle = this.props.controllable
        ? this.props.toggle
        : ::this.toggle;

      if (
        this.refs.resetButton &&
        !this.refs.resetButton.contains(event.target)
      )
        toggle(true);
    }

    resetDropdown() {
      const { reset } = this.props;

      reset();
    }

    getChildren() {
      return Array.isArray(this.props.children)
        ? this.props.children
        : [this.props.children];
    }

    clickOutside(event) {
      const toggle = this.props.controllable
        ? this.props.toggle
        : ::this.toggle;
      if (this.refs.dropdown && !this.refs.dropdown.contains(event.target)) {
        toggle(false);
      }
    }

    render() {
      const { reset, value, closeOnClick, alwaysActive } = this.props;

      const textHide = {
        [s.textHide]: !!this.props.textHide,
      };

      const height = {
        [s[this.props.height]]: !!this.props.height,
      };

      const placeholderClassName = {
        [this.props.placeholderClassName]: !!this.props.placeholderClassName,
      };

      const iconClassName = {
        [this.props.iconClassName]: !!this.props.iconClassName,
      };

      const isOpen = this.props.controllable
        ? this.props.isOpen
        : this.state.isOpen;
      const children = this.getChildren();

      return (
        <div {...this.props} className={cn(s.dropdown, this.props.className)}>
          <div
            className={cn(
              s.placeholder,
              textHide,
              placeholderClassName,
              isOpen && s.active,
            )}
            onClick={::this.open}
          >
            <span
              className={cn({ [s.activePlaceholder]: !!value || alwaysActive })}
            >
              {this.props.placeholder}
            </span>

            <span ref="resetButton">
              {reset && value && (
                <UI.Button
                  className={s.btnReset}
                  onClick={::this.resetDropdown}
                >
                  <UI.Icon className={s.iconReset} icon="delete" />
                </UI.Button>
              )}
            </span>

            {this.props.filterIcon &&
              (this.props.isFilterIconAlwaysShown || !value) && (
                <UI.Icon
                  className={cn(s.icon, iconClassName)}
                  icon={this.props.filterIcon}
                />
              )}
          </div>

          <div
            ref="dropdown"
            className={cn(s.container, height, isOpen && s.active)}
          >
            {children.map((child, index) =>
              React.cloneElement(child, {
                ...child.props,
                key: index,
                onClick: event => {
                  if (child.props.onClick) child.props.onClick(event);
                  if (closeOnClick) this.toggle(false);
                },
              }),
            )}
          </div>
        </div>
      );
    }
  };
};
