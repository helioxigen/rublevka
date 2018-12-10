import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/constants/requests/remove/form';

import User from 'cem/containers/common/user';
import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Form, Heading,
  Grid: { Row, Col },
  Form: { Textarea, Input },
} = UI;

import Comments from 'cem/containers/common/comments';
import Property from 'cem/components/common/property';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  render() {
    const {
      formKey, fields, values,
      data, isStatic,
      isCommentingAllowed,
    } = this.props;
    const propertyId = values.propertyId || this.props.propertyId;
    const propertyCategory = values.propertyCategory || this.props.propertyCategory;

    return (
      <Row>
        <section className={s.section}>
          <Form.Container>
            <Row className={sUtils.pushedBottom3}>
              <Col md="18">
                <Heading size="md">Примечание</Heading>
                <FormField field={fields.note} static={isStatic}>
                  <Textarea className={cn(!isStatic && s.textarea)} rows="9" block kind="primary" />
                </FormField>
              </Col>
            </Row>
            <Row className={sUtils.pushedBottom3}>
              {values.kind === 'duplicate' && formKey === 'create' &&
              <Col sm="10" md="5">
                <Heading size="md">ID оригинального объекта</Heading>
                <FormField field={fields.originalPropertyId} static={isStatic}>
                  <Input block type="text" />
                </FormField>
              </Col>
                }
              {formKey !== 'create' && values.originalPropertyId &&
              <Col md="18">
                <Property id={values.originalPropertyId} showAddress resourcePath={`/v1/properties/${propertyCategory}`} isPreview title="Оригинальный объект" />
              </Col>
                }
            </Row>
            <Row className={sUtils.pushedBottom4}>
              <Col md="18">
                {propertyId && <Property id={propertyId} showAddress resourcePath={`/v1/properties/${propertyCategory}`} isPreview title="Объект на удаление" />}
              </Col>
            </Row>
          </Form.Container>

          {formKey !== 'create' && isCommentingAllowed &&
            <Row className={sUtils.pushedBottom6}>
              <Col md="18">
                <Comments entity={{ key: 'removalRequests', id: formKey }} />
              </Col>
            </Row>
          }

          {formKey !== 'create' &&
            <Row>
              <Col md="18">
                <Row>
                  <Col sm="10">
                    <User title="Создал" id={data.createdByUserId} />
                  </Col>
                  {data.updatedByUserId &&
                    <Col className={sUtils.pushedTopXs4} sm="10">
                      <User title="Изменил" id={data.updatedByUserId} />
                    </Col>
                  }
                </Row>
              </Col>
            </Row>
          }
        </section>
      </Row>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(About));
