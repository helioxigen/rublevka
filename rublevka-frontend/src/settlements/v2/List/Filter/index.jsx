import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedNumber } from 'react-formatted';

// actions
import { updateFilter, removeFilter, resetFilter } from 'core/actions/filters';
import { updatePagination } from 'core/actions/pagination';

import UI from 'ui';

import Routes from './Routes';
import Distance from './Distance';
import Selected from './Selected';

import { resourceName } from 'core/settlements/constants/defaults';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Grid: { Container, Row },
  Button,
  CountIndicator,
  BtnGroup,
  Icon,
} = UI;

const Wrapper = styled.section`
  min-height: 100%;
  padding: 2.5rem 0 1rem;

  ${media.md`
    padding-top: 3.5rem;
    padding-bottom: 4rem;
  `};
`;

const Title = styled.div`
  margin: 1rem 2rem 0.2rem;
  font-size: 1.8rem;
  color: ${p => p.theme.brandBlack};
  font-weight: 500;
  line-height: 1;

  ${media.sm`
    margin: 0.8rem 2rem 0;
  `};
`;

const FiltersWrapper = styled.div`
  position: fixed;
  top: 0;
  left: -100%;
  bottom: 0;
  right: 0;
  z-index: 999;
  overflow-y: scroll;
  width: 100%;
  padding: 7.8rem 1rem;
  background: ${p => p.theme.brandWhite};
  transition: 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  ${p =>
    p.isViewOpen &&
    `
    left: 0;
  `} ${media.xs`
    right: unset;
    width: 34rem;
    ${p =>
      p.isViewOpen &&
      `
      left: 0;
    `}
  `};
`;

const Overlay = styled.div`
  opacity: 0;
  ${p =>
    p.isViewOpen &&
    `
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 998;
      background: rgba(0, 0, 0, .6);
      opacity: 1;
      transition: opacity .35s linear;
  `};
`;

const BtnShowResults = styled(Button)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  left: -100%;
  z-index: 9999;
  width: calc(100% - 4rem);
  padding: 1.8rem 0;
  border-radius: 10rem;
  transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  &:hover {
    z-index: 9999;
  }
  ${p =>
    p.isViewOpen &&
    `
    left: 2rem;
  `} ${media.xs`
    z-index: 5;
    left: -34rem;
    width: 28rem;
    padding: 1.6rem 0;
    font-size: 1.5rem;
    ${p =>
      p.isViewOpen &&
      `
      left: 2rem;
    `};
  `};
`;

const StBtnGroup = styled(BtnGroup)`
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 9999;
  display: flex;
  width: 100%;
  background: ${p => p.theme.brandWhite};
  border-bottom: 1px solid #eeeeee;
  transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  ${p =>
    p.isViewOpen &&
    `
    left: 0;
  `} ${media.xs`
    left: -34rem;
    width: 34rem;
    padding-left: 1rem;
    ${p =>
      p.isViewOpen &&
      `
      left: 0;
    `};
  `};
`;

const ResetBtn = styled(Button)`
  padding: 2.6rem 2rem;
  text-align: left;
  font-size: 1.8rem;
  color: #c4c4c4;
  border: none;
  &:hover,
  &:focus {
    background: transparent;
    color: #c4c4c4;
  }

  ${media.sm`
    padding: 2.6rem 2rem 2rem;
    font-size: 1.4rem;
  `};

  ${p =>
    p.filterCount &&
    `
      color: #ff4c4e;
  `};
`;

const CloseBtn = styled(Button)`
  background: #fff;
  border: none;
  outline: none;
  width: 6rem;
  padding-right: 2rem;

  &:hover,
  &:active,
  &:focus {
    background: transparent;
  }
`;

const StIcon = styled(Icon)`
  width: 3rem;
  height: 3rem;
  vertical-align: text-bottom;
  fill: ${p => p.theme.greyBlue};
  cursor: pointer;
`;

const group = 'forProperties';
const resource = `${resourceName}.${group}`;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { isViewOpen: false };

    this.updateFilter = this.updateFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ isViewOpen: false });
  }

  toggleView() {
    this.setState(prevState => ({
      isViewOpen: !prevState.isViewOpen,
    }));
  }

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.dispatch(updatePagination(resource, { offset: 0 }));
    this.props.dispatch(updateFilter(resource, values));
  }

  removeFilter(key, value) {
    this.props.dispatch(removeFilter(resource, key, value));
  }

  resetFilter() {
    this.props.dispatch(resetFilter(resource));
  }

  renderFilters() {
    const state = this.props.filters[resource];
    return (
      <div>
        <Title>Направление</Title>
        <Routes
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />

        <Title>От МКАД</Title>
        <Distance
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />
      </div>
    );
  }

  render() {
    const state = this.props.filters[resource];
    const { count } = this.props;
    const { isViewOpen } = this.state;

    return (
      <Wrapper>
        <Container>
          <Row xs="center">
            <Selected
              selected={state}
              updateFilter={this.updateFilter}
              removeFilter={this.removeFilter}
              resetFilter={this.resetFilter}
              isViewOpen={this.state.isViewOpen}
              toggle={this.toggleView}
              onClose={this.onClose}
            />
          </Row>
        </Container>
        <Overlay
          ref="overlay"
          isViewOpen={isViewOpen}
          onClick={this.toggleView}
        />

        <StBtnGroup isViewOpen={isViewOpen}>
          <ResetBtn
            filterCount={count >= 1}
            size="md"
            block
            disabled={!count}
            onClick={this.resetFilter}
          >
            Сбросить фильтр
          </ResetBtn>

          <CloseBtn size="md" block onClick={this.toggleView}>
            <StIcon icon="times" />
          </CloseBtn>
        </StBtnGroup>

        <FiltersWrapper isViewOpen={isViewOpen}>
          {this.renderFilters()}

          <BtnShowResults
            isViewOpen={isViewOpen}
            kind="primary"
            block
            size="lg"
            onClick={this.toggleView}
            disabled={!count}
          >
            {count ? 'Показать' : 'Нет'} <FormattedNumber value={count} />{' '}
            <CountIndicator
              count={count}
              declensionForms={['объект', 'объекта', 'объектов']}
              numberHidden
            />
          </BtnShowResults>
        </FiltersWrapper>
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

export default connect(mapStateToProps)(Filter);
