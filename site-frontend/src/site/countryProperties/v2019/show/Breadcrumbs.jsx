import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import UI from '../../../ui';

import { nameToSlug } from '../../../../core/helpers/nameToSlug';
import {
  dealTypesTranslit,
  dealTypesTranslate,
} from '../../../constants/properties/dictionaries';
import media from '../../../styles/media';

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

export default ({ data, dealType }) => {
  const { location = {} } = data;

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
          <StLink
            to={`/zagorodnaya/${dealTypesTranslit[dealType]}`}
            itemProp="item"
          >
            <span itemProp="name">{dealTypesTranslate[dealType]}</span>
            <meta itemProp="position" content="2" />
            <StIcon icon="arrow-left" />
          </StLink>
        </Li>
        {location.localityId && (
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
              <span itemProp="name">
                {location.settlementName}
&nbsp;
              </span>
              <meta itemProp="position" content="3" />
            </StLink>
          </Li>
        )}
      </Ol>
    </Wrapper>
  );
};
