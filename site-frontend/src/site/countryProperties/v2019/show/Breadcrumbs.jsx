import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import UI from 'site/ui';

import { nameToSlug } from 'core/helpers/nameToSlug';
import { dealTypesTranslit, dealTypesTranslateV2 } from 'site/constants/properties/dictionaries';
import media from 'site/styles/media';

import styled from 'styled-components';

const { Icon } = UI;

const Wrapper = styled.nav`
  padding-top: 18px;

  ${media.xs`
    margin-left: 1px;
    margin-right: 1px;
  `}

  ${media.sm`
    margin-left: -4px;
    margin-right: -4px;
  `}

  ${media.md`
    padding: 0;
    margin: 0;
    margin-top: 28px;
    margin-bottom: 16px;
  `}
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
  line-height: 15px;
  font-size: 13px;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
    color: rgba(35, 35, 35, 1);
  }

  color: rgba(35, 35, 35, 0.5);
`;

const StIcon = styled(Icon)`
  width: 4px;
  height: 8px;
  margin: 0 7px 0 10px;
  fill: rgba(35, 35, 35, 0.5);
`;

class PropertyBreadcrumbs extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data, dealType } = this.props;
    const { location = {} } = data;

    return (
      <Wrapper>
        <Ol itemScope itemType="http://schema.org/BreadcrumbList">
          <Li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <StLink to="/" itemProp="item">
              <span itemProp="name">Главная</span>
              <meta itemProp="position" content="1" />
              <StIcon icon="arrow-left" />
            </StLink>
          </Li>
          <Li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <StLink to={`/zagorodnaya/${dealTypesTranslit[dealType]}`} itemProp="item">
              <span itemProp="name">{dealTypesTranslateV2[dealType]}</span>
              <meta itemProp="position" content="2" />
              <StIcon icon="arrow-left" />
            </StLink>
          </Li>
          {location.localityId && (
            <Li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              <StLink
                to={`/zagorodnaya/nas-punkt/${nameToSlug(location.localityName)}_${
                  location.localityId
                }/${dealTypesTranslit[dealType]}`}
                itemProp="item"
              >
                <span itemProp="name">{location.localityName}&nbsp;</span>
                <meta itemProp="position" content="3" />
              </StLink>
            </Li>
          )}
        </Ol>
      </Wrapper>
    );
  }
}

export default PropertyBreadcrumbs;
