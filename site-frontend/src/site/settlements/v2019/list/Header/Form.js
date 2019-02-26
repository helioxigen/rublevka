import React, { Component } from 'react';
import styled from 'styled-components';
import Downshift from 'downshift';

import { connect } from 'react-redux';

import { updateFilter } from 'core/actions/filters';
import { updatePagination } from 'core/actions/pagination';

import {
  Form,
  Wrapper,
  Input,
  Dropdown,
  Selector,
  SelectorName,
  SelectorValue,
  Options,
  Option,
  SearchIcon,
} from 'site/Landing/Satellites/Form/styled';

import media from 'site/styles/media';

const SearchContainer = styled.button`
  margin-top: 16px;
  padding: 19px 0px;
  background: #f44336;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;

  ${media.md`
    margin: 0;
    padding: 0;
    flex-basis: 16.777777%;
    margin-left: 8px;
  `}
`;

const Text = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  margin-top: 2px;
  margin-left: 5px;

  ${media.md`
    font-size: 17px;
    font-weight: normal;
  `}
`;

const resource = 'settlements.byLetter';

const intervals = [
  { name: 'До 5 км', value: { min: null, max: 5 } },
  { name: 'До 10 км', value: { min: null, max: 10 } },
  { name: 'До 15 км', value: { min: null, max: 15 } },
  { name: 'До 20 км', value: { min: null, max: 20 } },
  { name: 'От 20 км', value: { min: 20, max: null } },
];

class FormClass extends Component {
  state = { name: '', mkadDistance: intervals[0] };

  componentWillMount() {
    const { [resource]: filters = {} } = this.props.filters;

    if (filters.name) {
      this.setState({ name: filters.name });
    }

    if (filters.mkadDistance) {
      const mkadDistance = intervals.find(i => i.value === filters.mkadDistance);

      this.setState({ mkadDistance: mkadDistance || intervals[0] });
    }
  }

  search = () => {
    const { name, mkadDistance } = this.state;

    this.props.dispatch(updatePagination(resource, { offset: 0 }));
    this.props.dispatch(updateFilter(resource, { name, mkadDistance: mkadDistance.value }));
  }

  render() {
    const { name, mkadDistance } = this.state;

    return (
      <Wrapper>
        <Form>
          <Input
            type="text"
            name="number"
            placeholder="Введите название посёлка"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
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
              <Dropdown isOpen={isOpen} {...getRootProps({ refKey: 'innerRef' })}>
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
        <SearchContainer onClick={this.search}>
          <SearchIcon alt="Search icon" />
          <Text>найти</Text>
        </SearchContainer>
      </Wrapper>
    );
  }
}

// redux connectors
const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(FormClass);
