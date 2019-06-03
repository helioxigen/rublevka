import React from 'react';
import styled from 'styled-components';
import UI from '../../../../ui';

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
  left: 50px;
  border: none;
  background: none;
  padding: 0;
  z-index: 2;

  transform: translateX(50%);
  top: 50%;
`;

const NextButton = styled(PrevButton)`
  left: unset;
  right: 50px;
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
