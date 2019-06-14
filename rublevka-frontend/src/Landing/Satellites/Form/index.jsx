import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { connect } from 'react-redux';

import Sell from './Sell';
import PropertyNumber from './PropertyNumber';
import Rent from './Rent';
import Settlements from './Settlements';
import media from '../../../styles/media';
import UI from '../../../ui/v2019';

const {
  Grid: { Col },
} = UI;

const Wrapper = styled.div`
  margin: 0 -10px;
  ${media.xs`
    margin: 0;
  `}

  ${media.md`
    transform: translateY(-50%);
  `}
`;

const Tab = styled.button`
  outline: none;
  white-space: nowrap;
  line-height: 19px;
  font-size: 16px;
  font-weight: 500;
  padding: 0;
  border: none;
  background: none;
  margin: 0;
  color: #232323;
  margin-bottom: 0;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  padding-bottom: 16px;

  border-bottom: 2px solid transparent;

  ${({ selected }) =>
    !selected &&
    css`
      &:hover {
        border-bottom-color: #f44336;
      }
    `}

  ${({ objectNumber }) => objectNumber && 'display: none'};

  ${media.xs`
    ${({ objectNumber }) => objectNumber && 'display: block'};
    margin: 0;
    opacity: ${({ selected }) => (selected ? 1 : 0.8)};
    padding-bottom: 14px;
    line-height: 21px;
    font-size: 18px;
    font-weight: normal;
    color: #ffffff;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);
    
    border-bottom: 3px solid transparent;

    ${({ selected }) =>
      !selected &&
      css`
        &:hover {
          border-bottom-color: #ffffff;
        }
      `}

  `}

  ${media.lg`
    padding-bottom: 16px;
  `}
`;

const TabUnderline = styled.span`
  border-bottom: 2px solid #f44336;
  position: absolute;

  ${media.xs`
    border-bottom: 3px solid #fff;
  `}

  transition: 0.3s;

  height: 100%;
`;

const TabSelector = styled.div`
  display: flex;
  overflow-x: scroll;
  position: relative;

  max-width: 520px;

  justify-content: space-between;

  ${Tab}, ${TabUnderline} {
    width: 26%;

    ${media.xs`
      width: 100px;    
    `}
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.div`
  min-height: 1px;
  min-width: 100%;
  background: #d8d8d8;

  margin: -1px -15px 25px;

  ${media.xs`
    margin: -1px 0 25px;
    background: linear-gradient(
      90deg,
      #eeeeee 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
  `}
`;

class Form extends Component {
  state = { selectedTab: 'sell', underlinePosition: 0 };

  navigate = (link, type, values) => {
    const { actions, history } = this.props;

    actions.updateFilter(type, values);
    history.push(link);
  };

  handleSelectTab = name => e => {
    const offset = e.target.offsetLeft;
    const parentWidth = e.target.parentElement.offsetWidth;

    const pos = (offset / parentWidth) * 100;

    this.setState({ selectedTab: name, underlinePosition: pos });
  };

  render() {
    const {
      displayOptions: { currency },
    } = this.props;
    const { selectedTab, underlinePosition } = this.state;

    return (
      <Col mdOffset="1" xs="12" md="10">
        <Wrapper>
          <TabSelector>
            <TabUnderline style={{ left: `${underlinePosition}%` }} />
            <Tab
              objectNumber
              selected={selectedTab === 'number'}
              onClick={this.handleSelectTab('number')}
            >
              № объекта
            </Tab>
            <Tab
              selected={selectedTab === 'sell'}
              onClick={this.handleSelectTab('sell')}
            >
              Продажа
            </Tab>
            <Tab
              selected={selectedTab === 'rent'}
              onClick={this.handleSelectTab('rent')}
            >
              Аренда
            </Tab>
            <Tab
              selected={selectedTab === 'settlements'}
              onClick={this.handleSelectTab('settlements')}
            >
              Посёлки
            </Tab>
          </TabSelector>
          <Divider />
          {selectedTab === 'number' && (
            <PropertyNumber navigate={this.navigate} />
          )}
          {selectedTab === 'sell' && (
            <Sell currency={currency} navigate={this.navigate} />
          )}
          {selectedTab === 'rent' && (
            <Rent currency={currency} navigate={this.navigate} />
          )}
          {selectedTab === 'settlements' && (
            <Settlements navigate={this.navigate} />
          )}
        </Wrapper>
      </Col>
    );
  }
}

const pickState = state => {
  const { displayOptions } = state;

  return { displayOptions };
};

export default connect(pickState)(Form);
