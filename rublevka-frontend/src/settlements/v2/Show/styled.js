import styled from 'styled-components';
import media from 'styles/media';

import UI from 'ui';

const {
  Loading,
  LoadMore,
  Grid: { Container },
} = UI;

export const Wrapper = styled.div`
  background: ${p => p.theme.brandWhite};
`;

export const CardWrapper = styled.div`
  background: ${p => p.theme.brandWhite};
  padding: 0 1rem;

  ${media.sm`
    padding: 0 2rem;
  `};
`;

export const StLoading = styled(Loading)`
  padding-bottom: 3rem;
`;

export const StLoadMore = styled(LoadMore)`
  border: none;
  border-radius: 0;
  border-bottom: 1px dashed ${p => p.theme.greyBlue};
  padding: 2rem 0 0.6rem;
  margin-bottom: 4rem;
  background: transparent;
  color: ${p => p.theme.greyBlue};

  &:hover,
  &:focus {
    background: transparent;
    color: ${p => p.theme.greyBlue};
  }
`;

export const OrderWrapper = styled.div`
  position: absolute;
  top: 3rem;
  right: 0rem;

  ${media.md`
    display: none;
  `};
`;

export const Relative = styled(Container)`
  position: relative;
`;

export const ListWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;
