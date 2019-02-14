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

const MenuItem = styled(NavLink)`
  width: 100%;
  display: flex;
  justify-content: start;
  padding: 10px 0;

  &:hover,
  &.active {
    color: ${theme.blue};
  }
`;

const Count = styled.div`
  color: ${theme.gray};
  margin-left: 10px;
`;

const Navigation = ({ menuItemsList }) => (
  <StNavigation>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <Menu>
      {menuItemsList.map(({ path, name, count }) => (
        <MenuItem to={path} key={name}>
          {name}
          {count && <Count>{count}</Count>}
        </MenuItem>
      ))}
    </Menu>
  </StNavigation>
);

export default Navigation;
