import React from 'react';
import { Link } from 'react-router';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const { Icon, Visibility } = UI;

const Wrapper = styled.nav`
  ${media.sm`
    margin-top: 3rem;
  `} ${media.md`
    margin-top: 3.4rem;
  `};
`;

const Ol = styled.ol`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  ${media.sm`
    display: flex;
    top: 1.8rem;
`};
`;

const Li = styled.li`
  margin: 0;
  padding: 0;
`;

const StLink = styled(Link)`
  color: #fff;
  font-size: 1.3rem;
  font-weight: 300;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #fff;
    text-decoration: none;
  }
`;

const StIcon = styled(Icon)`
  width: 0.9rem;
  height: 0.7rem;
  margin: 0 1rem;
  vertical-align: baseline;
  fill: #fff;
  transform: rotate(-90deg);
`;
const ActiveBreadcrumb = styled.div`
  color: #fff;
  font-size: 1.3rem;
  font-weight: 300;
`;

export default () => (
  <Visibility xs="hidden" sm="hidden">
    <Wrapper>
      <Ol itemScope itemType="http://schema.org/BreadcrumbList">
        <Li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
          <StLink to="/" itemProp="item">
            <span itemProp="name">Главная</span>
            <meta itemProp="position" content="1" />
            <StIcon icon="arrow-down" />
          </StLink>
        </Li>
        <Li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
          <ActiveBreadcrumb itemProp="item">
            <span itemProp="name">Спецпредложения</span>
            <meta itemProp="position" content="3" />
          </ActiveBreadcrumb>
        </Li>
      </Ol>
    </Wrapper>
  </Visibility>
);
