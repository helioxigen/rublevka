import React from 'react';
import Scroll from 'react-scroll';

import { cloudfront } from 'core/config/resources';

import Breadcrumbs from './Breadcrumbs';

import { ShowXsSmMd, HideXsSmMd } from 'styles/mediaUtils';

import UI from 'ui';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Grid: { Container },
} = UI;

const Section = styled.section`
  position: relative;
  z-index: 0;
  margin: 0;
  padding: 3rem 0;
  background: url(${require('site/assets/images/black-pattern.svg')}) repeat
    #303030;
  background-size: cover;
  background-position: center;
  min-height: 13rem;

  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }

  ${media.xs`
    padding: 5rem 0;
  `} ${media.sm`
    padding: 0.5rem 0;
    min-height: 31rem;
  `};
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  color: #f1f1f1;
  font-size: 2.2rem;
  line-height: 3rem;
  font-weight: 400;

  ${media.sm`
    margin-top: 4.5rem;
    font-size: 2.7rem;
  `};
`;

const SubTitle = styled.div`
  margin-top: 0.5rem;
  color: #f1f1f1;
  font-size: 1.4rem;
  font-weight: 300;

  ${media.sm`
    margin-top: 1.4rem;
    font-size: 1.6rem;
  `} ${media.md`
    margin-top: 0.8rem;
  `};
`;

const InfoBtn = styled.div`
  position: relative;
  white-space: nowrap;
  display: inline-block;
  padding: 0.8rem 2rem;
  color: #232323;
  font-size: 1.4rem;
  background: #fff;
  border-radius: 10rem;
  cursor: pointer;
  margin-top: 2.5rem;

  ${media.sm`
    background: #ff4c4e;
    color: #fff;
    font-size: 1.6rem;
    padding: 1.5rem 4.5rem;
    margin-top: 4rem;
  `} ${media.md`
    margin-top: 4.5rem;
  `};
`;

const TitleWrapper = styled.div`
  display: none;

  ${media.md`
    display: inline-block;
  `};
`;

function getImgUrl(publicImages) {
  if (publicImages.length) {
    return `url(${global.config.cloudfront || cloudfront}/${
      publicImages[0].id
    }-1024)`;
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-settlement.jpg)';
  }
  return null;
}

export default props => {
  const { data = {}, dealType, kind } = props;
  const { location = {} } = data;

  const publicImages =
    (data.images && data.images.filter(image => !!image.isPublic)) || [];
  const imgUrl = getImgUrl(publicImages);
  const metaItem =
    (data.meta && data.meta[(kind && `${dealType}_${kind}`) || dealType]) || {};
  const title = metaItem['h1'] || `Коттеджный посёлок ${data.name}`;

  return (
    <Section style={{ backgroundImage: imgUrl }}>
      <Container>
        <nav>
          <Breadcrumbs data={data} dealType={dealType} />
        </nav>
        <Wrapper>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <ShowXsSmMd>
            <Title>{data.name}</Title>
          </ShowXsSmMd>
          {!!location && (
            <SubTitle>
              {location.routeName} шоссе, {location.mkadDistance} км
            </SubTitle>
          )}
          <InfoBtn>
            <Scroll.Link
              activeClass="active"
              to="scrollTo"
              spy
              smooth
              offset={-80}
              duration={600}
            >
              Информация о поселке
            </Scroll.Link>
          </InfoBtn>
        </Wrapper>
      </Container>
    </Section>
  );
};
