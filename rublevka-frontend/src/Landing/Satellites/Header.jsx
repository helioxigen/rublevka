import React from 'react';

import global from 'window-or-global';
import styled from 'styled-components';

import media from '../../styles/media';

const Header = styled.p`
  margin: 0;
  margin-bottom: 42px;
  line-height: 36px;
  font-size: 28px;
  color: #fff;
  font-weight: bold;

  ${media.xs`
    font-size: 26px;
    margin: 0;
    transform: translateY(-50px);
    margin-bottom: 30px;
    line-height: 48px;
    font-size: 40px;
    color: #fff;
    text-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
  `}

  ${media.md`
    transform: translateY(-105px);
    line-height: 58px;
    font-size: 48px;
    text-shadow: 0px 0px 35px rgba(0, 0, 0, 0.35);
  `}
`;

const isRiga = global.config.domain === 'riga.ru';

export default () => (
  <Header>
    Начните поиск лучших
    <br />
    домов на {isRiga ? 'Новой Риге' : 'Рублёвке'}
  </Header>
);
