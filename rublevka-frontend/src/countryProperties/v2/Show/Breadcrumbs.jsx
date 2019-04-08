import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import UI from 'ui';

import { nameToSlug } from 'core/helpers/nameToSlug';

import styled from 'styled-components';
import media from 'styles/media';

const { Icon, Visibility } = UI;

const Wrapper = styled.nav`
  margin-top: 3.4rem;
  ${media.sm`
    margin-top: 2rem;
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
  color: #4a4a4a;
  font-size: 1.4rem;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #9b9b9b;
    text-decoration: none;
  }
`;

const StIcon = styled(Icon)`
  width: 0.9rem;
  height: 0.7rem;
  margin: 0 1rem;
  vertical-align: baseline;
  fill: ${p => p.theme.greyDark};
  transform: rotate(-90deg);
`;
const ActiveBreadcrumb = styled.div`
  color: #9b9b9b;
  font-size: 1.4rem;
`;

class PropertyBreadcrumbs extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;
    const { location = {} } = data;

    return (
      <Visibility xs="hidden" sm="hidden">
        <Wrapper>
          <Ol itemScope itemType="http://schema.org/BreadcrumbList">
            {location.routeId && (
              <Li
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
                <StLink
                  to={`/zagorodnaya/shosse/${nameToSlug(location.routeName)}_${
                    location.routeId
                  }/prodaja`}
                  itemProp="item"
                >
                  <span itemProp="name">{location.routeName}&nbsp;шоссе</span>
                  <meta itemProp="position" content="1" />
                  <StIcon icon="arrow-down" />
                </StLink>
              </Li>
            )}
            {location.districtId && (
              <Li
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
                <StLink
                  to={`/zagorodnaya/rayon/${nameToSlug(
                    location.districtName,
                  )}_${location.districtId}/prodaja`}
                  itemProp="item"
                >
                  <span itemProp="name">
                    {location.districtName}&nbsp;район
                  </span>
                  <meta itemProp="position" content="2" />
                  <StIcon icon="arrow-down" />
                </StLink>
              </Li>
            )}
            {/* {location.localityId && (
              <Li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                <StLink
                  to={`/zagorodnaya/nas-punkt/${nameToSlug(
                    location.localityName,
                  )}_${location.localityId}/prodaja`}
                  itemProp="item"
                >
                  <span itemProp="name">{location.localityName}&nbsp;</span>
                  <meta itemProp="position" content="3" />
                  <StIcon icon="arrow-down" />
                </StLink>
              </Li>
            )} */}
            {location.settlementId && (
              <Li
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
                <StLink
                  to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                    location.settlementName,
                  )}_${location.settlementId}`}
                  itemProp="item"
                >
                  <span itemProp="name">{location.settlementName}&nbsp;</span>
                  <meta itemProp="position" content="4" />
                </StLink>
              </Li>
            )}
          </Ol>
        </Wrapper>
      </Visibility>
    );
  }
}

export default PropertyBreadcrumbs;
