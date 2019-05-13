import React from 'react';
import styled from 'styled-components';
import global from 'window-or-global';

import { Link } from 'react-router';

import media from '../../styles/media';
import UI from '../../ui/v2019';

import placeholderImg from './img/placeholder.jpg';

const {
  Grid: { Container, Row, Col },
  Button,
} = UI;

const ImgCol = styled(Col)`
  margin: 0 -10px;
  order: 2;

  ${media.xs`
    margin: 0;
  `}

  ${media.md`
    order: 0;
  `}
`;

const Img = styled.img`
  width: calc(100% + 20px);
  height: 300px;
  object-fit: cover;

  ${media.xs`
    width: 100%;
    height: 440px;
  `}

  ${media.md`
    height: 640px;
  `}
`;

const Wrapper = styled.div`
  margin: 0 -10px;
  padding: 40px 15px;
  background: linear-gradient(
    27.88deg,
    #eeeeee 0%,
    rgba(238, 238, 238, 0.25) 100%
  );

  ${media.xs`
    margin: 0;
    padding: 126px 45px;
  `}

  ${media.md`
    padding: 88px 100px 222px 42px;
  `}
`;

const Heading = styled.h3`
  margin: 0;
  line-height: 32px;
  font-size: 24px;
  color: #232323;

  ${media.xs`
    line-height: 48px;
    font-size: 40px;
  `}

  ${media.md`
    line-height: 56px;
    font-size: 48px;
    margin-bottom: 28px;
  `}
`;

const Body = styled.p`
  margin: 0;
  margin-top: 12px;
  margin-bottom: 16px;
  line-height: 24px;
  font-size: 15px;
  color: #232323;

  ${media.xs`
    margin-top: 16px;
    line-height: 26px;
    font-size: 16px;
  `}

  ${media.md`
    margin: 0;
    line-height: 30px;
    font-size: 18px;
  `}
`;

const FindBtn = styled(Button)`
  border-radius: 6px;
  padding: 0px;
  border: none;
  line-height: 18px;
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  background: none;
  color: #f44336;

  &:hover {
    color: ${p => p.theme.brandBlack};
  }

  ${media.xs`
    margin-top: 8px;
    padding: 23px 28px;
    background-color: #F44336;
    color: ${p => p.theme.brandWhite};

    &:hover {
      color: ${p => p.theme.brandWhite};
    }

  `}

  ${media.md`
    margin-top: 36px;
  `}
`;

const isRiga = global.config.domain === 'riga.ru';

export default () => (
  <Container>
    <Row>
      <ImgCol xs="12" md="5">
        <Img alt="Красивый домик" src={placeholderImg} />
      </ImgCol>
      <Col xs="12" md="7">
        <Wrapper>
          <Heading>
            Лучшие предложения на {isRiga ? 'Новой Риге' : 'Рублёвке'}
          </Heading>
          <Body>
            {isRiga ? 'Рига.ру' : 'Рублёвка.ру'} — это только актуальные
            предложения на рынке, опыт экспертов и забота о клиенте. Мы создаём
            сервис для поиска, подбора и покупки недвижимости: удобный, быстрый
            и интуитивно понятный.
          </Body>
          <Link to="/zagorodnaya/prodaja">
            <FindBtn kind="danger">подробнее</FindBtn>
          </Link>
        </Wrapper>
      </Col>
    </Row>
  </Container>
);
