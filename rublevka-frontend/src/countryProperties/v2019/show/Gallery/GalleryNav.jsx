import React from 'react';
import styled from 'styled-components';
import { calcTranslateShift, getImageLink } from './utils';

const GalleryNav = ({
  className,
  images = [],
  currentImageIdx,
  onImageClick,
  hasLayoutImages,
}) => (
  <div className={className}>
    <div
      className="shaft"
      style={{
        transform: calcTranslateShift(
          currentImageIdx,
          images.length,
          hasLayoutImages,
        ),
      }}
    >
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
    </div>
  </div>
);

const LayoutImagesButton = styled.button`
  background: #f44336;

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 0;
  outline: none;
`;

export default styled(GalleryNav)`
  position: relative;
  overflow: hidden;

  .shaft {
    display: flex;
    transition: transform 0.5s;
  }

  ${LayoutImagesButton} {
    position: absolute;
    right: 0;
    top: 0;
  }

  .gallery-nav-item {
    padding-right: 3px;
    outline: none;
  }

  .gallery-nav-item,
  ${LayoutImagesButton} {
    height: 60px;

    flex: 0 0 auto;

    width: calc(1 / 7 * 100%);
  }

  img {
    height: 100%;
    width: 100%;
  }

  img:not([data-current='true']) {
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 0.75;
    }
  }
`;
