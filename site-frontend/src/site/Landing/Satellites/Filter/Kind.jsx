import React, { Component } from 'react';

import cn from 'classnames';
import s from 'site/styles/landing/satellites/filter';
import sUtils from 'site/styles/utils';

import UI from 'site/ui';

const { Button } = UI;

const key = 'kind';

class KindSelect extends Component {
  onUpdate(value) {
    const { selected = {} } = this.props;
    const items = selected[key] || [];
    const index = items.indexOf(value);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(key, [...items, value]);
    } else {
      this.props.updateFilter(key, items.filter((el, i) => i !== index));
    }
  }

  render() {
    const { selected = {}, dealType } = this.props;
    const items = selected[key] || [];

    return (
      <ul className={cn(s.list, sUtils.pushedTopXs1Sm2)}>
        <Button
          className={cn(s.item, items.indexOf('house') > -1 && s.active)}
          onClick={() => this.onUpdate('house')}
        >
          Дом
        </Button>
        {dealType !== 'rent' && (
          <Button
            className={cn(s.item, items.indexOf('land') > -1 && s.active)}
            onClick={() => this.onUpdate('land')}
          >
            Участок
          </Button>
        )}
        <Button
          className={cn(s.item, items.indexOf('townhouse') > -1 && s.active)}
          onClick={() => this.onUpdate('townhouse')}
        >
          Таунхаус
        </Button>
        <Button
          className={cn(s.item, items.indexOf('flat') > -1 && s.active)}
          onClick={() => this.onUpdate('flat')}
        >
          Квартира
        </Button>
      </ul>
    );
  }
}

export default KindSelect;
