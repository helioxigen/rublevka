import styled from 'styled-components';
import media from 'site/styles/media';

import Body from 'site/components/body';

import UI from 'site/ui';

const {
  Navbar,
  Icon,
  Button,
  Navbar: { Menu: MenuBase },
} = UI;

export const HeaderBody = styled(Body)`
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);

  ${media.md`
    background: none;
    box-shadow: none;
  `}

  ${p =>
    p.active &&
    `
    position: fixed;
    width: 100%;
  `};
`;

export const Cover = styled.div`
  display: ${p => (p.active ? 'block' : 'none')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  content: ' ';
  pointer-events: ${p => (p.active ? 'auto' : 'none')};

  ${media.md`
    display: none;
    pointer-events: none;
  `}
`;

export const Wrapper = styled.header`
  ${p =>
    p.isLanding &&
    `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  `}

  ${p =>
    !p.isLanding &&
    `
    position: relative;
    min-height: 48px;
    background: #FFFFFF;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  `}

  ::-webkit-scrollbar {
    display: none;
  }

  ${media.md`
    position: fixed;
    left: 0;
    right: 0;
    z-index: 8;
    max-height: 64px;
    background-color: ${p => (p.inverted ? 'transparent' : p.theme.brandWhite)};
    box-shadow: ${p => (p.inverted ? 'none' : '0px 1px 1px rgba(0, 0, 0, 0.15)')};
  `};
`;

export const NavPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${p => (p.inverted ? '22px' : '0')};
  min-height: ${p => (p.inverted ? '0px' : '48px')};
`;

export const Nav = styled(Navbar.Container)`
  position: fixed;
  top: 0;
  right: 0;
  left: 30%;
  bottom: 0;
  z-index: 5;
  width: 100%;
  padding: 0 20px;
  white-space: nowrap;
  transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
  background: #232323;
  flex-direction: column;
  flex-wrap: nowrap;

  white-space: nowrap;
  transform: translate3d(100%, 0, 0);

  ::-webkit-scrollbar {
    display: none;
  }

  ${p =>
    p.active &&
    `
      transform: translate3d(0, 0, 0);
  `};

  ${media.md`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    position: static;
    left: 0;
    width: auto;
    min-height: 100%;
    max-height: 100%;
    background: transparent;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    box-shadow: none;
    transform: none;
    padding: 0;
  `}
  overflow-y: ${p => (p.isVisible ? 'visible' : scroll)}
`;

export const HamburgerIcon = styled(Icon)`
  width: 22.77px;
  height: 16.53px;
  fill: ${p => p.theme.brandBlack};

  ${media.xs`
    fill: ${p => (p.isLanding ? p.theme.brandWhite : p.theme.brandBlack)};
  `}
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-left: -12px;
  margin-top: 10px;
  margin-bottom: 4px;

  ${media.md`
    display: none;
  `}
`;

export const CloseIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  fill: rgba(255, 255, 255, 0.75);
`;

export const Menu = styled(MenuBase)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${media.md`
    display: flex;
    flex-direction: row;
    align-items: center;
  `}
`;

export const StMenu = styled(Menu)`
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  ${media.md`
    display: flex;
    flex-direction: row;
  `};
`;

export const StyledLinkSat = styled(Navbar.Link)`
  color: ${p => p.theme.brandWhite};
  line-height: 18px;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 0px;

  &:hover,
  &.active {
    color: ${p => p.theme.brandRed};
  }

  ${media.sm`
    margin: 0;
    border: none;
  `}

  ${media.md`
    padding: 20px 0px;
    font-weight: normal;
    color: ${p => (p.inverted ? p.theme.brandWhite : p.theme.brandBlack)};
    border-bottom: 2px solid transparent;
    margin: 0 15px;

    &.active {
      color: ${p => p.theme.brandRed};
      border-bottom: 2px solid ${p => p.theme.brandRed};
    }
  `}
`;

export const Phone = styled.a`
  line-height: 18px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;

  ${media.md`
    position: relative;
    font-size: 18px;
    margin-right: 16px;
    width: inherit;
    padding-right: 0;
    color: ${p => (p.inverted ? p.theme.brandWhite : p.theme.brandBlack)};
  `};
`;

export const PhoneDesktop = styled.a`
  position: relative;
  display: none;
  color: ${p => p.theme.brandBlack};
  font-size: 1.8rem;
  line-height: 1;
  margin: 3.1rem 1.8rem;
  width: inherit;
  padding-right: 0;
  ${media.sm`
    position: absolute;
    display: inline-block;
    left: unset;
    right: 7rem;
    top: 1.7rem;
    font-size: 2rem;
    margin: 1.5rem 0;
    padding-right: 4rem;
  `} ${media.md`
    position: relative;
    right: 0;
    left: 0;
    top: 0;
    font-size: 1.8rem;
    margin: 3.1rem 3rem 0 0;
    width: inherit;
    padding-right: 0;
  `};
`;

export const MenuBtn = styled(Button)`
  padding: 0;
  border: none;
  border-radius: 0px;

  &:hover,
  &:focus {
    background: transparent;
  }

  ${media.md`
    display: none;
    position: relative;
    top: 0;
  `};
`;

export const CallBtn = styled(Button)`
  position: relative;
  font-size: 1.6rem;
  padding: 1.6rem 3rem;
  border-radius: 10rem;
  width: 100%;
  text-align: center;

  ${media.md`
    margin: 0 1.4rem 0 1rem;
    width: inherit;
  `} ${media.lg`
    margin: 0 2.8rem 0 1rem;
  `};
`;

export const CallbackBtn = styled(Button)`
  padding: 18px 27px;
  border-radius: 6px;
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 25px;

  ${media.md`
    position: static;
    padding: 14px 15.5px;
    margin: 0;
    background-color: ${p => (p.inverted ? 'transparent' : p.theme.brandSuccess)};
    border-color: ${p => (p.inverted ? p.theme.brandWhite : p.theme.brandSuccess)};

    &:hover {
      background-color: ${p => (p.inverted ? '#fff' : '#00b44b')};
      border: 1px solid ${p => (p.inverted ? '#fff' : '#00b44b')};;
      color: ${p => (p.inverted ? '#252525' : '#fff')};;
    }
  `};
`;

export const Overlay = styled.div`
  opacity: 0;
  ${p =>
    p.active &&
    `
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: rgba(0, 0, 0, .2);
    opacity: 1;
    transition: opacity .35s linear;
  `} ${media.md`
    display: none;
  `};
`;

export const MobileButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const HideSm = styled.div`
  display: block;

  ${media.sm`
    display: none;
  `} ${media.md`
    display: inline-block;
  `};
`;

export const FavoriteLink = styled(Navbar.Link)`
  position: relative;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  max-height: 22px;

  margin-right: 25px;

  ${media.md`
    margin-left: 24px;
    margin-right: 0;
  `}
`;

export const FavoriteLinkDesktop = styled(FavoriteLink)`
  display: none;

  ${media.md`
    display: block;
  `}
`;

export const FavoriteCounter = styled.span`
  position: absolute;
  top: -6px;
  right: -7px;
  border-radius: 7.5px;
  width: 15px;
  height: 15px;
  font-weight: 300;
  line-height: 15px;
  font-size: 11px;
  text-align: center;
  background-color: rgba(244, 67, 54, 0.9);
  color: #fff;

  ${media.md`
    top: -7px;
    right: -9px;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    line-height: 18px;
    font-size: 12px;
  `}
`;

export const FavoriteIcon = styled(Icon)`
  width: 24px;
  height: 22px;
  stroke-width: 2px;
  fill: transparent;
  stroke: #212121;

  ${media.xs`
    stroke: ${p => (p.inverted ? '#ffffff' : '#212121')};
  `}
`;
