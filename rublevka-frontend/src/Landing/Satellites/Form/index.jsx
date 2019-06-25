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
  font-weight: 700;
  padding: 0;
  border: none;
  background: none;
  margin: 0;
  color: #232323;
  margin-bottom: 0;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  padding-bottom: 16px;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    transition: 0.6s;
    border-bottom: 2px solid transparent;
    bottom: 0;
    ${media.xs`
      border-bottom: 3px solid transparent;
    `}
  }

  ${({ selected }) =>
    !selected &&
    css`
      &:hover::before {
        border-bottom-color: #f44336;
      }
    `}

  ${({ objectNumber }) => objectNumber && 'display: none'};

  ${media.xs`
    ${({ objectNumber }) => objectNumber && 'display: block'};
    margin: 0;
    opacity: ${({ selected }) => (selected ? 1 : 0.8)};
    padding-bottom: 17px;
    line-height: 21px;
    font-size: 18px;
    font-weight: normal;
    color: #ffffff;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.35);

    ${({ selected }) =>
      !selected &&
      css`
        &:hover::before {
          border-bottom-color: #ffffff;
        }
      `}

  `}

  ${media.lg`
    padding-bottom: 16px;
  `}
`;

const TabUnderline = styled.span`
  position: absolute;

  display: ${({ mobile }) => (mobile ? 'block' : 'none')};

  ${media.xs`
      display: ${({ mobile }) => (mobile ? 'none' : 'block')};
  `}

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid #f44336;
    ${media.xs`
      border-bottom: 3px solid #fff;
    `}
  }

  transition: 0.3s;

  height: 100%;
`;

const TabSelector = styled.div`
  display: flex;
  overflow-x: scroll;
  position: relative;

  margin: 0 -25px;

  max-width: 590px;

  ${Tab}::before {
    right: 25px;
    left: 25px;
  }

  ${Tab}, ${TabUnderline} {
    width: 33%;
    padding-left: 25px;
    padding-right: 25px;

    ${media.xs`
      width: 25%;
    `}
  }

  ${media.xs`
    /* margin: 0 -4%; */
  `}

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
  state = { selectedTab: 'sell', selectedIndex: 1 };

  navigate = (link, type, values) => {
    const { actions, history } = this.props;

    actions.updateFilter(type, values);
    history.push(link);
  };

  handleSelectTab = (name, idx) => e => {
    this.setState({ selectedTab: name, selectedIndex: idx });
  };

  render() {
    const {
      displayOptions: { currency },
    } = this.props;
    const { selectedTab, selectedIndex } = this.state;

    return (
      <Col mdOffset="1" xs="12" md="10">
        <Wrapper>
          <TabSelector>
            <TabUnderline
              style={{ transform: `translateX(${selectedIndex * 100}%)` }}
            />
            <TabUnderline
              mobile
              style={{ transform: `translateX(${(selectedIndex - 1) * 100}%)` }}
            />
            <Tab
              objectNumber
              selected={selectedTab === 'number'}
              onClick={this.handleSelectTab('number', 0)}
            >
              № объекта
            </Tab>
            <Tab
              ref={ref => (this.initialTab = ref)}
              selected={selectedTab === 'sell'}
              onClick={this.handleSelectTab('sell', 1)}
            >
              Продажа
            </Tab>
            <Tab
              selected={selectedTab === 'rent'}
              onClick={this.handleSelectTab('rent', 2)}
            >
              Аренда
            </Tab>
            <Tab
              selected={selectedTab === 'settlements'}
              onClick={this.handleSelectTab('settlements', 3)}
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
