import React from 'react';
import { Link } from 'react-router';

import * as dict from 'cem/constants/settings/exportPackages/dictionaries';
import * as propertyDict from 'cem/constants/properties/dictionaries.js';

import UI from 'cem/components/ui';
const {
  Icon,
  Grid: { Container, Row, Col },
} = UI;

import StaticMask from 'core/components/ui/staticMask';
import CountIndicator from 'cem/components/common/countIndicator';

import cn from 'classnames';
import s from 'cem/styles/ui/card2';
import sUtils from 'cem/styles/utils';

import moment from 'moment';
moment.locale('ru');

const declensionFormsOfFiltersCount = ['объект', 'объекта', 'объектов'];

export default ({ data = { filter: {}, statistics: {} } }) => {
  const categoryTitle =
    propertyDict.categories[data.filter['filter[category]']];
  const resaleTitle = propertyDict.resaleKinds[data.filter['filter[isResale]']];
  const lastExportTitle =
    !!data.lastExportAt && moment(data.lastExportAt).fromNow();

  return (
    <Link
      to={`/settings/export_packages/${data.id}`}
      className={cn(s.card, s.cardMd)}
    >
      <Container fluid>
        <Row sm="middle">
          <Col sm={3}>
            <span className={s.textMd}>
              {dict.formats[data.format]}
              <br />
              <span className={sUtils.textGrey}>
                {!!data.statistics.propertiesCount && (
                  <CountIndicator
                    count={data.statistics.propertiesCount}
                    declensionForms={declensionFormsOfFiltersCount}
                  />
                )}
                {!data.statistics.propertiesCount && 'нет объектов'}
              </span>
            </span>
          </Col>
          <Col sm={6} lg={8} className={sUtils.pushedTopXs1}>
            <span className={s.textMd}>
              {data.title}
              <br />
              <span className={sUtils.textGrey}>
                {categoryTitle}
                {resaleTitle && `, ${resaleTitle}`}
              </span>
            </span>
          </Col>
          <Col sm={5} lg={4} className={sUtils.pushedTopXs4}>
            <span className={s.textMd}>
              {data.companyName}
              <br />
              <span className={sUtils.textGrey}>
                <StaticMask pattern="+1 (111) 111-11-11">
                  {data.companyPhoneNumber}
                </StaticMask>
              </span>
            </span>
          </Col>
          <Col xs={14} sm={3} lg={3} className={sUtils.pushedTopXs4}>
            <span className={s.textMd}>
              <span className={sUtils.textGrey}>
                {lastExportTitle}
                {!lastExportTitle && 'ещё не сгенерирован'}
              </span>
            </span>
          </Col>
          <Col
            xs={6}
            sm={3}
            lg={2}
            className={cn(sUtils.textRight, sUtils.pushedTopXs4)}
          >
            <span className={cn(s.textMd, s[dict.stateColors[data.state]])}>
              ID: {data.id}
            </span>
            <Icon className={s.icon} icon="chevron-down" />
          </Col>
        </Row>
      </Container>
    </Link>
  );
};
