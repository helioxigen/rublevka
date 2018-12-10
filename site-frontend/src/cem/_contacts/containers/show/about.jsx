import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

// actions
import loadLead from 'cem/actions/leads/id/load';
import { loadDocuments, createDocument, updateDocument, deleteDocument, loadLinkedContacts, addLinkedContact, updateLinkedContact, deleteLinkedContact } from 'cem/_contacts/old_actions'; // TODO: refactor this

// constants
import { formSettings } from 'cem/_contacts/constants/form';
// import { companyStates } from 'cem/constants/dadata/dictionaries';

// UI
import UI from 'cem/components/ui';

// components
import FormField from 'cem/helpers/formField';
// import CreateModal from 'cem/containers/companies/create';
import Documents from 'cem/_contacts/components/id/about/documents';
import LinkedContacts from 'cem/_contacts/components/id/about/linkedContacts';
import LeadSource from 'cem/_contacts/components/id/about/leadSource';

// styles
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

// helpers
import submitValidator from 'core/decorators/submitValidator';
import { fetchDictionary } from 'cem/helpers/autocomplete';
// import { fetchResource, findCompanies } from 'cem/helpers/autocomplete';

// const formatCompanyLabel = ({ name, ogrn, address }) => {
//   return `${name} (ОГРН: ${ogrn}) ${address[0]}`;
// };

// UI
const {
  Form,
  AsyncSelect,
  Heading,
  Grid: { Container, Row, Col },
  Form: { Input },
} = UI;

// component
class About extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    id: PropTypes.string.isRequired,

    formKey: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,

    isCreate: PropTypes.bool.isRequired,
    isArchived: PropTypes.bool.isRequired,
    isStatic: PropTypes.bool.isRequired,

    isUpdateAllowed: PropTypes.bool.isRequired,
    isSensitiveDataVisible: PropTypes.bool.isRequired,
    isPhotoUploadAllowed: PropTypes.bool.isRequired,
    isLinkedContactsEditingAllowed: PropTypes.bool.isRequired,

    state: PropTypes.shape({
      leads: PropTypes.object.isRequired,
    }),
    actions: PropTypes.shape({
      loadLead: PropTypes.func.isRequired,
    }),
  }

  componentWillMount() {
    const { clientLeadId } = this.props.data;

    if (clientLeadId) {
      this.props.actions.loadLead(this.props.data.clientLeadId);
    }
  }

  render() {
    const {
      fields,
      formKey,

      state,
      data,

      isArchived,
      isStatic,

      isSensitiveDataVisible,
      isLinkedContactsEditingAllowed,
    } = this.props;

    const { clientLeadId } = data;

    const clientLead = state.leads[clientLeadId] && state.leads[clientLeadId].data;

    return (
      <Container fluid>
        <Row>
          <section className={s.section}>
            <Form.Container>
              {/* TODO: move to separate component */}
              {isSensitiveDataVisible && !isArchived && (
                <div>
                  <Heading size="md">Контактные данные</Heading>
                  <Row className={sUtils.pushedBottom3}>
                    <Col sm="10">
                      <Row>
                        <Col lg="16">
                          <FormField label="Основной телефон" field={fields.details.phoneNumber} float static={isStatic}>
                            <Input block type="tel" mask="+7 (111) 111-11-11" placeholder="+7 (___) ___ - __ - __" autoComplete="off" />
                          </FormField>
                          <FormField label="Основной e-mail" field={fields.details.email} float static={isStatic}>
                            <Input className={s.input} block type="text" autoComplete="off" />
                          </FormField>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="10">
                      <Row>
                        <Col lg="16">
                          <FormField label="Дополнительный телефон" field={fields.additionalDetails.additionalPhoneNumber} float static={isStatic}>
                            <Input block type="tel" mask="+7 (111) 111-11-11" placeholder="+7 (___) ___ - __ - __" autoComplete="off" />
                          </FormField>
                          <FormField label="Дополнительный e-mail" field={fields.additionalDetails.additionalEmail} float static={isStatic}>
                            <Input block type="text" autoComplete="off" />
                          </FormField>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              )}

              {/* TODO: move to separate component */}
              <div>
                <Heading size="md">Деятельность, роль и автомобиль</Heading>
                <Row className={sUtils.pushedBottom3}>
                  <Col sm="10">
                    <Row>
                      <Col lg="16">
                        <FormField label="Род деятельности" field={fields.additionalDetails.occupationId} static={isStatic}>
                          <AsyncSelect block type="text" valueKey="id" labelKey="title" asyncOptions={fetchDictionary(`contact_occupation`)} />
                        </FormField>
                        <FormField label="Роль" field={fields.additionalDetails.jobRoleId} static={isStatic}>
                          <AsyncSelect block type="text" valueKey="id" labelKey="title" asyncOptions={fetchDictionary(`contact_job_role`)} />
                        </FormField>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="10">
                    <Row>
                      <Col lg="16">
                        <Row>
                          <Col sm="10">
                            <FormField label="Марка aвтомобиля" field={fields.additionalDetails.autoBrandId} static={isStatic}>
                              <AsyncSelect block type="text" valueKey="id" labelKey="title" asyncOptions={fetchDictionary(`auto_brand`)} />
                            </FormField>
                          </Col>
                          <Col sm="10">
                            <FormField label="Модель aвтомобиля" field={fields.additionalDetails.autoModelId} static={isStatic}>
                              <AsyncSelect block type="text" valueKey="id" labelKey="title" asyncOptions={fetchDictionary(`auto_model`, fields.additionalDetails.autoBrandId.value)} parent={fields.additionalDetails.autoBrandId.value} />
                            </FormField>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="16">
                        <Row>
                          <Col sm="10">
                            <FormField label="Гос. номер" field={fields.additionalDetails.autoNumber} float static={isStatic}>
                              <Input block type="text" />
                            </FormField>
                          </Col>
                          <Col sm="10">
                            <FormField label="Регион" field={fields.additionalDetails.autoRegion} float static={isStatic}>
                              <Input block type="number" />
                            </FormField>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* TODO: move to separate component */}
              {/* <div>
                <Heading size="md">Место работы</Heading>
                <Row className={sUtils.pushedBottom3}>
                  <Col sm="10">
                    <Row>
                      <Col lg="16">
                        <FormField label="Компания" field={yField} float static={isStatic}>
                          <AsyncSelect block type="text" asyncOptions={fetchResource(`/v1/companies`, `name`, formatCompanyLabel, {}, {}, findCompanies)} />
                        </FormField>
                        <CreateModal formKey="create" {...this.state} ref="createCompany" disableSearch callback={::this.addCompany} closePortal={() => this.setState({ isOpened: false })} />
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="10">
                    <Row>
                      <Col lg="16">
                        <FormField label="Должность" field={fields.companyDetails.positionId} static={isStatic}>
                          <AsyncSelect block type="text" valueKey="id" labelKey="title" asyncOptions={fetchDictionary(`contact_position`)} />
                        </FormField>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div> */}

              {/* TODO: move to separate component */}
              <div>
                <Heading size="md">Примечание</Heading>
                <Row className={sUtils.pushedBottom3}>
                  <Col xs="20">
                    <FormField label="Примечание" field={fields.note} float static={isStatic}>
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
              </div>
            </Form.Container>

            {formKey !== `create` && !isStatic && isLinkedContactsEditingAllowed && (
              <LinkedContacts contactId={formKey} {...this.props} />
            )}

            {formKey !== `create` && !isStatic && isSensitiveDataVisible && (
              <Documents contactId={formKey} {...this.props} />
            )}

            {clientLead && (
              <LeadSource clientLead={clientLead} />
            )}
          </section>
        </Row>
      </Container>
    );
  }
}

// const pickState = ({ auth, contacts, _contacts, leads, leadSources, leadsByContactId, dealsByContactId, properties, users }) => ({
//   state: { auth, contacts, _contacts, leads, leadSources, leadsByContactId, dealsByContactId, properties, users },
// });
//
// const pickActions = (dispatch) => ({
//   actions: bindActionCreators({ ..._ContactsActions, loadLead, loadUser, loadLeadSource, pushPath, uploadFile, loadDocuments, createDocument, updateDocument, deleteDocument, loadLinkedContacts, addLinkedContact, updateLinkedContact, deleteLinkedContact, ...PropertiesActions, pop, loadLeadsByContactId, loadDealsByContactId }, dispatch),
// });

// redux connectors
const pickState = (state) => {
  const { leads } = state;

  return {
    state: {
      leads,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    // TODO: make LeadSource as container and move this actions
    loadLead,

    // TODO: make Documents as container and move this actions
    loadDocuments,
    createDocument,
    updateDocument,
    deleteDocument,

    // TODO: make LinkedContacts as container and move this actions
    loadLinkedContacts,
    addLinkedContact,
    updateLinkedContact,
    deleteLinkedContact,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

const connectedWithRedux = connect(pickState, pickActions)(About);
const connectedWithSubmitValidator = submitValidator()(connectedWithRedux);
const connectedWithReduxForm = reduxForm(formSettings)(connectedWithSubmitValidator);

export default connectedWithReduxForm;
