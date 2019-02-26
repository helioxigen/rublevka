import React from 'react';

import { FormattedCurrency } from 'react-formatted';
import CountIndicator from 'cem/components/common/countIndicator';

import cn from 'classnames';
import s from 'cem/styles/deals/deals';
import sHeader from 'cem/styles/components/header';

import { lanes } from 'cem/constants/deals/dictionaries';

import { calculateToApproveAgencyFee } from 'cem/helpers/deals';

export default ({ laneKey, count, stateFilter, stats }) => {
  const isApprovalLane = laneKey === 'approval';

  const lane = lanes[laneKey];

  return (
    <section>
      <h3 className={cn(s.title, lane.style && s[lane.style])}>{lane.title}</h3>
      {!isApprovalLane && (
        <p className={s.description}>
          <FormattedCurrency
            symbol="USD"
            value={
              (lane && stats[lane.statsKey] && stats[lane.statsKey].usd) || '0'
            }
          />
        </p>
      )}
      {isApprovalLane && (
        <p className={s.description}>
          <span className={sHeader.success}>
            <FormattedCurrency
              symbol="USD"
              value={
                ((!stateFilter || stateFilter === 'approval') &&
                  calculateToApproveAgencyFee(stats, 'successful', 'usd')) ||
                '0'
              }
            />
          </span>
          &nbsp;/&nbsp;
          <span className={sHeader.danger}>
            <FormattedCurrency
              symbol="USD"
              value={
                ((!stateFilter || stateFilter === 'approval') &&
                  calculateToApproveAgencyFee(stats, 'unsuccessful', 'usd')) ||
                '0'
              }
            />
          </span>
        </p>
      )}
      <p className={s.description}>
        <CountIndicator
          count={count}
          declensionForms={['сделка', 'сделки', 'сделок']}
        />
      </p>
    </section>
  );
};
