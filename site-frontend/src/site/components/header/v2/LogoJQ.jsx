import React from 'react';

import styled from 'styled-components';
import media from 'site/styles/media';

import UI from 'site/ui';

const { Icon, Navbar: { Brand } } = UI;

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
  padding: 1.5rem 0 0;

  ${media.sm`
    padding: 1.8rem 0;
    top: 0.6rem;
    left: 1.5rem;
    position: static;
    margin-left: 3rem;
  `} ${media.md`
    margin-left: 0;
    margin-right: 0.5rem;
  `};
`;

const JQLogo = styled(Icon)`
  width: 2.2rem;
  height: 2rem;
  margin-right: 0.8rem;
  fill: ${props => props.theme.brandPrimary};
  ${media.sm`
    width: 3.3rem;
    height: 2.9rem;
  `} ${media.md`
    width: 4rem;
    height: 3.5rem;
  `};
`;

const TextLogo = styled(Icon)`
  width: 11rem;
  height: 2rem;
  fill: #231f20;
  padding-top: 0.4rem;

  ${media.sm`
    padding-top: 1.4rem;
    width: 18rem;
    height: 3.8rem;
    vertical-align: bottom;
  `} ${media.md`
    display: none;
  `};
`;

export default props => (
  <Wrapper>
    <Logo onClick={props.closeMenu} to="/">
      <JQLogo icon={global.config.brand} />
      <TextLogo icon="jqestate" />
    </Logo>
  </Wrapper>
);
