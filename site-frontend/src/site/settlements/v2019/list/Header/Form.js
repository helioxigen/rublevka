import React, { Component } from 'react';
import styled from 'styled-components';

import Downshift from 'downshift';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { updateFilter } from '../../../../../core/actions/filters';
import { updatePagination } from '../../../../../core/actions/pagination';

import { API } from '../../../../../core/config/sources';

import popularSettlements from '../../../constants/popularSettlements';
import { nameToSlug } from '../../../../../core/helpers/nameToSlug';

import {
  Form,
  Wrapper,
  Input as BaseInput,
  Dropdown as BaseDropdown,
  Selector,
  SelectorName,
  SelectorValue,
  Options,
  Option,
  Search,
} from '../../../../Landing/Satellites/Form/styled';
import media from '../../../../styles/media';

const resource = 'settlements.byLetter';
const popularForRoute = popularSettlements[global.config.domain];

const intervals = [
  { name: 'Любое', value: { min: null, max: null } },
  { name: 'До 10 км', value: { min: null, max: 10 } },
  { name: 'До 15 км', value: { min: null, max: 15 } },
  { name: 'До 20 км', value: { min: null, max: 20 } },
  { name: 'От 20 км', value: { min: 20, max: null } },
];

const InputWrapper = styled.div`
  margin: 0 4px;
  margin-top: 8px;
  position: relative;
  flex-grow: 1;

  ${media.md`
    margin: 0;
  `}
`;

const Input = styled(BaseInput)`
  min-height: 100%;
  min-width: 100%;
  margin: 0px;

  ${media.md`
    &:last-child {
      border-radius: 12px 0px 0px 12px;
    }
  `}
`;

const InputDropdown = styled.div`
  padding: 8px 12px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 60px;
  z-index: 1;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  ${media.md`
    top: 70px;
  `}
`;

const Dropdown = styled(BaseDropdown)`
  flex-basis: 100%;

  ${media.md`
    flex-basis: 33.3333333%;
  `}
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 8px 0px;
  line-height: 15px;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;

  color: #232323;

  &:hover {
    cursor: pointer;
    color: #f44336;
  }
`;

class FormClass extends Component {
  state = {
    name: '',
    mkadDistance: intervals[0],
    isDropdownOpen: false,
    searchResults: null,
  };

  componentWillMount() {
    const { [resource]: filters = {} } = this.props.filters;

    if (filters.name) {
      this.setState({ name: filters.name });
    }

    if (filters.mkadDistance) {
      const mkadDistance = intervals.find(
        i => i.value === filters.mkadDistance,
      );

      this.setState({ mkadDistance: mkadDistance || intervals[0] });
    }
  }

  handleQueryChange = (value) => {
    this.setState({ name: value });

    API.get(`/v1/search/similar?query=${value}&limit=5`).then(data => this.setState({ searchResults: data.body.items }));
  };

  search = () => {
    const { name, mkadDistance } = this.state;

    this.props.dispatch(updatePagination(resource, { offset: 0 }));
    this.props.dispatch(
      updateFilter(resource, { name, mkadDistance: mkadDistance.value }),
    );
  };

  renderSearchResult = (data) => {
    if (data.objectKlass === 'settlement') {
      return (
        <DropdownLink
          to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(data.name)}_${
            data.id
          }`}
        >
          {data.name}
        </DropdownLink>
      );
    }

    return null;
  };

  closeDropdown = () => {
    setTimeout(() => this.setState({ isDropdownOpen: false }), 200);
  };

  render() {
    const {
      name, mkadDistance, isDropdownOpen, searchResults,
    } = this.state;

    return (
      <Wrapper>
        <Form>
          <InputWrapper>
            <Input
              autoComplete="off"
              type="text"
              name="number"
              placeholder="Введите название посёлка"
              value={name}
              onChange={e => this.handleQueryChange(e.target.value)}
              onFocus={() => this.setState({ isDropdownOpen: true })}
              onBlur={this.closeDropdown}
            />
            {isDropdownOpen && (
              <InputDropdown>
                {name === '' || !searchResults
                  ? Object.keys(popularForRoute).map(id => (
                    <DropdownLink
                      to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                        popularForRoute[id],
                      )}_${id}`}
                      key={id}
                    >
                      {popularForRoute[id]}
                    </DropdownLink>
                  ))
                  : searchResults.map(this.renderSearchResult)}
              </InputDropdown>
            )}
          </InputWrapper>
          <Downshift
            onChange={item => this.setState({ mkadDistance: item })}
            itemToString={item => `${item.name}`}
            initialSelectedItem={mkadDistance}
          >
            {({
              getToggleButtonProps,
              isOpen,
              selectedItem,
              getRootProps,
              getMenuProps,
              getItemProps,
              selectItem,
            }) => (
              <Dropdown
                isOpen={isOpen}
                {...getRootProps({ refKey: 'innerRef' })}
              >
                <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                  <SelectorName>от мкад</SelectorName>
                  <SelectorValue>{selectedItem.name}</SelectorValue>
                </Selector>
                {isOpen && (
                  <Options
                    isResetButtonActive={selectedItem !== intervals[0]}
                    resetButtonCallback={() => selectItem(intervals[0])}
                    getToggleButtonProps={getToggleButtonProps}
                    getMenuProps={getMenuProps}
                  >
                    {Object.values(intervals).map((item, index) => (
                      <Option
                        {...getItemProps({
                          key: item.name,
                          index,
                          item,
                        })}
                        selected={selectedItem.value === item.value}
                      >
                        {item.name}
                      </Option>
                    ))}
                  </Options>
                )}
              </Dropdown>
            )}
          </Downshift>
        </Form>
        <Search onClick={this.search} />
      </Wrapper>
    );
  }
}

// redux connectors
const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(FormClass);
