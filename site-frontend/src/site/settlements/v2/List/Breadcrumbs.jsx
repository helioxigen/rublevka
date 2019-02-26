import React, { Component } from 'react';
import { Link } from 'react-router';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const { Icon, Visibility } = UI;

const Wrapper = styled.nav`
  margin: 0;
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
  color: #4a4a4a;
  font-size: 1.4rem;
  font-weight: 400;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #4a4a4a;
    text-decoration: none;
  }
`;

const StIcon = styled(Icon)`
  width: 0.9rem;
  height: 0.7rem;
  margin: 0 1rem;
  vertical-align: baseline;
  fill: #4a4a4a;
  transform: rotate(-90deg);
`;

const ActiveBreadcrumb = styled.div`
  color: #4a4a4a;
  font-size: 1.4rem;
  font-weight: 400;
`;

class PropertyBreadcrumbs extends Component {
  render() {
    return (
      <Visibility xs="hidden" sm="hidden">
        <Wrapper>
          <Ol itemScope itemType="http://schema.org/BreadcrumbList">
            <Li
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <StLink to="/" itemProp="item">
                <span itemProp="name">Элитная недвижимость</span>
                <meta itemProp="position" content="1" />
                <StIcon icon="arrow-down" />
              </StLink>
            </Li>
            <Li
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <ActiveBreadcrumb itemProp="item">
                <span itemProp="name">Посёлки</span>
                <meta itemProp="position" content="1" />
              </ActiveBreadcrumb>
            </Li>
          </Ol>
        </Wrapper>
      </Visibility>
    );
  }
}

export default PropertyBreadcrumbs;
