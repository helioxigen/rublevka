import React, { Component } from 'react';

import { FormattedDate } from 'react-formatted';
import formSettings from 'cem/constants/companies/form';
import { validatorShortcut } from 'core/decorators/submitValidator';

import User from 'cem/containers/common/user';
import LinkedContacts from 'cem/containers/companies/linkedContacts';

import UI from 'cem/components/ui';
const {
  Form, Heading,
  Grid: { Row, Col },
  Form: { Static, Group, Label },
} = UI;

import Addresses from './addresses';
import Phones from './phones';

import FormField from 'cem/helpers/formField';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  onSubmitSuccess() {
    this.props.actions.loadCompany(this.props.formKey);
  }

  update() {
    const { formKey, values, actions } = this.props;
    return actions.updateCompany(formKey, values);
  }

  render() {
    const { formKey, values, fields, isUpdateAllowed, handleSubmit, data = {} } = this.props;
    const onChange = handleSubmit(::this.update, ::this.onSubmitSuccess);

    return (
      <Row>
        <section className={s.section}>
          <Form.Container>
            <Heading size="md">Описание</Heading>
            <Row className={sUtils.pushedBottom3}>
              <Col xs="20">
                <Row>
                  <Col sm="10">
                    <Row>
                      <Col sm="10">
                        <FormField label="ИНН">
                          <Static>{values.inn}</Static>
                        </FormField>
                      </Col>
                      <Col sm="10">
                        <FormField label="ОГРН(ИП)">
                          <Static>{values.ogrn}</Static>
                        </FormField>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm="10">
                    <Row>
                      <Col sm="10">
                        <FormField label="КПП">
                          <Static>{values.inn}</Static>
                        </FormField>
                      </Col>
                      <Col sm="10">
                        <FormField label="Код ОПФ">
                          <Static>{values.ogrn}</Static>
                        </FormField>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Addresses actions={this.props.actions} field={fields.address} isStatic={!isUpdateAllowed} onChange={onChange} />
            <Phones actions={this.props.actions} field={fields.phoneNumbers} isStatic={!isUpdateAllowed} onChange={onChange} />

            {formKey !== `create` &&
              <Row>
                <Col xs="20">
                  <LinkedContacts companyId={parseInt(formKey, 10)} isUpdateAllowed={isUpdateAllowed} />
                </Col>
              </Row>
            }

            <Row className={sUtils.pushedBottom6}>
              <Col xs="20">
                <User id={data.responsibleUserId} title="Ответственный"/>
              </Col>
            </Row>

            <Row>
              {data.createdAt &&
                <Col sm="10">
                  <Heading size="md">Создан</Heading>
                  <Group>
                    <Label block>Дата создания</Label>
                    <Static><FormattedDate value={data.createdAt} mask="dd.mm.yyyy HH:MM" /></Static>
                  </Group>
                  {data.createdByUserId &&
                    <Group className={sUtils.resetIndentation}>
                      <Label block>Создал</Label>
                      <User id={data.createdByUserId} simple />
                    </Group>
                  }
                </Col>
              }

              {data.updatedAt &&
                <Col className={sUtils.pushedTopXs4} sm="10">
                  <Heading size="md">Изменен</Heading>
                  <Group>
                    <Label block>Дата изменения</Label>
                    <Static><FormattedDate value={data.updatedAt} mask="dd.mm.yyyy HH:MM" /></Static>
                  </Group>
                  {data.updatedByUserId &&
                    <Group>
                      <Label block>Изменил</Label>
                      <User id={data.updatedByUserId} simple />
                    </Group>
                  }
                </Col>
              }
            </Row>
          </Form.Container>
        </section>
      </Row>
    );
  }
}

export default validatorShortcut(formSettings)(About);
