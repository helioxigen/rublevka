import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import Dropzone from 'react-dropzone';

import { getImage } from '../../utils';

import {
  AddPhotoIcon,
  Dropdown,
  DropdownAnnotation,
  DropdownButton,
  DropdownContainer,
  DropdownIcon,
  DropdownTitle,
  PhotoCloseButton,
  PhotoEditTool,
  PhotoEditTools,
  Photo,
  Photos,
} from './styled';
import addPhotoIcon from './img/add-photo-icon.svg';
import dropdownPhotoIcon from './img/dropdown-photo-icon.svg';

const PhotoSection = ({ data, enableEditMode, isEditMode }) => {
  const [isViewAll, toggleViewAll] = React.useState(false);

  if (!isEditMode) {
    const images = isViewAll ? data.images : data.images.slice(0, 2);

    return (
      <>
        <Photos isViewAll={isViewAll}>
          {images.map(({ id }) => (
            <Photo key={id} src={getImage(id, 512, 'thumbnail')} />
          ))}
        </Photos>
        <PhotoEditTools>
          {data.images.length > 2 && (
            <PhotoEditTool onClick={() => toggleViewAll(true)}>
              Посмотреть все фотографии
              <AddPhotoIcon src={addPhotoIcon} />
            </PhotoEditTool>
          )}
          <PhotoEditTool onClick={enableEditMode}>Редактировать</PhotoEditTool>
        </PhotoEditTools>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <DropdownTitle>Фотографии</DropdownTitle>
        </Col>
      </Row>
      <Dropdown>
        <Col xs={12}>
          <Dropzone accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <DropdownContainer {...getRootProps()}>
                <input {...getInputProps()} />
                <Row center="xs">
                  <DropdownIcon src={dropdownPhotoIcon} />
                </Row>
                <Row center="xs">
                  <DropdownButton>Выбрать фотографии</DropdownButton>
                </Row>
                <Row center="xs">
                  <DropdownAnnotation>Или перетащите сюда</DropdownAnnotation>
                </Row>
              </DropdownContainer>
            )}
          </Dropzone>
        </Col>
      </Dropdown>
    </>
  );
};
export default PhotoSection;
