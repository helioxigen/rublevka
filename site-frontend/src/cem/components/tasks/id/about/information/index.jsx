import React, { Component } from 'react';

import { Link } from 'react-router';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Icon, Select, Heading,
  Grid: { Row, Col },
} = UI;

import PropertyCard from 'cem/components/common/property';
import Contact from './contact';
import Lead from './lead';
import Deal from './deal';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { taskFormSettings } from 'cem/constants/tasks/form';

class About extends Component {
  render() {
    const {
      fields, formKey,
      data, state,
      queryParams: { propertyId, propertyCategory, dealId, clientLeadId },
    } = this.props;

    const isFree = formKey === 'create' ? fields.kind.value === 'free' : data.kind === 'free';
    const isPreview = formKey === 'create' ? fields.kind.value === 'preview' : data.kind === 'preview';
    const isNegotiation = formKey === 'create' ? fields.kind.value === 'negotiation' : data.kind === 'negotiation';

    const isLinkedToProperty = formKey === 'create' ? !!propertyId && !!propertyCategory : (data.freeDetails && data.freeDetails.linkKind === 'property') || (data.contactDetails && data.contactDetails.linkKind === 'property');
    const isLinkedToDeal = formKey === 'create' ? !!dealId : (data.freeDetails && data.freeDetails.linkKind === 'deal') || (data.contactDetails && data.contactDetails.linkKind === 'deal') || (!!data.previewDetails) || (!!data.negotiationDetails);
    const isLinkedToLead = formKey === 'create' ? !!clientLeadId : (data.freeDetails && data.freeDetails.linkKind === 'client_lead') || (data.contactDetails && data.contactDetails.linkKind === 'client_lead');

    // TODO Refactor it...
    let detailsFields;
    if (isFree) {
      detailsFields = fields.freeDetails;
    } else if (isPreview) {
      detailsFields = fields.previewDetails;
    } else if (isNegotiation) {
      detailsFields = fields.negotiationDetails;
    } else {
      detailsFields = fields.contactDetails;
    }

    const isContactSelectionShown = formKey === 'create' && ((!!detailsFields.properties && !!detailsFields.properties.value) || (!!detailsFields.propertyId && !!detailsFields.propertyId.value));
    const isContactPreviewShown = !!detailsFields.contactId.value;

    return (
      <Row className={sUtils.pushedBottom6}>
        {isLinkedToProperty && !isPreview && !isNegotiation &&
          <Col sm="10" md="6">
            <PropertyCard id={detailsFields.propertyId.value} resourcePath={`/v1/properties/${detailsFields.propertyCategory.value}`} />
          </Col>
        }
        {!isLinkedToLead &&
          <Col className={isLinkedToProperty && !isPreview && !isNegotiation && sUtils.pushedTopXs4} sm="10" md="6">
            <Heading size="md">
              Клиент
              {detailsFields.contactId && detailsFields.contactId.value &&
                <Link className={s.linkIcon} to={`/contacts/${detailsFields.contactId.value}`}>
                  <Icon className={s.icon} icon="arrow" />
                </Link>
              }
            </Heading>
            {isContactSelectionShown && isLinkedToProperty &&
              <FormField field={detailsFields.contactId}>
                <Select labelKey="contactTitle" valueKey="linkedContactId" options={state.contactsByPropertyId[propertyId] || []} />
              </FormField>
            }
            {isContactPreviewShown && <Contact id={detailsFields.contactId.value} />}
          </Col>
        }
        {isLinkedToLead && detailsFields.clientLeadId.value &&
          <Col sm="10" md="6">
            <Lead id={detailsFields.clientLeadId.value} />
          </Col>
        }
        {isLinkedToDeal && detailsFields.dealId.value &&
          <Col sm="10" md="6">
            <Deal id={detailsFields.dealId.value} />
          </Col>
        }
      </Row>
    );
  }
}

export default reduxForm(taskFormSettings)(submitValidator()(About));
