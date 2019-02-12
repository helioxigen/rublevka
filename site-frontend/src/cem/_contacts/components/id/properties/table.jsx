import React from 'react';

import {
  kinds,
  categories,
  states,
} from 'cem/constants/properties/dictionaries';
import { FormattedCurrency } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Table,
  Button,
  Icon,
  Table: { Container, Row, Cell, Heading },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

export default props => (
  <div className={sUtils.scrollX}>
    <Container width="100%" className={sUtils.width120}>
      <Row>
        <Heading>ID</Heading>
        <Heading>Раздел</Heading>
        <Heading>Тип объекта</Heading>
        <Heading>Тип предложения</Heading>
        <Heading>Стоимость</Heading>
        <Heading>Статус</Heading>
        <Table.Heading />
      </Row>
      {props.items.map((item, index) => (
        <Row key={index}>
          <Cell>{item.id}</Cell>
          <Cell>{categories[item.category]}</Cell>
          <Cell>{kinds[item.kind]}</Cell>
          <Cell>
            {!!item.saleOffer && 'Продажа'}
            {!!item.rentOffer && ' / Аренда'}
            {!item.saleOffer && !item.rentOffer && '—'}
          </Cell>
          <Cell>
            {/* TODO Ugliness... */}
            {!!item.saleOffer && !!item.saleOffer.price && (
              <FormattedCurrency
                symbol={item.saleOffer.currency}
                value={item.saleOffer.price}
              />
            )}
            {!!item.rentOffer && !!item.rentOffer.price && ' / '}
            {!!item.rentOffer && !!item.rentOffer.price && (
              <FormattedCurrency
                symbol={item.rentOffer.currency}
                value={item.rentOffer.price}
              />
            )}
            {!item.saleOffer && !item.rentOffer && '—'}
          </Cell>
          <Cell className={s[states[item.state].style]}>
            {states[item.state].title}
          </Cell>
          <Cell>
            <Button
              to={`/properties/${item.category}/${item.id}`}
              className={sButton.btnTableAction}
              size="xs"
            >
              <Icon className={s.btnIcon} icon="arrow-left" />
            </Button>
          </Cell>
        </Row>
      ))}
    </Container>
  </div>
);
