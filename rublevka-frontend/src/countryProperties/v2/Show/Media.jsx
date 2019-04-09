import React, { Component } from 'react';
import Slider from 'react-slick';
import global from 'window-or-global';
import { cloudfront } from 'core/config/resources';

import isRetina from 'is-retina';

import UI from 'ui';

import s from 'styles/property/media';
import sUtils from 'styles/utils';

import styled from 'styled-components';

import media from 'styles/media';

const { Modal, Carousel, RetinaImage, Icon } = UI;

const Wrapper = styled.section`
  position: relative;
  min-height: 21rem;
  margin: 0 -1.5rem;
  overflow: hidden;
  white-space: nowrap;
  background: #ffffff
    url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMTFweCIgaGVpZ2h0PSIxN3B4IiB2aWV3Qm94PSIwIDAgNTAgNTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+UGF0aCAxNDA5IENvcHkgMjI8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSIxMjAwX29wZW5fb2JqZWN0X25vX3Bob3RvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjQ5LjAwMDAwMCwgLTE1My4wMDAwMDApIiBmaWxsPSIjRUFFQUVBIj4gICAgICAgICAgICA8ZyBpZD0icGF0dGVybiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAwLjAwMDAwMCwgOTkuMDAwMDAwKSI+ICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00OS4zODgzMTAxLDY0LjU3MTk3NSBDNDkuMzcyNjI1Myw2NC41Nzg1MzIgNDkuMzg4MzEwMSw1NC42OTkzNzUxIDQ5LjM4ODMxMDEsNTQuNjk5Mzc1MSBDNDkuMzg4MzEwMSw1NC42OTkzNzUxIDQ5LjM5Mjk5NzYsNTMuNzI0MjMwMyA1MC4xNTE2MzY0LDU0LjA2NjI4NzQgQzUwLjkxMDI3NTIsNTQuNDA4MzQ0NSA1OC41NDk1NzczLDU4LjU3MjA0MjUgNTguNTQ5NTc3Myw1OC41NzIwNDI1IEM1OC41NDk1NzczLDU4LjU3MjA0MjUgNTkuMzU0MTg4OSw1OC44ODYwNSA1OS43MDkyNTk5LDYwLjI0MjI1NzMgQzU5Ljc0Mzk2NDcsNjAuMjU2MzczMSA1OS43MzQzMTk1LDcwLjAzMjc3NjEgNTkuNzMwMzUzMiw3MC4wNDA0MzE4IEM1OS42OTkzNDQyLDcxLjAxOTg3ODUgNTguNzUwNTA0OCw3MC42Mjc0NiA1OC43NTA1MDQ4LDcwLjYyNzQ2IEw1MC4xNTE2MzY0LDY2LjAwNDU4OTUgQzUwLjE1MTYzNjQsNjYuMDA0NTg5NSA0OS41ODIyMDY1LDY1Ljc0MjEyNyA0OS4zODgzMTAxLDY0LjU3MTk3NSBaIiBpZD0iUGF0aC0xNDA5LUNvcHktMjIiPjwvcGF0aD4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=')
    top left repeat;
  background-size: 5rem 5.4rem;
  border-bottom: 1px solid ${p => p.theme.grey};
  &::-webkit-scrollbar {
    display: none;
  }
  ${media.sm`
    min-height: 33rem;
    max-height: 33rem;
  `};
`;

const DefaultImage = styled(Icon)`
  width: 100%;
  min-height: 9rem;
  max-height: 7rem;
  fill: #5f5f5f;
  margin-top: 2rem;

  ${media.sm`
    margin-top: 3rem;
    min-height: 12.7rem;
    max-height: 10rem;
  `} ${media.xlg`
    min-height: 15rem;
    max-height: 11.8rem;
  `};
`;

const Text = styled.p`
  position: absolute;
  right: 0;
  bottom: 3rem;
  left: 0;
  color: #aaaaaa;
  font-size: 1.6rem;
  font-weight: 300;
  text-align: center;

  ${media.sm`
    bottom: 5rem;
    font-size: 2.2rem;
  `};
`;

const StRetinaImage = styled(RetinaImage)`
  width: auto;
  height: 21rem;
  border-right: 1px solid ${p => p.theme.brandWhite};
  ${media.sm`
    height: 33rem;
    border-right: 2px solid ${p => p.theme.brandWhite};
  `};
`;

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: !!this.props.isOpen,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(modalState, currentSlide = 0) {
    this.setState({
      isOpen: modalState,
      currentSlide,
    });
  }

  render() {
    const publicImages = this.props.images.filter(({ isPublic }) => !!isPublic);

    const images = publicImages.map(({ id }) => ({
      id,
      src: `${global.config.cloudfront || cloudfront}/${id}-${
        global.config.postfix
      }`,
    }));

    const thumbnails = publicImages.map(({ id }) => ({
      id,
      src: `${global.config.cloudfront || cloudfront}/${id}-thumbnail`,
    }));

    const postfix = isRetina() ? global.config.postfix : 'thumbnail';

    return images.length ? (
      <Wrapper>
        <div className={sUtils.hideFromMd}>
          <Slider {...settings}>
            {images.map(({ id }, index) => (
              <button
                type="button"
                className={s.imageContainer}
                onClick={() => this.toggleModal(true, index)}
                key={index}
              >
                <StRetinaImage
                  src={`${global.config.cloudfront ||
                    cloudfront}/${id}-${postfix}`}
                  size={512}
                  alt={id}
                />
              </button>
            ))}
          </Slider>
        </div>

        <div className={sUtils.hideXsSm}>
          {images.map(({ id }, index) => (
            <button
              type="button"
              className={s.imageContainer}
              onClick={() => this.toggleModal(true, index)}
              key={index}
            >
              <StRetinaImage
                src={`${global.config.cloudfront ||
                  cloudfront}/${id}-${postfix}`}
                size={512}
                alt={id}
              />
            </button>
          ))}
        </div>

        <Modal
          closeOnEsc
          closeOnOutsideClick
          onClose={() => this.toggleModal(false)}
          isOpened={this.state.isOpen}
          closePortal={() => this.toggleModal(false)}
          hideCloseButton
        >
          <Carousel
            title="Фотографии"
            images={images}
            thumbnails={thumbnails}
            currentSlide={this.state.currentSlide}
            fullscreenOnly
            onClose={() => this.toggleModal(false)}
          />
        </Modal>
      </Wrapper>
    ) : (
      <section className={s.placeholderContainer}>
        <Text>Фотографии объекта отсутствуют</Text>
        <DefaultImage responsive icon="placeholder2" />
      </section>
    );
  }
}
