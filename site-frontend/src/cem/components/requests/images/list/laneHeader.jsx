import React from 'react';

import CountIndicator from 'cem/components/common/countIndicator';

import cn from 'classnames';
import s from 'cem/styles/deals/deals';

import { lanes } from 'cem/constants/requests/images/dictionaries';

export default ({ laneKey, count }) => {
  const lane = lanes[laneKey];

  return (
    <section>
      <h3 className={cn(s.title, lane.style && s[lane.style])}>{lane.title}</h3>
      <p className={s.description}>
        <CountIndicator
          count={count}
          declensionForms={['заявка', 'заявки', 'заявок']}
        />
      </p>
    </section>
  );
};
