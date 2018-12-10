import React from 'react';

import { cloudfront } from 'core/config/resources';

import { Link } from 'react-router';

import UI from 'cem/components/ui';
const { Media, ParamList, Grid: { Row, Col, Container } } = UI;

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
      src={require('cem/assets/placeholder')}
    />
  );

const Description = (props) => {
  const { data } = props;

  return (
    <div className={cn(s.cardWrapper, sUtils.resetPaddingLeft)}>
      <Container fluid className={s.flex}>
        <Row>
          <Col sm="10" md="8" lg="6">
            <ParamList label="Поселок" big>
              {data.name}
            </ParamList>
          </Col>
          {data.location.routeName && (
            <Col className={sUtils.pushedTopXs2} sm="10" md="8" lg="5">
              <ParamList label="Шоссе" big>
                {data.location.routeName}
              </ParamList>
            </Col>
          )}
          {data.location.mkadDistance && (
            <Col className={sUtils.pushedTopXs2Sm2} sm="10" md="4">
              <ParamList label="От МКАД" big>
                {data.location.mkadDistance} км
              </ParamList>
            </Col>
          )}
        </Row>
        <Row>
          <Col className={sUtils.pushedTopXs2} sm="3">
            <ParamList label="ID">{data.id}</ParamList>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default props => (
  <Link
    to={`/places/settlements/${props.data.id}/about`}
    className={cn(s.card, s[states[props.data.state]])}
  >
    <Media
      left={<Image id={(props.data.images[0] || {}).id} />}
      body={<Description {...props} />}
    />
  </Link>
);
