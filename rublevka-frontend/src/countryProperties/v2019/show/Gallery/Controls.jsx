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
  bottom: 0;
  top: 0;
  left: 15px;
  border: none;
  background: none;
  padding: 0;
  z-index: 2;
`;

const NextButton = styled(PrevButton)`
  left: unset;
  right: 15px;
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
