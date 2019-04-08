import styled from 'styled-components';

import media from 'styles/media';

export const Wrapper = styled.div`
  background: ${p => p.theme.brandWhite};
`;

export const ListWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

export const OrderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 3rem 0;
`;

export const PaginationWrapper = styled.div`
  margin: 0 -1.5rem;
  border-top: 1px solid #e8e8e8;
  padding: 3.5rem 0 3rem;
  text-align: center;

  ${media.sm`
    margin: 0;
    border-top: 0;
    padding: 3.5rem 0 2rem;
  `};
`;
