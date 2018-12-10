import React, { Component } from 'react';

import formSettings from 'cem/constants/places/form';
import { validatorShortcut } from 'core/decorators/submitValidator';
import FormField from 'cem/helpers/formField';
// import { FormattedDate } from 'react-formatted';

import * as dicts from 'cem/constants/places/dictionaries';

// import User from 'cem/containers/common/user';

import UI from 'cem/components/ui';
const {
  Form, Select, AsyncSelect,
  Heading,
  Grid: { Row, Col },
  // Form: { Label, Group, Static },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import SeoMeta from 'cem/components/seo/meta';

class About extends Component {
  render() {
    const { fields, kind, isUpdateAllowed } = this.props;
    const { parents } = dicts.kinds[kind];

    return (
      <Row>
        <section className={s.section}>
          <Form.Container>
            <Heading size="md">Описание</Heading>
            <Row className={sUtils.pushedBottom3}>
              <Col sm="10">
                <Row>
                  <Col sm="14">
                    <FormField field={fields.aliases} label="Синонимы" float static={!isUpdateAllowed}>
                      <Select multi allowCreate />
                    </FormField>
                  </Col>
                </Row>
              </Col>

              <Col sm="10">
                {parents.map((item, index) => (
                  <Row key={index}>
                    <Col sm="14">
                      <FormField field={fields.location[item]} label={dicts.parentFields[item].label} float asyncValue={dicts.parentFields[item].fetch} static={!isUpdateAllowed} labelKey="name">
                        <AsyncSelect asyncOptions={dicts.parentFields[item].fetch} />
                      </FormField>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
            {/* <Row>
              {formKey !== `create` &&
                <Col sm="10">
                  <Heading size="md">Создан</Heading>
                  <Group>
                    <Label block>Дата создания</Label>
                    <Static><FormattedDate value={data.createdAt} mask="dd.mm.yyyy HH:MM" /></Static>
                  </Group>
                  <Group className={sUtils.resetIndentation}>
                    <Label block>Создал</Label>
                    <Static><User id={} /></Static>
                  </Group>
                </Col>
              }
              {data.updatedAt !== data.createdAt &&
                <Col className={sUtils.pushedTopXs4} sm="10">
                  <Heading size="md">Изменен</Heading>
                  <Group>
                    <Label block>Дата изменения</Label>
                    <Static><FormattedDate value={data.updatedAt} mask="dd.mm.yyyy HH:MM" /></Static>
                  </Group>
                  <Group className={sUtils.resetIndentation}>
                    <Label block>Изменил</Label>
                    <Static><User /></Static>
                  </Group>
                </Col>
              }
            </Row> */}
              { kind == "routes" && <SeoMeta className={sUtils.pushedBottom3} {...this.props} /> }
          </Form.Container>
        </section>
      </Row>
    );
  }
}

export default validatorShortcut(formSettings)(About);
