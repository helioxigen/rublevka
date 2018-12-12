import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Button, Icon, Table,
  Tooltip,
} = UI;
import { FormattedCurrency } from 'react-formatted';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import { idResourcer } from 'core/decorators/fetcher';

import * as dict from 'cem/constants/properties/dictionaries';

const getOfferKind = ({ saleOffer = {}, rentOffer = {} }) => {
  const offerKinds = [`Продажа`, `Аренда`];
  const offers = [saleOffer, rentOffer].map((offer, index) => offer.price && offerKinds[index]);
  return offers.filter(item => item).join(` / `);
};

const getPrice = ({ saleOffer = {}, rentOffer = {} }) => {
  const salePrice = saleOffer.price && <FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price} />;
  const rentPrice = rentOffer.price && <FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price} />;
  const delimeter = salePrice && rentPrice && <span>&nbsp;/&nbsp;</span>;

  return [salePrice, delimeter, rentPrice].filter(item => item);
};

class Property extends Component {
  static defaultProps = {
    isPreview: false,
  };

  render() {
    const { itemData } = this.props;

    return !!Object.keys(itemData).length ? (
      <Table.Row>
        <Table.Cell>{itemData.id}</Table.Cell>
        <Table.Cell><span className={s[dict.states[itemData.state] && dict.states[itemData.state].style]}>{dict.states[itemData.state].title}</span></Table.Cell>
        <Table.Cell>{dict.kinds[itemData.kind]}</Table.Cell>
        <Table.Cell>{getOfferKind(itemData)}</Table.Cell>
        <Table.Cell>{getPrice(itemData)}</Table.Cell>
        <Table.Cell>
          <Tooltip className={sUtils.pushedRight1} title="Перейти" position="top">
            <Button className={sButton.btnTableAction} to={`/properties/${itemData.category}/${itemData.id}`} size="xs">
              <Icon className={s.btnIcon} icon="arrow-left" />
            </Button>
          </Tooltip>
          {!this.props.isStatic &&
            <Tooltip className={sUtils.pushedRight1} title="Убрать из списка" position="top">
              <Button className={sButton.btnTableAction} type="button" size="xs" onClick={this.props.handleDelete}>
                <Icon className={s.btnIcon} icon="delete" />
              </Button>
            </Tooltip>
          }
        </Table.Cell>
      </Table.Row>
    ) : <Table.Row />;
  }
}

export default idResourcer({
  id: `properties`,
  linkedResourcesSchemes: [],
})(Property);
