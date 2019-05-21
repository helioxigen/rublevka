import React from 'react';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';

import global from 'window-or-global';

import HeaderJQ from './components/header/v2/HeaderJQ';
import HeaderSatellites from './components/header/v2/HeaderSatellites';
import Body from './components/body';
import Footer from './components/footer';

import theming from './styles/theming';
import media from './styles/media';
import sUtils from './styles/utils.css';
import { ogMeta, capitalize } from './helpers';

const isJQ = global.config.domain === 'jq.estate';

const Main = styled.main`
  font-family: ${!isJQ
    ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;'
    : 'inherit'};
`;

export const Wrapper = styled.div`
  background-color: #fafafa;
  ${media.sm`
    padding-top: ${isJQ ? '2.5rem' : '0px'};
  `} ${media.md`
    padding-top: ${isJQ ? '8rem' : '60px'};
  `};
`;

addLocaleData(ru);

export default props => (
  <IntlProvider locale="ru">
    <ThemeProvider theme={theming}>
      <Body className={sUtils.scroll}>
        <Main>
          <Helmet
            meta={ogMeta({
              locale: 'ru_RU',
              type: 'website',
              site_name: capitalize(global.config.domain),
              url: `https://${global.config.domain}${props.location.pathname}`,
            })}
          />
          {isJQ && <HeaderJQ {...props} />}
          {!isJQ && <HeaderSatellites {...props} />}

          <Wrapper>{props.children}</Wrapper>

          <Footer params={props.params} />
        </Main>
      </Body>
    </ThemeProvider>
  </IntlProvider>
);
