import React, { Component } from 'react';

import Info from './info';
import Description from './description';
import Communications from './сommunications';
import Gallery from './gallery';
import Land from './land';
import AdditionalBuildings from './additionalBuildings';
import Parking from './parking';
import Footer from './footer';
import FloorsDescription from './floorsDescription';

import FlatDescrition from './flatDescription';
import ResidentialDescription from './residentialDescription';

export default class extends Component {
  render() {
    const { data, broker, showLogo, residentialComplex } = this.props;
    const images = data.images.filter(({ isPublic }) => !!isPublic);
    const count = data.category === 'country' ? 4 : 8;

    return (
      <main className="container">
        <figure className="banner">
          {images[0] && (
            <div
              className="banner-image"
              style={{
                backgroundImage: `url(https://images.jqestate.ru/${images[0].id}-${
                  showLogo ? 'jqestate' : 'presentation'
                }-1024)`,
              }}
            />
          )}
        </figure>

        <Info {...this.props} />

        {data.category === 'country' && (
          <section className="git description">
            {data.kind !== 'land' && <Description {...data.specification} />}

            <div className="description-list-container">
              <Land {...data} />
              <AdditionalBuildings {...data} />
              <Parking {...data} />
            </div>

            {!!Object.keys(data.communication).filter(key => !!data.communication[key]).length && (
              <Communications {...data.communication} {...data.specification} />
            )}
          </section>
        )}
        {data.category === 'city' && (
          <section className="description">
            <FlatDescrition {...data.specification} />
            {residentialComplex && <ResidentialDescription {...residentialComplex} />}
          </section>
        )}

        <section className="page-break">
          <Gallery images={images} count={count} showLogo={showLogo} />

          {data.category === 'country' && <FloorsDescription {...data} />}
        </section>

        {showLogo && <Footer broker={broker} />}
      </main>
    );
  }
}
