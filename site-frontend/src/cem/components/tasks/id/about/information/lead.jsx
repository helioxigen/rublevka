import React, { Component } from 'react';
import { Link } from 'react-router';

import { idResourcer } from 'core/decorators/fetcher';

import UI from 'cem/components/ui';
const { Grid, Icon, Heading } = UI;

import s from 'cem/styles/id/content';

const LeadDescription = ({ contactDetails = {} }) => (
  <div>
    <h4 className={s.heading}>{`${contactDetails.firstName || ''} ${contactDetails.lastName || ''}`}</h4>
    <div><a className={s.mediaText} href={`tel:${contactDetails.phoneNumber}`}>{contactDetails.phoneNumber}</a></div>
    <div><a className={s.mediaText} href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></div>
  </div>
);

class Lead extends Component {
  render() {
    const { id, itemData } = this.props;

    return (
      <section>
        <Heading size="md">
          Лид
          <Link className={s.linkIcon} to={`/client_leads/${itemData.kind}/${id}`}><Icon className={s.icon} icon="arrow" /></Link>
        </Heading>
        <Grid.Row>
          <Grid.Col xs="20">
            <LeadDescription {...itemData} />
          </Grid.Col>
        </Grid.Row>
      </section>
    );
  }
}

export default idResourcer({
  id: 'leads',
  linkedResourcesSchemes: [],
  apiPath: '/v1/client_leads',
})(Lead);
