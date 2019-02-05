import styled, { css } from 'styled-components';

export { media } from './scUtils';

export const Input = styled.input`
  font-size: 24px;
  font-family: inherit;
`;

export const Button = styled.button`
  font-size: 18px;
`;

export const CheckboxLabel = styled.label`
  background: #f5f5f5;
  border-radius: 25px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: normal;
  font-size: 13px;
  line-height: 1;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;

  &:last-child {
    margin-right: 0;
  }

  ${p => p.isActive
    && css`
      background-color: #3174f6;
      color: #fff;
    `}
`;
