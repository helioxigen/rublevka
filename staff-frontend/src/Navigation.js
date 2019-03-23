import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme, Logo } from './UI';

const StNavigation = styled.div`
  min-width: 257px;
  width: 257px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px 15px;
  background-color: ${theme.sidebarBackground};
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 50px;
`;

const Menu = styled.nav`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-flow: row wrap;
`;

const Link = styled(NavLink)`
  width: 100%;
  display: flex;
  justify-content: start;
  padding: 10px 0;

  &:hover,
  &.active {
    color: ${theme.blue};
  }
`;

export default () => (
  <StNavigation>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>

    <Menu>
      <Link to="/country-properties">Загородные объекты</Link>
      <Link to="/settlements">Посёлки</Link>
    </Menu>
  </StNavigation>
);
