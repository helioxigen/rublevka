import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedNumber } from 'react-formatted';

import UI from 'site/ui';

import FilterBtn from 'site/components/FilterBtn';

import { ShowXsSmMd, HideXsSmMd } from 'site/styles/mediaUtils';

import {
  Wrapper,
  StButton,
  StButtonMobile,
  ResetBtn,
  DealTypeBtn,
  DealTypeBtnMobile,
  DealTypeBtnGroup,
  FiltersWrapper,
  Overlay,
  BtnShowResults,
  StBtnGroup,
  ResetBtnMobile,
  CloseBtn,
  StIcon,
  Title,
  WrapperKind,
  StCheckbox,
} from './styled';

const { Grid: { Row, Col }, CountIndicator } = UI;

const keyKind = 'kind';

class SettlementFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { isViewOpen: false };

    this.toggleView = this.toggleView.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onUpdate(id) {
    const { selected = {} } = this.props;
    const items = selected[keyKind] || [];
    const index = items.indexOf(id);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(keyKind, [...items, id]);
    } else {
      this.props.updateFilter(keyKind, items.filter((el, i) => i !== index));
    }
  }

  onUpdatePrice(ref, value) {
    const { dealType, selected = {} } = this.props;
    const price = selected[dealType] || {};
    const stateRef = ref === 'min' ? 'max' : 'min';

    const options = {
      [stateRef]: price[stateRef],
      [ref]: value,
    };

    this.props.updateFilter(dealType, options);
  }

  onClose() {
    this.setState({ isViewOpen: false });
  }

  toggleView() {
    this.setState(prevState => ({
      isViewOpen: !prevState.isViewOpen,
    }));
  }

  render() {
    const { toggleProperty, primaryTotal, propertyType, noResaleProperty } = this.props;
    const { selected = {}, id, state, isResaleProperty, dealType, count } = this.props;
    const { isViewOpen } = this.state;
    const { settlements = {} } = state;
    const settlement = settlements[id] || {};
    const { data = {} } = settlement;
    const { rentProperties = {} } = data.statistics || {};

    const price = selected[dealType] || {};

    const isRentProperties = rentProperties.total > 0;

    const items = selected[keyKind] || [];

    const isSelected = items.length !== 0 || !!price.min || !!price.max;

    return (
      <Wrapper>
        <HideXsSmMd>
          <Row xs="center">
            <Col xs="12">
              {isResaleProperty &&
                isRentProperties && (
                  <DealTypeBtnGroup>
                    <DealTypeBtn
                      isActive={dealType === 'sale'}
                      onClick={() => this.props.toggleDealType('sale')}
                    >
                      Продажа
                    </DealTypeBtn>
                    <DealTypeBtn
                      isActive={dealType === 'rent'}
                      onClick={() => this.props.toggleDealType('rent')}
                    >
                      Аренда
                    </DealTypeBtn>
                  </DealTypeBtnGroup>
                )}
              <StButton
                isActive={items.indexOf('house') > -1}
                onClick={() => this.onUpdate('house')}
              >
                Дом
              </StButton>
              <StButton isActive={items.indexOf('land') > -1} onClick={() => this.onUpdate('land')}>
                Участок
              </StButton>
              {isResaleProperty && (
                <StButton
                  isActive={items.indexOf('townhouse') > -1}
                  onClick={() => this.onUpdate('townhouse')}
                >
                  Таунхаус
                </StButton>
              )}
              {isResaleProperty && (
                <StButton
                  isActive={items.indexOf('flat') > -1}
                  onClick={() => this.onUpdate('flat')}
                >
                  Квартира
                </StButton>
              )}
              {isSelected && <ResetBtn onClick={this.props.resetFilter}>Сбросить</ResetBtn>}

              {primaryTotal > 0 &&
                !noResaleProperty && (
                  <StButton isActive={propertyType === 'primary'} onClick={toggleProperty}>
                    От застройщика
                  </StButton>
                )}
            </Col>
          </Row>
        </HideXsSmMd>

        <ShowXsSmMd>
          <Row>
            <Row>
              <Col xs="12">
                <FilterBtn toggle={this.toggleView} />
              </Col>
            </Row>
          </Row>

          <Overlay ref="overlay" isViewOpen={isViewOpen} onClick={this.toggleView} />

          <StBtnGroup isViewOpen={isViewOpen}>
            <ResetBtnMobile
              filterCount={isSelected}
              size="md"
              block
              disabled={!count}
              onClick={this.props.resetFilter}
            >
              Сбросить фильтр
            </ResetBtnMobile>

            <CloseBtn size="md" block onClick={this.toggleView}>
              <StIcon icon="times" />
            </CloseBtn>
          </StBtnGroup>

          <FiltersWrapper isViewOpen={isViewOpen}>
            <Col xs="12">
              {isResaleProperty &&
                isRentProperties && (
                  <DealTypeBtnGroup>
                    <DealTypeBtnMobile
                      isActive={dealType === 'sale'}
                      onClick={() => this.props.toggleDealType('sale')}
                    >
                      Продажа
                    </DealTypeBtnMobile>
                    <DealTypeBtnMobile
                      isActive={dealType === 'rent'}
                      onClick={() => this.props.toggleDealType('rent')}
                    >
                      Аренда
                    </DealTypeBtnMobile>
                  </DealTypeBtnGroup>
                )}

              <Title>Тип объекта</Title>
              <WrapperKind>
                <StCheckbox
                  checked={items.indexOf('house') > -1}
                  handleChange={() => this.onUpdate('house')}
                >
                  Дом
                </StCheckbox>
                <StCheckbox
                  checked={items.indexOf('land') > -1}
                  handleChange={() => this.onUpdate('land')}
                >
                  Участок
                </StCheckbox>
                {isResaleProperty && (
                  <StCheckbox
                    checked={items.indexOf('townhouse') > -1}
                    handleChange={() => this.onUpdate('townhouse')}
                  >
                    Таунхаус
                  </StCheckbox>
                )}
                {isResaleProperty && (
                  <StCheckbox
                    checked={items.indexOf('flat') > -1}
                    handleChange={() => this.onUpdate('flat')}
                  >
                    Квартира
                  </StCheckbox>
                )}
              </WrapperKind>

              {primaryTotal > 0 && (
                <StButtonMobile isActive={propertyType === 'primary'} onClick={toggleProperty}>
                  От застройщика
                </StButtonMobile>
              )}
            </Col>

            <BtnShowResults
              isViewOpen={isViewOpen}
              kind="primary"
              block
              size="lg"
              onClick={this.toggleView}
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
        </ShowXsSmMd>
      </Wrapper>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const { settlements } = state;

  return {
    state: {
      settlements,
    },
  };
};

export default connect(pickState)(SettlementFilter);
