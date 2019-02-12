import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import { formSettings } from 'cem/constants/requests/images/form';
import { categories } from 'cem/constants/requests/images/dictionaries';

import submitValidator from 'core/decorators/submitValidator';

import FormField from 'cem/helpers/formField';

import User from 'cem/containers/common/user';

import UI from 'cem/components/ui';
const {
  Form,
  Heading,
  Grid: { Row, Col },
  Form: { Textarea },
} = UI;

import Comments from 'cem/containers/common/comments';
import Property from 'cem/components/common/property';
import Answers from 'cem/containers/common/answers';
import Images from './images';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  render() {
    const {
      fields,
      values,
      formKey,
      data,
      location,
      isUpdateAllowed,
      isImageUploadAllowed,
      isCommentingAllowed,
      isAnswersPreviewAllowed,
      isCurrentUserResponsible,
    } = this.props;
    const {
      objectId = location.query.objectId,
      objectKlass = location.query.objectKlass,
    } = values;

    const propertyCategory = categories[objectKlass || 'city_property'].value;
    const isDescriptionFieldStatic =
      formKey !== 'create' &&
      (['finished', 'rejected', 'done', 'approved'].indexOf(data.state) > -1 ||
        !isUpdateAllowed);

    return (
      <Row>
        <section className={s.section}>
          <Form.Container>
            <Row className={sUtils.pushedBottom4}>
              <Col lg="18">
                {objectId && (
                  <Property
                    id={objectId}
                    showAddress
                    resourcePath={`/v1/properties/${propertyCategory}`}
                    isPreview
                  />
                )}
              </Col>
            </Row>
            <Row className={sUtils.pushedBottom3}>
              <Col lg="18">
                <Heading size="md">Примечание</Heading>
                <FormField
                  field={fields.description}
                  static={isDescriptionFieldStatic}
                >
                  <Textarea
                    className={cn(!isDescriptionFieldStatic && s.textarea)}
                    rows="9"
                    block
                    kind="primary"
                  />
                </FormField>
              </Col>
            </Row>
            {formKey !== 'create' && data.state !== 'new' && (
              <Row>
                <Images
                  {...this.props}
                  isImageUploadAllowed={
                    isImageUploadAllowed &&
                    data.state === 'in_progress' &&
                    isCurrentUserResponsible
                  }
                />
              </Row>
            )}
          </Form.Container>
          {data.state === 'finished' && isAnswersPreviewAllowed && (
            <Answers requestId={formKey} />
          )}
          {formKey !== 'create' && isCommentingAllowed && (
            <Row className={sUtils.pushedBottom6}>
              <Col lg="18">
                <Comments entity={{ key: 'imagesRequests', id: formKey }} />
              </Col>
            </Row>
          )}
          {formKey !== 'create' && (
            <Row>
              <Col sm="18">
                <Row>
                  <Col sm="10">
                    {data.createdByUserId && (
                      <User id={data.createdByUserId} title="Заказчик" />
                    )}
                  </Col>
                  <Col className={sUtils.pushedTopXs4} sm="10">
                    {data.responsibleUserId && (
                      <User id={data.responsibleUserId} title="Ответственный" />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </section>
      </Row>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(About));
