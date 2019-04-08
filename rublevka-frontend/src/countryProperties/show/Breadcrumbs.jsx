import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import UI from 'ui';

import { nameToSlug } from 'core/helpers/nameToSlug';

import styled from 'styled-components';

const {
  Icon,
  Visibility,
  Grid: { Row, Col },
} = UI;

const Wrapper = styled.nav`
  margin-bottom: 2rem;
`;

const Ol = styled.ol`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  margin: 0;
  padding: 0;
`;

const StLink = styled(Link)`
  color: #000;
  font-size: 1.4rem;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
  }
`;

const StIcon = styled(Icon)`
  width: 0.9rem;
  height: 0.7rem;
  margin: 0 1rem 0 0.8rem;
  vertical-align: baseline;
  fill: ${p => p.theme.greyDark};
  transform: rotate(-90deg);
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
                  <span itemProp="name">{location.routeName}&nbsp;ш.</span>
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
            {location.localityId && (
              <Li
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
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
            )}
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
