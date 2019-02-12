import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import validate from 'cem/validators/properties';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Requests from 'cem/containers/properties/requests';

import PhotoList from 'cem/components/common/photos/list';

import { PhotoCard, LayoutCard } from './card';
import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Grid: { Row },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `property`,
  destroyOnUnmount: false,
  validate,
};

export default DragDropContext(HTML5Backend)(
  reduxForm(formSettings)(
    submitValidator()(
      class extends Component {
        onSubmitSuccess() {
          // A hack solution untill Erik fixes redux-form
          this.props.fields.toggle.onChange(undefined);
        }

        update() {
          const {
            formKey,
            values,
            actions,
            params: { category },
          } = this.props;

          return actions.updateProperty(formKey, values, category);
        }

        uploadPhoto(photos) {
          const { formKey, actions, category } = this.props;

          return actions
            .uploadPhoto(formKey, photos, category)
            .then(() => actions.loadProperty(formKey));
        }

        uploadLayout(photos) {
          const { formKey, actions, category } = this.props;

          return actions
            .uploadLayout(formKey, photos, category)
            .then(() => actions.loadProperty(formKey));
        }

        render() {
          const {
            fields,
            values,
            handleSubmit,
            formKey,
            pristine,
            error,
            submitting,
            data,
            isImageUploadAllowed,
            isPhotoSessionAllowed,
            isImagesOrderingAllowed,
          } = this.props;
          const { isImageUploading, isLayoutUploading, category } = data || {};

          return (
            <Form.Container>
              <Row>
                <section className={s.section}>
                  <PhotoList
                    Card={<PhotoCard showPublic showDelete />}
                    title="Фотографии"
                    items={fields.images}
                    value={values.images}
                    isUploading={isImageUploading}
                    upload={::this.uploadPhoto}
                    toggle={fields.toggle}
                    disabled={!isImageUploadAllowed}
                    isPhotoSessionAllowed={isPhotoSessionAllowed}
                  />
                  <Requests
                    className={sUtils.pushedBottom6}
                    kind="image"
                    objectId={formKey}
                    objectKlass={`${category}_property`}
                    isImagesOrderingAllowed={isImagesOrderingAllowed}
                  />
                  <PhotoList
                    Card={<LayoutCard showPublic showDelete />}
                    title="Планировки"
                    items={fields.layoutImages}
                    value={values.layoutImages}
                    isUploading={isLayoutUploading}
                    upload={::this.uploadLayout}
                    toggle={fields.toggle}
                    disabled={!isImageUploadAllowed}
                    isPhotoSessionAllowed={isPhotoSessionAllowed}
                  />
                  <Requests
                    kind="layout"
                    objectId={formKey}
                    objectKlass={`${category}_property`}
                    isImagesOrderingAllowed={isImagesOrderingAllowed}
                  />
                </section>
              </Row>
              {formKey !== `create` && (
                <Button
                  className={cn(
                    sButton.btnFixedBottom,
                    pristine && sUtils.hidden,
                  )}
                  disabled={error || submitting}
                  onClick={handleSubmit(::this.update, ::this.onSubmitSuccess)}
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
      },
    ),
  ),
);
