import React, { Component } from 'react';

import styled from 'styled-components';

import Sell from './Sell';
import PropertyNumber from './PropertyNumber';
import Rent from './Rent';
import Countries from './Countries';
import media from 'site/styles/media';
import UI from 'site/ui';

const {
  Grid: { Col },
} = UI;

const Wrapper = styled.div`
  margin: 0 -15px;
  ${media.xs`
    margin: 0;
  `}
`;

const TabSelector = styled.div`
  display: flex;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  outline: none;
  white-space: nowrap;
  line-height: 19px;
  font-size: 16px;
  font-weight: bold;
  padding: 0;
  border: none;
  background: none;
  color: #232323;
  margin-right: 25px;
  opacity: ${({ selected }) => (selected ? 1 : 0.8)};
  padding-bottom: ${({ selected }) => (selected ? '10px' : '12px')};
  border-bottom: ${({ selected }) => (selected ? '2px solid #F44336' : 'none')};

  ${media.xs`
    margin: 0;
    margin-right: 30px;
    padding-bottom: ${({ selected }) => (selected ? '14px' : '17px')};
    line-height: 21px;
    font-size: 18px;
    font-weight: normal;
    color: #ffffff;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
    
    border-bottom: ${({ selected }) => (selected ? '3px solid #ffffff' : 'none')};
  `}

  ${media.lg`
    padding-bottom: ${({ selected }) => (selected ? '16px' : '19px')};

    &:hover {
      border-bottom: 3px solid #ffffff;
      padding-bottom: 16px;
    }
  `}
`;

const Divider = styled.hr`
  margin: 0;
  margin-top: -1px;
  background: linear-gradient(90deg, #eeeeee 0%, rgba(255, 255, 255, 0.05) 100%);
  margin-bottom: 25px;
`;

export default class Form extends Component {
  state = { selectedTab: 'sell' };

  navigate = (link, type, values) => {
    const { actions, history } = this.props;

    actions.updateFilter(type, values);
    history.push(link);
  };

  render() {
    const { selectedTab } = this.state;

    return (
      <Col mdOffset="1" xs="12" md="10">
        <Wrapper>
          <TabSelector>
            <Tab
              selected={selectedTab === 'number'}
              onClick={() => this.setState({ selectedTab: 'number' })}
            >
              Номер объекта
            </Tab>
            <Tab
              selected={selectedTab === 'sell'}
              onClick={() => this.setState({ selectedTab: 'sell' })}
            >
              Продажа
            </Tab>
            <Tab
              selected={selectedTab === 'rent'}
              onClick={() => this.setState({ selectedTab: 'rent' })}
            >
              Аренда
            </Tab>
            <Tab
              selected={selectedTab === 'countries'}
              onClick={() => this.setState({ selectedTab: 'countries' })}
            >
              Посёлки
            </Tab>
          </TabSelector>
          <Divider />
          {selectedTab === 'number' && <PropertyNumber navigate={this.navigate} />}
          {selectedTab === 'sell' && <Sell navigate={this.navigate} />}
          {selectedTab === 'rent' && <Rent navigate={this.navigate} />}
          {selectedTab === 'countries' && <Countries navigate={this.navigate} />}
        </Wrapper>
      </Col>
    );
  }
}
