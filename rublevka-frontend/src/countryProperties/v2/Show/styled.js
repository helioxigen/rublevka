import styled from 'styled-components';
import media from 'styles/media';

import UI from 'ui';

const {
  Icon,
  Form: { Input },
  Grid: { Col },
} = UI;

export const Section = styled.section`
  position: relative;
  width: 100%;
  background: ${p => p.theme.brandWhite};
`;

export const HeaderBg = styled.div`
  width: 100%;
  background: ${p => p.theme.brandWhite};
`;

export const Title = styled.h1`
  font-size: 2rem;
  line-height: 2.6rem;
  font-weight: 500;
  margin: 1.9rem 0 1.5rem;
  ${media.sm`
    font-size: 2.2rem;
    line-height: 2.8rem;
    margin: 0.6rem 0 2.2rem;
  `} ${media.md`
    font-size: 2.6rem;
    line-height: 3rem;
    margin: 0.8rem 0 2.3rem;
  `};
`;

export const TabletWrapper = styled(Col)`
  display: none;
  ${media.sm`
    display: flex;
  `} ${media.md`
    display: none;
  `};
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0;
`;

export const NavWrapper = styled.div`
  align-items: center;
  padding: 2.5rem 0;
  justify-content: center;
  margin: 0;
  background: ${p => p.theme.brandWhite};
  width: 100%;
  text-align: center;

  ${media.sm`
    display: flex;
    margin: 2.5rem 0 0 auto;
    padding: 0;
    text-align: left;
    width: initial;
  `} ${media.md`
    margin-top: 1.2rem;
  `};
`;

export const NavBtn = styled.div`
  position: relative;
  outline: none;
  background: none;
  display: inline-block;
  font-size: 1.4rem;
  color: #697981;
  border: 1px solid ${p => p.theme.bodyBg};
  background: ${p => p.theme.brandWhite};
  padding: 0.7rem 3.1rem;
  border-top-left-radius: 10rem;
  border-bottom-left-radius: 10rem;
  border-style: solid;
  border-color: #697981;
  border-width: 1px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
  ${media.sm`
    position: relative;
    cursor: pointer;
    width: 5rem;
    height: 5rem;
    padding: 1rem 0;
    border-radius: 10rem;
    border: 1px solid #F5F5F5;
    box-shadow: 0 0 7px 0 rgba(70, 70, 70, 0.5);
    z-index: 1;
    margin: 0 1rem;
    box-shadow: none;
  `};
`;

export const NavBtnNext = NavBtn.extend`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 10rem;
  border-width: 1px 1px 1px 0;

  ${media.sm`
    right:0;
  `};
`;

export const PrevIcon = styled(Icon)`
  position: absolute;
  left: 1.5rem;
  top: 1.2rem;
  width: 0.6rem;
  height: 1rem;
  transform: rotate(180deg);

  ${media.sm`
    position: relative;
    box-shadow: none;
    width: 1.8rem;
    height: 1.8rem;
    top: 0.5rem;
    left: 1.3rem;
  `};
`;

export const NextIcon = PrevIcon.extend`
  left: unset;
  right: 1.5rem;
  transform: rotate(0deg);

  ${media.sm`
    left: 1.6rem;
    right: unset;
  `};
`;

export const PropertyCounter = styled.span`
  display: none;
  font-size: 1.6rem;
  font-weight: 500;
  width: 7rem;
  text-align: center;

  ${media.sm`
    display: inline-block;
  `};
`;

// info

export const InfoWrapper = styled.div`
  display: block;
  width: 100%;
  justify-content: flex-start;

  ${media.sm`
    display: flex;
  `};
`;

export const InfoItemsWrapper = styled.div`
  display: flex;
  background: ${p => p.theme.bodyBg};
  width: 100%;
  justify-content: flex-start;
  font-size: 1.3rem;
  padding: 1rem 1.5rem;

  ${media.sm`
    background: #fff;
    padding: 0;
    margin-left: 12rem;
  `};
`;

export const PriceBlock = styled.div`
  display: block;
  text-align: left;
  padding: 0 1.5rem 1rem;

  ${media.sm`
    display: inline-block;
    flex-shrink: 0;
  `};
`;

export const StPrice = styled.h2`
  display: block;
  font-size: 2rem;
  font-weight: 500;
  margin: 1.5rem 0 0;
  ${media.sm`
    display: inline-block;
    font-size: 2.6rem;
    margin: 2rem 0.5rem .2rem;
  `} ${media.md`
    margin: 2.8rem 0 .2rem;
  `};
`;

export const OwnPrice = styled.button`
  display: none;
  border: none;
  outline: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  color: ${p => p.theme.brandSuccess};

  ${media.sm`
    display:inline-block;
  `};
`;

export const InfoBlock = styled.div`
  position: relative;
  text-align: left;
  font-size: 1.4rem;
  line-height: 2.6rem;
  color: #4d4d4d;
  padding: 0;
  margin-right: 2rem;

  &:after {
    content: '•';
    position: absolute;
    display: block;
    width: 1rem;
    height: 1rem;
    top: 0.2rem;
    right: -1.7rem;
    margin: 0 0 0 0.2rem;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  ${media.sm`
    padding: 2.7rem 6rem 0 0;
    margin-right: 0;
    
    &:after {
      display: none;
    }
  `} ${media.md`
    padding: 3.5rem 6rem 0 0;
  `};
`;

export const CounterNumber = styled.span`
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 400;
  color: #232323;
  margin-right: 0.5rem;

  ${media.sm`
    display: block;
    font-weight: bold;
    font-size: 2.6rem;
  `};
`;

export const Unit = styled.span`
  display: inline-block;
  font-size: 1.4rem;

  ${media.sm`
    display: none;
  `};
`;

export const CountIndicatorDesc = styled.span`
  display: none;

  ${media.sm`
    display: inline-block;
  `};
`;

export const CallbackWrapper = styled.div`
  display: none;
  width: 100%;
  padding: 0 1.5rem;
  margin-top: 1rem;
  ${media.md`
    display: flex;
    justify-content: flex-end;
  `};
`;

export const CallbackWidth = styled.div`
  position: relative;
  text-align: center;
  width: 27.5rem;
  height: 100%;
  margin: 0;
`;

export const CallbackTitle = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
`;

export const PhoneInput = styled(Input)`
  position: relative;
  outline: none;
  border: 1px solid ${p => p.theme.grey};
  border-radius: 10rem;
  height: 5rem;
  padding: 0 8.5rem 0 2rem;
  font-size: 1.6rem;
`;

export const SendBtn = styled.button`
  position: absolute;
  border: none;
  outline: none;
  padding: 0;
  right: 0;
  bottom: 0;
  width: 6rem;
  height: 5rem;
  z-index: 1;
  background: ${p => p.theme.brandSuccess};
  border-radius: 0 10rem 10rem 0;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAyMCAxOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9IjA0LdCa0LDRgNGC0L7Rh9C60LAt0L7QsdGK0LXQutGC0LAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTI5LjAwMDAwMCwgLTU5NC4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9IiNGRkZGRkYiPiAgICAgICAgICAgIDxnIGlkPSLRhtC10L3QsC0rLdC40L3RhNC+LSst0LfQstC+0l3qvtc6iib0cmfuc2zvcm09inryyw5zbgf0zsgzmc4wmdawmdasidu1mc4wmdawmdapij4gicagicagicagicagicagpgcgawq9itca0l3qvtc/0lrqsc3qvdcw0lbqsngc0ldrjyigdhjhbnnmb3jtpsj0cmfuc2xhdguoodcwljawmdawmcwgmjgumdawmdawksi+ICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iU2hhcGUiIHBvaW50cz0iMjI5IDMzLjk3MDY1MjIgMjQ4Ljk4MTM0MyAyNC45OTAyMTc0IDIyOSAxNi4wMDk3ODI2IDIyOSAyMi45OTQ1NjUyIDI0My4yNzIzODggMjQuOTkwMjE3NCAyMjkgMjYuOTg1ODY5NiI+PC9wb2x5Z29uPiAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgPC9nPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);
  background-repeat: no-repeat;
  background-position: center center;
`;

export const Relative = styled.div`
  position: relative;
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin-top: 0;
  ${media.sm`
    margin-top: 0rem;
  `};
`;

export const Id = styled.span`
  position: absolute;
  top: 3rem;
  left: 0;
  background: #fafafa;
  padding: 0.5rem 0.9rem 0.4rem;
  border-radius: 10rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${p => p.theme.greyDark};

  ${media.sm`
    display: none;
  `};
`;

export const IdDesktop = Id.extend`
  display: none;

  ${media.sm`
    display: inline-block;
    max-height: 4.8rem;
    margin-top: 2.5rem;
    position: relative;
    padding: 1.4rem 1.5rem 1.4rem;
    background: #fff;
    top: unset;
    font-size: 1.4rem;
    color: #333333;
    border: 1px solid #F5F5F5;
    margin-right: 2rem;
  `} ${media.md`
    margin-top: 0;
  `} ${media.lg`
    padding: 1.4rem 1.9rem 1.4rem;
  `};
`;

export const PhotoCounter = Id.extend`
  display: none;
  margin-left: auto;
  align-items: center;
  ${media.sm`
    display: flex;
    top: unset;
    bottom: 3rem;
    left: 1.5rem;    
    background: rgba(255, 255, 255, 0.7);
    padding: 0.8rem 1.9rem 0.7rem;
    font-size: 1.6rem;
  `};
`;

export const PhotoIcon = styled(Icon)`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
`;

export const CallBtnWrapper = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 2.5rem;
  left: 1.5rem;
  z-index: 6;
  text-align: center;

  ${media.sm`
    display: none;
  `};
`;

export const BookingBtn = styled.button`
  border: none;
  outline: none;
  padding: 1.8rem 3.4rem;
  color: ${p => p.theme.brandWhite};
  background-color: ${p => p.theme.brandSuccess};
  border-color: ${p => p.theme.brandSuccess};
  border-radius: 10rem;
  font-size: 1.4rem;
  ${media.md`
    position: static;
  `};
`;

export const CallBtn = styled.div`
  position: relative;
  outline: none;
  text-decoration: none;
  display: inline-block;
  padding: 1.6rem;
  padding-bottom: 1.4rem;
  font-size: 1.6rem;
  line-height: 1;
  border-radius: 10rem;
  color: #fff;
  background-color: ${p => p.theme.brandSuccess};
  border-color: ${p => p.theme.brandSuccess};
`;

export const CallBtnIcon = styled(Icon)`
  width: 3.5rem;
  height: 3.5rem;
  fill: ${p => p.theme.brandWhite};
`;

export const CallBtnLink = styled.a`
  height: 7rem;
  width: 7rem;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: 0;
`;

export const InfoMap = styled.div`
  background: ${p => p.theme.brandWhite};
  width: 100%;
`;

export const MapWrapper = styled.div`
  display: none;
  position: absolute;
  height: 13.7rem;
  width: 22rem;
  right: -1.5rem;
  top: -5.6rem;
  border-radius: 0.4rem;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;

  ${media.md`
    display: block;
  `};
`;
