import styled from 'styled-components';
import media from 'styles/media';

import { Link } from 'react-router';

import UI from 'ui';

const { Icon, BtnGroup, Button, Checkbox } = UI;

export const Section = styled.section`
  padding-top: 0;
  ${media.md`
    padding-top: 1.3rem;
  `};
`;

export const Overlay = styled.div`
  opacity: 0;
  ${p =>
    p.isViewOpen &&
    `
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 998;
      background: rgba(0, 0, 0, .6);
      opacity: 1;
      transition: opacity .35s linear;
  `};
`;

export const ResetBtn = styled(Button)`
  padding: 2.6rem 2rem;
  text-align: left;
  font-size: 1.8rem;
  color: #c4c4c4;
  border: none;
  &:hover {
    background: transparent;
    color: #c4c4c4;
  }

  ${media.sm`
    padding: 2.6rem 2rem 2rem;
    font-size: 1.4rem;
  `};

  ${p =>
    p.filterCount &&
    `
      color: #ff4c4e;
  `};
`;

export const FiltersWrapper = styled.div`
  position: fixed;
  top: 0;
  left: -34rem;
  bottom: 0;
  z-index: 999;
  overflow-y: scroll;
  width: 34rem;
  padding: 7.8rem 1rem;
  background: ${p => p.theme.brandWhite};
  transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  text-align: left;
  ${p =>
    p.isViewOpen &&
    `
    left: 0;
  `};
`;

export const FilterMobile = styled.div`
  padding: 2.5rem 0;
  background: #ffffff;
  max-width: 22rem;

  ${media.sm`
    max-width: inherit;
    padding: 3rem 0;
  `};
`;

export const ResetFilter = styled.span`
  margin-right: 1rem;
`;

export const StBtnGroup = styled(BtnGroup)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  width: 100%;
  background: ${p => p.theme.brandWhite};
  border-bottom: 1px solid #eeeeee;
  transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);

  ${media.sm`
    left: -34rem;
    width: 34rem;
    padding-left: 1rem;
    ${p =>
      p.isViewOpen &&
      `
      left: 0;
    `};
  `};
`;

export const Header = styled.header`
  padding: 3rem 0;
  background: ${p => p.theme.brandWhite};
  ${media.sm`
    padding-bottom: 1rem;
  `};
  ${media.md`
    padding: 4.2rem 0 0rem;
  `};
`;

export const FilterBtnWrapper = styled.div`
  margin-bottom: 1rem;

  ${media.sm`
    margin-bottom: 3rem;
  `};
`;

export const BtnShowResults = styled(Button)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  left: 2rem;
  z-index: 9999;
  width: calc(100% - 4rem);
  padding: 1.8rem 0;
  border-radius: 10rem;
  &:hover {
    z-index: 9999;
  }

  ${media.sm`
    z-index: 5;
    left: -34rem;
    width: 28rem;
    padding: 1.6rem 0;
    font-size: 1.5rem;
    transition: .6s cubic-bezier(.86, 0, .07, 1);
    ${p =>
      p.isViewOpen &&
      `
      left: 2rem;
    `};
  `};
`;

// filters

export const Wrapper = styled.div`
  padding-right: 0;
  padding-left: 0;
`;

export const FilterWrapper = styled.div`
  padding: 1.6rem 2rem 1.2rem;
`;

export const FilterWrapperKind = FilterWrapper.extend`
  padding-bottom: 0.2rem;

  ${media.sm`
    padding-bottom: 0;
    padding: 1.6rem 2rem 1.2rem;
  `};
`;

export const SelectWrapper = styled.div`
  white-space: nowrap;
  padding: 0;
  margin: 1.5rem 0 1.6rem 0.5rem;

  ${media.sm`
    margin: 1.5rem 0 1.5rem 0.5rem;
  `};
`;

export const Title = styled.div`
  margin: 1rem 2rem 0.2rem;
  font-size: 1.8rem;
  color: ${p => p.theme.brandBlack};
  font-weight: 500;
  line-height: 1;

  ${media.sm`
    margin: 0.8rem 2rem 0;
  `};
`;

export const StCheckbox = styled(Checkbox)`
  margin-bottom: 1.3rem;
  & input {
    background: #f1f1f1;
    border: none;
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
    vertical-align: bottom;
  }
  & label {
    color: ${p => p.theme.doveGray};
    font-size: 1.6rem;
  }

  ${media.sm`
    margin-bottom: 1.2rem;
  `};
`;

export const Unit = styled.div`
  position: relative;
  display: inline-table;
  font-size: 1.6rem;
  margin: 0.6rem 0 0 1rem;
  height: 3.5rem;
  vertical-align: text-top;

  ${media.md`
    margin: 1rem 0 0 1.5rem;
  `};
`;

export const CurrencySelect = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 1rem;
  border: none;
  border-radius: 0.4rem;

  ${media.md`
    border: none;
    padding: 0;
    margin: 0 0 0 1.5rem;
  `};
`;

export const CurrencySelectMobile = styled.select`
  position: absolute;
  top: -1.3rem;
  font-size: 1.4rem;
  outline: none;
  border: 1px solid #e8e8e8;
  background: none;
  padding: 1rem 1.5rem;
  /*for WebKit*/
  -webkit-appearance: none;
  /* for FF */
  -moz-appearance: none;
  text-indent: 0.01px;
  text-overflow: '';
  /* for IE */
  -ms-appearance: none;
  appearance: none !important;
`;

export const SelectedCurrency = styled.div`
  font-size: 1.4rem;
  padding: 0.7rem 1.2rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid #e8e8e8;
  cursor: pointer;

  ${media.sm`
    position: absolute;
    padding: 1rem 1.5rem;
    top: -0.1rem;
  `};
`;

export const CurrencyOptions = styled.div`
  position: absolute;
  display: ${p => (p.isHidden ? 'none' : 'block')};
  margin-top: 0.8rem;
  background: #fff;
  text-align: center;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.4rem;
  top: 3.8rem;
  left: 0.1rem;
  z-index: 1;
`;

export const CurrencyItem = styled.div`
  width: 100%;
  font-size: 1.4rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  ${p =>
    p.isActive &&
    `
    background: #fafafa;
    pointer-events: none;
    cursor: default;
  `};

  &:hover {
    background: ${p => p.theme.bodyBg};
  }
`;

export const CurrencyItemLast = CurrencyItem.extend`
  border-width: 0 1px 1px;
  border-radius: 0 0 0.4rem 0.4rem;
`;

export const MobileWrapper = styled.div`
  display: none;
  ${p =>
    p.isViewOpen &&
    `
    display: block;
  `};
`;

export const FilterItem = styled.span`
  display: inline-block;
  margin-right: 1.2rem;
  margin-bottom: 2.3rem;
  padding: 0.6rem 0.6rem 0.6rem 1.2rem;
  font-size: 1.6rem;
  vertical-align: top;
  background: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 10rem;
  cursor: default;
  transition: all 0.3s;
  &:hover {
    background-color: #e5e5e5;
    border-color: #e5e5e5;
    cursor: pointer;
  }
`;

export const FilterItemBtn = styled(Button)`
  margin-left: 1rem;
  padding: 0;
  background: transparent;
  border: none;
  &:hover,
  &:focus {
    background: transparent;
  }
`;

export const FilterItemIcon = styled(Icon)`
  width: 1.8rem;
  height: 1.8rem;
  fill: #c3c3c3;
`;

export const HeaderResetBtn = FilterItem.extend`
  color: ${p => p.theme.brandPrimary};
  padding: 0.6rem 1.7rem;
  margin-right: 1.5rem;
  &:hover,
  &:focus {
    background-color: #e5e5e5;
    border-color: #e5e5e5;
    cursor: pointer;
  }
`;

export const CloseBtn = styled(Button)`
  background: #fff;
  border: none;
  outline: none;
  width: 6rem;
  padding-right: 2rem;

  &:hover,
  &:active,
  &:focus {
    background: transparent;
  }
`;

export const StIcon = styled(Icon)`
  width: 3rem;
  height: 3rem;
  vertical-align: text-bottom;
  fill: ${p => p.theme.greyBlue};
  cursor: pointer;
`;

export const StLink = styled(Link)`
  color: #636363;
  &:active,
  &:focus {
    color: #636363;
  }
`;
