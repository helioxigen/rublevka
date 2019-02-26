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

import Address from './address';
import Apartment from './apartment';
import Building from './building';
// import Building from 'cem/components/complexBuildings/id/about/description/form';
import Offers from '../deals';
import Contacts from '../contacts';
import Equipment from '../equipment';
import Status from '../status';
import Note from '../note';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class AboutCity extends Component {
  componentWillMount() {
    const { actions, values } = this.props;

    if (values.residentialComplexId)
      actions.loadResidential(values.residentialComplexId);
  }

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
      handleSubmit,
      formKey,
      values,
      isContactLinkingAllowed,
      isSensitiveDataVisible,
    } = this.props;

    const buildingProps = {
      ...this.props,
      fields: { details: this.props.fields.complexBuildingDetails },
    };

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
          <Apartment {...this.props} />
          <Equipment
            className={sUtils.pushedBottom3}
            {...this.props}
            options={options}
          />
          <Address className={sUtils.pushedBottom3} {...this.props} />
          {!values.complexBuildingId && <Building {...buildingProps} />}
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
                entity={{ key: `cityProperties`, id: formKey.toString() }}
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
  form: `propertiesCity`,
  destroyOnUnmount: false,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(AboutCity));
