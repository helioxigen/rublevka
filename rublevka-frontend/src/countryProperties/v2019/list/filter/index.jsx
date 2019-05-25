import React, { Component } from 'react';
import { FormattedNumber } from 'react-formatted';

import CSSModules from 'react-css-modules';

import { withRouter } from 'react-router';

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import UI from '../../../../ui/v2019';

import FilterHelper from '../../../../core/decorators/filter';
import s from '../../../../styles/components/satellites/filter.css';
import sSlider from '../../../../styles/ui/slider.css';
import sUtils from '../../../../styles/utils.css';
import st from '../../../../styles/themes2019';

import Kind from './kind';
import Price from './price2';
import Bedroom from './bedroom';
import Areas from './areas';
import Renovate from './renovate';
import Distance from './distance';
import * as S from './styled';

const { Visibility, CountIndicator } = UI;

const styles = {
  ...sUtils,
  ...sSlider,
  ...s,
};

const cssOptions = {
  allowMultiple: true,
};

const theme = st.filterSatellites;

class Filter extends Component {
  constructor(props) {
    super(props);

    this.updateFilter = this.updateFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.toggle = this.toggle.bind(this);
    this.targetElement = null;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }

    if (typeof document !== 'undefined') {
      if (document.body.offsetWidth < 767) {
        this.targetElement = this.modalMobile;
      } else {
        this.targetElement = this.modalTablet;
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
    clearAllBodyScrollLocks();
  }

  handleResize = () => {
    const { isViewOpen } = this.props;
    if (window.outerWidth > 768 && isViewOpen) {
      clearAllBodyScrollLocks();
    }
  };

  toggle() {
    if (this.props.isViewOpen) {
      this.props.onClose();
      enableBodyScroll(this.targetElement);
    } else {
      this.props.toggle();
      disableBodyScroll(this.targetElement);
    }
  }

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.actions.updatePagination(this.props.resourceName, {
      offset: 0,
    });
    this.props.actions.updateFilter(this.props.resourceName, values);
  }

  resetFilter() {
    const { resetFilter, router, dealType } = this.props;

    resetFilter();
    router.push(`/zagorodnaya/${dealType}`);
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
          dealType={dealType}
        />

        <Price
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
          dealType={dealType}
        />

        <Areas
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
        />

        <Distance
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
        />

        <Renovate
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
        />

        <Bedroom
          selected={state}
          updateFilter={this.updateFilter}
          removeFilter={this.removeFilter}
        />
      </div>
    );
  }

  render() {
    const { isViewOpen } = this.props;

    const { count, filterCount } = this.props; // filter helper

    return (
      <section>
        {/* desktop */}
        <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
          <S.DesktopContainer>{this.renderFilters()}</S.DesktopContainer>
        </Visibility>
        {/* tablet */}
        <Visibility xs="hidden" sm="hidden" md="block" lg="hidden">
          {isViewOpen && <S.Cover onClick={this.toggle} />}
          <S.ButtonFilter onClick={this.toggle}>
            <S.IconFilter icon="filter" />
            <S.Text>Фильтр</S.Text>
          </S.ButtonFilter>

          <S.BtnGroupHead isViewOpen={isViewOpen}>
            <S.ButtonReset onClick={this.toggle}>
              <S.IconClose icon="times" />
            </S.ButtonReset>

            <S.ButtonReset disabled={!filterCount} onClick={this.resetFilter}>
              <S.ResetText>Сбросить</S.ResetText>
            </S.ButtonReset>
          </S.BtnGroupHead>

          <S.DesktopContainer
            // FIXME
            // eslint-disable-next-line no-return-assign
            innerRef={el => (this.modalTablet = el)}
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
          <S.ButtonFilter onClick={this.toggle}>
            <S.IconFilter icon="filter" />
            <S.Text>Фильтр</S.Text>
          </S.ButtonFilter>

          {/* main view */}

          <div
            className={theme.filterContainer}
            // FIXME
            // eslint-disable-next-line no-return-assign
            ref={el => (this.modalMobile = el)}
            style={{ display: isViewOpen ? 'block' : 'none' }}
          >
            <S.BtnGroupHead>
              <S.ButtonReset onClick={this.toggle}>
                <S.IconClose icon="times" />
              </S.ButtonReset>

              <S.ButtonReset disabled={!filterCount} onClick={this.resetFilter}>
                <S.ResetText>Сбросить</S.ResetText>
              </S.ButtonReset>
            </S.BtnGroupHead>

            <S.MobileContainer>{this.renderFilters()}</S.MobileContainer>
            <S.ButtonPrimary
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
  'bedrooms',
  'mkadDistance',
  'settlements',
];

export default FilterHelper(null, fields)(
  CSSModules(withRouter(Filter), styles, cssOptions),
);
