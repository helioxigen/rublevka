import React from 'react';
import Breadcrumbs from '../Breadcrumbs';
import { Wrapper as WrapperBase, Header } from '../list/Hero';

import UI from '../../../ui';
import media from '../../../styles/media';

const {
  Grid: { Container },
} = UI;

const Wrapper = WrapperBase.extend`
  height: 175px;

  nav {
    position: absolute;
  }

  > * {
    height: 100%;
  }

  ${Header} {
    padding: 0;

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  ${media.xs`
    display: block;
    height: 284px;
  `}

  ${media.md`
    height: 358px;
  `}
`;

// const Additional = styled.p`
//   margin: 0;
//   margin-top: 12px;
//   line-height: 24px;
//   font-size: 16px;
//   text-align: center;
//   padding-bottom: 48px;

//   color: #ffffff;

//   ${media.xs`
//     line-height: 28px;
//     font-size: 18px;
//     margin-top: 16px
//     padding-bottom: 80px;
//   `}

//   ${media.md`
//     line-height: 32px;
//     font-size: 21px;
//     margin-top: 27px;
//     padding-bottom: 135px;
//   `}
// `;

export default ({ data = {} }) => (
  <Wrapper>
    <Container>
      <Breadcrumbs data={data} />
      <Header>{`Посёлок ${data.name || ''}`}</Header>
      {/* <Additional>Короткое SEO-описание посёлка с интересное информацией <br />
        или выделением его особенностей.
      </Additional> */}
    </Container>
  </Wrapper>
);
