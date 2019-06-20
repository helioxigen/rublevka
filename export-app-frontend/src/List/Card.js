/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';
import isEqual from 'lodash/isEqual';

import { CheckboxLabel, CardLoading } from '../UI';
import { kinds } from './dictionaries';

import {
  CardSt,
  Image,
  ID,
  Price,
  Title,
  SubTitle,
  Options,
  Actions,
  ActionButton,
  Header,
  ActionsAndOptions,
} from './styled';

import iconDelete from './img/icon-delete.svg';
import iconClose from './img/icon-close.png';
import placeholder from './img/placeholder.jpg';

import roundLastNDigits from '../Utils/roundLastNDigits';

export default class extends Component {
  state = {
    /* eslint-disable react/destructuring-assignment */
    top3: this.props.top3,
    premium: this.props.premium,
    /* eslint-enable react/destructuring-assignment */
    loading: false,
    confirmDelete: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.setState({
        top3: nextProps.top3,
        premium: nextProps.premium,
      });
    }
  }

  toggleOption = option => {
    const { docID, id, offerKind, onSave } = this.props;

    this.setState(
      prevState => ({ [option]: !prevState[option], loading: true }),
      () => {
        const { top3, premium } = this.state;

        return onSave(docID, {
          id,
          offerKind,
          top3,
          premium,
        }).then(() => this.setState({ loading: false }));
      },
    );
  };

  togglePremium = () => {
    this.toggleOption('premium');
  };

  toggleTop3 = () => {
    this.toggleOption('top3');
  };

  toggleDeleteConfirm = () => {
    this.setState(state => ({ confirmDelete: !state.confirmDelete }));
  };

  /* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
  render() {
    const { docID, id, offerKind, onDelete, data = {} } = this.props;

    const { top3, premium, loading, confirmDelete } = this.state;

    const {
      location = {},
      specification = {},
      landDetails = {},
      images = [],
    } = data;

    const areaSize =
      data.kind === 'land'
        ? `${landDetails.area} сот`
        : `${specification.area} м²`;

    const { price, currency } = data[`${offerKind}Offer`] || {};

    return (
      <CardSt isLoading={loading}>
        <Header>
          <Image
            src={
              images[0]
                ? `//images.jqestate.ru/${images[0].id}-thumbnail-128`
                : placeholder
            }
            alt=""
          />
          <ID>{id}</ID>
          <Price>
            <FormattedNumber
              style="currency"
              // maximumSignificantDigits={1}
              maximumFractionDigits={0}
              minimumFractionDigits={0}
              currency={currency}
              value={roundLastNDigits(price, 3)}
            />
          </Price>
        </Header>

        <Title>
          {`${kinds[data.kind]} ${areaSize}`}
          <SubTitle>
            {`${location.settlementName}, ${location.mkadDistance} км от МКАД`}
          </SubTitle>
        </Title>

        <ActionsAndOptions>
          <Options>
            <CheckboxLabel onClick={this.toggleTop3} isActive={!!top3}>
              топ-3
            </CheckboxLabel>
            <CheckboxLabel onClick={this.togglePremium} isActive={!!premium}>
              премиум
            </CheckboxLabel>
          </Options>

          <Actions>
            {loading && <CardLoading />}
            {!loading &&
              (confirmDelete ? (
                <>
                  <ActionButton
                    onClick={() => onDelete(docID, { id, offerKind })}
                  >
                    <img src={iconDelete} alt="" />
                  </ActionButton>
                  <ActionButton onClick={this.toggleDeleteConfirm}>
                    <img src={iconClose} alt="" />
                  </ActionButton>
                </>
              ) : (
                <ActionButton onClick={this.toggleDeleteConfirm}>
                  <img src={iconDelete} alt="" />
                </ActionButton>
              ))}
          </Actions>
        </ActionsAndOptions>
      </CardSt>
    );
  }
}
