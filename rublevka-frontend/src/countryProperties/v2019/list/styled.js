import styled from 'styled-components';

import media from '../../../styles/media';

export const WrapperBase = styled.div`
  margin: 8px 0;
  padding: 16px 10px;

  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #eeeeee;
  border-radius: 4px;

  ${media.xs`
    margin: 16px -5px;
    padding: 24px;
  `}

  ${media.md`
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    border-radius: 0;
  `}
`;

export const Title = styled.h1`
  margin: 0;
  margin-top: 8px;
  margin-bottom: 16px;
  line-height: 28px;
  font-size: 21px;

  color: #232323;

  ${media.sm`
    margin: 0;
    font-size: 28px;
    margin-top: 8px;
  `}

  ${media.md`
    margin-top: 0px;
    font-size: 32px;
  `}
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;

  ${media.sm`
    margin-top: 22px;
    margin-bottom: 26px;
  `}

  ${media.md`
     margin-bottom: 30px;
   `}
`;

export const HeaderWrapper = styled.div`
  ${media.md`
    padding-left: 14px;
  `}
`;
