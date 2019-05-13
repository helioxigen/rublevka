import React, { Component } from 'react';
import uploadcare from 'uploadcare-widget';

const minDimensions = height => (fileInfo) => {
  const imageInfo = fileInfo.originalImageInfo;

  if (!!imageInfo && imageInfo.height < height) {
    throw new Error(`min_height_${height}`);
  }
};

class Uploader extends Component {
  static defaultProps = {
    disabled: false,
    minHeight: 1920,
    settings: {},
  };

  componentDidMount() {
    const widget = uploadcare.Widget(this.uploader);
    const {
      value,
      onChange,
      onUploadComplete,
      minHeight,
      keepValue,
      multiple,
    } = this.props;

    widget.validators.push(minDimensions(minHeight));

    if (typeof value !== 'undefined') {
      widget.value(value);
    }
    if (typeof onChange === 'function') {
      widget.onChange((files) => {
        if (files) {
          if (this.files && this.files.files) {
            this.files = this.files.files();
          } else {
            this.files = [this.files];
          }
        } else {
          this.files = null;
        }
        onChange(files);
      });
    }

    if (!multiple) {
      widget.onUploadComplete((result) => {
        if (!keepValue) {
          widget.value(null);
        }
        onUploadComplete(result.cdnUrl);
      });
    } else {
      widget.onChange((group) => {
        if (group) {
          Promise.all(group.files()).then((files) => {
            onUploadComplete(files);
            widget.value(null);
          });
        }
      });
    }

    widget.onDialogOpen((dialog) => {
      this.dialog = dialog;
    });
  }

  componentWillUnmount() {
    if (this.dialog) {
      this.dialog.reject();
    }
    if (this.files) {
      uploadcare.jQuery.when.apply(null, this.files).cancel();
    }

    const widgetElement = uploadcare
      .jQuery(this.uploader)
      .next('.uploadcare--widget');
    const widget = widgetElement.data('uploadcareWidget');

    if (widget && widget.inputElement === this.uploader) {
      widgetElement.remove();
    }
  }

  getInputAttributes() {
    const attributes = Object.assign({}, this.props);

    delete attributes.value;
    delete attributes.onChange;
    delete attributes.onUploadComplete;

    return attributes;
  }

  render() {
    const { multiple } = this.props;
    const attributes = this.getInputAttributes();
    const defaultSettings = {
      'data-images-only': true,
      'data-tabs': 'file gdrive dropbox skydrive',
      'data-multiple': multiple,
    };

    return (
      <input
        type="hidden"
        ref={(input) => {
          this.uploader = input;
        }}
        {...attributes}
        {...defaultSettings}
      />
    );
  }
}

export default Uploader;
