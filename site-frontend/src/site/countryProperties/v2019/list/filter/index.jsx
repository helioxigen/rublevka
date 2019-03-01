import React, { Component } from 'react';
import { FormattedNumber } from 'react-formatted';
import { Link } from 'react-router';

import BezierEasing from 'bezier-easing';
import CSSModules from 'react-css-modules';

import global from 'window-or-global';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import UI from 'site/ui/v2019';

import animate from 'core/helpers/ui/animation';
import FilterHelper from 'core/decorators/filter';
import { dealTypes } from 'site/constants/properties/dictionaries';

import cn from 'classnames';
import s from 'site/styles/components/satellites/filter.css';
import sSlider from 'site/styles/ui/slider.css';
import sUtils from 'site/styles/utils.css';
import st from 'site/styles/themes2019';

import Selected from './selected';
import Routes from './routes';
import Kind from './kind';
import Price from './price2';
import Areas from './areas';
import Renovate from './renovate';
import Distance from './distance';
import OnlyNew from './onlyNew';
import * as S from './styled';
import Search from 'site/components/Search';


const isJQ = global.config.domain === 'jq.estate';

const {
  Visibility,
  CountIndicator,
  Form: { Group },
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
    this.targetElement = null;
  }

  componentWillMount() {
    this.load();
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      if (document.body.offsetWidth < 767) {
        this.targetElement = this.modalMobile;
      } else {
        this.targetElement = this.modalTablet;
      }
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
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
      enableBodyScroll(this.targetElement);
    } else {
      this.props.toggle();
      disableBodyScroll(this.targetElement);
    }

    this.setState({ currentLayout: null, isSubViewOpen: false }, () => {
      animate(duration, easingX, (viewPosition) => {
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

    const onUpdate = (subViewPosition) => {
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
        <Kind
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
          dealType={dealType}
        />

        <Price
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
          dealType={dealType}
        />

        <Areas
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />

        <Distance
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          toggle={() => this.toggleSubview(null)}
        />

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

    const { count, filterCount, resetFilter, resource } = this.props; // filter helper
    const dealType = dealTypes[this.props.dealType];


    return (
      <section>
        {/* desktop */}
        <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
          <S.DesktopContainer>
            {this.renderFilters()}
          </S.DesktopContainer>
        </Visibility>
        {/* tablet */}
        <Visibility xs="hidden" sm="hidden" md="block" lg="hidden">
          <S.ButtonFilter
            onClick={this.toggle}
          >
            <S.IconFilter icon="filter" />
            <S.Text>Фильтр</S.Text>
          </S.ButtonFilter>
          <div
            ref="overlay"
            className={cn(s.overlay, isViewOpen && s.overlayActive)}
            onClick={this.props.toggle}
          />

          <S.BtnGroupHead
            isViewOpen={isViewOpen}
          >
            <S.ButtonReset
              onClick={this.toggle}
            >
              <S.IconClose icon="times" />
            </S.ButtonReset>

            <S.ButtonReset
              disabled={!filterCount}
              onClick={resetFilter}
            >
              <S.ResetText>Сбросить</S.ResetText>
            </S.ButtonReset>
          </S.BtnGroupHead>

          <S.DesktopContainer
            innerRef={el => this.modalTablet = el}
            isViewOpen={isViewOpen}
          >

            {this.renderFilters()}

            <S.ButtonPrimary
              block
              size="lg"
              onClick={this.props.toggle}
              disabled={!count}
              isViewOpen={isViewOpen}
            >
              {count ? 'Показать' : 'Нет'} <FormattedNumber value={count} />{' '}
              <CountIndicator
                count={count}
                declensionForms={['объект', 'объекта', 'объектов']}
                numberHidden
              />
            </S.ButtonPrimary>
          </S.DesktopContainer>
        </Visibility>

        {/* mobile */}
        <Visibility md="hidden" lg="hidden">
          {/* closed */}
          {!this.props.isViewOpen && !!count && (
            <div>
              <S.ButtonFilter
                onClick={this.toggle}
              >
                <S.IconFilter icon="filter" />
                <S.Text>Фильтр</S.Text>
              </S.ButtonFilter>
            </div>
          )}

          {/* main view */}

          <div
            className={theme.filterContainer}
            innerRef={el => this.modalMobile = el}
            style={{ display: isViewOpen ? 'block' : 'none' }}
          >
            <S.BtnGroupHead>
              <S.ButtonReset
                onClick={this.toggle}
              >
                <S.IconClose icon="times" />
              </S.ButtonReset>

              <S.ButtonReset
                disabled={!filterCount}
                onClick={resetFilter}
              >
                <S.ResetText>Сбросить</S.ResetText>
              </S.ButtonReset>
            </S.BtnGroupHead>

            <div>{this.renderFilters()}</div>
            <S.ButtonPrimary
              to={`/zagorodnaya/${this.props.dealType}`}
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
            </S.ButtonPrimary>
          </div>
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
