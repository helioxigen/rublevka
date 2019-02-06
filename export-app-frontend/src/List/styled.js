import styled, { css } from 'styled-components';
import { media } from '../UI';

export const CardSt = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px 0;

  ${media.greaterThan('sm')`
    flex-direction: row;
    align-items: center;
  `}

  border-bottom: 1px solid #edeff5;

  ${p => p.isLoading
    && css`
      background-color: #a1ecc7;
      margin: 0 -24px;
      padding: 16px 24px;
    `}

  &:last-child {
    border-bottom-color: transparent;
  }
`;

export const Header = styled.div`
  flex-basis: 30%;
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  max-height: 48px;
  margin-right: 16px;
  width: 96px;
  object-fit: cover;
  border-radius: 4px;
`;

export const ID = styled.div`
  flex-basis: 30%;
  font-weight: bold;
`;

export const Price = styled.div`
  flex-basis: 45%;
  text-align: right;
  font-size: 24px;

  ${media.greaterThan('sm')`
    font-size: 14px;
    text-align: left;
  `}
`;

export const Title = styled.div`
  flex-basis: 45%;
  font-weight: bolder;
  margin: 12px 0 16px 0;

  ${media.greaterThan('sm')`
    margin: 0;
  `}
`;

export const SubTitle = styled.p`
  color: #adadad;
  margin: 6px 0 0;
  font-weight: normal;
`;

export const ActionsAndOptions = styled.div`
  flex-basis: 25%;
  display: flex;

  align-items: center;

  ${media.greaterThan('sm')`
    align-items: normal;
  `}
`;

export const Options = styled.div`
  flex-basis: 80%;
`;

export const Actions = styled.div`
  flex-basis: 30%;
  text-align: right;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;

  &[disabled] {
    opacity: 0.3;
  }

  img {
    height: 28px;
    vertical-align: middle;
  }
`;
