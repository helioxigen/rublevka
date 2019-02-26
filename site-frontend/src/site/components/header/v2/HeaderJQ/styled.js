import styled from 'styled-components';
import media from 'site/styles/media';

import Body from 'site/components/body';

import UI from 'site/ui';

const {
  Navbar,
  Icon,
  Button,
  Navbar: { Menu },
} = UI;

export const HeaderBody = styled(Body)`
  ${p =>
    p.active &&
    `
    position: fixed;
    width: 100%;
    overflow: hidden;
  `};
`;

export const Wrapper = styled.header`
  position: relative;
  z-index: 7;
  min-height: 5rem;
  max-height: 5rem;
  background-color: ${p => p.theme.brandWhite};

  ::-webkit-scrollbar {
    display: none;
  }

  ${media.md`
    position: fixed;
    left: 0;
    right: 0;
    z-index: 8;
    background-color: ${p => p.theme.brandWhite};
    border-bottom: 1px solid ${p => p.theme.grey};
    min-height: 9rem;
    max-height: 9rem;
  `};
`;

export const NavPanel = styled.div`
  position: relative;
  background: #fff;
  min-height: 5rem;
  z-index: 10;
  border-bottom: 1px solid ${p => p.theme.grey};

  ${media.sm`
    min-height: 8.2rem;
  `} ${media.md`
    min-height: 5rem;
  `};
`;

export const Nav = styled(Navbar.Container)`
  position: fixed;
  top: 5rem;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  white-space: nowrap;
  background: ${p => p.theme.brandWhite};
  transform: translate3d(0, -115%, 0);
  transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
  overflow-y: auto;

  ${media.xs`
    left: unset;
    width: 34rem;
    white-space: nowrap;
    transform: translate3d(100%, 0, 0);
    ${p =>
      p.active &&
      `
      transform: translate3d(0, 0, 0);
    `};
  `} ${media.md`
    position: static;
    width: auto;
    background: transparent;
    box-shadow: none;
    transform: none;
    &:before {
      display: none;
    }
  `} ${p =>
  p.active &&
  `
      transform: translate3d(0, 0, 0);
  `};
`;

export const StMenu = styled(Menu)`
  border: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  ${media.md`
    display: inline-block;
    justify-content: flex-end;
  `};
`;

export const MenuWrapper = styled.div`
  padding-top: 2rem;

  ${media.sm`
    padding-top: 5rem;
  `} ${media.md`
    display: inline-block;
    padding-top: 3.5rem;
  `};
`;

export const MenuItem = styled.div`
  margin: 1.5rem 2rem 2.5rem;
  padding: 0;
  vertical-align: middle;

  ${media.sm`
    padding: 0.3rem 0 0;
  `} ${media.md`
    display: inline-block;
    padding: 0.3rem 0 3rem;
    margin: 0;

    &:hover {
      > nav {
        visibility: visible;
        opacity: 1;

        transition: opacity .3s ease-in;
      }
    }
  `};
`;

export const MenuItemBottom = MenuItem.extend`
  width: 100%;
  margin: 0 2rem 2rem;

  ${media.xs`
    max-width: 26rem;
  `} ${media.md`
    display: none;
  `};
`;

export const StyledLink = styled(Navbar.Link)`
  color: ${p => p.theme.brandBlack};
  font-size: 1.6rem;
  padding: 0;

  &:hover,
  &:active,
  &.active {
    color: ${p => p.theme.brandPrimary};
  }
  ${media.md`
    font-size: 1.8rem;
  `};
`;

export const StyledLinkSat = styled(Navbar.Link)`
  color: ${p => p.theme.brandBlack};
  border-bottom: 3px solid transparent;

  &:hover,
  &:active {
    color: ${p => p.theme.brandPrimary};
  }
  &.active {
    border-bottom: 3px solid ${p => p.theme.brandPrimary};
  }
`;

export const Phone = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: inline-block;
  color: ${p => p.theme.brandBlack};
  font-size: 1.8rem;
  line-height: 1;
  opacity: 0;
  z-index: 5;

  ${media.sm`
    opacity: 1;
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
    margin: 3.1rem 1.8rem;
    width: inherit;
    padding-right: 0;
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
  position: absolute;
  border: none;
  top: 1.8rem;
  right: 1.6rem;
  padding: 0;

  &:hover,
  &:focus {
    background: transparent;
  }

  ${media.sm`
    width: 4.8rem;
    height: 4.8rem;
    border: 1px solid #F5F5F5;
    border-radius: 50%;
    top: 1.8rem;
    right: 3rem;
    padding-top: 0.5rem;
  `} ${media.md`
    display: none;
    position: relative;
    top: 0;
  `};
`;

export const MenuIcon = styled(Icon)`
  width: 2.7rem;
  height: 1.9rem;

  fill: ${p => p.theme.brandBlack};
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
  display: none;
  font-size: 1.6rem;
  padding: 1.6rem 3rem;
  border-radius: 10rem;
  ${media.sm`
    display: block;
    position: absolute;
    bottom: 4rem;
    right: 2.8rem;
    padding: 1.6rem 7.5rem;
  `} ${media.md`
    position: static;
    bottom: 0;
    right: 0;
    padding: 1.6rem 3rem;
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

export const HideSm = styled.div`
  display: block;

  ${media.sm`
    display: none;
  `} ${media.md`
    display: inline-block;
  `};
`;
