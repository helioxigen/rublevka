import styled from 'styled-components';

import { Link } from 'react-router';

import media from 'site/styles/media';

import UI from 'site/ui';

const { Button } = UI;

export const Title = styled.div`
  margin: 0;
  color: #8f9699;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1;
  text-align: left;
`;

export const TitleLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1;
  color: #8f9699;

  &:hover {
    text-decoration: none;
  }
`;

export const SubTitle = styled(Link)`
  display: inline-block;
  margin-bottom: 0.8rem;
  margin-top: 1.5rem;

  font-size: 1.4rem;
  font-weight: 600;
  color: ${p => p.theme.brandWhite};

  &:hover,
  &:focus {
    color: ${p => p.theme.brandPrimary};
  }

  ${media.sm`
    margin-top: .2rem;
  `};
`;

export const Navigation = styled.nav`
  text-align: left;
  margin-bottom: 10rem;
`;

export const NavColumn = styled.div`
  margin-top: 6rem;

  ${media.lg`
    margin-top: 0;
  `};
`;

export const StLink = styled(Link)`
  display: block;
  margin-bottom: 1rem;

  color: rgba(255, 255, 255, 0.8);
  font-size: 1.4rem;

  &:hover,
  &:focus {
    color: ${p => p.theme.brandPrimary};
  }
`;

export const Divider = styled.hr`
  margin: 2.5rem 0;
  border-color: #3e4549;
`;

export const LoadBtn = styled(Button)`
  padding: 0;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.4rem;
  text-decoration: underline;

  &:hover,
  &:focus {
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: underline;
  }

  ${media.sm`
    margin-left: 0;
  `};
`;
