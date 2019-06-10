import React from 'react';
import styled from 'styled-components';
import global from 'window-or-global';

import media from '../../../../styles/media';

import UI from '../../../../ui';

const isRiga = global.config.domain === 'riga.ru';

const {
  Icon,
  Navbar: { Brand },
} = UI;

const Logo = styled(Brand)`
  display: inline-flex;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin-right: 30px;
`;

const StIcon = styled(Icon)`
  height: 18px;
  width: ${isRiga ? 63 : 131}px;
  fill: ${p => p.theme.brandWhite};
  ${media.xs`
    height: 20px;
    fill: ${p => (p.isLanding ? p.theme.brandWhite : p.theme.brandBlack)};
  `}
  ${media.md`
    fill: ${p => (p.inverted ? p.theme.brandWhite : p.theme.brandBlack)};
  `};
`;

export default ({ isLanding, inverted }) => (
  <Logo to="/">
    <StIcon
      isLanding={isLanding}
      inverted={inverted}
      icon={global.config.brand}
    />
  </Logo>
);
