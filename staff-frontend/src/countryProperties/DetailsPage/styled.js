import React from 'react';
import styled, { css } from 'styled-components';
import { Col, Row } from 'react-flexbox-grid';
import { Body, BodyBig, Input, Label, theme, Title, Title2 } from '../../UI';

export const MainTitle = styled(Title)`
  margin-bottom: 10px;
`;

export const SubTitle = styled(Title)`
  margin-bottom: 40px;
`;

export const BodyBigGray = styled(BodyBig)`
  color: ${theme.gray};
`;

export const BodyBigBlue = styled(BodyBig)`
  color: ${theme.blue};
`;

export const PropertyTitle = styled(Label)`
  margin-bottom: 5px;
  white-space: nowrap;
`;

export const PropertySubTitle = styled(Label)`
  display: inline-flex;
  color: ${theme.gray};
  font-weight: normal;
  margin-left: 5px;
`;

export const PropertyBigValue = styled(Title2)`
  margin-bottom: 16px;
`;

export const PropertyValue = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
`;

export const Property = styled(Col)`
  margin-bottom: 40px;
`;

export const PropertyOption = styled(Col)`
  margin-bottom: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
`;

export const PropertyOptionIcon = styled.img`
  width: 18px;
  height: 18px;
  display: block;
  margin-right: 10px;
  margin-top: -3px;
`;

export const SearchIcon = styled.img`
  width: 22px;
  height: 22px;
  display: block;
  position: absolute;
  top: 12px;
  left: 0;
`;

export const PropertyOptionWrapper = styled(Row)`
  margin-bottom: 15.5px;
`;

export const SeparatorLine = styled(Col)`
  height: 1px;
  width: 100%;
  background-color: ${theme.alto};
  margin-bottom: ${props => (props.big ? '70px' : '32px')};
`;

export const PointIcon = styled.img`
  width: 13px;
  height: 17px;
  display: block;
  margin-right: 10px;
`;

export const TitleAddress = styled.h5`
  margin-bottom: 30px;
  display: flex;
  font-weight: normal;

  p {
    line-height: 22px;
  }
`;

export const PhotoCloseButton = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  display: block;
  top: 10px;
  left: 10px;
  background-color: ${theme.blue};
  cursor: pointer;

  &:after,
  &:before {
    content: '';
    display: block;
    position: absolute;
    background-color: #fff;
    height: 10.5px;
    width: 2px;
    left: 13px;
    top: 8px;
  }

  &:after {
    transform: rotate(45deg);
  }

  &:before {
    transform: rotate(-45deg);
  }
`;

export const PlotLocationInput = styled(Input)`
  font-size: 13px;
  font-weight: bold;
`;

export const PlotLocationInfo = styled(BodyBig)`
  margin-bottom: 35px;
`;

export const Photos = styled.div`
  max-width: 100%;
  margin-bottom: 25px;
  display: flex;
  ${({ isViewAll }) =>
    !isViewAll
      ? css`
          flex-wrap: no-wrap;
          overflow-x: scroll;
        `
      : css`
          flex-wrap: wrap;
        `};
`;

export const Photo = styled.img`
  max-height: 256px;
  display: block;
`;

export const EditButton = styled(BodyBigBlue)`
  margin-bottom: 35px;
  cursor: pointer;
`;
export const PhotoEditTools = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
`;

export const PhotoEditTool = styled(BodyBigBlue)`
  margin-right: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
  cursor: pointer;
`;

export const AddPhotoIcon = styled.img`
  width: 17px;
  height: 17px;
  display: block;
  margin-left: 9px;
`;

export const MapWrapper = styled.section`
  margin-bottom: 25px;
`;

export const MainSelectTitle = styled(Title2)`
  margin-bottom: 10px;
`;

export const MainStatusBar = styled(Row)`
  margin-bottom: 12px;
`;

export const Dropdown = styled(Row)`
  margin-bottom: 65px;
`;

export const DropdownTitle = styled(Title2)`
  margin-bottom: 20px;
`;

export const DropdownContainer = styled.div`
  height: 200px;
  border: 1px dotted ${theme.blue};
  background: rgba(49, 116, 246, 0.03);
  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: center;
  padding: 10px 40px;
`;

export const DropdownButton = styled.button`
  padding: 12px 30px 8px 30px;
  background-color: #fff;
  border: 1px solid ${theme.blue};
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const DropdownIcon = styled.img`
  width: 58px;
  height: 50px;
  margin-bottom: 20px;
`;

export const DropdownAnnotation = styled(Body)`
  color: ${theme.black};
  opacity: 0.5;
`;

export const EditPropertyRow = styled(Row)`
  margin-bottom: 50px;
`;

export const EditPropertyInput = styled(Input)`
  font-size: 15px;
  margin-bottom: 25px;
  font-weight: bold;
  width: calc(100% - 20px);
`;

export const PlotInput = styled(Input)`
  font-size: 20px;
  font-weight: bold;
  padding-left: 30px;
`;

export const PlotInputContainer = styled(Col)`
  position: relative;
  margin-bottom: 35px;
`;

export const Separator = ({ big = false }) => (
  <Col>
    <SeparatorLine xs={12} big={big ? 1 : 0} />
  </Col>
);
