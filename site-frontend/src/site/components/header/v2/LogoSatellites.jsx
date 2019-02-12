import React from 'react';
import styled from 'styled-components';

import global from 'window-or-global';

import media from 'site/styles/media';

import UI from 'site/ui';

const {
  Icon,
  Navbar: { Brand },
} = UI;

const isRublevka = global.config.domain === 'rublevka.ru';
const isRiga = global.config.domain === 'riga.ru';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  ${media.sm`
  justify-content: flex-start;
  top: 0.6rem;
  left: 1.5rem;
  position: static;
  margin-right: 0;
`};
`;

const Logo = styled(Brand)`
  position: absolute;
  top: 0.6rem;
  left: 2rem;

  ${media.sm`
    left: 1.5rem;
    position: static;
    margin-right: 1.8rem;
  `};
`;

const LogoR = styled(Brand)`
  top: 1.2rem;
  left: 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin-right: ${props => props.theme.logoMarginRight};

  ${media.sm`
    position: static;
    font-size: 1.6rem;
  `};
`;

const StIcon = styled(Icon)`
  width: 11.5rem;
  height: 2rem;
  fill: ${props => props.theme.brandBlack};
`;

export default () => (
  <Wrapper>
    {(isRublevka || isRiga) && (
      <LogoR to="/">
        <StIcon icon={global.config.brand} />
      </LogoR>
    )}

    {!isRublevka && !isRiga && <Logo to="/">{global.config.banner.logo}</Logo>}
  </Wrapper>
);
