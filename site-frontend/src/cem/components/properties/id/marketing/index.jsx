import React, { Component } from 'react';

import ModalMarketing from '../modal/marketing';
import Banners from 'cem/containers/properties/banners';

import UI from 'cem/components/ui';
const {
  Loading,
  Grid, Heading,
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Marketing extends Component {
  render() {
    const { state, data, actions, isUpdateAllowed } = this.props;
    const banners = state.bannersByPropertyId[data.id] || {};
    const { isFetching: isBannersFetching } = banners;
    const isBannersPresent = !!Object.keys(banners).filter(key => banners[key].items && !!banners[key].items.length).length;

    return (
      <Grid.Row>
        <section className={s.section}>
          <Grid.Row>
            <Col xs="20">
              <Heading size="md" className={sUtils.pushedBottom1_5}>
                Баннеры и таблички
                {isUpdateAllowed && <ModalMarketing propertyId={data.id} category={data.category} actions={actions} responsibleUserId={state.auth.id} />}
              </Heading>
            </Col>
          </Grid.Row>
          {isBannersFetching && <Loading />}
          {!isBannersPresent && !isBannersFetching && data.id && <Heading notFound className={sUtils.pushedTop1}>Нет внешней рекламы</Heading>}
          {data.id &&
            <section>
              <Banners propertyId={data.id} category={data.category} bannerState="ordered" />
              <Banners propertyId={data.id} category={data.category} bannerState="active" />
              <Banners propertyId={data.id} category={data.category} bannerState="removed" />
              <Banners propertyId={data.id} category={data.category} bannerState="denied" />
            </section>
          }
        </section>
      </Grid.Row>
    );
  }
}

export default Marketing;
