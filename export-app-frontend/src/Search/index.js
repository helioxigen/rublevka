import React, { Component } from 'react';
import styled from 'styled-components';
import Form from './Form';
import Card from './Card';
import { addOrUpdate, addToHistory } from '../List/requests';
import getItemsFromAPI from '../requests/getItemsFromAPI';

const Search = styled.section`
  margin-bottom: 24px;
`;

const Section = styled.section`
  background-color: #fff;
  padding: 0 24px;
  box-shadow: 0px 3px 8px #eaeaea;
  border: 1px solid #eaeaea;
  border-radius: 0 0 4px 4px;
  margin-top: -2px;
`;

export default class extends Component {
  state = {
    items: [],
    itemsLoading: false,
    itemsError: false,
    search: '',
  };

  handleChangeSearch = ({ target }) => {
    const { value } = target;
    if (/^[\d\s,]+$/.test(value) || value === '') {
      this.setState({
        search: value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { search } = this.state;

    this.setState({ itemsLoading: true, itemsError: false });

    getItemsFromAPI(search)
      .then(({ items }) => {
        this.setState({ items });
      })
      .catch(() => {
        this.setState({ itemsError: true, items: [] });
      })
      .finally(() => {
        this.setState({ itemsLoading: false });
      });
  };

  onSave = ({ top3 = null, premium = null, ...data }) => {
    const { user } = this.props;
    const item = {
      ...data,
      top3,
      premium,
      user,
    };

    return addOrUpdate(item)
      .then(() => addToHistory(item))
      .then(() => {
        this.setState(state => ({
          items: state.items.filter(i => i.id !== data.id),
        }));
      });
  };

  render() {
    const {
      search, items, itemsLoading, itemsError,
    } = this.state;

    const loaded = !itemsLoading && !itemsError && items.length > 0;

    return (
      <Search>
        <Form
          onChange={this.handleChangeSearch}
          onSubmit={this.handleSubmit}
          value={search}
          disabled={itemsLoading}
        />
        {itemsError && 'Ошибка загрузки'}
        {loaded && (
          <Section>
            {items.map(item => (
              <Card
                item={item}
                onSave={this.onSave}
                id={item.id}
                key={item.id}
              />
            ))}
          </Section>
        )}
      </Search>
    );
  }
}
