import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import PhotoList from 'cem/components/common/photos/list';

import UI from 'cem/components/ui';
const {
  Grid: { Row },
} = UI;

import Card from './card';

import s from 'cem/styles/id/content';

import { formSettings } from 'cem/constants/complexBuildings/form';

export default DragDropContext(HTML5Backend)(
  reduxForm(formSettings)(
    class Photos extends Component {
      uploadPhoto(photos) {
        const { formKey, actions } = this.props;

        return actions
          .uploadPhoto(formKey, photos)
          .then(() => actions.loadComplexBuilding(formKey));
      }

      render() {
        const {
          fields,
          values,
          isImageUploadAllowed,
          isUpdateAllowed,
        } = this.props;
        const { isImageUploading } = this.props.data || {};

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
                toggle={fields._photosToggle}
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
