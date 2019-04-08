import React, { Component } from 'react';

import UI from 'ui';
const {
  Button,
  Visibility,
  Grid: { Container, Row, Col },
} = UI;

import City from './City';
import Country from './Country';
import FilterMobileCountry from 'countryProperties/list/filter';
import FilterMobileCity from 'cityProperties/list/filter';

import cn from 'classnames';
import s from 'styles/landing/jqestate/list';

const Tabs = {
  City,
  Country,
};

class Filter extends Component {
  constructor(props) {
    super(props);

    this.switchTab = this.switchTab.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleResourceName = this.toggleResourceName.bind(this);

    this.state = { tab: 'Country' };
  }

  switchTab(tab) {
    this.setState({ tab });
    // this.props.actions.changeMainCategory(tab);
  }

  toggle() {
    const isViewOpen = !this.state.isViewOpen;

    this.setState({ isViewOpen });
  }

  toggleResourceName(key, value) {
    this.props.toggleResourceName(key, value);
  }

  render() {
    const Tab = Tabs[this.state.tab];

    return (
      <Row
        xs="center"
        className={s.filterContainer}
        style={{ zIndex: this.state.isViewOpen && 10 }}
      >
        <Col xs="12">
          <Visibility xs="hidden" sm="hidden" md="hidden">
            <Container className={s.tabsContainer}>
              <Row>
                <Col xs="12" className={s.flex}>
                  <Button
                    className={cn(
                      s.tab,
                      this.state.tab === 'Country' && s.tabActive,
                    )}
                    block
                    type="button"
                    onClick={() => this.switchTab('Country')}
                  >
                    Загородная
                  </Button>
                  <Button
                    className={cn(
                      s.tab,
                      this.state.tab === 'City' && s.tabActive,
                    )}
                    block
                    type="button"
                    onClick={() => this.switchTab('City')}
                  >
                    Городская
                  </Button>
                </Col>
              </Row>
              <Row xs="center">
                <Tab {...this.props} />
              </Row>
            </Container>
          </Visibility>

          <Visibility lg="hidden">
            <Button
              kind="primary"
              block
              type="button"
              className={s.btnOval}
              onClick={this.toggle}
            >
              Начать поиск
            </Button>

            {this.state.isViewOpen && this.props.resource === 'country' && (
              <FilterMobileCountry
                resourceName={this.props.resourceName}
                resource={this.props.resource}
                group={this.props.group}
                count={this.props.count}
                updatePagination={this.props.updatePagination}
                actions={this.props.actions} // TODO: use FilterHelper instead of passing actions
                state={this.props.state} // TODO: refactor this because FilterHelper provides
                dealType={this.props.dealType} // TODO: check it's ok?
                onClose={this.toggle}
                toggleResourceName={this.toggleResourceName}
                isViewOpen
              />
            )}

            {this.state.isViewOpen && this.props.resource === 'city' && (
              <FilterMobileCity
                resourceName={this.props.resourceName}
                resource={this.props.resource}
                group={this.props.group}
                count={this.props.count}
                updatePagination={this.props.updatePagination}
                actions={this.props.actions} // TODO: use FilterHelper instead of passing actions
                state={this.props.state} // TODO: refactor this because FilterHelper provides
                dealType={this.props.dealType} // TODO: check it's ok?
                onClose={this.toggle}
                toggleResourceName={this.toggleResourceName}
                isViewOpen
              />
            )}
          </Visibility>
        </Col>
      </Row>
    );
  }
}

export default Filter;
