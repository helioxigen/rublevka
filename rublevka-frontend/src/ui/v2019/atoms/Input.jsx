import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';

export default styled(InputMask)`
  padding: 16px 15px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: none;
  appearance: none;

  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
  color: #232323;

  ${({ hasError }) => hasError && css`
    border: 2px solid #F44336;
  `}

  &::-webkit-input-placeholder {
    color: #aaa;
  }
`;
