import React from 'react';
import { Link } from 'react-router';

import CountIndicator from 'cem/components/common/countIndicator';
import Photo from 'cem/_contacts/components/photo';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Icon,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/ui/card2';
import sUtils from 'cem/styles/utils';

import { cloudfront } from 'core/config/resources';

export default props => {
  const { data = {} } = props;

  return (
    <Link to={`/selections/${data.id}`} className={s.card}>
      <Container fluid>
        <Row sm="middle">
          <Col sm={2}>
            {data.photo && (
              <UI.Image
                src={`${cloudfront}/${data.photo.id}-128`}
                kind="circle"
                width={64}
                height={64}
              />
            )}
          </Col>
          <Col sm={4}>
            <span className={s.textMd}>{data.name}</span>
          </Col>
          <Col sm={2}>
            <span className={s.textMd}>{data.site}</span>
          </Col>
          <Col sm={6}>
            <span className={s.textMd}>
              {data.propertyCategory === 'country'
                ? 'Загородная'
                : ' Городская'}{' '}
              недвижимость
            </span>
          </Col>
          <Col sm={3}>
            <span className={s.textMd}>
              <CountIndicator
                count={data.propertyIds.length}
                declensionForms={['объект', 'объекта', 'объектов']}
              />
            </span>
          </Col>
          <Col sm={3} className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
            <span className={s.textMd}>ID: {data.id}</span>
            <Icon className={s.icon} icon="chevron-down" />
          </Col>
        </Row>
      </Container>
    </Link>
  );
};
