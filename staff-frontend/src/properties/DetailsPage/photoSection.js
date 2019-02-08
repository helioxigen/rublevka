import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import Dropzone from 'react-dropzone';
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
  PhotoExample,
  PhotoExampleContainer,
  PhotoExampleWrapper,
} from './style';
import example from './img/example1.png';
import addPhotoIcon from './img/add-photo-icon.svg';
import dropdownPhotoIcon from './img/dropdown-photo-icon.svg';

const PhotoSection = ({ enablePhotoEditMode, isEditMode }) =>
  !isEditMode ? (
    <>
      <Row>
        <PhotoExampleContainer xs={12}>
          <PhotoExampleWrapper>
            <PhotoExample src={example} />
            <PhotoCloseButton />
          </PhotoExampleWrapper>
          <PhotoExampleWrapper>
            <PhotoExample src={example} />
            <PhotoCloseButton />
          </PhotoExampleWrapper>
          <PhotoExampleWrapper>
            <PhotoExample src={example} />
            <PhotoCloseButton />
          </PhotoExampleWrapper>
        </PhotoExampleContainer>
      </Row>
      <Row>
        <PhotoEditTools xs={12}>
          <PhotoEditTool>
            Посмотреть все фотографии
            <AddPhotoIcon src={addPhotoIcon} />
          </PhotoEditTool>
          <PhotoEditTool onClick={enablePhotoEditMode}>
            Редактировать
          </PhotoEditTool>
        </PhotoEditTools>
      </Row>
    </>
  ) : (
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

export default PhotoSection;
