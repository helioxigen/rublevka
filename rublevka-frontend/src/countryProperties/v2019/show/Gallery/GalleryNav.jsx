import React from 'react';
import styled, { css } from 'styled-components';
import { calcTranslateShift, getImageLink } from './utils';
import UI from '../../../../ui/v2019';
import media from '../../../../styles/media';

const { Icon } = UI;

export const LayoutIcon = styled(Icon).attrs({
  icon: 'house-layout',
})`
  width: 1.5em;
  height: 1.5em;
  fill: #fff;
`;

export const LayoutImagesButton = styled.button`
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

const GalleryNav = ({
  className,
  images = [],
  currentImageIdx,
  onImageClick,
  onLayoutImagesClick,
  showLayoutButton,
}) => (
  <div className={className}>
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
    {showLayoutButton && images.length > 6 && (
      <LayoutImagesButton onClick={onLayoutImagesClick}>
        <LayoutIcon />
        планировки
      </LayoutImagesButton>
    )}
  </div>
);

const shift = size => props =>
  calcTranslateShift(
    props.currentImageIdx,
    props.images.length,
    props.showLayoutButton,
    size,
  );

export default styled(GalleryNav)`
  position: relative;
  overflow: hidden;

  display: none;

  ${media.md`
    display: block;
  `}

  margin-top: 4px;

  .shaft {
    display: flex;
    transition: transform 0.5s;

    transform: ${shift(5)};

    @media screen and (min-width: 560px) {
      transform: ${shift(6)};
    }

    ${media.sm`
      transform: ${shift(7)};
    `}
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

    width: calc(1 / 5 * 100%);

    ${media.xs`
      height: 60px;
    `}

    @media screen and (min-width: 560px) {
      width: calc(1 / 6 * 100%);
    }

    ${media.sm`
      width: calc(1 / 7 * 100%);
    `}
  }

  ${LayoutImagesButton} {
    width: calc(1 / 5 * 100% - 1.5px);

    @media screen and (min-width: 560px) {
      width: calc(1 / 6 * 100% - 1.5px);
    }

    ${media.sm`
      width: calc(1 / 7 * 100% - 1.5px);
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
