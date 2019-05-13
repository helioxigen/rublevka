import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../UI/images/close-icon.svg';

import { stateStyles } from '../Card';

const State = styled.p`
  margin: 0;
  padding: 6px 8px;
  position: absolute;
  top: 14px;
  right: 0;
  background: ${({ isPublic }) =>
    (isPublic ? stateStyles.success : stateStyles.warning)};
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  line-height: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  cursor: ${({ isEditable }) => (isEditable ? 'pointer' : 'auto')};
`;

const PhotoCard = styled.div`
  position: relative;
`;

const Photo = styled.img`
  max-height: 256px;
  display: block;
`;

const CloseIcon = styled.img`
  width: 10px;
  height: 10px;
`;

const CloseButton = styled.button`
  background: #ff4c4e;
  opacity: 0.9;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  margin: 0;
  border: 0;
  padding: 0;
  position: absolute;
  left: 8px;
  top: 14px;
`;

export default ({
  src, isPublic, isEditable, onRemoveClick, onStateClick,
}) => (
  <PhotoCard>
    <Photo src={src} />
    {isEditable && (
      <CloseButton onClick={() => onRemoveClick()}>
        <CloseIcon src={closeIcon} />
      </CloseButton>
    )}
    <State
      isEditable={isEditable}
      isPublic={isPublic}
      onClick={() => {
        if (isEditable) {
          onStateClick();
        }
      }}
    >
      {/* TODO to dictionary */}
      {isPublic ? 'На сайте' : 'Не на сайте'}
    </State>
  </PhotoCard>
);
