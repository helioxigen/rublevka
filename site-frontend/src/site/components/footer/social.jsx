import React from 'react';
import cn from 'classnames';

import UI from 'site/ui';
const { Icon } = UI;

import s from 'site/styles/components/footer';

export default () => (
  <nav className={cn(s.social, s.pushedLeft3)}>
    <a className={s.socialLink} href="//instagram.com/jqestate" target="_blank">
      <Icon className={s.socialIcon} icon="instagram" />
    </a>
    <a className={s.socialLink} href="//facebook.com/jqestate.ru" target="_blank">
      <Icon className={s.socialIcon} icon="facebook" />
    </a>
  </nav>
);
