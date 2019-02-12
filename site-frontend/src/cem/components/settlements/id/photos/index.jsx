import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import formSettings from 'cem/constants/settlements/form';
import validate from 'cem/validators/settlements';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import PhotoList from 'cem/components/common/photos/list';

import UI from 'cem/components/ui';
const {
  Grid: { Row },
} = UI;

import Card from './card';

import s from 'cem/styles/id/content';

export default DragDropContext(HTML5Backend)(
  reduxForm({ ...formSettings, validate })(
    class Photos extends Component {
      uploadPhoto(photos) {
        const { formKey, actions } = this.props;

        return actions
          .uploadPhoto(formKey, photos)
          .then(
            () =>
              actions.pop(`success`, `Фотографии успешно загружены`) &&
              actions.loadSettlement(formKey),
          );
      }

      render() {
        const { fields, values, hasRight, responsibleUserId } = this.props;
        const { isImageUploading } = this.props.data || {};
        const isImageUploadAllowed = hasRight(
          `settlement_image_upload`,
          responsibleUserId,
        );
        const isUpdateAllowed = hasRight(
          `settlement_update`,
          responsibleUserId,
        );

        return (
          <Row>
            <section className={s.section}>
              <PhotoList
                requestLink={{ kind: `image` }}
                Card={<Card disabled={!isUpdateAllowed} />}
                title="Фотографии"
                items={fields.images}
                value={values.images}
                isUploading={isImageUploading}
                upload={::this.uploadPhoto}
                toggle={fields.toggle}
                disabled={!isImageUploadAllowed}
                isPhotoSessionAllowed={false}
              />
            </section>
          </Row>
        );
      }
    },
  ),
);
