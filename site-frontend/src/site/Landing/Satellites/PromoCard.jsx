import React, { Component } from 'react';

// components
import UI from 'site/ui';

// styles
import cn from 'classnames';
import s from 'site/styles/landing/satellites/properties';
import sUtils from 'site/styles/utils';

import { nameToSlug } from 'core/helpers/nameToSlug';

const {
  Button,
  CountIndicator,
  Grid,
} = UI;

class PromoCard extends Component {
  render() {
    const { id, count, name } = this.props;

    return (
      <Grid.Col xs="12" sm="6" md="4">
        <div className={s.card}>
          <div className={s.content}>
            <h2>
              У нас есть еще <CountIndicator count={count} declensionForms={['отличное предложение', 'отличных предложения', 'отличных предложений']} />
            </h2>

            <Button to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(name)}_${id}`} className={cn(sUtils.borderRadius10, sUtils.pushedTop1)} type="submit" size="sm" kind="primary">
              Показать
            </Button>
          </div>
        </div>
      </Grid.Col>
    );
  }
}

export default PromoCard;
