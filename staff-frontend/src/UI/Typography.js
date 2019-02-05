import styled from 'styled-components';
import theme from './theme';

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: ${theme.black};
  text-align: left;
`;

export const Title2 = styled.h2`
  margin: 0;
  font-weight: bold;
  color: ${theme.black};
  text-align: left;
  font-size: 20px;
`;

export const BodyBig = styled.p`
  margin: 0;
  line-height: 28px;
  font-size: 18px;
  color: ${theme.black};
  text-align: left;
`;

export const BodyBigBold = styled(BodyBig)`
  font-weight: bold;
`;

export const Body = styled.p`
  line-height: 26px;
  font-size: 14px;
  margin: 0;
  color: ${theme.black};
  text-align: left;
`;

export const BodyBold = styled(Body)`
  font-weight: bold;
`;

export const LabelRegular = styled.div`
  line-height: 24px;
  font-size: 14px;
  color: ${theme.black};
  margin: 0;
  text-align: left;
`;

export const Label = styled(LabelRegular)`
  font-weight: bold;
`;

export const LabelSmall = styled.div`
  line-height: 17px;
  font-size: 10px;
  color: ${theme.black};
  margin: 0;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: normal;
  color: ${theme.red};
  text-align: left;
`;
