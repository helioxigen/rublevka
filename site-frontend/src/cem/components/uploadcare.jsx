import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import UI from 'cem/components/ui';
const { Button } = UI;

const minDimensions = height => fileInfo => {
  const imageInfo = fileInfo.originalImageInfo;

  if (!!imageInfo && imageInfo.height < height) {
    throw new Error(`min_height_${height}`);
  }
};

class Uploadcare extends Component {
  static defaultProps = {
    disabled: false,
    minHeight: 1980,
    settings: {},
  };

  componentDidMount() {
    const { multiple, minHeight } = this.props;
    const input = findDOMNode(this);

    this.widget = uploadcare.Widget(input.children[1]);

    this.widget.validators.push(minDimensions(minHeight));

    if (!multiple) {
      this.widget.onUploadComplete(result => {
        if (!this.props.keepValue) this.widget.value(null);
        if (this.props.onChange) this.props.onChange(result.cdnUrl);
        if (this.props.onBlur) this.props.onBlur(result.cdnUrl);
      });
    } else {
      this.widget.onChange(group => {
        if (group) {
          Promise.all(group.files()).then(files => {
            this.props.onChange(files);
            this.widget.value(null);
          });
        }
      });
    }
  }

  open(event) {
    const { minHeight } = this.props;

    event.preventDefault();
    this.widget.openDialog(null, {
      validators: [minDimensions(minHeight)],
    });
  }

  handleChildClick(event) {
    const { disabled } = this.props;

    if (!disabled) {
      ::this.open(event);
    }
  }

  render() {
    const defaultSettings = {
      'data-crop': true,
      'data-images-only': true,
      'data-tabs': `file gdrive dropbox skydrive`,
      'data-multiple': this.props.multiple,
    };

    const {
      settings,
      children = <Button size="xs">Загрузить файл</Button>,
    } = this.props;

    return (
      <span onClick={this.props.onClick}>
        {React.cloneElement(children, {
          ...children.props,
          onClick: ::this.handleChildClick,
        })}
        <input
          type="hidden"
          role="uploadcare-uploader"
          {...defaultSettings}
          {...settings}
        />
      </span>
    );
  }
}

export default Uploadcare;
