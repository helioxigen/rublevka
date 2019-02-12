import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import { FormattedNumber } from 'react-formatted';

import BezierEasing from 'bezier-easing';

import global from 'window-or-global';

import { push } from 'react-router-redux';

import UI from 'site/ui';

import animate from 'core/helpers/ui/animation';
import FilterHelper from 'core/decorators/filter';
import {
  dealTypes,
  kindsTranslit,
} from 'site/constants/properties/dictionaries';

import cn from 'classnames';
import st from 'site/styles/themes';

import Selected from './Selected';
import Routes from './Routes';
import KindLinks from './KindLinks';
import Price from './Price';
import Areas from './Areas';
import Renovate from './Renovate';
import Distance from './Distance';
import FilterBtn from 'site/components/FilterBtn';
import Search from 'site/components/Search';

import {
  Section,
  Overlay,
  FiltersWrapper,
  FilterMobile,
  ResetBtn,
  StBtnGroup,
  BtnShowResults,
  Title,
  MobileWrapper,
  Header,
  CloseBtn,
  StIcon,
} from './styled';

const isJQ = global.config.domain === 'jq.estate';

const {
  Visibility,
  Button,
  BtnGroup,
  CountIndicator,
  Grid: { Container, Row, Col },
} = UI;

const theme = st.filterSatellites;
const easingX = BezierEasing(0.86, 0, 0.07, 1);
const duration = 350;

class Filter extends Component {
  constructor(props) {
    super(props);

    this.updateLink = this.updateLink.bind(this);
    this.resetLink = this.resetLink.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.load();
  }

  load() {
    this.setState({
      viewPosition: 1,

      isSubViewOpen: false,
      subViewPosition: 1,

      currentLayout: null,
    });
  }

  toggle() {
    if (this.props.isViewOpen) {
      this.props.onClose();
    } else {
      this.props.toggle();
    }

    this.setState({ currentLayout: null, isSubViewOpen: false }, () => {
      animate(duration, easingX, viewPosition => {
        this.setState({ viewPosition });
      });
    });
  }

  toggleResourceName(key, value) {
    this.props.toggleResourceName(key, value);

    if (key === 'resource') {
      this.setState({ currentLayout: null });
    }
  }

  toggleSubview(currentLayout, direction) {
    const isSubViewOpen = !this.state.isSubViewOpen;

    const onStart = () => {
      if (this.state.isSubViewOpen) {
        this.setState({ currentLayout });
      }
    };

    const onEnd = () => {
      if (!this.state.isSubViewOpen) {
        this.setState({ currentLayout });
      }
    };

    const onUpdate = subViewPosition => {
      this.setState({ subViewPosition });
    };

    this.setState({ isSubViewOpen, direction }, () => {
      animate(duration, easingX, onUpdate, onStart, onEnd);
    });
  }

  updateLink(value) {
    const state = this.props.filters[this.props.resourceName];
    const { dealType } = this.props;

    if (state.kind.length > 1) {
      this.props.dispatch(push(`/zagorodnaya/${dealType}`));
    } else {
      this.props.dispatch(
        push(`/zagorodnaya/${dealType}/${kindsTranslit[value]}`),
      );
    }
  }

  resetLink() {
    const { dealType } = this.props;

    this.props.dispatch(push(`/zagorodnaya/${dealType}`));
  }

  updateFilter(key, value) {
    const { dealType } = this.props;
    const values = {
      [key]: value,
    };

    this.props.actions.updatePagination(this.props.resourceName, { offset: 0 });
    this.props.actions.updateFilter(this.props.resourceName, values);

    if (key === 'kind' && value.length === 1) {
      this.props.dispatch(
        push(`/zagorodnaya/${dealType}/${kindsTranslit[value]}`),
      );
    } else if (key === 'kind') {
      this.props.dispatch(push(`/zagorodnaya/${dealType}`));
    }
  }

  resetFilter(key, value) {
    const { dealType } = this.props;
    this.props.actions.resetFilter(this.props.resourceName, key, value);

    this.props.dispatch(push(`/zagorodnaya/${dealType}`));
  }

  removeFilter(key, value) {
    if (key === 'areas') {
      this.props.actions.removeFilter(this.props.resourceName, 'area', value);
      this.props.actions.removeFilter(
        this.props.resourceName,
        'landArea',
        value,
      );
    } else {
      this.props.actions.removeFilter(this.props.resourceName, key, value);
    }
  }

  renderFilters() {
    const { state, dealType, location } = this.props;

    return (
      <div>
        {isJQ && (
          <div>
            <Title>Направление</Title>
            <Routes
              selected={state}
              updateFilter={this.updateFilter}
              removeFilter={this.removeFilter}
              toggle={() => this.toggleSubview(null)}
            />
          </div>
        )}

        <Title>Тип объекта</Title>
        <KindLinks
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          updateLink={this.updateLink}
          resetLink={this.resetLink}
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
    const { isViewOpen } = this.props;

    const { count, filterCount, resetFilter, viewSelected } = this.props; // filter helper
    const dealType = dealTypes[this.props.dealType];

    return (
      <Section>
        {/* desktop */}
        <Visibility xs="hidden" sm="hidden" md="block" lg="block">
          {viewSelected && (
            <Header>
              <Container>
                <Row>
                  <FilterBtn toggle={this.toggle} />
                </Row>

                {filterCount !== 0 && (
                  <Row>
                    <Selected
                      filters={this.props.filters[this.props.resourceName]}
                      removeFilter={this.removeFilter}
                      resetFilter={this.resetFilter}
                      filterCount={filterCount}
                    />
                  </Row>
                )}
              </Container>
            </Header>
          )}

          <Overlay
            ref="overlay"
            isViewOpen={isViewOpen}
            onClick={this.toggle}
          />

          <StBtnGroup isViewOpen={isViewOpen}>
            <ResetBtn
              filterCount={filterCount >= 1}
              size="md"
              block
              disabled={!filterCount}
              onClick={this.resetFilter}
            >
              Сбросить фильтр
            </ResetBtn>

            <CloseBtn size="md" block onClick={this.toggle}>
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
              onClick={this.toggle}
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
        </Visibility>

        {/* mobile */}
        <Visibility md="hidden" lg="hidden">
          {/* closed */}
          {!this.props.isViewOpen && !!count && viewSelected && (
            <FilterMobile>
              <Container>
                <Row>
                  <FilterBtn toggle={this.toggle} filterCount={filterCount} />
                </Row>
              </Container>
            </FilterMobile>
          )}

          {/* main view */}
          <MobileWrapper isViewOpen={isViewOpen}>
            <BtnGroup className={theme.btnContainer}>
              <ResetBtn
                filterCount={filterCount >= 1}
                size="md"
                block
                disabled={!filterCount}
                onClick={resetFilter}
              >
                Сбросить всё
              </ResetBtn>

              <CloseBtn size="md" block onClick={this.toggle}>
                <StIcon icon="times" />
              </CloseBtn>
            </BtnGroup>
          </MobileWrapper>

          <div
            className={theme.filterContainer}
            style={{ display: isViewOpen ? 'block' : 'none' }}
          >
            <div className={theme.btnGroupContainer}>
              <Container>
                <Row>
                  <Col xs="12">
                    <Search placeholder="Поиск по ID" />
                  </Col>
                  <Col xs="12" sm="5">
                    <BtnGroup className={theme.btnGroup}>
                      <Link
                        to="/zagorodnaya/prodaja"
                        className={cn(
                          theme.btnInGroup,
                          dealType === 'sale' && theme.btnActive,
                        )}
                      >
                        Купить
                      </Link>
                      <Link
                        to="/zagorodnaya/arenda"
                        className={cn(
                          theme.btnInGroup,
                          dealType === 'rent' && theme.btnActive,
                        )}
                      >
                        Снять
                      </Link>
                    </BtnGroup>
                  </Col>
                </Row>
              </Container>
            </div>

            <div styleName="tabContainer">{this.renderFilters()}</div>
          </div>

          <BtnShowResults
            isViewOpen={isViewOpen}
            kind="primary"
            block
            size="lg"
            onClick={this.toggle}
            disabled={!count}
          >
            {count ? 'Показать' : 'Нет'} <FormattedNumber value={count} />{' '}
            <CountIndicator
              count={count}
              declensionForms={['объект', 'объекта', 'объектов']}
              numberHidden
            />
          </BtnShowResults>
        </Visibility>
      </Section>
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
