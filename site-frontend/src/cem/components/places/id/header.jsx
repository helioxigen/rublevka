import React, { Component } from 'react';

import formSettings from 'cem/constants/places/form';
import { validatorShortcut } from 'core/decorators/submitValidator';
import FormField from 'cem/helpers/formField';

import * as dicts from 'cem/constants/places/dictionaries';

import UI from 'cem/components/ui';
const {
  Grid,
  Form,
  Heading,
  Button,
  Icon,
  Back,
  Form: { Input },
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class Header extends Component {
  createOrUpdate() {
    const {
      formKey,
      values: { aliases = [], ...values },
      actions,
      kind,
    } = this.props;
    const data = { aliases, ...values };

    if (formKey === `create`) {
      return actions.createPlace(kind, data).then(({ id }) => {
        actions.pushPath(`/places/${kind}/${id}`);
        actions.pop(
          `success`,
          `${dicts.kinds[kind].title[0]} (ID: ${id})`,
          `Успешно создано`,
        );
      });
    }

    if (formKey !== `create`) {
      return actions.updatePlace(kind, formKey, data).then(() => {
        actions.loadPlace(kind, formKey);
        actions.pop(
          `success`,
          `${dicts.kinds[kind].title[0]} (ID: ${formKey})`,
          `Успешно обновлено`,
        );
      });
    }
  }

  render() {
    const {
      formKey,
      fields,
      pristine,
      error,
      submitting,
      handleSubmit,
      kind,
      isUpdateAllowed,
    } = this.props;

    return (
      <Form.Container
        className={s.header}
        onSubmit={handleSubmit(::this.createOrUpdate)}
      >
        <Grid.Container fluid>
          <Row>
            <Col xs="20" className={sUtils.positionRelative}>
              <Heading size="lg">
                <Back
                  button={
                    <Button type="button" className={sButton.btnBack}>
                      <Icon className={s.iconBack} icon="arrow-right" />
                    </Button>
                  }
                />
                {formKey === `create` &&
                  `Добавить ${dicts.kinds[kind].title[1].toLowerCase()}`}
                {formKey !== `create` &&
                  `${dicts.kinds[kind].title[0]} (ID: ${formKey})`}
              </Heading>
            </Col>
          </Row>
          <div className={s.media}>
            <Row>
              <Col xs="20">
                <Row>
                  <Col sm="7">
                    <FormField
                      label={dicts.kinds[kind].title[0]}
                      field={fields.name}
                      float
                      static={!isUpdateAllowed}
                    >
                      <Input className={sUtils.fontSizeMd} block type="text" />
                    </FormField>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Grid.Container>
        {formKey === `create` && (
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
        {formKey !== `create` && isUpdateAllowed && (
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
    );
  }
}

export default validatorShortcut(formSettings)(Header);
