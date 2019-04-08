import React, { Component } from 'react';
import global from 'window-or-global';

import { API } from 'core/config/sources';

import { connect } from 'react-redux';

// actions
import { updateFilter } from 'core/actions/filters';
import { push } from 'react-router-redux';

import popularSettlements from 'settlements/constants/popularSettlements';
import { nameToSlug } from 'core/helpers/nameToSlug';

import { resourceName } from 'core/settlements/constants/defaults';
import {
  dealTypesTranslit,
  kindsTranslit,
} from 'constants/properties/dictionaries';
import { kinds } from 'constants/places';

// styles
import UI from 'ui';

import {
  Wrapper,
  SearchWrapper,
  SearchButton,
  SearchInput,
  SearchIcon,
  Dropdown,
  DropdownTitle,
  DropdownLink,
} from './styled';

const { Form } = UI;

const group = 'forProperties';
const resource = `${resourceName}.${group}`;

function fbPixelDataSend() {
  fbq('track', 'Search');
}

function renderSearchResult(data) {
  const dealType = data.isSale ? 'sale' : 'rent';

  if (data.objectKlass === 'settlement') {
    return (
      <DropdownLink
        onClick={fbPixelDataSend()}
        to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(data.name)}_${
          data.id
        }`}
      >
        {data.name}
      </DropdownLink>
    );
  }
  return (
    <DropdownLink
      onClick={fbPixelDataSend()}
      to={`/zagorodnaya/${dealTypesTranslit[dealType]}/${
        kindsTranslit[data.kind]
      }/${data.id}`}
    >
      ID {data.id}, {kinds[data.kind].toLowerCase()} в посёлке «
      {data.settlementName}»
    </DropdownLink>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);

    this.state = { searchResults: [] };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.dispatch(push('/zagorodnaya/kottedzhnye-poselki'));
    fbPixelDataSend();
  }

  toggle(isOpened = !this.state.isOpened) {
    this.setState({ isOpened });
  }

  closeDropdown() {
    setTimeout(() => {
      this.toggle(false);
    }, 200);
  }

  openDropdown() {
    this.toggle(true);
  }

  handleQueryChange(e) {
    const { value } = e.target;

    this.setState({ name: value }, () => {
      this.props.dispatch(updateFilter(resource, { name: value }));
    });

    API.get(`/v1/search/similar?query=${value}&limit=5`).then(data =>
      this.setState({ searchResults: data.body.items }),
    );
  }

  render() {
    const popularForRoute = popularSettlements[global.config.domain];
    const {
      withoutBorder,
      withoutButton,
      fluidWidth,
      mobileRound,
    } = this.props;

    return (
      <Wrapper>
        <Form.Container onSubmit={this.onSubmit}>
          <SearchWrapper fluidWidth={fluidWidth}>
            <SearchIcon mobileRound={mobileRound} icon="lens" />
            <SearchInput
              block
              withoutBorder={withoutBorder}
              mobileRound={mobileRound}
              placeholder={this.props.placeholder}
              onFocus={this.openDropdown}
              onBlur={this.closeDropdown}
              onChange={this.handleQueryChange}
            />
            {!withoutButton && <SearchButton>Найти</SearchButton>}

            {this.state.isOpened && !this.state.name && (
              <Dropdown fluidWidth={fluidWidth}>
                <DropdownTitle>Популярные посёлки:</DropdownTitle>
                <div>
                  {Object.keys(popularForRoute).map(id => (
                    <DropdownLink
                      to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                        popularForRoute[id],
                      )}_${id}`}
                      key={id}
                    >
                      {popularForRoute[id]}
                    </DropdownLink>
                  ))}
                </div>
              </Dropdown>
            )}

            {this.state.isOpened && this.state.name && (
              <Dropdown>
                <DropdownTitle>Возможно, вы ищете:</DropdownTitle>
                {this.state.searchResults.map(data => renderSearchResult(data))}
              </Dropdown>
            )}
          </SearchWrapper>
        </Form.Container>
      </Wrapper>
    );
  }
}

// redux connectors
const mapStateToProps = state => ({
  filters: state.filters,
  pagination: state.pagination,
  order: state.order,
  settlements: state.settlements,
});

export default connect(mapStateToProps)(Search);
