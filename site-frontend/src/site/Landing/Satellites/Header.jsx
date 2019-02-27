import React from 'react';

import styled from 'styled-components';

import media from 'site/styles/media';

const Header = styled.p`
  margin: 0;
  margin-bottom: 30px;
  line-height: 36px;
  font-size: 26px;
  color: #000000;
  font-weight: bold;

  ${media.xs`
    margin-bottom: 50px;
    line-height: 48px;
    font-size: 40px;
    color: #fff;
    text-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
  `}

  ${media.md`
    margin-bottom: 105px;
    line-height: 58px;
    font-size: 48px;
    text-shadow: 0px 0px 35px rgba(0, 0, 0, 0.35);
  `}
`;

export default () => (
  <Header>
    Начните поиск лучших
    <br />
    домов на Рублёвке
  </Header>
);
