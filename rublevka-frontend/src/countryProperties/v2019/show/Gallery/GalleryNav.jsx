import React from 'react';
import styled from 'styled-components';
import { calcTranslateShift, getImageLink } from './utils';
import UI from '../../../../ui/v2019';

const { Icon } = UI;

const LayoutIcon = styled(Icon).attrs({
  icon: 'house-layout',
})`
  width: 20px;
  height: 20px;
  fill: #fff;
`;

const LayoutImagesButton = styled.button`
  background: #f44336;

  color: white;

  font-size: 13px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;

  border: 0;
  outline: none;
`;

const GalleryNav = ({
  className,
  images = [],
  currentImageIdx,
  onImageClick,
  showLayoutButton,
}) => (
  <div className={className}>
    <div
      className="shaft"
      style={{
        transform: calcTranslateShift(
          currentImageIdx,
          images.length,
          showLayoutButton,
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
    {showLayoutButton && (
      <LayoutImagesButton>
        <LayoutIcon />
        планировки
      </LayoutImagesButton>
    )}
  </div>
);

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
