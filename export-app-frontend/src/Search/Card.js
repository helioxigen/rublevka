/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';

import { CheckboxLabel } from '../UI';
import {
  CardSt,
  Image,
  ID,
  Price,
  Title as OrigTitle,
  SubTitle,
  Options as OrigOptions,
  Actions,
  ActionButton,
  Loading,
  Header as OrigHeader,
  ActionsAndOptions as OrigActionsAndOptions,
} from '../List/Card';

import { kinds } from '../List/dictionaries';

import iconAdd from './icon-add.svg';
import placeholder from '../List/placeholder.jpg';

const Header = styled(OrigHeader)`
  flex-basis: 30%;
`;

const Title = styled(OrigTitle)`
  flex-basis: 27%;
`;

const ActionsAndOptions = styled(OrigActionsAndOptions)`
  flex-basis: 43%;
`;

const Options = styled(OrigOptions)`
  flex-basis: 50%;
`;

const OptionTitle = styled.h4`
  margin: 0;
  margin-bottom: 6px;
`;

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
class Card extends Component {
  state = {
    saleOptions: {},
    rentOptions: {},
    loading: false,
    error: false,
  };

  toggleOption = (dealType, option) => {
    this.setState(prevState => ({
      [dealType]: {
        ...prevState[dealType],
        [option]: !prevState[dealType][option],
      },
    }));
  };

  togglePremium = (dealType) => {
    this.toggleOption(dealType, 'premium');
  };

  toggleTop3 = (dealType) => {
    this.toggleOption(dealType, 'top3');
  };

  handleChangeOfferKind = (e) => {
    this.setState({ offerKind: e.target.value, error: false });
  };

  handleAdd = () => {
    const { onSave, id } = this.props;
    const { saleOptions, rentOptions } = this.state;

    const isSaleOptionsExists = Object.keys(saleOptions).length > 0;
    const isRentOptionsExists = Object.keys(rentOptions).length > 0;

    this.setState({ loading: true });

    if (isSaleOptionsExists) {
      onSave({ id, offerKind: 'sale', ...saleOptions }).then(() => {
        this.setState({ loading: false });
      });
    }

    if (isRentOptionsExists) {
      onSave({ id, offerKind: 'rent', ...rentOptions }).then(() => {
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { id, item = {} } = this.props;
    const { saleOptions = {}, rentOptions = {}, loading } = this.state;

    const {
      location = {},
      specification = {},
      landDetails = {},
      images = [],
      saleOffer = {},
      rentOffer = {},
    } = item;

    const publicImages = images.filter(({ isPublic }) => !!isPublic);

    const areaSize = item.kind === 'land'
      ? `${landDetails.area} сот`
      : `${specification.area} м²`;

    const canAdd = Object.keys(saleOptions).length > 0
      || Object.keys(rentOptions).length > 0;

    return (
      <CardSt isLoading={loading}>
        <Header>
          <Image
            src={
              publicImages[0]
                ? `//images.rublevka.ru/${publicImages[0].id}-thumbnail-128`
                : placeholder
            }
            alt=""
          />
          <ID>
            <FormattedNumber value={id} />
          </ID>
          <Price>
            {saleOffer && (
              <FormattedNumber
                style="currency"
                maximumSignificantDigits={1}
                currency={saleOffer.currency}
                value={saleOffer.price}
              />
            )}
            <br />
            {rentOffer && (
              <SubTitle>
                <FormattedNumber
                  style="currency"
                  maximumSignificantDigits={1}
                  currency={rentOffer.currency}
                  value={rentOffer.price}
                />
                {' в мес'}
              </SubTitle>
            )}
          </Price>
        </Header>

        <Title>
          {`${kinds[item.kind]} ${areaSize}`}
          <SubTitle>
            {`${location.settlementName}, ${location.mkadDistance} км от МКАД`}
          </SubTitle>
        </Title>

        <ActionsAndOptions>
          <Options>
            {saleOffer && (
              <>
                <OptionTitle>Продажа</OptionTitle>
                <CheckboxLabel
                  onClick={() => this.toggleTop3('saleOptions')}
                  isActive={!!saleOptions.top3}
                >
                  топ-3
                </CheckboxLabel>
                <CheckboxLabel
                  onClick={() => this.togglePremium('saleOptions')}
                  isActive={!!saleOptions.premium}
                >
                  премиум
                </CheckboxLabel>
              </>
            )}
          </Options>

          <Options>
            {rentOffer && (
              <>
                <OptionTitle>Аренда</OptionTitle>
                <CheckboxLabel
                  onClick={() => this.toggleTop3('rentOptions')}
                  isActive={!!rentOptions.top3}
                >
                  топ-3
                </CheckboxLabel>
                <CheckboxLabel
                  onClick={() => this.togglePremium('rentOptions')}
                  isActive={!!rentOptions.premium}
                >
                  премиум
                </CheckboxLabel>
              </>
            )}
          </Options>

          <Actions>
            {loading && <Loading />}
            {!loading && (
              <ActionButton onClick={this.handleAdd} disabled={!canAdd}>
                <img src={iconAdd} alt="" />
              </ActionButton>
            )}
          </Actions>
        </ActionsAndOptions>
      </CardSt>
    );
  }
}

export default Card;
