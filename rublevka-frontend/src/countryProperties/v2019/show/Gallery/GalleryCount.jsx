import React from 'react';
import styled from 'styled-components';
import { prefixZero } from './utils';
import media from '../../../../styles/media';

const GalleryCount = ({ className, currentIndex, overall }) => (
  <div className={className}>
    {prefixZero(currentIndex)} / {prefixZero(overall)}
  </div>
);

export default styled(GalleryCount)`
  position: absolute;
  bottom: 20px;
  right: 15px;

  ${media.md`
    right: unset;
    left: 15px;
  `}

  padding: 6px 8px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;

  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.535714px;
  color: white;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);

  z-index: 2;

  span:nth-child(2) {
    margin: 0 2px;
  }
`;
