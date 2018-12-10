import React, { Component } from 'react';

import { cloudfront } from 'core/config/resources';

import UI from 'site/ui';
const { Image, Modal, Carousel, Grid: { Container, Row, Col } } = UI;

import s from 'landing/styles/landing/media';

class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCarouselOpen: false,
    };
  }

  toggleModal(modalState, currentSlide = 0) {
    this.setState({
      isCarouselOpen: modalState,
      currentSlide,
    });
  }

  render() {
    const { data = {} } = this.props;
    const { images = [] } = data;

    const publicImages = images.filter(({ isPublic }) => !!isPublic).map(({ id }) => ({
      id,
      src: `${global.config.cloudfront || cloudfront}/${id}-${global.config.postfix}`,
    }));

    const idsForShow = publicImages.map(({ id }) => id);

    return (
      <section>
        <Container fluid>
          <Row>
            <Col
              sm="6"
              md="4"
              className={s.imageContainer}
              onClick={() => ::this.toggleModal(true, 0)}
            >
              <Image
                className={s.image}
                src={`${global.config.cloudfront || cloudfront}/${idsForShow[0]}-thumbnail-512`}
              />
            </Col>
            <Col
              sm="6"
              md="4"
              className={s.imageContainer}
              onClick={() => ::this.toggleModal(true, 1)}
            >
              <Image
                className={s.image}
                src={`${global.config.cloudfront || cloudfront}/${idsForShow[1]}-thumbnail-512`}
              />
            </Col>
            <Col
              sm="6"
              md="4"
              className={s.imageContainer}
              onClick={() => ::this.toggleModal(true, 2)}
            >
              <Image
                className={s.image}
                src={`${global.config.cloudfront || cloudfront}/${idsForShow[2]}-thumbnail-512`}
              />
              <div className={s.overlay}>
                <div>
                  <h1 className={s.number}>{publicImages.length}</h1>
                  <p className={s.text}>фотографии</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {this.state.isCarouselOpen && (
          <Modal
            closeOnEsc
            closeOnOutsideClick
            onClose={() => ::this.toggleModal(false)}
            isOpened={this.state.isCarouselOpen}
            closePortal={() => ::this.toggleModal(false)}
            hideCloseButton
          >
            <Carousel
              title="Фотографии"
              images={publicImages}
              currentSlide={this.state.currentSlide}
              fullscreenOnly
              onClose={() => ::this.toggleModal(false)}
            />
          </Modal>
        )}
      </section>
    );
  }
}

export default Media;
