import React from 'react';
import styled from 'styled-components';

import media from '../../../styles/media';

const Button = styled.button`
  padding: 19px 24px;
  margin-bottom: 32px;
  background: #f44336;
  border: none;
  border-radius: 8px;
  outline: none;

  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;

  ${media.xs`
    margin-top: 32px;
  `}

  ${media.md`
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  `}
`;

export default ({ children, current, handlePageChanged }) => (
  <Button onClick={() => handlePageChanged(current + 1, true)}>
    {children}
  </Button>
);
