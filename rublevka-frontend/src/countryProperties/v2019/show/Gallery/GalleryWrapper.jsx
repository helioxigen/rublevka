import React from 'react';
import styled from 'styled-components';
import UI from 'ui';
import media from 'styles/media';
import GalleryCount from './GalleryCount';

const { Icon } = UI;

const ArrowIcon = styled(Icon)`
  width: 15px;
  height: 32px;
  fill: #fff;

  &:hover {
    opacity: 1;
  }
`;

const PrevButton = styled.button`
  outline: none;
  position: absolute;

  width: 50px;

  top: 0;
  bottom: 0;

  left: 0;

  border: none;
  background: none;
  padding: 0;
  z-index: 2;

  ${ArrowIcon} {
    position: absolute;
    left: 15px;
    transform: translateY(-50%);
    top: 50%;
  }
`;

const NextButton = styled(PrevButton)`
  left: unset;
  right: 0;
  ${ArrowIcon} {
    left: unset;
    right: 15px;
  }
`;

export const ExpandButton = styled.button`
  width: 16px;
  height: 16px;

  cursor: pointer;

  border: none;
  outline: none;
  background: none;

  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 15;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: #fff;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 -5px;
  min-height: 300px;

  ${media.xs`
    margin: 0;
    margin-bottom: 8px;
  `}

  ${media.md`
    margin: 4px 0px;
  `}

  &::before, &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 0;
    bottom: 0;
    width: 80px;
    transition: opacity 0.5s;
    opacity: 0;
    z-index: 1;

    display: none;

    ${media.md`
      display: block;
    `}
  }

  &::before {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    left: 0;
  }

  &::after {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    right: 0;
  }

  /* ${ExpandButton} {
    pointer-events: none;
  } */

  ${PrevButton}, ${ExpandButton} {
    opacity: 0;
    transition: opacity 0.5s;

    display: none;

    ${media.md`
      display: block;
    `}
  }

  &:hover {
    &::before,
    &::after {
      opacity: 1;
    }

    ${PrevButton}, ${ExpandButton} {
      opacity: 1;
    }
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

export default ({ children, onPrevClick, onNextClick }) => (
  <Wrapper>
    <PrevButton onClick={onPrevClick}>
      <ArrowIcon icon="carousel-left" />
    </PrevButton>
    {children}
    <NextButton onClick={onNextClick}>
      <ArrowIcon icon="carousel-right" />
    </NextButton>
  </Wrapper>
);
