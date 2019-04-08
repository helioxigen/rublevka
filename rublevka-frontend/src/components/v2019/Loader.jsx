import React from 'react';

import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 0.4rem solid #eee;
  border-top-color: ${p => p.theme.brandPrimary};
  animation: ${Spin} 1s infinite linear;
`;

export default () => <Loader />;
