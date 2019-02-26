import styled from 'styled-components';

import media from 'site/styles/media';
import UI from 'site/ui/v2019';

const {
  Button,
  BtnGroup,
  Icon,
} = UI;

export const ResetText = styled.span`
  font-size: 16px;
  color: #F44336;
`;

export const Text = styled.span`
  font-size: 16px;
  color: #F44336;

  ${media.sm`
    color: #373737;
  `}
`;

export const IconClose = styled(Icon)`
  &&& {
    margin-top: 4px;
    width: 24px;
    height: 24px;
    fill: #B5B5B5;

    &:hover{
      fill: #080808;
    }
  }
`;

export const IconReset = styled(Icon)`
  box-sizing: border-box;
  display: block;
  width: 20px;
  height: 20px;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 1px;
  fill: #080808;

  &:hover{
    fill: #080808;
    background-color: #CBCBCB;
    border-radius: 50%;
  }
`;

export const IconFilter = styled(Icon)`
  &&& {
  width: 14px;
  height: 14px;
  margin-right: 1rem;
  vertical-align: middle;
  fill: #f44336;

  ${media.sm`
    fill: #373737;
  `}
  }
`;

export const DefaultBtn = styled(Button)`
  &&& {
  border: none;
  outline: 0;

    &:hover, &:focus, &:active {
      background: none;
    }
  }
`;

export const ButtonReset = styled(DefaultBtn)`
  &&& {
    ${media.sm`
       padding-left:10px;
    `}
  }
`;

export const ButtonFilter = styled(DefaultBtn)`
  &&& {
    padding: 0;

    ${media.sm`
      padding: 11px 17px;
      font-size: 16px;
      border-radius: 6px;
      border: none;
      color: #373737;
      background: #EEEEEE;
    `}
  }
`;

export const DesktopContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${p => p.isViewOpen ? '0' : '-50%'};
  bottom: 0;
  z-index: 999;

  overflow-y: scroll;

  width: 50%;
  padding: 5rem 1rem;

  background: #FAFAFA;

  transition: .6s cubic-bezier(.86, 0, .07, 1);
  ${media.md`
    position: static;
    padding: 0;
    padding-top: 3px;
    width: 100%;
    overflow: hidden;
  `}
`;

export const Title = styled.div`
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  color: #232323;
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ControlsContainer = styled.div`
  white-space: nowrap;
  padding: 0;

  margin-top: 1.5rem;
  margin-bottom: 2.5rem;

  ${media.md`
    &:first-of-type{
      margin-top: 0;
    }
  `}
`;

export const CheckboxLabel = styled.span`
  font-size: 16px;
  color: #232323;
  cursor: pointer;
`;

export const CheckboxWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const ButtonPrimary = styled(DefaultBtn)`
  &&& {
    display: block;
    position: fixed;
    background: #F44336;
    color: #FFFFFF;
    border-radius: 8px;
    z-index: 9999;
    left: 1.5rem;
    right: 1.5rem;
    bottom: 2rem;
    padding: 1.8rem 0;
    width: calc(100% - 5rem);
    padding: 1.8rem 0;
    text-transform: uppercase;

    &:hover{
      box-shadow: 0px 2px 4px
    }

    ${media.sm`
      right ${p => p.isViewOpen ? '3rem' : '0'};
      left: ${p => p.isViewOpen ? '3rem' : '-50%'};

      width: calc(50% - 6rem);
      padding: 2rem 0;

      font-size: 2rem;
      transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
    `}
  }
`;


export const BtnGroupHead = styled(BtnGroup)`
  &&& {
    box-sizing: border-box;
    position: fixed;
    background: #ffffff;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    width: 100%;

    ${media.sm`
      padding-left: 10px;
      padding-right: 25px;
      width: 50%;
      transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
      left: ${p => p.isViewOpen ? 0 : '-50%'}
    `}
  }
`;
