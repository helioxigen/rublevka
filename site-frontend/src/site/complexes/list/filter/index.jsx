import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import * as FilterActions from 'core/actions/filters';
import * as PaginationActions from 'core/actions/pagination';

// components
import Selected from './selected';
import FilterBtn from './filterBtn';
import Properties from './properties';
import Buildings from './buildings';
// import Location from './locationTab';

// styles
import cn from 'classnames';
import s from 'site/styles/complexes/filter';
import sUtils from 'site/styles/utils';

// ui
import UI from 'site/ui';
const {
  Button,
  ModalComplexes: FilterModal,
  CountIndicator,
  Visibility,
  Grid: { Container, Row, Col },
} = UI;

// import { fields as filterFields } from 'site/constants/complexes/filter';

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  componentWillMount() {
    this.setState({
      storedValues: {
        filters: this.props.state.filters[this.props.resource],
        pagination: this.props.state.pagination[this.props.resource],
      },
    });
  }

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.actions.updatePagination(this.props.resource, { offset: 0 });
    this.props.actions.updateFilter(this.props.resource, values);
  }

  resetFilter() {
    this.props.actions.resetFilter(this.props.resource);
  }

  removeFilter(key, value) {
    this.props.actions.removeFilter(this.props.resource, key, value);
  }

  cancel() {
    this.resetFilter();

    this.props.actions.updatePagination(
      this.props.resource,
      this.state.storedValues.pagination,
    );
    this.props.actions.updateFilter(
      this.props.resource,
      this.state.storedValues.filters,
    );

    this.props.toggle();
  }

  // toggleList() {
  //   this.setState({ showList: !this.state.showList, inputValue: `` });
  //
  //   if (!this.state.showList) this.search(``);
  // }
  //
  // search(query) {
  //   const { actions } = this.props;
  //
  //   actions.searchComplexes(query);
  //   actions.searchSubLocalities(query);
  // }
  //
  // handleQueryChange(event) {
  //   const newInputValue = event.target.value;
  //
  //   this.setState({
  //     inputValue: newInputValue,
  //     showList: false,
  //   });
  //
  //   this.search(newInputValue);
  // }

  render() {
    const { resource, isOpened, isFetching, count } = this.props;
    const state = this.props.state.filters[resource];

    const hasItems = !!count;

    return (
      <FilterModal isOpened={isOpened} closeOnEsc={false}>
        <div className={s.modalContainer}>
          <Container className={sUtils.hideXs}>
            <Row sm="center">
              <Col xs="12">
                <h1 className={s.titleLg}>Жилые комплексы</h1>

                <Visibility xs="hidden">
                  <h2 className={s.subTitle}>
                    <CountIndicator
                      count={count}
                      declensionForms={[
                        `жилой комплекс`,
                        `жилых комплекса`,
                        `жилых комплексов`,
                      ]}
                    />{' '}
                    Москвы
                  </h2>
                </Visibility>
              </Col>
            </Row>

            <FilterBtn
              resource={resource}
              isOpened={isOpened}
              isFetching={isFetching}
              count={count}
              toggle={::this.props.toggle}
            />

            <Selected
              className={sUtils.pushedTop6}
              isOpened={isOpened}
              state={state}
              removeFilter={::this.removeFilter}
              resetFilter={::this.props.actions.resetFilter}
            />
          </Container>

          {/* <div className={cn(s.dividerBottom, this.state.inputValue ? s.paddingBottom4 : s.paddingBottom5)}>
            <div className={cn(this.state.showList && s.dividerBottomSm, this.state.inputValue && s.dividerBottomSm)}>
              <Container>
                <Row className={cn(filterCount ? sUtils.pushedTopSm3 : sUtils.pushedTopSm5, s.indent3)}>
                  <Col xs="12">
                    <h4 className={s.title}>Расположение</h4>
                  </Col>
                  <Col xs="12">
                    <Form.Container className={sUtils.positionRelative}>
                      <Input className={s.inputRoutes} value={this.state.inputValue} block placeholder="Введите район или жилой комплекс" onChange={::this.handleQueryChange} />

                      <Button className={s.btnMd} type="button" onClick={::this.toggleList}>
                        <Icon className={s.iconList} icon="listBold" />
                        {!this.state.showList ? `Показать` : `Скрыть`} список
                      </Button>
                    </Form.Container>
                  </Col>
                </Row>

                <Location stateShowList={this.state.showList} fields={fields} inputValue={this.state.inputValue} complexes={state.complexesSearch.items} subLocalities={state.subLocalitiesSearch.items} actions={actions} />

              </Container>
            </div>
          </div> */}

          <Properties
            selected={state}
            updateFilter={::this.updateFilter}
            removeFilter={::this.removeFilter}
          />

          <Buildings
            selected={state}
            updateFilter={::this.updateFilter}
            removeFilter={::this.removeFilter}
          />

          <div className={s.btnContainer}>
            <Button
              className={cn(s.btnWide, s.btnDefault)}
              size="lg"
              kind="default"
              onClick={::this.cancel}
            >
              Отмена
            </Button>

            <Button
              className={cn(s.btnWide, !count ? s.disabled : s.enabled)}
              disabled={!hasItems || isFetching}
              size="lg"
              kind="primary"
              onClick={::this.props.toggle}
            >
              {!isFetching && !hasItems && `Ничего не нашлось`}
              {!isFetching && hasItems && `Показать ${count}`}
              {isFetching && `. . .`}
            </Button>
          </div>
        </div>
      </FilterModal>
    );
  }
}

// redux connectors
const pickState = state => {
  const { filters, pagination } = state;

  return {
    state: {
      filters,
      pagination,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    ...FilterActions,
    ...PaginationActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Filter);
