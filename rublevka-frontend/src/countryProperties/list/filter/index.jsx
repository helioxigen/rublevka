import React, { Component } from 'react';
import { FormattedNumber } from 'react-formatted';

import { Link } from 'react-router';

import BezierEasing from 'bezier-easing';
import CSSModules from 'react-css-modules';

import global from 'window-or-global';

import UI from 'ui';

import animate from 'core/helpers/ui/animation';
import FilterHelper from 'core/decorators/filter';
import { dealTypes } from 'constants/properties/dictionaries';

import cn from 'classnames';
import s from 'styles/components/satellites/filter.css';
import sSlider from 'styles/ui/slider.css';
import sUtils from 'styles/utils.css';
import st from 'styles/themes';

import Selected from './selected';
import Routes from './routes';
import Kind from './kind';
import Price from './price2';
import Areas from './areas';
import Renovate from './renovate';
import Distance from './distance';
import OnlyNew from './onlyNew';
import Search from 'components/Search';

const isJQ = global.config.domain === 'jq.estate';

const {
  Visibility,
  Button,
  BtnGroup,
  Icon,
  CountIndicator,
  Grid: { Container, Row, Col },
} = UI;

const styles = {
  ...sUtils,
  ...sSlider,
  ...s,
};

const cssOptions = {
  allowMultiple: true,
};

const theme = st.filterSatellites;
const easingX = BezierEasing(0.86, 0, 0.07, 1);
const duration = 350;

class Filter extends Component {
  constructor(props) {
    super(props);

    this.updateFilter = this.updateFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
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

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.actions.updatePagination(this.props.resourceName, { offset: 0 });
    this.props.actions.updateFilter(this.props.resourceName, values);
  }

  resetFilter(key, value) {
    this.props.actions.resetFilter(this.props.resourceName, key, value);
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
    const { state, dealType } = this.props;

    return (
      <div>
        {isJQ && <div className={theme.desktopTitle}>Направление</div>}

        {isJQ && (
          <Routes
            selected={state}
            updateFilter={this.updateFilter}
            removeFilter={this.removeFilter}
            toggle={() => this.toggleSubview(null)}
          />
        )}

        <div className={theme.desktopTitle}>Тип</div>
        <Kind
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
          dealType={dealType}
        />

        <div className={theme.desktopTitle}>Стоимость</div>
        <Price
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
          dealType={dealType}
        />

        <div className={theme.desktopTitle}>От МКАД</div>
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

        <div className={theme.desktopTitle}>Ремонт</div>
        <Renovate
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />

        <OnlyNew
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
        />
      </div>
    );
  }

  render() {
    const { isViewOpen } = this.props;

    const { count, filterCount, resetFilter, resource } = this.props; // filter helper
    const dealType = dealTypes[this.props.dealType];

    return (
      <section styleName="pushedBottom3">
        {/* desktop */}
        <Visibility xs="hidden" sm="hidden" md="block" lg="block">
          <header styleName="wrapper">
            <Container>
              <Row>
                <Col xs="12">
                  <Button
                    className={cn(
                      theme.btnRound,
                      isViewOpen && theme.activeBtnRound,
                    )}
                    kind="primary"
                    size="lg"
                    onClick={this.toggle}
                  >
                    <Icon className={theme.iconFilter} icon="filter" />
                    <span styleName="textSm">Открыть фильтр</span>
                  </Button>

                  <Selected
                    state={this.props.filters[this.props.resourceName]}
                    removeFilter={this.removeFilter}
                  />

                  {!!filterCount && (
                    <Button
                      className={cn(theme.btnClearAllMd, sUtils.textPrimary)}
                      onClick={resetFilter}
                    >
                      Сбросить всё
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          </header>

          <div
            ref="overlay"
            className={cn(s.overlay, isViewOpen && s.overlayActive)}
            onClick={this.props.toggle}
          />

          <BtnGroup
            className={cn(
              theme.btnContainer,
              isViewOpen && theme.btnContainerActive,
            )}
          >
            <Button
              className={cn(
                theme.btnClearAll,
                filterCount && sUtils.textPrimary,
              )}
              size="md"
              block
              disabled={!filterCount}
              onClick={resetFilter}
            >
              Сбросить фильтр
            </Button>

            <Button
              styleName="btnTimes"
              size="md"
              block
              kind="primary"
              onClick={this.props.toggle}
            >
              <Icon className={theme.iconTimes} icon="times" />
            </Button>
          </BtnGroup>

          <div
            className={cn(
              s.desktopContainer,
              isViewOpen && s.desktopContainerActive,
            )}
          >
            {this.renderFilters()}

            <Button
              className={cn(s.floatBtn, isViewOpen && s.floatBtnActive)}
              kind="primary"
              block
              size="lg"
              onClick={this.props.toggle}
              disabled={!count}
            >
              {count ? 'Показать' : 'Нет'} <FormattedNumber value={count} />{' '}
              <CountIndicator
                count={count}
                declensionForms={['объект', 'объекта', 'объектов']}
                numberHidden
              />
            </Button>
          </div>
        </Visibility>

        {/* mobile */}
        <Visibility md="hidden" lg="hidden">
          {/* closed */}
          {!this.props.isViewOpen && !!count && (
            <div styleName="wrapper">
              <Container>
                <Row>
                  <Col xs="12">
                    <Button
                      className={cn(theme.btnRound, theme.btnPadding)}
                      kind="primary"
                      size="lg"
                      block
                      onClick={this.toggle}
                    >
                      <Icon className={theme.iconFilter} icon="filter" />
                      Открыть фильтр&nbsp;
                      {!!filterCount && (
                        <span styleName="counter">{filterCount}</span>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          )}

          {/* main view */}
          <div style={{ display: isViewOpen ? 'block' : 'none' }}>
            <BtnGroup className={theme.btnContainer}>
              <Button
                className={cn(
                  theme.btnClearAll,
                  filterCount && sUtils.textPrimary,
                )}
                size="md"
                block
                disabled={!filterCount}
                onClick={resetFilter}
              >
                Сбросить всё
              </Button>

              <Button
                styleName="btnTimes"
                size="md"
                block
                kind="primary"
                onClick={this.toggle}
              >
                <Icon className={theme.iconTimes} icon="times" />
              </Button>
            </BtnGroup>
          </div>

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

          <Button
            to={`/zagorodnaya/${this.props.dealType}`}
            styleName="floatBtn"
            kind="primary"
            block
            size="lg"
            onClick={this.toggle}
            style={{ display: isViewOpen ? 'block' : 'none' }}
          >
            {count ? 'Показать' : 'Нет'} <FormattedNumber value={count} />{' '}
            <CountIndicator
              count={count}
              declensionForms={['объект', 'объекта', 'объектов']}
              numberHidden
            />
          </Button>
        </Visibility>
      </section>
    );
  }
}

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

export default FilterHelper(null, fields)(
  CSSModules(Filter, styles, cssOptions),
);
