import React from 'react';
import UI from 'cem/components/ui';

import { Link } from 'react-router';

const {
  Grid,
  Table,
  Grid: { Col },
  Table: { Cell, Heading },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export const Row = ({ kind, children }) => (
  <Table.Row key={kind}>
    <Cell>
      <Link className={s.link} to={`/settings/dictionaries/${kind}`}>
        {children}
      </Link>
    </Cell>
  </Table.Row>
);

export default ({ title, children }) => (
  <Grid.Row>
    <Col xs="20" className={sUtils.pushedBottom3}>
      <Table.Container width="100%">
        <Table.Row>
          <Heading width="70%">{title}</Heading>
        </Table.Row>

        {children}
      </Table.Container>
    </Col>
  </Grid.Row>
);
