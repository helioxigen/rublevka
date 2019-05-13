import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  AddPhotoIcon,
  Dropdown,
  DropdownContainer,
  DropdownIcon,
  DropdownTitle,
  EditButton,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertyOption,
  PropertyOptionIcon,
  PropertyOptionWrapper,
  PropertyTitle,
  PropertyValue,
  SelectControl,
  Photos,
  PhotoEditTool,
  PhotoEditTools,
} from './styled';
import propertyOptionIcon from './img/property-option-icon.svg';
import { Body } from '../../UI';
import { mainLayouts } from '../constants/dictionaries';
import { selectFixedValueData } from './schema';
import addPhotoIcon from './img/add-photo-icon.svg';
import dropdownPhotoIcon from './img/dropdown-photo-icon.svg';
import Uploader from './Uploader';
import PhotoCard from './PhotoCard';
import { getImage } from '../../utils';

const isMultiple = true;

class LayoutSection extends React.Component {
  state = { isViewAll: false, isUploading: false };

  toggleViewAll = (value) => {
    this.setState({ isViewAll: value });
  };

  handleUpload = async (group) => {
    const { uploadPhoto } = this.props;
    const photos = group.map(({ cdnUrl }) => cdnUrl);
    this.setState({ isUploading: true });

    uploadPhoto(photos)
      .then(() => {
        this.setState({ isUploading: false });
      })
      .catch(() => {
        this.setState({ isUploading: false });
      });
  };

  saveImages = (images) => {
    const { property, onUpdate } = this.props;
    onUpdate({ ...property, layoutImages: images });
  };

  handleRemove = (id) => {
    const { property } = this.props;
    const { layoutImages } = property;
    const nextImages = layoutImages.filter(el => el.id !== id);
    this.saveImages(nextImages);
  };

  handleStateChange = (id) => {
    const { property } = this.props;
    const { layoutImages } = property;
    const nextImages = layoutImages.map(el =>
      (el.id === id ? { ...el, isPublic: !el.isPublic } : el));

    this.saveImages(nextImages);
  };

  render() {
    const {
      enableEditMode, isEditMode, property, onUpdate,
    } = this.props;
    const { isViewAll, isUploading } = this.state;

    const { specification } = property;
    const { layouts } = specification;
    const update = (key, value) =>
      onUpdate({
        ...property,
        specification: {
          ...specification,
          layouts: { ...layouts, [key]: value },
        },
      });

    if (!isEditMode) {
      const images = isViewAll
        ? property.layoutImages
        : property.layoutImages.slice(0, 2);
      const imagesCount = property.layoutImages.length;
      const propertyOptions = Object.keys(layouts);

      return (
        <>
          <Row>
            <Property xs={12}>
              <PropertyBigValue>Планировка</PropertyBigValue>
            </Property>
          </Row>
          <PropertyOptionWrapper>
            {propertyOptions.map(propertyOptionItem => (
              <PropertyOption key={mainLayouts[propertyOptionItem]} xs={4}>
                <PropertyOptionIcon src={propertyOptionIcon} />
                <PropertyValue>
                  <Body>
                    {mainLayouts[propertyOptionItem]}{' '}
                    {property.specification.layouts[propertyOptionItem] > 1
                      && `(${property.specification.layouts[propertyOptionItem]})`}
                  </Body>
                </PropertyValue>
              </PropertyOption>
            ))}
          </PropertyOptionWrapper>
          <Photos isViewAll={isViewAll}>
            {images.map(({ id, isPublic }) => (
              <PhotoCard
                key={id}
                isPublic={isPublic}
                src={getImage(id, 512, 'thumbnail')}
              />
            ))}
          </Photos>
          <PhotoEditTools>
            {imagesCount > 2 && (
              <PhotoEditTool onClick={() => this.toggleViewAll(!isViewAll)}>
                Посмотреть все фотографии
                <AddPhotoIcon src={addPhotoIcon} />
              </PhotoEditTool>
            )}
          </PhotoEditTools>
          <Row>
            <Col xs={12}>
              <EditButton onClick={enableEditMode}>Редактировать</EditButton>
            </Col>
          </Row>
        </>
      );
    }

    const { layoutImages: images } = property;

    return (
      <>
        <EditPropertyRow>
          <Col xs={2}>
            <PropertyBigValue>Планировка</PropertyBigValue>
          </Col>
          <Col xsOffset={1} xs={2}>
            <PropertyTitle>Гостиных</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.living_room}
              onChange={value => update('living_room', value)}
              filled
            />
            <PropertyTitle>Кабинетов</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.office}
              onChange={value => update('office', value)}
              filled
            />
            <PropertyTitle>Игровых</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.game_room}
              onChange={value => update('game_room', value)}
              filled
            />
            <PropertyTitle>Мансард</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.loft}
              onChange={value => update('loft', value)}
              filled
            />
          </Col>
          <Col xsOffset={1} xs={2}>
            <PropertyTitle>Технических помещений</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.technical_room}
              onChange={value => update('technical_room', value)}
              filled
            />
            <PropertyTitle>Хозяйственных помещений</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.utility_room}
              onChange={value => update('utility_room', value)}
              filled
            />
            <PropertyTitle>Кухонь</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.kitchen}
              onChange={value => update('kitchen', value)}
              filled
            />
            <PropertyTitle>СПА-зон</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.spa_zone}
              onChange={value => update('spa_zone', value)}
              filled
            />
          </Col>
          <Col xsOffset={1} xs={2}>
            <PropertyTitle>Столовых</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.dining_room}
              onChange={value => update('dining_room', value)}
              filled
            />
            <PropertyTitle>Гардеробных</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.dressing_room}
              onChange={value => update('dressing_room', value)}
              filled
            />
            <PropertyTitle>Кладовых</PropertyTitle>
            <SelectControl
              options={selectFixedValueData}
              selected={layouts.storage}
              onChange={value => update('storage', value)}
              filled
            />
          </Col>
        </EditPropertyRow>
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
                  src={getImage(id, 512, 'thumbnail')}
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

export default LayoutSection;
