import React from 'react';
import styled from 'styled-components';

import { WrapperBase as Wrapper, Title } from './styled';
import media from 'site/styles/media';

const Text = styled.p`
  margin: 0;
  margin-top: 4px;
  margin-bottom: 12px;
  line-height: 21px;
  font-size: 16px;

  color: #232323;

  ${media.xs`
    line-height: 26px;
    margin-top: 12px;
    margin-bottom: 8px;
  `}
`;

const ReadBtn = styled.button`
  padding: 0;
  border: none;
  background: none;
  line-height: 18px;
  font-size: 13px;
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;

  color: #47b34c;

  ${media.xs`
    line-height: 26px;
    font-size: 15px;
  `}
`;

export default () => (
  <Wrapper>
    <Title>Описание</Title>
    <Text>
      Жилой двухэтажный кирпичный дом общей площадью 440 кв.м. Построен по авторскому дизайн-проекту
      с соблюдением технологического процесса на всех этапах строительства. Внутренняя отделка
      выполнена из высококачественных экологических материалов...
    </Text>
    <ReadBtn>Читать полностью</ReadBtn>
  </Wrapper>
);
