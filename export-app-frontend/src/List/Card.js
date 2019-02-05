import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { FormattedNumber } from 'react-intl';
import Loader from 'react-loader-spinner';
import isEqual from 'lodash/isEqual';

import { Button, CheckboxLabel } from '../UI';
import deleteItem from './requests/deleteItem';
import updateItem from './requests/updateItem';
import { kinds } from './dictionaries';

import iconDelete from './icon-delete.svg';
import placeholder from './placeholder.jpg';

export const CardSt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;

  border-bottom: 1px solid #edeff5;

  ${p => p.isLoading
    && css`
      background-color: #a1ecc7;
      margin: 0 -24px;
      padding: 16px 24px;
    `}

  &:last-child {
    border-bottom-color: transparent;
  }
`;

export const Image = styled.img`
  max-height: 48px;
  margin-right: 16px;
  width: 96px;
  object-fit: cover;
  border-radius: 4px;
`;

export const ID = styled.div`
  flex-basis: 8%;
  font-weight: bold;
`;

export const Price = styled.div`
  flex-basis: 17%;
`;

export const Title = styled.div`
  flex-basis: 50%;
  font-weight: bolder;
`;

export const SubTitle = styled.p`
  color: #adadad;
  margin: 6px 0 0;
  font-weight: normal;
`;

export const Options = styled.div`
  flex-basis: 20%;
`;

export const Actions = styled.div`
  flex-basis: 5%;
  text-align: right;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;

  img {
    height: 28px;
    vertical-align: middle;
  }
`;

export function Loading() {
  return <Loader type="Puff" color="#33b373" height={28} width={28} />;
}

export default class extends Component {
  state = {
    /* eslint-disable react/destructuring-assignment */
    top3: this.props.top3,
    premium: this.props.premium,
    /* eslint-enable */
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

  toggleOption = (option) => {
    this.setState(
      prevState => ({ [option]: !prevState[option] }),
      this.handleUpdate,
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

  handleDelete = () => {
    const { docID } = this.props;

    deleteItem(docID);
  };

  handleUpdate = () => {
    const { docID } = this.props;
    const { top3, premium } = this.state;

    this.setState({ loading: true });

    updateItem(docID, { top3, premium }).then(() => {
      this.setState({ loading: false });
    });
  };

  /* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
  render() {
    const { id, offerKind, data = {} } = this.props;
    const {
      top3, premium, loading, confirmDelete,
    } = this.state;

    const {
      location = {},
      specification = {},
      landDetails = {},
      images = [],
    } = data;

    const areaSize = data.kind === 'land'
      ? `${landDetails.area} сот`
      : `${specification.area} м²`;

    const { price, currency } = data[`${offerKind}Offer`] || {};

    return (
      <CardSt isLoading={loading}>
        <Image
          src={
            images[0]
              ? `//images.jqestate.ru/${images[0].id}-thumbnail-128`
              : placeholder
          }
          alt=""
        />
        <ID>
          <FormattedNumber value={id} />
        </ID>
        <Price>
          <FormattedNumber
            style="currency"
            maximumSignificantDigits={1}
            currency={currency}
            value={price}
          />
        </Price>
        <Title>
          {`${kinds[data.kind]} ${areaSize}`}
          <SubTitle>
            {`${location.settlementName}, ${location.mkadDistance} км от МКАД`}
          </SubTitle>
        </Title>

        <Options>
          <CheckboxLabel onClick={this.toggleTop3} isActive={!!top3}>
            топ-3
          </CheckboxLabel>
          <CheckboxLabel onClick={this.togglePremium} isActive={!!premium}>
            премиум
          </CheckboxLabel>
        </Options>

        <Actions>
          {loading && <Loading />}
          {!loading
            && (confirmDelete ? (
              <>
                <Button onClick={this.handleDelete}>Да</Button>
                <Button onClick={this.toggleDeleteConfirm}>Нет</Button>
              </>
            ) : (
              <ActionButton onClick={this.toggleDeleteConfirm}>
                <img src={iconDelete} alt="" />
              </ActionButton>
            ))}
        </Actions>
      </CardSt>
    );
  }
}
