import React, { Component } from 'react';

import * as options from 'cem/constants/properties/options';
import * as dictionaries from 'cem/constants/properties/dictionaries';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import validate from 'cem/validators/properties';

import Comments from 'cem/containers/common/comments';

import UI from 'cem/components/ui';
const {
  Form,
  Grid: { Container, Row, Col },
} = UI;

import BuildingDescription from './buildingDescription';
import Offers from '../deals';
import Equipment from '../equipment';
import FloorsDescription from './floorsDescription';
import Rooms from './rooms';
import LandDescription from './landDescription';
import Communication from './communication';
import Address from './address';
import Contacts from '../contacts';
import Status from '../status';
import Note from '../note';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class AboutCountry extends Component {
  onSubmitSuccess() {
    const { formKey, untouchAll } = this.props;

    if (formKey !== `create`) untouchAll();
  }

  createOrUpdate() {
    const {
      formKey,
      values,
      actions,
      params: { category },
    } = this.props;

    if (formKey === `create`) return actions.createProperty(values, category);
    if (formKey !== `create`)
      return actions.updateProperty(formKey, values, category);
  }

  render() {
    const {
      values,
      handleSubmit,
      formKey,
      isContactLinkingAllowed,
      isSensitiveDataVisible,
    } = this.props;

    return (
      <Container className={s.section}>
        <Form.Container
          onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
        >
          <Offers
            {...this.props}
            options={options}
            dictionaries={dictionaries}
          />
          <BuildingDescription {...this.props} />
          <Equipment
            className={sUtils.pushedBottom3}
            {...this.props}
            options={options}
          />
          {values.kind !== `land` && (
            <FloorsDescription
              className={sUtils.pushedBottom3}
              layouts={values.specification.legacyLayouts}
            />
          )}
          {values.kind !== `land` && (
            <Rooms className={sUtils.pushedBottom3} {...this.props} />
          )}
          <LandDescription {...this.props} options={options} />
          <Communication
            className={sUtils.pushedBottom3}
            {...this.props}
            options={options}
          />
          <Address {...this.props} />
          <Note className={sUtils.pushedBottom3} {...this.props} />
          {formKey !== `create` &&
            (isContactLinkingAllowed || isSensitiveDataVisible) && (
              <Contacts {...this.props} />
            )}
        </Form.Container>
        {formKey !== `create` && (
          <Row className={sUtils.pushedBottom6}>
            <Col md="18">
              <Comments
                entity={{ key: `countryProperties`, id: formKey.toString() }}
                isSubscriptionAvailable
              />
            </Col>
          </Row>
        )}
        <Status className={sUtils.pushedBottom3} {...this.props} />
      </Container>
    );
  }
}

const formSettings = {
  form: `propertiesCountry`,
  destroyOnUnmount: false,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(AboutCountry));
