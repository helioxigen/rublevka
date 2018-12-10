import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import UI from 'site/ui';
const { Media, Grid, Icon, JQImage } = UI;
const { Row, Col } = Grid;

import s from 'site/styles/settlements/card';

class Card extends Component {
  generatePlaceName(name, kind) {
    return {
      regions: `${name}`,
      districts: `${name} район`,
      routes: `${name} шоссе`,
      localities: `Насесённый пункт «${name}»`,
      settlements: `Посёлок «${name}»`,
    }[kind];
  }

  renderPhoto(data) {
    const { images = [], id } = data;
    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    if (publicImages.length) {
      return <JQImage id={`${publicImages[0].id}`} className={s.image} alt={id} height="350" />;
    } else if (typeof window !== 'undefined') {
      return <Icon icon="placeholder" className={s.imagePlaceholder} />;
    }
  }

  render() {
    const { id, placeKind, state } = this.props;
    const { data = {}, isFetching } = state.places[id];

    if (!isFetching) {
      const placeName = this.generatePlaceName(data.name, placeKind, data.kindName);

      return (
        <Col xs={12}>
          <Link className={s.card} to={`/zagorodnaya/${placeKind}/${data.id}/prodaja`}>
            <Media
              left={this.renderPhoto(data)}
              body={
                <section className={s.aboutContainer}>
                  <Row>
                    <Col xs="12">
                      <h2 className={s.title}>
                        {placeName}
                        {data.location &&
                          data.location.mkadDistance &&
                          `, ${data.location.mkadDistance} км`}
                      </h2>
                    </Col>
                  </Row>
                </section>
              }
            />
          </Link>
        </Col>
      );
    }

    return null;
  }
}

const pickState = ({ places }) => ({
  state: {
    places,
  },
});

export default connect(pickState)(Card);
