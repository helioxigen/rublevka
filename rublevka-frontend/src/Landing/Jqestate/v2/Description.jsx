import React from 'react';

import { Link } from 'react-router';

import styled from 'styled-components';

import media from 'styles/media';

import UI from 'ui';

const {
  Grid: { Row, Col, Container },
} = UI;

const Description = styled.div`
  display: none;
  padding: 4.5rem 0 5rem;

  ${media.md`
    display: block;
  `};
`;

const Title = styled.h2`
  font-size: 2.8rem;
  line-height: 4rem;
  margin-bottom: 3.4rem;
`;

const Paragraph = styled.p`
  text-align: left;
  font-size: 1.8rem;
  line-height: 2.8rem;
`;

const StLink = styled(Link)`
  display: inline-block;
  font-size: 1.6rem;
  border-radius: 50rem;
  color: ${p => p.theme.brandWhite};
  background-color: ${p => p.theme.brandPrimary};
  border-color: ${p => p.theme.brandPrimary};
  text-decoration: none;
  padding: 1.6rem 5.5rem;
  margin-top: 1rem;

  &:hover {
    background-color: ${p => p.theme.brandPrimaryHover};
    border-color: ${p => p.theme.brandPrimaryHover};
  }
`;

export default () => (
  <Description>
    <Container>
      <Row sm="center">
        <Col xs="8">
          <Title>
            Агентство элитной загородной&nbsp;
            <br />
            недвижимости JQ Estate
          </Title>
          <Paragraph>
            Команда профессионалов агентства JQ Estate помогает купить и
            арендовать дома на Рублево-Успенском, Новорижском и других
            популярных шоссе с 2006 года.
          </Paragraph>
          <Paragraph>
            На сайте jq.estate более 2 тысяч предложений по продаже элитной
            недвижимости в Подмосковье. Мы предлагаем дома и таунхаусы в разных
            архитектурных стилях — от классических усадеб до ультрасовременных
            коттеджей, от дворцов русского барокко до уютных французских шале.
          </Paragraph>

          <Paragraph>
            На ваш выбор 400 коттеджных посёлков Подмосковья, включая такие
            поселки, как Миллениум Парк, Никольская слобода, Сады Майендорф,
            Царское село и другие.
          </Paragraph>

          <Paragraph>
            За 10 лет мы помогли купить элитную загородную недвижимость более
            чем тысяче семей. Поможем и вам: проконсультируем, подберём
            варианты, организуем просмотр понравившихся объектов и, конечно,
            обеспечим безукоризненное сопровождение вашей сделки.
          </Paragraph>

          <Paragraph>
            С нами вы сможете купить дом по самой привлекательной цене и на
            лучших условиях!{' '}
          </Paragraph>
          <StLink to="/about">Подробнее</StLink>
        </Col>
      </Row>
    </Container>
  </Description>
);
