import React, { Component } from 'react';
import global from 'window-or-global';

import UI from 'site/ui';

import Search from 'site/components/Search';
import FilterBtn from 'site/components/FilterBtn';

import { ShowXsSmMd, HideXsSmMd } from 'site/styles/mediaUtils';

import { distances } from 'site/constants/leads/options';

import styled from 'styled-components';
import media from 'site/styles/media';

const {
  Grid: { Row, Col },
  Select,
} = UI;

const SearchWrapper = styled.div`
  flex-basis: 78%;
  max-width: 78%;
  padding-left: 1.5rem;

  ${media.sm`
    flex-basis: 85%;
    max-width: 85%;
  `} ${media.md`
    flex-basis: 75%;
    max-width: 75%;
    margin-left: 10%;
  `};
`;

const FilterWrapper = styled.div`
  display: flex;
`;

const SearchDescWrapper = styled.div`
  min-width: 30rem;
  max-width: 30rem;
`;

const BtnWrapper = styled.div`
  max-width: 5rem;
  margin-left: auto;
  margin-right: 1.5rem;

  ${media.sm`
    margin-left: 1.5rem;;
  `};
`;

const StSelect = styled(Select)`
  border-radius: 0;
  font-size: 1.6rem;
  padding: 1.8rem 1.5rem 1.7rem;
  min-width: 30rem;
  max-width: 30rem;
  height: 5.8rem;
  border-width: 0.1rem 0.1rem 0.1rem 0;
  &:hover {
    border-color: #e8e8e8;
  }
  & svg {
    bottom: 1.6rem;
    height: 2rem;
    z-index: 2;
  }
  & > ul {
    top: 5.9rem;
  }
`;

const keyRoute = 'routeId';
const keyDistance = 'mkadDistance';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onUpdateDistance = this.onUpdateDistance.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onUpdateRoute(value) {
    this.props.updateFilter(keyRoute, [value]);
  }

  onUpdateDistance(ref) {
    const options = {
      min: 0,
      max: ref,
    };

    this.props.updateFilter(keyDistance, options);
  }

  toggle() {
    if (this.props.isViewOpen) {
      this.props.onClose();
    } else {
      this.props.toggle();
    }
  }

  render() {
    const { selected = {} } = this.props;
    const { mkadDistance = {} } = selected;
    const selectedRoute = selected[keyRoute] || [];

    return (
      <Col xs="12">
        <HideXsSmMd>
          <Row xs="center">
            <FilterWrapper>
              <SearchDescWrapper>
                <Search
                  withoutButton
                  fluidWidth
                  mobileRound
                  placeholder="Введите название"
                />
              </SearchDescWrapper>

              <StSelect
                value={selectedRoute[0]}
                onChange={value => this.onUpdateRoute(value)}
                placeholder="Направление"
                options={global.config.routesSelect}
              />

              <StSelect
                value={mkadDistance.max}
                onChange={this.onUpdateDistance}
                placeholder="От Мкад"
                options={distances}
              />
            </FilterWrapper>
          </Row>
        </HideXsSmMd>

        <ShowXsSmMd>
          <Row>
            <SearchWrapper>
              <Search
                withoutButton
                fluidWidth
                mobileRound
                placeholder="Введите поселок"
              />
            </SearchWrapper>
            <BtnWrapper>
              <FilterBtn toggle={this.toggle} withoutText />
            </BtnWrapper>
          </Row>
        </ShowXsSmMd>
      </Col>
    );
  }
}

export default Routes;
