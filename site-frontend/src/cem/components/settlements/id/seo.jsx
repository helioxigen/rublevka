import React, { Component } from 'react';
import UI from 'cem/components/ui';
const {
  Form, Select, AsyncSelect,
  Heading,
  Grid: { Row, Col },
} = UI;
import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/constants/settlements/form';
import validate from 'cem/validators/settlements';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import SeoMeta from 'cem/components/seo/meta';

export default reduxForm(formSettings)(submitValidator()(class extends Component {
  render() {
    return (
      <Row>
        <section className={s.section}>
          <SeoMeta className={sUtils.pushedBottom3} {...this.props} />
        </section >
      </Row >
    )
  }
}));
