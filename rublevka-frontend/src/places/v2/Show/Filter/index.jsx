import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedNumber } from 'react-formatted';

// actions
import { updateFilter, removeFilter, resetFilter } from 'core/actions/filters';
import { updatePagination } from 'core/actions/pagination';
import { push } from 'react-router-redux';

import UI from 'ui';

import FilterHelper from 'core/decorators/filter';
import { nameToSlug } from 'core/helpers/nameToSlug';

import FilterBtn from 'components/FilterBtn';
import Kind from './Kind';
import Distance from 'countryProperties/v2/List/Filter/Distance';
import Price from 'countryProperties/v2/List/Filter/Price';
import Areas from 'countryProperties/v2/List/Filter/Areas';
import Renovate from 'countryProperties/v2/List/Filter/Renovate';
import Selected from 'countryProperties/v2/List/Filter/Selected';

import { HideXsSm } from 'styles/mediaUtils';

import { dealTypes, kindsTranslit } from 'constants/properties/dictionaries';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Grid: { Row, Col },
  Button,
  CountIndicator,
  BtnGroup,
  Icon,
} = UI;

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
  transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  ${p =>
    p.isViewOpen &&
    `
    left: 0;
  `};

  ${media.xs`
    right: unset;
    left: -34rem;
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

const DealTypeBtn = styled(Button)`
  width: 50%;
  border: 1px solid ${p => p.theme.greyBlue};
  color: ${p => p.theme.greyBlue};
  font-size: 1.6rem;
  display: inline-block;
  padding: 1.2rem 0;
  &:focus,
  &:hover {
    background: #fff;
    color: ${p => p.theme.greyBlue};
  }
  ${p =>
    p.isActive &&
    `
    background: #687981;
    color: #fff;
    &:hover, &:active, &:focus {
      background: #687981;
      color: #fff;
    }
  `};
`;

const DealTypeBtnGroup = styled(BtnGroup)`
  width: 100%;
  margin: 1.5rem 0;
  ${DealTypeBtn}:first-child {
    border-top-left-radius: 10rem;
    border-bottom-left-radius: 10rem;
  }
  ${DealTypeBtn}:last-child {
    border-top-right-radius: 10rem;
    border-bottom-right-radius: 10rem;
  }
`;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { isViewOpen: false };

    this.updateLink = this.updateLink.bind(this);
    this.resetLink = this.resetLink.bind(this);
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

  updateLink(value) {
    const state = this.props.filters[this.props.resourceName];
    const { translatedPlaceKind, dealType, place } = this.props;

    if (state.kind.length > 1) {
      this.props.dispatch(
        push(`/zagorodnaya/${translatedPlaceKind}/${place}/${dealType}`),
      );
    } else {
      this.props.dispatch(
        push(
          `/zagorodnaya/${translatedPlaceKind}/${place}/${dealType}/${
            kindsTranslit[value]
          }`,
        ),
      );
    }
  }

  resetLink() {
    const { translatedPlaceKind, dealType, place } = this.props;

    this.props.dispatch(
      push(`/zagorodnaya/${translatedPlaceKind}/${place}/${dealType}`),
    );
  }

  updateFilter(key, value) {
    const { translatedPlaceKind, dealType, place } = this.props;

    const values = {
      [key]: value,
    };

    this.props.dispatch(
      updatePagination(this.props.resourceName, { offset: 0 }),
    );
    this.props.dispatch(updateFilter(this.props.resourceName, values));

    if (value.length === 1) {
      this.props.dispatch(
        push(
          `/zagorodnaya/${translatedPlaceKind}/${place}/${dealType}/${
            kindsTranslit[value]
          }`,
        ),
      );
    } else {
      this.props.dispatch(
        push(`/zagorodnaya/${translatedPlaceKind}/${place}/${dealType}`),
      );
    }
  }

  removeFilter(key, value) {
    this.props.dispatch(removeFilter(this.props.resourceName, key, value));
  }

  resetFilter() {
    const { translatedPlaceKind, dealType, kind, place } = this.props;

    this.props.dispatch(resetFilter(this.props.resourceName));

    if (kind) {
      this.props.dispatch(
        push(`/zagorodnaya/${translatedPlaceKind}/${place}/${dealType}`),
      );
    }
  }

  renderFilters() {
    const {
      data = {},
      translatedPlaceKind,
      dealType,
      kind,
      place,
      location,
    } = this.props;
    const propertyKind = kind || false;

    const state = this.props.filters[this.props.resourceName];

    return (
      <div>
        <Col xs="12">
          <DealTypeBtnGroup>
            <DealTypeBtn
              isActive={dealTypes[dealType] === 'sale'}
              to={`/zagorodnaya/${translatedPlaceKind}/${nameToSlug(
                data.name,
              )}_${data.id}/prodaja${propertyKind ? `/${propertyKind}` : ''}`}
            >
              Купить
            </DealTypeBtn>
            <DealTypeBtn
              isActive={dealTypes[dealType] === 'rent'}
              to={`/zagorodnaya/${translatedPlaceKind}/${nameToSlug(
                data.name,
              )}_${data.id}/arenda${propertyKind ? `/${propertyKind}` : ''}`}
            >
              Снять
            </DealTypeBtn>
          </DealTypeBtnGroup>
        </Col>
        <br />
        <Title>Тип объекта</Title>
        <Kind
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          updateLink={this.updateLink}
          resetLink={this.resetLink}
          translatedPlaceKind={translatedPlaceKind}
          place={place}
          toggle={() => this.toggleSubview(null)}
          dealType={dealType}
          location={location}
        />

        <Title>Стоимость</Title>
        <Price
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
          dealType={dealType}
        />

        <Title>От МКАД</Title>
        <Distance
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />

        <Areas
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />

        <Title>Отделка</Title>
        <Renovate
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />
      </div>
    );
  }

  render() {
    const { count, filterCount } = this.props;
    const { isViewOpen } = this.state;

    return (
      <section>
        <FilterBtn toggle={this.toggleView} />

        {filterCount !== 0 && (
          <HideXsSm>
            <Row>
              <Col xs="12">
                <Selected
                  filters={this.props.filters[this.props.resourceName]}
                  removeFilter={this.removeFilter}
                  resetFilter={this.resetFilter}
                  filterCount={filterCount}
                />
              </Col>
            </Row>
          </HideXsSm>
        )}

        <Overlay
          ref="overlay"
          isViewOpen={isViewOpen}
          onClick={this.toggleView}
        />

        <StBtnGroup isViewOpen={isViewOpen}>
          <ResetBtn
            filterCount={filterCount >= 1}
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
      </section>
    );
  }
}

// redux connectors
const mapStateToProps = state => ({
  filters: state.filters,
  pagination: state.pagination,
  order: state.order,
  places: state.places,
});

const fields = [
  'routes',
  'kind',
  'price',
  'area',
  'landArea',
  'renovate',
  'mkadDistance',
  'settlements',
];

export default FilterHelper(null, fields)(connect(mapStateToProps)(Filter));
