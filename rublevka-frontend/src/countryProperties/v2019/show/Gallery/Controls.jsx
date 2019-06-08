import React from 'react';
import styled from 'styled-components';
import UI from '../../../../ui';
import media from '../../../../styles/media';

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

  display: none;

  ${media.md`
    display: block;
  `}

  width: 100px;

  top: 0;
  bottom: 0;

  left: 0;

  border: none;
  background: none;
  padding: 0;
  z-index: 2;

  ${ArrowIcon} {
    position: absolute;
    left: 50px;
    transform: translateY(-50%);
    top: 50%;
  }
`;

const NextButton = styled(PrevButton)`
  left: unset;
  right: 0;
  ${ArrowIcon} {
    left: unset;
    right: 50px;
  }
`;

export default ({ onPrevClick, onNextClick }) => (
  <div>
    <PrevButton onClick={onPrevClick}>
      <ArrowIcon icon="carousel-left" />
    </PrevButton>
    {/* {children} */}
    <NextButton onClick={onNextClick}>
      <ArrowIcon icon="carousel-right" />
    </NextButton>
  </div>
);
