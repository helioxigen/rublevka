import React from 'react';
import styled, { css } from 'styled-components';
import { calcTranslateShift, getImageLink } from './utils';
import UI from '../../../../ui/v2019';
import media from '../../../../styles/media';

const { Icon } = UI;

const LayoutIcon = styled(Icon).attrs({
  icon: 'house-layout',
})`
  width: 1.5em;
  height: 1.5em;
  fill: #fff;
`;

const LayoutImagesButton = styled.button`
  background: #f44336;

  color: white;

  font-size: 2.5vw;

  ${media.xs`
    font-size: 13px;
  `}

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 0.8em 0;

  border: 0;
  outline: none;
`;

class GalleryNavScrollable extends React.Component {
  componentDidUpdate(prevProps) {
    const { currentImageIdx } = this.props;

    if (prevProps.currentImageIdx !== currentImageIdx) {
      const { scrollWidth } = this.container;

      const elementWidth = scrollWidth / this.props.images.length;

      const xPos = elementWidth * currentImageIdx;

      const scrolledTo = xPos - (elementWidth * 2);

      if (this.container.scrollTo) {
        this.container.scrollTo({
          left: scrolledTo,
          behavior: 'smooth',
        });
      } else {
        this.container.scrollLeft = scrolledTo;
      }
    }
  }

  render() {
    const {
      className,
      images = [],
      currentImageIdx,
      onImageClick,
      onLayoutImagesClick,
      showLayoutButton,
    } = this.props;

    return (
      <div className={className}>
        <div className="container" ref={el => (this.container = el)}>
          <div className="shaft">
            {images.map(({ id }, idx) => (
              <a
                tabIndex={0}
                role="menuitem"
                className="gallery-nav-item"
                onClick={() => onImageClick(idx)}
              >
                <img
                  key={id}
                  alt={id}
                  data-current={idx === currentImageIdx}
                  src={getImageLink(id, 512, 'thumbnail')}
                />
              </a>
            ))}
            {showLayoutButton && images.length < 6 && (
              <LayoutImagesButton onClick={onLayoutImagesClick}>
                <LayoutIcon />
                планировки
              </LayoutImagesButton>
            )}
          </div>
        </div>
        {showLayoutButton && images.length > 6 && (
          <LayoutImagesButton onClick={onLayoutImagesClick}>
            <LayoutIcon />
            планировки
          </LayoutImagesButton>
        )}
      </div>
    );
  }
}

const paddingOnLayout = props =>
  props.showLayoutButton &&
  css`
    padding-right: 22vw;

    ${media.sm`
      padding-right: 100px;
    `}
  `;

export default styled(GalleryNavScrollable)`
  position: relative;

  ${media.md`
    display: none;
  `}

  margin-top: 4px;

  .container {
    overflow-x: scroll;
    overflow-y: hidden;
  }

  ${paddingOnLayout};

  .shaft {
    display: flex;
    transition: transform 0.5s;
  }

  & > ${LayoutImagesButton} {
    position: absolute;
    right: 0;
    top: 0;
  }

  .gallery-nav-item {
    outline: none;

    padding: 0 1.5px;
  }

  .gallery-nav-item,
  ${LayoutImagesButton} {
    height: 12vw;

    flex: 0 0 auto;

    width: 22vw;

    ${media.sm`
      width: 100px;
    `}

    ${media.xs`
      height: 60px;
    `}
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  img:not([data-current='true']) {
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 0.75;
    }
  }
`;
