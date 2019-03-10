import React from 'react';

import { Link } from 'react-router';

import styled from 'styled-components';
import media from './styles/media';

const Wrapper = styled.div.attrs({
  bgImage: p => p.bgUrl || 'none',
})`
  background-image: url(${p => p.bgImage});
  display: flex;
  position: relative;
  color: #fff;
  flex-direction: column;
  text-align: center;
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  height: 92vh;
  padding-top: 15vh;
  align-items: center;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
`;

const Title = styled.h1`
  font-family: 'HelveticaNeue-CondensedBold', 'Helvetica Neue';
  color: #fff;
  font-size: 4.8rem;
  line-height: 4rem;
  font-weight: bold;
  margin: 0;
  z-index: 2;

  ${media.sm`
    font-size: 8rem;
    line-height: 7rem;
  `} ${media.md`
    font-size: 12rem;
    line-height: 10rem;
  `};
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 3rem;
  z-index: 2;

  ${media.sm`
    font-size: 2.2rem;
    margin-bottom: 4rem;
  `} ${media.md`
    font-size: 2.8rem;
  `};
`;

const NewSearch = styled(Link)`
  border: none;
  outline: none;
  color: ${p => p.theme.brandWhite};
  background: ${p => p.theme.brandSuccess};
  padding: 1.2rem 3rem;
  font-size: 1.6rem;
  border-radius: 10rem;
  z-index: 2;

  &:hover {
    background: ${p => p.theme.brandSuccessHover};
  }

  ${media.sm`
    padding: 1.6rem 3rem;
  `};
`;

const MainpageLink = styled(Link)`
  color: #000;
  background: ${p => p.theme.brandWhite};
  font-size: 1.6rem;
  padding: 0.9rem 2.9rem;
  border-radius: 10rem;
  position: absolute;
  bottom: 4rem;
  z-index: 2;
`;

const NotFound = () => (
  <Wrapper bgUrl={require('./assets/images/404.jpg')}>
    <Title>404</Title>
    <SubTitle>Страница не найдена</SubTitle>
    <NewSearch to="/zagorodnaya/prodaja">Новый поиск</NewSearch>
    <MainpageLink to="/">На главную</MainpageLink>
  </Wrapper>
);

export default NotFound;
