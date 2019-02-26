import React, { Component } from 'react';

import * as options from 'cem/constants/settlements/options';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/constants/settlements/form';
import validate from 'cem/validators/settlements';

import cn from 'classnames';

import { cloudfront } from 'core/config/resources';

import UI from 'cem/components/ui';
const {
  Back,
  Icon,
  Grid,
  Form,
  Heading,
  Media,
  Button,
  Select,
  Form: { Group, Label, Helper, Static, Input },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const states = {
  public: 'success',
  draft: 'primary',
};

const Image = ({ id }) =>
  id ? (
    <UI.Image
      src={`${cloudfront}/${id}-thumbnail-256`}
      kind="circle"
      width="102"
      height="102"
    />
  ) : (
    <UI.Image
      src={require('cem/assets/placeholder')}
      kind="circle"
      width="102"
      height="102"
    />
  );

const Description = props => {
  const { fields, values, formKey, hasRight } = props;

  return (
    <div>
      <Row>
        <Col sm="10">
          {hasRight('settlement_update') && (
            <Group
              kind={fields.name.touched && !!fields.name.error && 'error'}
              float
            >
              <Input
                valueClassName="floatLabel"
                className={s.input}
                block
                type="text"
                placeholder="Поселок"
                {...fields.name}
              />
              <Label>Поселок</Label>
              {fields.name.touched && fields.name.error && (
                <Helper>{fields.name.error}</Helper>
              )}
            </Group>
          )}
          {!hasRight('settlement_update') && (
            <Group>
              <Label block>Поселок</Label>
              <Static className={s.input}>{fields.name.value}</Static>
            </Group>
          )}
        </Col>
        {formKey !== 'create' && (
          <Col sm="10" lg="5">
            <Group
              kind={fields.state.touched && !!fields.state.error && 'error'}
            >
              <Label className={s.label}>Статус</Label>
              <Select
                className={cn(sUtils.fontSizeMd, s[states[values.state]])}
                options={options.states}
                disabled={!hasRight('settlement_update')}
                {...fields.state}
              />
              {fields.state.touched && fields.state.error && (
                <Helper>{fields.state.error}</Helper>
              )}
            </Group>
          </Col>
        )}
      </Row>
    </div>
  );
};

class Header extends Component {
  onSubmitSuccess() {
    const { formKey, fields, destroyForm } = this.props;

    if (formKey === 'create') destroyForm();
    if (formKey !== 'create') fields.toggle.onChange(undefined);
  }

  createOrUpdate() {
    const { formKey, values, actions } = this.props;

    if (formKey === 'create')
      return actions.createSettlement({ ...values, state: 'draft' });
    if (formKey !== 'create') return actions.updateSettlement(formKey, values);
  }

  render() {
    const {
      formKey,
      pristine,
      error,
      submitting,
      handleSubmit,
      values,
    } = this.props;
    const mainImage = values.images[0] || {};

    return (
      <header className={s.header}>
        <Form.Container
          onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
        >
          <Grid.Container fluid>
            <Row>
              <Col xs="20">
                <Heading size="lg">
                  <Back
                    button={
                      <Button type="button" className={sButton.btnBack}>
                        <Icon className={s.iconBack} icon="arrow-right" />
                      </Button>
                    }
                  />
                  {formKey !== 'create' && `Поселок (ID: ${formKey})`}
                  {formKey === 'create' && 'Создать посёлок'}
                </Heading>
              </Col>
            </Row>
            <Row>
              <Col xs="18">
                <Media
                  className={s.media}
                  left={<Image id={mainImage.id} />}
                  body={<Description {...this.props} />}
                />
              </Col>
            </Row>
          </Grid.Container>

          {formKey === 'create' && (
            <Button
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
      </header>
    );
  }
}

export default reduxForm({ ...formSettings, validate })(
  submitValidator()(Header),
);
