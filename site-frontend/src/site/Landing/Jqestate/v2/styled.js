import styled from 'styled-components';

import media from 'site/styles/media';

import UI from 'site/ui';

const {
  Icon,
  Button,
  Grid: { Container },
} = UI;

export const Bg = styled.div`
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  background: url('//s3.eu-central-1.amazonaws.com/dt-marketing/assets/hero.jpg')
    center bottom no-repeat;

  min-height: 42rem;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Content = styled(Container)`
  position: relative;
  z-index: 2;
  margin: 0 auto;
  text-align: center;
  padding-top: 10rem;
`;

export const Title = styled.h1`
  position: relative;
  font-size: 2rem;
  line-height: 2.6rem;
  font-weight: 400;
  color: ${p => p.theme.brandWhite};
  margin: 2rem 0 2.5rem;
  z-index: 1;
  padding: 0 2rem;

  ${media.xs`
    margin: 3rem 0;
  `} ${media.sm`
    font-size: 2.3rem;
    margin: 5.4rem 0 3.2rem;
    padding: 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, .5);
  `} ${media.lg`
    font-size: 3rem;
  `};
`;

export const FilterWrapper = styled.div`
  padding: 0 2rem;
  margin: 0 auto;

  ${media.xs`
    max-width: 26rem;
  `};
`;

export const MobileContainer = styled.div`
  text-align: center;
  position: relative;
  height: 21.5rem;
  padding: 2.5rem 1rem 0;
  margin-bottom: 1rem;
  background: url(${require('site/assets/images/black-pattern.svg')}) repeat
    #303030;
  background-size: 150%;

  ${media.sm`
    height: 27rem;
    padding: 2.8rem 1rem 0;
    margin-bottom: 0;
  `} ${media.md`
    display: none;
    background-size: 80%;
  `};
`;

export const IconFilter = styled(Icon)`
  width: 1.8rem;
  height: 1.7rem;
  margin-right: 1rem;
  vertical-align: middle;
  fill: ${p => p.theme.brandWhite};
`;

export const BtnFilter = styled(Button)`
  min-width: 100%;
  margin-bottom: 2rem;
  padding: 1.4rem 3.6rem;
  font-size: 1.6rem;
  background-color: ${p => p.theme.brandPrimary};
  border-color: ${p => p.theme.brandPrimary};
  border-radius: 10rem;

  &:hover,
  &:focus,
  &:active {
    background-color: ${p => p.theme.brandPrimaryHover};
    border-color: ${p => p.theme.brandPrimaryHover};
  }

  ${media.sm`
    display: inline-block;
    width: auto;
    margin-right: 1.5rem;
    font-size: 1.6rem;
    padding: 1.4rem 3.6rem;
    padding-right: 4rem;
    font-size: 1.6rem;
  `};
`;

export const HideXsSm = styled.div`
  display: none;

  ${media.md`
     display: block;
   `};
`;
