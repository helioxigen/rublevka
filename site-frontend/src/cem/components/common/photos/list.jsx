import React, { Component } from 'react';
import global from 'window-or-global';

import Uploadcare from 'cem/components/uploadcare';
import { TimeProgressBar } from 'cem/components/common/progressbar';
import { cloudfront } from 'core/config/resources';

import UI from 'cem/components/ui';
const {
  Button,
  Loading,
  Heading,
  Icon,
  Modal,
  Carousel,
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const makeImageRequestParams = request =>
  Object.keys(request)
    .map(key => `${key}=${request[key]}`)
    .join('&');

class PhotoList extends Component {
  state = {
    isCarouselOpened: false,
  };

  shouldComponentUpdate() {
    return !this.state.isUploading;
  }

  toggleCarousel(imageIndex) {
    this.setState({
      isCarouselOpened: !this.state.isCarouselOpened,
      lastClickedImageIndex: imageIndex,
    });
  }

  reorder(oldIndex, newIndex) {
    const { items, toggle } = this.props;

    items.swapFields(oldIndex, newIndex);
    toggle.onChange(Math.random());
  }

  remove(index) {
    const { items, toggle } = this.props;

    items.removeField(index);

    // A hack solution untill Erik fixes redux-form
    toggle.onChange(Math.random());
  }

  uploadFinished() {
    this.refs.progressbar.complete();
    setTimeout(() => {
      this.setState({ isUploading: false });
      this.refs.progressbar.reset();
      this.forceUpdate();
    }, 1500);
  }

  handleUpload(group) {
    const { upload } = this.props;
    const photos = group.map(({ cdnUrl }) => cdnUrl);
    // Get total upload size in kb
    const totalSize = Math.floor(
      group.reduce((total, next) => total + next.size, 0) / 1000,
    );

    this.setState({ totalSize, isUploading: true });
    upload(photos)
      .then(() => this.uploadFinished())
      .catch(() => this.setState({ isUploading: false }));
  }

  render() {
    const {
      Card,
      items = [],
      disabled,
      isPhotoSessionAllowed = false,
      requestLink,
    } = this.props;
    const { totalSize } = this.state;
    // Multiply total size in kb by the number of seconds it takes to process one kb (on average).
    const totalTime = totalSize * 9;
    const isUploading = this.props.isUploading || this.state.isUploading;

    const carouselImages = items.map(({ id }) => ({
      id: id.value,
      src: `${(global.config && global.config.cloudfront) || cloudfront}/${
        id.value
      }-jqestate`,
    }));

    const thumbnails = items.map(({ id }) => ({
      id: id.value,
      src: `${(global.config && global.config.cloudfront) || cloudfront}/${
        id.value
      }-thumbnail`,
    }));

    const requestBtn = {
      image: 'фотографии',
      layout: 'планировки',
    };

    return (
      <section className={sUtils.pushedBottom3}>
        <Row>
          <Col xs="20">
            <Heading size="md">
              {this.props.title}
              {!!requestLink && isPhotoSessionAllowed && (
                <Button
                  className={s.positionTopRight}
                  type="button"
                  kind="accent"
                  size="xs"
                  to={`/requests/properties/images/create?${makeImageRequestParams(
                    requestLink,
                  )}`}
                >
                  Заказать {requestBtn[requestLink.kind]}
                </Button>
              )}
            </Heading>
            <Modal
              isOpened={this.state.isCarouselOpened}
              closePortal={::this.toggleCarousel}
              onClose={() => this.setState({ isCarouselOpened: false })}
              hideCloseButton
              closeOnEsc
              closeOnOutsideClick
            >
              <Carousel
                images={carouselImages}
                thumbnails={thumbnails}
                currentSlide={this.state.lastClickedImageIndex}
                onClose={() => this.setState({ isCarouselOpened: false })}
                fullscreenOnly
              />
            </Modal>
          </Col>
        </Row>
        <Row>
          {items.map((item, index) => (
            <Col sm="10" lg="5" key={index}>
              {React.cloneElement(Card, {
                ...Card.props,
                ...item,
                disabled,
                index,
                reorder: !disabled ? ::this.reorder : () => {},
                remove: ::this.remove,
                toggleCarousel: ::this.toggleCarousel,
              })}
            </Col>
          ))}
          {isUploading && !totalSize && (
            <Col sm="10" lg="5">
              <Loading className={s.loadingPhoto} />
            </Col>
          )}
          {isUploading && !!totalSize && (
            <Col sm="10" lg="5" className={sUtils.positionRelative}>
              <TimeProgressBar time={totalTime} ref="progressbar" />
            </Col>
          )}
          {!disabled && (
            <Col sm="10" lg="5">
              <Uploadcare
                multiple
                onChange={::this.handleUpload}
                onBlur={() => {}}
              >
                <Button type="button" className={sButton.btnBigPlus} block>
                  <Icon className={s.iconAdd} icon="plus" />
                </Button>
              </Uploadcare>
            </Col>
          )}
          {disabled && !items.length && (
            <Col sm="20">
              <Heading notFound>Не найдено</Heading>
            </Col>
          )}
        </Row>
      </section>
    );
  }
}

export default PhotoList;
