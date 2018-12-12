import React from 'react';
import { Link } from 'react-router';

import s from 'cem/styles/ui/tabs';
import sUtils from 'cem/styles/utils';

export default ({ options }) => (
  <div className={sUtils.scrollX}>
    <div className={s.tabsContainer}>
      {options.filter(tab => tab.isShown).length > 1 && options.map((tab, index) => tab.isShown ? <Link key={index} className={s.tab} activeClassName={s.active} to={tab.url}>{tab.title}</Link> : null)}
    </div>
  </div>
);
