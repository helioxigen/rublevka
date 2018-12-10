import React from 'react';
import { ThemeProvider } from 'styled-components';

import global from 'window-or-global';

import HeaderJQ from 'site/components/header/v2/HeaderJQ';
import HeaderSatellites from 'site/components/header/v2/HeaderSatellites';
import Body from 'site/components/body';
import Footer from 'site/components/footer';

import sUtils from 'site/styles/utils';

import theming from 'site/styles/theming';

import styled from 'styled-components';
import media from 'site/styles/media';

const isJQ = global.config.domain === 'jqestate.ru';

export const Wrapper = styled.div`
  ${media.sm`
    padding-top: 2.5rem;
  `} ${media.md`
    padding-top: 8rem;
  `};
`;

export default props => (
  <ThemeProvider theme={theming}>
    <Body className={sUtils.scroll}>
      <main>
        {isJQ && <HeaderJQ {...props} />}
        {!isJQ && <HeaderSatellites {...props} />}

        <Wrapper>{props.children}</Wrapper>

        <Footer params={props.params} />
      </main>
    </Body>
  </ThemeProvider>
);
