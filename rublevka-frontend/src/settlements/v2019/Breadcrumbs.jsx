import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import UI from 'ui';
import media from 'styles/media';

import { nameToSlug } from 'core/helpers/nameToSlug';

const { Icon } = UI;

const Wrapper = styled.nav`
  display: none;
  padding-top: 18px;

  ${media.xs`
    display: block;
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

  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);

  &:hover {
    color: #fff;
  }
`;

const StIcon = styled(Icon)`
  width: 4px;
  height: 8px;
  margin: 0 7px 0 10px;
  fill: #e6e6e6;
`;

class PropertyBreadcrumbs extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <Wrapper>
        <Ol itemScope itemType="http://schema.org/BreadcrumbList">
          <Li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <StLink to="/" itemProp="item">
              <span itemProp="name">Главная</span>
              <meta itemProp="position" content="1" />
              <StIcon icon="arrow-left" />
            </StLink>
          </Li>
          <Li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <StLink to="/zagorodnaya/kottedzhnye-poselki" itemProp="item">
              <span itemProp="name">Посёлки</span>
              <meta itemProp="position" content="2" />
              {data && <StIcon icon="arrow-left" />}
            </StLink>
          </Li>
          {data && (
            <Li
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <StLink
                to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                  data.name,
                )}_${data.id}`}
                itemProp="item"
              >
                <span itemProp="name">{data.name}&nbsp;</span>
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
