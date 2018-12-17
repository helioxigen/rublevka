import styled from 'styled-components';
import media from 'site/styles/media';

import UI from 'site/ui';

const { Button, BtnGroup, Icon, Checkbox } = UI;

export const Wrapper = styled.div`
  padding: 3rem 0 3.5rem;

  ${media.sm`
    padding: 3rem 0 1rem;
  `} ${media.md`
    padding: 4rem 0 1rem;
  `};
`;

export const StButton = styled(Button)`
  border: 1px solid #f5f5f5;
  color: ${p => p.theme.greyBlue};
  font-size: 1.6rem;
  display: inline-block;
  padding: 1rem 2.8rem;
  margin: 0 1rem 2rem 0;
  background: #f5f5f5;
  line-height: 1;
  border-radius: 10rem;
  border: none;
  &:focus,
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: ${p => p.theme.greyBlue};
  }
  ${p =>
    p.isActive &&
    `
    background: #687981;
    color: #fff;
    &:hover, &:active, &:focus {
      background: #687981;
      color: #fff;
    }
  `};
`;

export const StButtonMobile = StButton.extend`
  width: 100%;
`;

export const ResetBtn = StButton.extend`
  color: ${p => p.theme.brandPrimary};
  &:hover {
    color: ${p => p.theme.brandPrimary};
  }
`;

export const DealTypeBtn = StButton.extend`
  width: 50%;
  margin-right: 0;
  padding: 0.9rem 2rem;
`;

export const DealTypeBtnMobile = styled(Button)`
  width: 50%;
  border: 1px solid ${p => p.theme.greyBlue};
  color: ${p => p.theme.greyBlue};
  font-size: 1.6rem;
  display: inline-block;
  padding: 1.2rem 0;
  &:focus,
  &:hover {
    background: #fff;
    color: ${p => p.theme.greyBlue};
  }
  ${p =>
    p.isActive &&
    `
    background: #687981;
    color: #fff;
    &:hover, &:active, &:focus {
      background: #687981;
      color: #fff;
    }
  `};
`;

export const DealTypeBtnGroup = styled(BtnGroup)`
  width: 100%;
  margin: 1.5rem 0;

  ${DealTypeBtn}:first-child, ${DealTypeBtnMobile}:first-child {
    border-top-left-radius: 10rem;
    border-bottom-left-radius: 10rem;
  }
  ${DealTypeBtn}:last-child, ${DealTypeBtnMobile}:last-child {
    border-top-right-radius: 10rem;
    border-bottom-right-radius: 10rem;
  }

  ${media.md`
    width: auto;
    margin: 0 3rem 0 0;
  `};
`;

export const FiltersWrapper = styled.div`
  position: fixed;
  top: 0;
  left: -100%;
  bottom: 0;
  right: 0;
  z-index: 999;
  overflow-y: scroll;
  width: 100%;
  padding: 7.8rem 1rem;
  background: ${p => p.theme.brandWhite};
  transition: 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  ${p =>
    p.isViewOpen &&
    `
    left: 0;
  `} ${media.xs`
    right: unset;
    width: 34rem;
    ${p =>
      p.isViewOpen &&
      `
      left: 0;
    `}
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

export const BtnShowResults = styled(Button)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  left: -100%;
  z-index: 9999;
  width: calc(100% - 4rem);
  padding: 1.8rem 0;
  border-radius: 10rem;
  transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  &:hover {
    z-index: 9999;
  }
  ${p =>
    p.isViewOpen &&
    `
    left: 2rem;
  `} ${media.xs`
    z-index: 5;
    left: -34rem;
    width: 28rem;
    padding: 1.6rem 0;
    font-size: 1.5rem;
    ${p =>
      p.isViewOpen &&
      `
      left: 2rem;
    `};
  `};
`;

export const StBtnGroup = styled(BtnGroup)`
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 9999;
  display: flex;
  width: 100%;
  background: ${p => p.theme.brandWhite};
  border-bottom: 1px solid #eeeeee;
  transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  ${p =>
    p.isViewOpen &&
    `
    left: 0;
  `} ${media.xs`
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

export const ResetBtnMobile = styled(Button)`
  padding: 2.6rem 2rem;
  text-align: left;
  font-size: 1.8rem;
  color: #c4c4c4;
  border: none;
  &:hover,
  &:focus {
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

export const Title = styled.div`
  margin: 1rem 2rem 2rem 0;
  font-size: 1.8rem;
  color: ${p => p.theme.brandBlack};
  font-weight: 500;
  line-height: 1;
`;

export const WrapperKind = styled.div`
  padding: 0 2rem 3rem 0;
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
