import styled from 'styled-components';

import media from 'styles/media';

import UI from 'ui';

const {
  Grid: { Container },
} = UI;

export const Wrapper = styled.div`
  background: ${p => p.theme.brandWhite};
`;

export const ListWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

export const DescWrapper = styled.div`
  display: none;
  padding: 3rem 0;
`;

export const ContainerRel = styled(Container)`
  position: relative;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
  padding: 0;
  margin: 0 0 2rem;

  ${media.sm`
    display: block;
    font-size: 2.6rem;
    margin: 0 0 2.8rem;
    top: 1.8rem;
  `};
`;

export const OrderWrapper = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 1.5rem;

  ${media.sm`
    top: 2.9rem;
  `} ${media.md`
    top: 4.2rem;
  `};
`;

export const BtnWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5rem 0;
  background: ${p => p.theme.brandWhite};
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

// seoText

export const SeoTitle = styled.h2`
  font-size: 1.8rem;
  line-height: 2.3rem;
  font-weight: 300;
  color: #000000;
  text-align: left;
  margin: 0;

  ${media.sm`
    font-size: 2.4rem;
    line-height: 3.2rem;
  `};
`;

export const SeoText = styled.p`
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #232323;
  text-align: left;

  ${media.sm`
    font-size: 1.6rem;
    line-height: 2.4rem;
  `};
`;
