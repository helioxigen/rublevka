import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Grid: { Row },
} = UI;

import PdfExportsTable from './pdfExportsTable';
import ChangesTable from './changesTable';

import s from 'cem/styles/id/content';

class History extends Component {
  render() {
    return (
      <Row>
        <section className={s.section}>
          <PdfExportsTable {...this.props} />
          <ChangesTable {...this.props} />
        </section>
      </Row>
    );
  }
}

export default History;
