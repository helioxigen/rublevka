import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

// actions
import { pushPath } from 'redux-simple-router';
import { pop } from 'cem/actions/toastr';
import { createContact, updateContact } from 'cem/_contacts/actions';

// constants
import { formSettings } from 'cem/_contacts/constants/form';

// UI
import UI from 'cem/components/ui';

// components
import FormField from 'cem/helpers/formField';

// styles
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

// helpers
import cn from 'classnames';
import submitValidator from 'core/decorators/submitValidator';

import * as options from 'cem/_contacts/constants/options';

// UI
const {
  Grid,
  Form,
  Button,
  Media,
  Select,
  Form: { Input },
  Grid: { Row, Col },
} = UI;

// components
const Image = ({ photo }) => (
  <div>
    <UI.Image
      src={
        photo
          ? `${photo.url}-128`
          : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
      }
      kind="circle"
      width="102"
      height="102"
    />
    {/* {isPhotoUploadAllowed && <Form.Input type="file" className={s.file} {...fields.photo} value={null} />} */}
  </div>
);

const Description = props => {
  const { fields, isStatic } = props;

  return (
    <section>
      <Row>
        <Col sm="6" lg="5">
          <FormField
            label="Фамилия"
            field={fields.details.lastName}
            float
            static={isStatic}
          >
            <Input className={s.input} block type="text" />
          </FormField>
        </Col>
        <Col sm="6" lg="5">
          <FormField
            label="Имя"
            field={fields.details.firstName}
            float
            static={isStatic}
          >
            <Input className={s.input} block type="text" />
          </FormField>
        </Col>
        <Col sm="6" lg="5">
          <FormField
            label="Отчество"
            field={fields.details.middleName}
            float
            static={isStatic}
          >
            <Input className={s.input} block type="text" />
          </FormField>
        </Col>
        <Col sm="6" lg="5">
          <FormField field={fields.kind} label="Тип" float>
            <Select
              className={sUtils.fontSizeMd}
              options={options.contactKinds}
            />
          </FormField>
        </Col>
      </Row>
    </section>
  );
};

const Heading = ({ formKey }) => (
  <UI.Heading size="lg">
    <UI.Back>
      <Button type="button" className={sButton.btnBack}>
        <UI.Icon className={s.iconBack} icon="arrow-right" />
      </Button>
    </UI.Back>
    {formKey === 'create' && 'Создать новый контакт'}
    {formKey !== 'create' && `Контакт (ID: ${formKey})`}
  </UI.Heading>
);

const CallButton = () => (
  <Button kind="success" type="button">
    Позвонить сейчас
  </Button>
);

class Header extends Component {
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

    // state: PropTypes.shape({
    //   leads: PropTypes.object.isRequired,
    // }),
    actions: PropTypes.shape({
      pop: PropTypes.func.isRequired,
      pushPath: PropTypes.func.isRequired,
      createContact: PropTypes.func.isRequired,
      updateContact: PropTypes.func.isRequired,
    }),
  };

  onSubmitSuccess({ id }) {
    if (this.props.formKey === 'create') {
      this.props.actions.pop('success', `Контакт (ID: ${id})`, 'Создан');
      this.props.actions.pushPath(`/contacts/${id}`);
    } else {
      this.props.actions.pop('success', `Контакт (ID: ${id})`, 'Обновлён');
    }
  }

  createOrUpdate() {
    if (this.props.formKey === 'create') {
      return this.props.actions.createContact(this.props.values);
    }
    return this.props.actions.updateContact(this.props.values);
  }

  render() {
    const {
      handleSubmit,
      formKey,

      fields,
      pristine,
      submitting,
      error,

      data,
      isStatic,
    } = this.props;

    return (
      <Form.Container
        onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
        className={s.header}
      >
        <Grid.Container fluid>
          <Row>
            <Col sm="18" lg="15">
              <Heading formKey={formKey} />
            </Col>
            <Col
              sm="2"
              lg="5"
              className={cn(sUtils.textRight, sUtils.pushedTop_5)}
            >
              <CallButton />
            </Col>
          </Row>
          <Row>
            <Col xs="20">
              <Media
                className={s.media}
                left={
                  <Image
                    photo={formKey !== 'create' && data.details.photo}
                    fields={fields}
                  />
                }
                body={<Description fields={fields} isStatic={isStatic} />}
              />
            </Col>
          </Row>
        </Grid.Container>
        {formKey === 'create' && (
          <Button
            type="submit"
            className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
            disabled={error || submitting}
            kind="success"
            size="md"
            block
          >
            Добавить
          </Button>
        )}
        {formKey !== 'create' && (
          <Button
            type="submit"
            className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
            disabled={error || submitting}
            kind="warning"
            size="md"
            block
          >
            Сохранить
          </Button>
        )}
      </Form.Container>
    );
  }
}

// redux connectors
const pickState = state => {
  const { leads } = state;

  return {
    state: {
      leads,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    pop,
    pushPath,

    createContact,
    updateContact,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

const connectedWithRedux = connect(
  pickState,
  pickActions,
)(Header);
const connectedWithSubmitValidator = submitValidator()(connectedWithRedux);
const connectedWithReduxForm = reduxForm(formSettings)(
  connectedWithSubmitValidator,
);

export default connectedWithReduxForm;
