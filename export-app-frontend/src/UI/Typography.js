import styled from 'styled-components';

export const Text = styled.span`
  font-size: 18px;
  ${p => p.red && 'color: red'};
`;

export const ItemTitle = styled.p`
  font-size: 16px;
`;
