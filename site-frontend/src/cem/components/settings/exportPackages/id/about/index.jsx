import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
} = UI;

import Filters from './filters';
import CianPremium from './cianPremium';
import CompanyInfo from './companyInfo';
import Properties from './properties';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { formSettings } from 'cem/constants/settings/exportPackages/form';

class About extends Component {
  render() {
    const {
      actions,
      state,
      formKey,
      fields,
      values,
      isFetching,
      isUpdateAllowed,
    } = this.props;

    return (
      <Row>
        <Col className={s.section}>
          <Row className={sUtils.pushedBottom6}>
            <Col sm="20">
              <Filters
                fields={fields}
                values={values}
                isUpdateAllowed={isUpdateAllowed}
              />
            </Col>
            {values.format === 'cian' && (
              <Col sm="10">
                <CianPremium
                  fields={fields}
                  isFetching={isFetching}
                  isUpdateAllowed={isUpdateAllowed}
                />
              </Col>
            )}
            <Col sm="10">
              <CompanyInfo
                fields={fields}
                isFetching={isFetching}
                isUpdateAllowed={isUpdateAllowed}
              />
            </Col>
          </Row>
          {(values.filter.category === 'country' ||
            values.filter.category === 'city') && (
            <Row>
              <Col sm="20">
                <Properties
                  actions={actions}
                  state={state}
                  packageId={formKey}
                  filter={values.filter}
                  filterNot={values.filterNot}
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(About));
