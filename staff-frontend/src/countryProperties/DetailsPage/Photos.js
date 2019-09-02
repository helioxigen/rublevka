import React from "react";
import { Col, Row } from "react-flexbox-grid";

import { getImage } from "../../utils";

import {
  AddPhotoIcon,
  Dropdown,
  DropdownContainer,
  DropdownIcon,
  DropdownTitle,
  PhotoEditTool,
  PhotoEditTools,
  Photos
} from "./styled";
import addPhotoIcon from "./img/add-photo-icon.svg";
import dropdownPhotoIcon from "./img/dropdown-photo-icon.svg";
import Uploader from "./Uploader";
import PhotoCard from "./PhotoCard";

const isMultiple = true;

class PhotoSection extends React.Component {
  state = { isViewAll: false, isUploading: false };

  toggleViewAll = value => {
    this.setState({ isViewAll: value });
  };

  getCurrentImages = () => {
    const { property: { note, images } = {} } = this.props;

    if (!note) {
      return { images };
    }

    const { cloudImages = [] } = JSON.parse(note);

    return { images: cloudImages, isCloud: true };
  };

  handleUpload = async group => {
    const { images = [] } = this.props.property;
    this.saveImages([
      ...images,
      ...group.map(({ uuid }) => ({
        id: `CLOUD:${uuid}`,
        isPublic: false
      }))
    ]);
    // const { property, onUpdate } = this.props;
    // const photos = group.map(({ uuid }) => ({ id: uuid, isPublic: false }));

    // onUpdate(property, photos);

    // uploadPhoto(photos)
    //   .then(() => {
    //     this.setState({ isUploading: false });
    //   })
    //   .catch(() => {
    //     this.setState({ isUploading: false });
    //   });
  };

  saveImages = images => {
    const { property, onUpdate } = this.props;
    onUpdate(property, images);
  };

  handleRemove = id => {
    const {
      property: { images }
    } = this.props;

    const nextImages = images.filter(el => el.id !== id);
    this.saveImages(nextImages);
  };

  handleStateChange = id => {
    const {
      property: { images }
    } = this.props;

    const nextImages = images.map(el =>
      el.id === id ? { ...el, isPublic: !el.isPublic } : el
    );

    this.saveImages(nextImages);
  };

  render() {
    const { property, enableEditMode, isEditMode } = this.props;
    const { isViewAll, isUploading } = this.state;

    const { images } = property;

    if (!isEditMode) {
      const viewedImages = isViewAll ? images : images.slice(0, 2);

      return (
        <>
          <Photos isViewAll={isViewAll}>
            {viewedImages.map(({ id, isPublic }) => (
              <PhotoCard
                key={id}
                isPublic={isPublic}
                src={getImage(id, 512, "thumbnail")}
              />
            ))}
          </Photos>
          <PhotoEditTools>
            {property.images.length > 2 && (
              <PhotoEditTool onClick={() => this.toggleViewAll(!isViewAll)}>
                Посмотреть все фотографии
                <AddPhotoIcon src={addPhotoIcon} />
              </PhotoEditTool>
            )}
            <PhotoEditTool onClick={enableEditMode}>
              Редактировать
            </PhotoEditTool>
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
            <Photos isViewAll={isViewAll}>
              {images.map(({ id, isPublic }) => (
                <PhotoCard
                  key={id}
                  src={getImage(id, 512, "thumbnail")}
                  isEditable
                  isPublic={isPublic}
                  onRemoveClick={() => this.handleRemove(id)}
                  onStateClick={() => this.handleStateChange(id)}
                />
              ))}
            </Photos>
            <DropdownContainer>
              <Row center="xs">
                <DropdownIcon src={dropdownPhotoIcon} />
              </Row>
              <Row center="xs">
                <Uploader
                  disabled={isUploading}
                  id="images"
                  name="images"
                  data-images-only
                  multiple={isMultiple}
                  onUploadComplete={this.handleUpload}
                />
              </Row>
            </DropdownContainer>
          </Col>
        </Dropdown>
      </>
    );
  }
}

export default PhotoSection;
