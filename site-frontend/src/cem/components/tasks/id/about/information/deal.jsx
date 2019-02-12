import React, { Component } from 'react';

import { Link } from 'react-router';

import UI from 'cem/components/ui';
const { Grid, Icon, Heading } = UI;
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { states } from 'cem/constants/deals/dictionaries';
import { offerKinds } from 'cem/constants/properties/dictionaries';

import { idResourcer } from 'core/decorators/fetcher';

const DealDescription = ({ data: { details = {}, state } }) => (
  <div>
    <h4 className={cn(s.heading, s[states[state] && states[state].style])}>
      {states[state] && states[state].title}
    </h4>
    <div>
      <a className={s.mediaText}>{offerKinds[details.offerKind]}</a>
    </div>
    <div>
      <a className={s.mediaText}>
        <FormattedDate mask="dd.mm.yyyy" value={details.expectedFinishDateAt} />
      </a>
    </div>
  </div>
);

class Deal extends Component {
  render() {
    const { id, itemData } = this.props;

    return (
      <section className={sUtils.pushedTopXs4}>
        <Heading size="md">
          Сделка
          <Link className={s.linkIcon} to={`/deals/${id}`}>
            <Icon className={s.icon} icon="arrow" />
          </Link>
        </Heading>
        <Grid.Row>
          <Grid.Col xs="20">
            <DealDescription data={itemData} />
          </Grid.Col>
        </Grid.Row>
      </section>
    );
  }
}

export default idResourcer({
  id: 'deals',
  linkedResourcesSchemes: [],
})(Deal);
