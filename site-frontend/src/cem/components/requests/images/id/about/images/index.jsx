import React, { Component } from 'react';

import * as dicts from 'cem/constants/requests/images/dictionaries';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import PhotoList from 'cem/components/common/photos/list';
import Card from './card';

import UI from 'cem/components/ui';
const {
  Grid: { Col },
} = UI;

export default DragDropContext(HTML5Backend)(
  class extends Component {
    upload(images) {
      const { formKey, actions } = this.props;

      return actions.uploadImages(formKey, images);
    }

    render() {
      const { fields, values, isUploading, data, isImageUploadAllowed } = this.props;
      const isDisabled = !isImageUploadAllowed && [`done`, `approved`, `finished`, `rejected`].indexOf(data.state) > -1;
      const title = dicts.kinds[data.kind];

      return (
        <Col md="20">
          <PhotoList Card={<Card showDelete />} title={title} items={fields.images} upload={::this.upload} isUploading={isUploading} value={values.images} toggle={fields.toggle} disabled={isDisabled} />
        </Col>
      );
    }
  }
);
