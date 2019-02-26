import React, { Component } from 'react';

// UI
import UI from 'site/ui';
const {
  Button,
  Grid: { Row, Col },
} = UI;

// components
import Kind from './Kind';
import Price from './Price';
import FilterMobileCountry from 'site/countryProperties/list/filter';

// styles
import cn from 'classnames';
import s from 'site/styles/landing/satellites/filter';
import sUtils from 'site/styles/utils';

import { dealTypes } from 'site/constants/properties/dictionaries';

class Filter extends Component {
  state = {
    isOpened: false,
  };

  toggle() {
    const isViewOpen = !this.state.isViewOpen;

    this.setState({ isViewOpen });
  }

  toggleModal(isOpened, dealType = dealTypes[this.props.dealType]) {
    this.props.toggleDealType(dealType);

    this.setState({ isOpened });
  }

  toggleResourceName(key, value) {
    this.props.toggleResourceName(key, value);
  }

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.actions.updateFilter(this.props.resourceName, values);
  }

  render() {
    const { state, count, dealType, isFetching } = this.props;
    const hasItems = !!count;

    return (
      <Row
        xs="center"
        className={s.filterContainer}
        style={{ zIndex: this.state.isViewOpen && 10 }}
      >
        <Col xs="12" lg="8">
          {/* desktop */}
          <div className={cn(s.formContainer, s.boxShadow, sUtils.hideXsSm)}>
            <div className={s.tabGroup}>
              <Button
                className={cn(s.tab, dealType === `prodaja` && s.active)}
                type="button"
                onClick={() => this.props.toggleDealType(`prodaja`)}
                block
              >
                Купить
              </Button>
              <Button
                className={cn(s.tab, dealType === `arenda` && s.active)}
                type="button"
                onClick={() => this.props.toggleDealType(`arenda`)}
                block
              >
                Снять
              </Button>
            </div>

            <div className={s.mainContainer}>
              <Kind
                selected={state}
                updateFilter={::this.updateFilter}
                dealType={dealTypes[dealType]}
              />

              <Price
                selected={state}
                dealType={dealTypes[dealType]}
                updateFilter={::this.updateFilter}
              />

              <Row xs="center" className={sUtils.pushedTop2}>
                <Col xs="12">
                  <Button
                    to={`/zagorodnaya/${dealType}`}
                    className={s.btn}
                    disabled={!hasItems || isFetching}
                    size="lg"
                    kind="primary"
                    type="submit"
                  >
                    {!isFetching && !hasItems && `Ничего не нашлось`}
                    {!isFetching && hasItems && `Показать ${count}`}
                    {isFetching && `. . .`}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>

          {/* tablet and mobile */}
          <div className={cn(sUtils.hideFromMd, s.zIndex3)}>
            <Button
              className={s.btnOval}
              kind="primary"
              block
              type="button"
              onClick={::this.toggle}
            >
              Начать поиск
            </Button>
          </div>

          {this.state.isViewOpen && (
            <FilterMobileCountry
              resourceName={this.props.resourceName}
              resource={this.props.resource}
              group={this.props.group}
              count={this.props.count}
              updatePagination={this.props.updatePagination}
              actions={this.props.actions} // TODO: use FilterHelper instead of passing actions
              state={this.props.state} // TODO: refactor this because FilterHelper provides
              dealType={this.props.dealType} // TODO: check it's ok?
              onClose={::this.toggle}
              toggleResourceName={::this.toggleResourceName}
              isViewOpen
            />
          )}
        </Col>
      </Row>
    );
  }
}

export default Filter;