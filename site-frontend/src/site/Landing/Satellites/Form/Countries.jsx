import React, { Component } from 'react';
import Downshift from 'downshift';

import {
  Wrapper,
  Input,
  Form,
  Dropdown,
  Selector,
  SelectorName,
  SelectorValue,
  Options,
  Option,
  Search,
} from './styled';

const intervals = [
  { name: 'Любое', value: { min: null, max: null } },
  { name: 'До 10 км', value: { min: null, max: 10 } },
  { name: 'До 15 км', value: { min: null, max: 15 } },
  { name: 'До 20 км', value: { min: null, max: 20 } },
  { name: 'От 20 км', value: { min: 20, max: null } },
];

export default class extends Component {
  state = { name: '', mkadDistance: intervals[0].value };

  render() {
    const { name, mkadDistance } = this.state;
    const { navigate } = this.props;

    return (
      <Wrapper>
        <Form>
          <Input
            type="text"
            name="name"
            placeholder="Введите название посёлка"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Downshift
            onChange={item => this.setState({ mkadDistance: item.value })}
            itemToString={item => `${item}`}
            initialSelectedItem={intervals[0]}
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
                        selected={selectedItem.name === item.name}
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
        <Search
          onClick={() =>
            navigate('zagorodnaya/kottedzhnye-poselki', 'settlements.byLetter', {
              name,
              mkadDistance,
            })
          }
        />
      </Wrapper>
    );
  }
}
