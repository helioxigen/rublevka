import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Masonry from 'react-masonry-component';

// actions
import loadComplexes from 'core/complexes/actions/list/load';
import loadSubLocalities from 'core/subLocalities/actions/list/load';
import * as FilterActions from 'core/actions/filters';

// constants
import { resourceName as resourceNameComplexes } from 'core/complexes/constants/defaults';
import { resourceName as resourceNameSubLocalities } from 'core/subLocalities/constants/defaults';

// ui
import UI from 'ui';

// styles
import cn from 'classnames';
import s from 'styles/settlements/filter';
import st from 'styles/themes';
import sUtils from 'styles/utils';

// helpers
import debounce from 'lodash/debounce';
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

// ui
const {
  Checkbox,
  Button,
  Icon,
  Form: { Input },
  Grid: { Container, Row, Col },
} = UI;

// constants
const sequences = {
  english: `abcdefghijklmnopqrstuvwxyz`,
  russian: `абвгдежзийклмнопрстуфхцчшщэюя`,
  numbers: `0123456789`,
};

const complexesGroupingSequence = `#${sequences.english}${
  sequences.russian
}`.split(``);

const masonryOptions = {
  transitionDuration: 0,
};

const settlementMatchesCharacter = (name, character) => {
  const isLetter = character !== `#`;

  if (isLetter) {
    return (name[0] || ``).toLowerCase() === character;
  } else {
    return sequences.numbers.indexOf(name[0]) > -1;
  }
};

class Complexes extends Component {
  static propTypes = {
    state: PropTypes.shape({
      filters: PropTypes.object.isRequired,
      pagination: PropTypes.object.isRequired,
      order: PropTypes.object.isRequired,
    }),
    actions: PropTypes.shape({
      loadComplexes: PropTypes.func.isRequired,

      // updatePagination: PropTypes.func.isRequired,

      setFilter: PropTypes.func.isRequired,
      updateFilter: PropTypes.func.isRequired,
      resetFilter: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
      key: `subLocalities`,
    };

    this.group = `forProperties`;
    this.resource = `${resourceNameComplexes}.${this.group}`;
    this.resourceSubLocality = `${resourceNameSubLocalities}.${this.group}`;
  }

  componentWillMount() {
    this.props.actions.updateFilter(this.resourceNameSubLocality, {
      name: null,
    });

    this.props.actions.updateFilter(this.resource, {
      name: null,
    });

    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      isUpdated(this.resource, this.props, nextProps) ||
      isUpdated(this.resourceSubLocality, this.props, nextProps)
    ) {
      this.load(nextProps);
    }
  }

  load({ state, actions }) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
    };

    const optionsSubLocality = {
      pagination: state.pagination[this.resourceSubLocality],
      filter: state.filters[this.resourceSubLocality],
    };

    actions.loadComplexes(options, this.group);
    actions.loadSubLocalities(optionsSubLocality, this.group);
  }

  handleQueryChange(e) {
    if (!this.state.isOpened) {
      this.setState({ isOpened: true });
    }

    if (this.state.key === `complexes`) {
      this.props.actions.updateFilter(this.resource, {
        name: e.target.value,
      });
    }

    if (this.state.key === `subLocalities`) {
      this.props.actions.updateFilter(this.resourceSubLocality, {
        name: e.target.value,
      });
    }
  }

  toggle() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  toggleTab(value) {
    this.setState({ key: value });
  }

  handleComplexChange(id, value, name) {
    const { selected = {} } = this.props;
    const { complexes = [] } = selected;

    // TODO fix this
    if (value) {
      this.props.updateFilter(this.state.key, [...complexes, { id: id, name }]);
    } else {
      this.props.updateFilter(
        this.state.key,
        complexes.filter(complex => complex.id !== id),
      );
    }
  }

  handleSublocalityChange(id, value, name) {
    const { selected = {} } = this.props;
    const { subLocalities = [] } = selected;

    // TODO fix this
    if (value) {
      this.props.updateFilter(this.state.key, [
        ...subLocalities,
        { id: id, name },
      ]);
    } else {
      this.props.updateFilter(
        this.state.key,
        subLocalities.filter(sublocality => sublocality.id !== id),
      );
    }
  }

  render() {
    const { state, selected = {} } = this.props;

    const { complexes = [], subLocalities = [] } = selected;

    const complexesList = state.complexes[this.group] || {};
    const subLocalitiesList = state.subLocalities[this.group] || {};

    const complexesIds = complexesList.ids || [];
    const subLocalitiesIds = subLocalitiesList.ids || [];

    const isFetchingComplexes = complexesList.isFetching;
    const isFetchingSubLocalities = subLocalitiesList.isFetching;

    const hasComplexes = !isFetchingComplexes && !!complexesIds.length;
    const hasSubLocalities =
      !isFetchingSubLocalities && !!subLocalitiesIds.length;

    const anyComplexStartsWith = character => {
      return !!complexesIds.filter(id =>
        settlementMatchesCharacter(state.complexes[id].data.name, character),
      ).length;
    };

    const anySubLocalityStartsWith = character => {
      return !!subLocalitiesIds.filter(id =>
        settlementMatchesCharacter(
          state.subLocalities[id].data.name,
          character,
        ),
      ).length;
    };

    return (
      <div>
        <Container
          fluid
          className={cn(s.paddingTop2_3Bottom2_3, s.extraPaddingXs0_3Md0)}
        >
          <Row md="middle">
            <Col xs="12" className={sUtils.positionRelative}>
              <Input
                className={s.inputRoutes}
                block
                placeholder="Введите название района или ЖК"
                onChange={debounce(::this.handleQueryChange, 150)}
              />

              <Button className={s.btnMd} type="button" onClick={::this.toggle}>
                <Icon
                  className={st.filterSatellites.iconListPrimary}
                  icon="listBold"
                />
              </Button>
            </Col>
          </Row>
        </Container>

        {this.state.isOpened && (
          <Container
            fluid
            className={cn(s.tabsContainer, s.extraPaddingXs0_3Md0)}
          >
            <Row>
              <Col xs="3">
                <Button
                  className={cn(
                    s.tabButton,
                    this.state.key === `subLocalities` && s.btnActive,
                  )}
                  onClick={() => this.toggleTab(`subLocalities`)}
                >
                  Район
                </Button>
              </Col>
              <Col xs="3">
                <Button
                  className={cn(
                    s.tabButton,
                    this.state.key === `complexes` && s.btnActive,
                  )}
                  onClick={() => this.toggleTab(`complexes`)}
                >
                  Жилой комплекс
                </Button>
              </Col>
            </Row>
          </Container>
        )}

        {this.state.isOpened && this.state.key === `complexes` && (
          <Container fluid>
            <Row
              className={cn(sUtils.positionRelative, s.extraPaddingXs0_3Md0)}
            >
              {/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ WHAT THE FUCK IS IT ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  */}
              {hasComplexes && (
                <Col xs="12">
                  <Masonry
                    className={s.grid}
                    elementType={'ul'}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                  >
                    {complexesGroupingSequence
                      .filter(character => anyComplexStartsWith(character))
                      .map(character => {
                        return (
                          <li className={s.column}>
                            <label className={s.labelPrimary}>
                              {character.toUpperCase()}
                            </label>

                            {complexesIds
                              .filter(id =>
                                settlementMatchesCharacter(
                                  state.complexes[id].data.name,
                                  character,
                                ),
                              )
                              .map(id => {
                                const complex = state.complexes[id].data;
                                const isChecked =
                                  complexes.filter(sett => sett.id === id)
                                    .length > 0; // if we found anything

                                const handleChange = (k, value) => {
                                  // eslint-disable-line
                                  return this.handleComplexChange(
                                    complex.id,
                                    value,
                                    complex.name,
                                  );
                                };

                                return (
                                  <Checkbox
                                    className={cn(
                                      s.checkbox,
                                      sUtils.pushedTop1,
                                    )}
                                    controlClassName={
                                      st.filterSatellites.checkboxControl
                                    }
                                    key={complex.id}
                                    reference={complex.name}
                                    checked={isChecked}
                                    handleChange={handleChange}
                                  >
                                    <span
                                      className={
                                        st.filterSatellites
                                          .checkboxLabelSettlements
                                      }
                                    >
                                      {complex.name}
                                    </span>
                                  </Checkbox>
                                );
                              })}
                          </li>
                        );
                      })}
                  </Masonry>
                </Col>
              )}
              {!hasComplexes && !isFetchingComplexes && (
                <p className={cn(s.textMd, s.textPrimary)}>
                  Жилые комплексы не найдены
                </p>
              )}
              {/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ WHAT THE FUCK IS THAT ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  */}
            </Row>
          </Container>
        )}

        {this.state.isOpened && this.state.key === `subLocalities` && (
          <Container fluid>
            <Row
              className={cn(sUtils.positionRelative, s.extraPaddingXs0_3Md0)}
            >
              {/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ WHAT THE FUCK IS IT ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  */}
              {hasSubLocalities && (
                <Col xs="12">
                  <Masonry
                    className={s.grid}
                    elementType={'ul'}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                  >
                    {complexesGroupingSequence
                      .filter(character => anySubLocalityStartsWith(character))
                      .map(character => {
                        return (
                          <li className={s.column}>
                            <label className={s.labelPrimary}>
                              {character.toUpperCase()}
                            </label>

                            {subLocalitiesIds
                              .filter(id =>
                                settlementMatchesCharacter(
                                  state.subLocalities[id].data.name,
                                  character,
                                ),
                              )
                              .map(id => {
                                const sublocality =
                                  state.subLocalities[id].data;
                                const isChecked =
                                  subLocalities.filter(sett => sett.id === id)
                                    .length > 0; // if we found anything

                                const handleChange = (k, value) => {
                                  // eslint-disable-line
                                  return this.handleSublocalityChange(
                                    sublocality.id,
                                    value,
                                    sublocality.name,
                                  );
                                };

                                return (
                                  <Checkbox
                                    className={cn(
                                      s.checkbox,
                                      sUtils.pushedTop1,
                                    )}
                                    controlClassName={
                                      st.filterSatellites.checkboxControl
                                    }
                                    key={sublocality.id}
                                    reference={sublocality.name}
                                    checked={isChecked}
                                    handleChange={handleChange}
                                  >
                                    <span
                                      className={
                                        st.filterSatellites
                                          .checkboxLabelSettlements
                                      }
                                    >
                                      {sublocality.name}
                                    </span>
                                  </Checkbox>
                                );
                              })}
                          </li>
                        );
                      })}
                  </Masonry>
                </Col>
              )}
              {!hasSubLocalities && !isFetchingSubLocalities && (
                <p className={cn(s.textMd, s.textPrimary)}>Районы не найдены</p>
              )}
              {/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ WHAT THE FUCK IS THAT ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  */}
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

// redux connectors
const pickState = state => {
  const { complexes, subLocalities, filters, pagination, order } = state;

  return {
    state: {
      complexes,
      subLocalities,
      filters,
      pagination,
      order,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadComplexes,
    loadSubLocalities,
    ...FilterActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Complexes);
