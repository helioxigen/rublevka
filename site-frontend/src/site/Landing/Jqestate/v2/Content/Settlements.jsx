import React from 'react';

import {
  ColSettlements,
  BlockWrapper,
  ImgBg,
  LinksNoTitle,
  TitleBg,
  StLink,
  StLinkLast,
  TextWrapper,
  Break,
} from './styled';

export default () => (
  <ColSettlements xs="12" sm="6">
    <BlockWrapper>
      <ImgBg bgUrl="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/mainpage-settlements.jpg">
        <TextWrapper>
          <TitleBg>
            Лучшие&nbsp;
            <Break />
            посёлки
          </TitleBg>
        </TextWrapper>
      </ImgBg>
      <LinksNoTitle>
        <StLink to="/zagorodnaya/kottedzhnye-poselki/nykolyno_235">
          Николино
        </StLink>
        <StLink to="/zagorodnaya/kottedzhnye-poselki/zhukovka_241">
          Жуковка
        </StLink>
        <StLink to="/zagorodnaya/kottedzhnye-poselki/zhukovka-21_242">
          Жуковка-21
        </StLink>
        <StLink to="/zagorodnaya/kottedzhnye-poselki/landshaft_244">
          Ландшафт
        </StLink>
        <StLinkLast to="/zagorodnaya/kottedzhnye-poselki/barvykha-21_307">
          Барвиха-21
        </StLinkLast>
      </LinksNoTitle>
    </BlockWrapper>
  </ColSettlements>
);
