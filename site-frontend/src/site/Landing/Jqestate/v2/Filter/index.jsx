import React, { Component } from 'react';

import UI from 'site/ui';

import FilterMobileCountry from 'site/countryProperties/v2/List/Filter/FilterMobile';

import { IconFilter, BtnFilter, FilterWrapper } from '../styled';

const {
  Visibility,
  Grid: { Row, Col },
} = UI;

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = { isViewOpen: false };

    this.toggle = this.toggle.bind(this);
    this.toggleResourceName = this.toggleResourceName.bind(this);
  }

  toggle() {
    const isViewOpen = !this.state.isViewOpen;

    this.setState({ isViewOpen });
  }

  toggleResourceName(key, value) {
    this.props.toggleResourceName(key, value);
  }

  render() {
    return (
      <FilterWrapper>
        <Row xs="center" style={{ zIndex: this.state.isViewOpen && 10 }}>
          <Col xs="12">
            <Visibility lg="hidden">
              <BtnFilter kind="primary" size="lg" onClick={this.toggle}>
                <IconFilter icon="filter" />
                <span styleName="textSm">Начать поиск</span>
              </BtnFilter>

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
                isViewOpen={this.state.isViewOpen}
              />
            </Visibility>
          </Col>
        </Row>
      </FilterWrapper>
    );
  }
}

export default Filter;
