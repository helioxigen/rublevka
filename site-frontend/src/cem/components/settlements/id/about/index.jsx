import React from 'react';

import Address from './address';
import Description from './description';
import Infrastructure from './infrastructure';
import DescriptionSite from './descriptionSite';
import LinkedContacts from './linkedContacts';
import Comments from './comments';
import Status from './status';

import UI from 'cem/components/ui';
const { Grid } = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default props => (
  <Grid.Row>
    <section className={s.section}>

      <Address {...props} />
      <Description className={sUtils.pushedBottom3} {...props} />
      <Infrastructure className={sUtils.pushedBottom3} {...props} />
      {props.formKey !== 'create' && <LinkedContacts {...props} />}
      {props.formKey !== 'create' && <Comments {...props} />}
      <DescriptionSite className={sUtils.pushedBottom3} {...props} />
      <Status {...props} />

    </section>
  </Grid.Row>
);
