import styled from 'styled-components';
import theme from './theme';

export const Title = styled.h1`
  margin: 0;
  font-size: 42px;
  font-weight: bold;
  color: ${theme.black};
  text-align: left;
`;

export const Paragraph = styled.p`
  margin: 0;
  line-height: 28px;
  font-size: 18px;
  color: ${theme.black};
  text-align: left;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: normal;
  color: ${theme.red};
  text-align: left;
`;
