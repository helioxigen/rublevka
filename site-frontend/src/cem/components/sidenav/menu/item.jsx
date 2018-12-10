import React, { Component } from 'react';

import { isActive } from 'core/utils/path';
import Link from 'cem/components/ui/molecules/link';

import cn from 'classnames';
import UI from 'cem/components/ui';

import s from 'cem/styles/components/sidebar';
import sUtils from 'cem/styles/utils';

export const SimpleItem = ({ text, url }) => (
  <li>
    <Link className={cn(s.listLink, sUtils.fontRegular)} activeClassName={s.activeLink} to={url}>
      {text}
    </Link>
  </li>
);

export class Item extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  render() {
    const { children, text, url, reference, isOpen, toggle, hasAnyRight } = this.props;

    return (
      <li className={cn(s.item, s.pointer, { [s.isOpen]: !!isOpen, [s.active]: !!isActive(url) })}>
        <span className={s.block} onClick={() => toggle(reference)}>
          {text} <UI.Icon className={s.iconChevron} icon="chevron-down" />
        </span>

        <ul className={cn(s.list, s.innerList)}>
          {children.filter(item => !item.requiredPermissions || !item.requiredPermissions.length || hasAnyRight(item.requiredPermissions)).map((item, index) => (
            <li key={index}>
              <Link className={cn(s.link, sUtils.resetPaddingBottom)} activeClassName={s.activeLink} to={item.url} exact>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }
}
