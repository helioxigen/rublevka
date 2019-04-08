import styled from 'styled-components';

import media from 'styles/media';

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

export const Title = styled.h2`
  margin: 0;
  margin-top: 16px;
  line-height: 24px;
  font-size: 16px;

  color: #232323;

  &:first-of-type {
    margin-top: 0px;
  }

  ${media.xs`
    line-height: 28px;
    font-size: 21px;
    margin-top: 28px;
  `}

  ${media.md`
    &:first-of-type {
      margin-top: 16px;
    }
  `}
`;
