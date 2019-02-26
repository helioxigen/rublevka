import React, { Component } from 'react';

import { cloudfront } from 'core/config/resources';

import Uploadcare from 'cem/components/uploadcare';

import UI from 'cem/components/ui';
const { Loading, Image } = UI;

import s from 'cem/styles/id/header';

class Avatar extends Component {
  static defaultProps = {
    settings: {},
    previewImageWidth: 102,
    previewImageHeight: 102,
    previewImageSize: 128,
  };

  render() {
    const {
      id,
      settings,
      photoPlaceholder,
      wrapperClassName,
      minImageHeight,
      previewImageSize,
      previewImageWidth,
      previewImageHeight,
      isUploading,
      isUploadAllowed,
      onUpload,
    } = this.props;

    return (
      <Uploadcare
        onChange={onUpload}
        minHeight={minImageHeight}
        disabled={isUploading || !isUploadAllowed}
        settings={settings}
      >
        <div className={wrapperClassName}>
          {!isUploading && (
            <Image
              src={
                id
                  ? `${cloudfront}/${id}-${previewImageSize}`
                  : require(`url-loader!cem/assets/${photoPlaceholder}`)
              }
              kind="circle"
              width={previewImageWidth}
              height={previewImageHeight}
            />
          )}
          {isUploading && <Loading style={{ paddingTop: `2.5rem` }} />}
        </div>
      </Uploadcare>
    );
  }
}

class UserAvatar extends Component {
  handleUpload(url) {
    const { uploadAction, resourceId } = this.props;

    uploadAction(resourceId, [url]);
  }

  render() {
    return (
      <Avatar
        {...this.props}
        wrapperClassName={s.userAvatarImageWrapper}
        minImageHeight={512}
        settings={{ 'data-crop': `1:1` }}
        photoPlaceholder="placeholder-photo"
        onUpload={::this.handleUpload}
      />
    );
  }
}

class SelectionAvatar extends Component {
  handleUpload(url) {
    const { actions, uploadAction, resourceId } = this.props;

    actions.pop(`success`, `Начата загрузка фотографии`);
    uploadAction(resourceId, [url]).then(
      data => {
        actions.loadSelection(data.id);
        actions.pop(`success`, `Фотография обновлена`);
      },
      ({ status }) => {
        if (status === 304) {
          actions.pop(`info`, `Такая фотография уже существует`);
        }
      },
    );
  }

  render() {
    const { isUploading } = this.props;

    return (
      <Avatar
        {...this.props}
        wrapperClassName={
          isUploading
            ? s.selectionAvatarImageWrapper
            : s.selectionAvatarImageWrapperInactive
        }
        minImageHeight={1024}
        photoPlaceholder="placeholder"
        onUpload={::this.handleUpload}
      />
    );
  }
}

export { UserAvatar, SelectionAvatar };
