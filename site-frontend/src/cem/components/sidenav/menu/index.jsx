import React, { Component } from 'react';

import { withRouter } from 'react-router';

import { menu, menuOrder } from 'cem/constants/nav';
import { SimpleItem, Item } from './item';

import cn from 'classnames';
import s from 'cem/styles/components/sidebar';
import sUtils from 'cem/styles/utils';

import { HAS_ANY_CHILD_PERMISSION } from 'cem/constants/nav/showPolicies';

class Menu extends Component {
  constructor(props) {
    super(props);

    const currentlyOpen = menuOrder.find(item => props.router.isActive(menu[item].url));

    this.state = {
      [currentlyOpen]: true,
    };
  }

  toggle(ref) {
    this.setState({ [ref]: !this.state[ref] });
  }

  isItemShown(item) {
    const { hasAnyRight, state } = this.props;

    const itemPermissions = item.requiredPermissions || [];
    const userId = state.auth.id;
    const departmentId = state.auth.details.departmentId;
    const divisionId = state.auth.details.divisionId;

    if (itemPermissions.length && item.showPolicy !== HAS_ANY_CHILD_PERMISSION) {
      return hasAnyRight(itemPermissions, userId, departmentId, divisionId);
    } else if (item.showPolicy === HAS_ANY_CHILD_PERMISSION) {
      const children = item.children || [];
      const childrenPermissions = children.reduce((result, childItem) => [...result, ...(childItem.requiredPermissions || [])], []);

      return !childrenPermissions.length || hasAnyRight(childrenPermissions, userId, departmentId, divisionId);
    } else {
      return true;
    }
  }

  render() {
    const { hasAnyRight, state } = this.props;

    const userEmail = state.users[state.auth.id].data.email;

    return (
      <section>
        {menuOrder.map(key => {
          const item = menu[key] || {};
          const children = item.children || [];
          const isItemShown = this.isItemShown(item);

          const userId = state.auth.id;
          const departmentId = state.auth.details.departmentId;
          const divisionId = state.auth.details.divisionId;

          if (children.length && isItemShown) {
            return <Item {...item} key={key} reference={key} toggle={::this.toggle} isOpen={this.state[key]} hasAnyRight={(permissions) => hasAnyRight(permissions, userId, departmentId, divisionId)} />;
          } else if (isItemShown) {
            return <SimpleItem key={key} {...item} />;
          }
        })}
        <a className={cn(s.listLink, sUtils.fontRegular)} href={`https://jqestate.typeform.com/to/jKbmle?email=${userEmail}`} target="_blank">
          Предложить идею
        </a>
      </section>
    );
  }
}

export default withRouter(Menu);
