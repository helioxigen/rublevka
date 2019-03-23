import React from 'react';
import Breadcrumbs from '../Breadcrumbs';
import { Wrapper as WrapperBase, Header } from '../list/Header';

import UI from '../../../ui';
import media from '../../../styles/media';

const {
  Grid: { Container },
} = UI;

const Wrapper = WrapperBase.extend`
  min-height: 256px;

  ${media.xs`
    min-height: 284px;
  `}

  ${media.md`
    min-height: 358px;
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
