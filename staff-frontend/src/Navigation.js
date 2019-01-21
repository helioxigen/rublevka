import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme, Logo } from './UI';

const StNavigation = styled.div`
  width: 256px;
  min-height: 100vh;
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

const MenuItem = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 20px;
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
      {menuItemsList.map(menuItem => (
        <MenuItem to={menuItem.path} key={menuItem.name}>
          {menuItem.name}
          <Count>{menuItem.count} </Count>
        </MenuItem>
      ))}
    </Menu>
  </StNavigation>
);

export default Navigation;
