import styled from 'styled-components';

import { Link } from 'react-router';

import media from 'site/styles/media';

import UI from 'site/ui';

const { Button, Grid: { Col } } = UI;

export const Wrapper = styled.section`
  padding-top: 1rem;
  background: ${p => p.theme.brandWhite};

  ${media.sm`
    padding: 2.5rem 0 1rem;
  `};
`;

export const ColSettlements = styled(Col)`
  ${media.sm`
    order: 1;
  `} ${media.md`
    order: 0;
  `};
`;

export const MenuCol = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex: 0 0 auto;
  flex-basis: 100%;
  max-width: 100%;
  padding: 0;
  flex-wrap: wrap;
`;

export const BlockWrapper = styled.div`
  position: relative;
  border-style: solid;
  border-color: ${p => p.theme.greyLight};
  border-width: 0;
  border-radius: 0.4rem 0.4rem 0 0;
  overflow: hidden;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  ${media.md`
    border-radius: .4rem;
  `} ${media.md`
    border-width: 1px;
    border-radius: .4rem;
    height: 18rem;
    margin-bottom: 2.5rem;
    flex-direction: row;
  `} ${media.lg`
    height: 22rem;
  `};
`;

export const BlockWrapperSpec = BlockWrapper.extend`
  height: 45vw;
  border: 0;

  ${media.sm`
    height: 22rem;
    border-radius: 0.4rem;
  `};
`;

export const Img = styled.div.attrs({
  bgImage: p => p.bgUrl || 'none',
})`
  background-image: url(${p => p.bgImage});
  background-size: cover;
  width: 100%;
  height: 34vw;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:after {
    content: '';
    background: rgba(0, 0, 0, ${p => p.overlayOpacity || '.5'});
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  ${media.sm`
    height: 11rem;
  `} ${media.md`
    border-radius: 0;
    width: 18rem;
    height: 100%;
    &:after {
      display: none;
      border-radius: 0;
    }
  `} ${media.lg`
    width: 28rem;
  `};
`;

export const ImgBg = Img.extend`
  color: ${p => p.theme.brandWhite};
  text-align: center;
  position: relative;

  &:after {
    display: block;
  }
`;

export const ImgBgFluid = ImgBg.extend`
  height: 100%;
  width: 100%;
  border-radius: 0.4rem;

  ${media.sm`
    width: 100%;
  `} ${media.md`
    border-radius: 0;
  `} ${media.lg`
    width: 100%;
  `};
`;

export const WithPattern = Img.extend`
  position: relative;
  color: ${p => p.theme.brandWhite};
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
  background: ${p => p.theme.brandSuccess};

  &:before {
    content: '';
    position: absolute;
    opacity: 0.3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(${require('site/assets/images/white-pattern.svg')}) repeat;
    background-size: 100%;
  }

  &:after {
    background: rgba(0, 0, 0, 0);
  }

  ${media.sm`
    width: 100%;
    height: 100%;
  `} ${media.lg`
    width: 100%;
  `};
`;

export const SellProperty = ImgBgFluid.extend`
  background: ${p => p.theme.bodyBg};
  height: 45vw;
  &:after {
    display: none;
  }

  ${media.sm`
    height: 33.5rem;
    background-image: url(${props => props.bgImage});
    &:after {
      display: block;
    }
  `} ${media.md`
    height: 100%;
  `};
`;

export const ImgMobile = Img.extend`
  height: 45vw;
  margin-bottom: 1rem;
  border-radius: 0.4rem;

  ${media.sm`
    height: 21rem;
  `};
`;

export const TextWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 0;
`;

export const Links = styled.div`
  text-align: left;
  padding: 0;

  ${media.md`
    padding: 0 2rem;
  `} ${media.lg`
    padding: 1rem 3rem;
  `};
`;

export const LinksNoTitle = Links.extend`
  padding: 0;

  ${media.md`
    padding: 2rem 2rem;
  `} ${media.lg`
    padding: 2.8rem 3rem;
  `};
`;

export const TitleLink = styled(Link)`
  position: relative;
  z-index: 1;
  font-size: 2rem;
  font-weight: 500;
  color: ${p => p.theme.brandBlack};
  margin: 1.8rem 0;
  cursor: pointer;
  display: none;

  ${media.md`
    font-size: 1.8rem;
    display: block;
  `} ${media.lg`
    font-size: 2rem;
  `};
`;

export const TitleMobile = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin: 1rem 0 2rem;
  text-align: center;

  ${media.sm`
    margin: 1.7rem 0 0.8rem;
    font-size: 2.2rem;
  `} ${media.md`
    display: none;
  `};
`;

export const SubTitleTablet = styled.div`
  display: none;
  color: #7f7f7f;
  font-size: 1.6rem;

  ${media.sm`
    display: block;
    margin-bottom: 2.5rem;
  `};
`;

export const TitleBg = styled.h2`
  position: relative;
  z-index: 1;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 500;
  color: ${p => p.theme.brandWhite};

  ${media.md`
    font-size: 1.8rem;
    line-height: 3.2rem;
  `} ${media.lg`
    margin-top: .4rem;
    margin-bottom: 0;
    font-size: 2.4rem;
  `};
`;

export const TitleSpec = TitleBg.extend`
  ${media.xs`
    font-size: 2.6rem;
    margin-bottom: 1.4rem;
  `} ${media.sm`
    font-size: 2.8rem;
    margin-bottom: 1rem;
  `} ${media.md`
    margin-top: 0.5rem;
  `} ${media.lg`
    font-size: 2.8rem;
  `};
`;

export const TitleSale = TitleBg.extend`
  color: ${p => p.theme.brandBlack};
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 1.6rem;

  ${media.sm`
    color: ${p => p.theme.brandWhite};
    font-size: 2.4rem;
    font-weight: 400;
    margin-bottom: 2.4rem;
  `} ${media.md`
    font-size: 2.8rem;
  `};
`;

export const TitleBgMobile = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  font-size: 2rem;
  font-weight: 500;
  color: ${p => p.theme.brandWhite};
`;

export const SubTitle = styled.div`
  font-size: 1.4rem;
  line-height: 2.2rem;

  ${media.xs`
    font-size: 1.8rem;
  `} ${media.sm`
    font-size: 1.8rem;
    line-height: 2.4rem;
  `} ${media.lg`
    font-size: 1.8rem;
    line-height: 2.2rem;
  `};
`;

export const SpecBreak = styled.div`
  ${media.sm`
    display: none;
  `} ${media.md`
    display: block;
  `};
`;

export const StLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  line-height: 2.2rem;
  padding: 1.1rem 1.5rem;
  color: ${p => p.theme.brandBlack};
  cursor: pointer;
  border-style: solid;
  border-color: ${p => p.theme.greyLight};
  border-width: 0 1px 1px 1px;
  border-radius: 0;

  :hover {
    color: ${p => p.theme.brandPrimary};
  }

  ${media.sm`
    font-size: 1.5rem;
  `} ${media.md`
    display: block;
    padding: 0 0 .5rem;
    border-width: 0;
  `} ${media.lg`
    font-size: 1.6rem;
    padding: 0 0 1rem;
  `};
`;

export const StLinkRent = StLink.extend`
  ${media.sm`
    padding: 1.8rem 1.5rem;
  `} ${media.md`
    padding: 0 0 .5rem;
  `} ${media.lg`
    padding: 0 0 1rem;
  `};
`;

export const StLinkLast = StLink.extend`border-radius: 0 0 0.4rem 0.4rem;`;
export const StLinkRentLast = StLinkLast.extend`
  ${media.sm`
    padding: 1.9rem 1.5rem;
  `} ${media.md`
    padding: 0 0 .5rem;
  `} ${media.lg`
    padding: 0 0 1rem;
  `};
`;

export const StLinkMobile = StLink.extend`
  padding: 0;
  display: flex;
  align-items: center;
  border: none;

  ${media.sm`
    border-radius: 0.4rem;
    overflow: hidden;
    height: 22rem;
    margin-bottom: 1.5rem;
  `};
`;

export const Counter = styled.span`margin-left: 0.5rem;`;

export const Btn = styled(Button)`
  font-size: 1.6rem;
  padding: 1.6rem 4.5rem;
  border-radius: 10rem;

  ${media.md`
    padding: 1.4rem 3.5rem;
    margin-bottom: 1rem;
  `} ${media.lg`
    font-size: 1.8rem;
    padding: 1.6rem 4rem;
  `};
`;

export const RoutesWrapper = styled.div`
  width: 100%;
  margin-bottom: 3rem;

  ${media.sm`
    order: 3;
    text-align: center;
    margin-bottom: 0;
  `};
`;

export const ColSale = styled(Col)`
  padding-left: 0;
  padding-right: 0;

  ${media.sm`
    order: 2;
    padding-left: 15px;
    padding-right: 15px;
  `} ${media.md`
    order: 0;
  `};
`;

export const HideXs = styled.div`
  display: none;

  ${media.sm`
    display: block;
  `};
`;

export const ShowXs = styled.div`
  display: block;

  ${media.sm`
    display: none;
  `};
`;

export const HideXsCol = styled(Col)`
  display: none;

  ${media.sm`
    display: inline-block;
  `};
`;

export const Break = styled.br`
  display: none;

  ${media.sm`
    display: block;
  `};
`;

export const TotalCounter = styled.div`
  position: relative;
  font-size: 1.4rem;
  z-index: 1;
  color: #fff;
`;
