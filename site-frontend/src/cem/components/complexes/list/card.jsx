import React from 'react';

import { cloudfront } from 'core/config/resources';

import { Link } from 'react-router';

import { FormattedCurrency } from 'react-formatted';
import CountIndicator from 'cem/components/common/countIndicator';

import UI from 'cem/components/ui';
const { ParamList, Media, Grid: { Row, Col, Container } } = UI;

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

const states = {
  public: 'success',
  draft: 'primary',
};

const Image = ({ id }) =>
  id ? (
    <div
      className={s.imageResponsive}
      style={{ backgroundImage: `url(${cloudfront}/${id}-thumbnail-256)` }}
    />
  ) : (
    <UI.Image
      className={cn(s.imageProperties, s.placeholder)}
      src={require('url-loader!cem/assets/placeholder')}
    />
  );

const Description = ({ data }) => (
  <div className={cn(s.cardWrapper, sUtils.resetPaddingLeft)}>
    <Container fluid className={s.flex}>
      <Row>
        <Col sm="10" md="7">
          <ParamList label="Название" big>
            {data.name}
          </ParamList>
        </Col>
        <Col className={sUtils.pushedTopXs2} sm="10" md="7">
          <ParamList label={data.location.subLocalityName || 'Адрес'} big>
            {data.location.street || '—'}
            {data.location.house && `, д. ${data.location.house}`}
          </ParamList>
        </Col>
        {!!data.statistics &&
        !!data.statistics.propertiesCount && (
          <Col className={sUtils.pushedTopXs2Sm2} sm="10" md="6">
            <p className={s.title}>
              <CountIndicator
                count={data.statistics.propertiesCount}
                declensionForms={['предложение', 'предложения', 'предложений']}
              />
            </p>
            <h2 className={s.fullName}>
              {data.statistics.price.from.usd < data.statistics.price.to.usd && (
                <FormattedCurrency symbol="USD" value={data.statistics.price.from.usd} />
              )}
              {data.statistics.price.from.usd < data.statistics.price.to.usd && ' — '}
              {!!data.statistics.price.to.usd && (
                <FormattedCurrency symbol="USD" value={data.statistics.price.to.usd} />
              )}
              {!data.statistics.price.to.usd && 'Цена не указана'}
            </h2>
          </Col>
        )}
      </Row>
      <Row>
        <Col className={sUtils.pushedTopXs2} sm="2" md="1">
          <ParamList label="ID">{data.id}</ParamList>
        </Col>
      </Row>
    </Container>
  </div>
);

export default props => (
  <Link
    to={`/places/complexes/${props.data.id}/about`}
    className={cn(s.card, s[states[props.data.state]])}
  >
    <Media
      left={<Image id={(props.data.images[0] || {}).id} />}
      body={<Description {...props} />}
    />
  </Link>
);
