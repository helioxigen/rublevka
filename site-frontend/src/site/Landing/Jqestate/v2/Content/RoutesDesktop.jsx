import React from 'react';

import {
  BlockWrapper,
  ImgBg,
  LinksNoTitle,
  TitleBg,
  StLink,
  TextWrapper,
} from './styled';

export default () => (
  <BlockWrapper>
    <ImgBg
      bgUrl="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/mainpage-routes.jpg"
      overlayOpacity=".1"
    >
      <TextWrapper>
        <TitleBg>
          Популярные&nbsp;
          <br />
          направления
        </TitleBg>
      </TextWrapper>
    </ImgBg>
    <LinksNoTitle>
      <StLink to="/zagorodnaya/shosse/rublevo-uspenskoe_1178/prodaja/">
        Рублево-Успенское
      </StLink>
      <StLink to="/zagorodnaya/shosse/novorijskoe_1186/prodaja/">
        Новорижское
      </StLink>
      <StLink to="/zagorodnaya/shosse/ilinskoje_1192/prodaja">Ильинское</StLink>
      <StLink to="/zagorodnaya/shosse/mynskoe_1179/prodaja">Минское</StLink>
      <StLink to="/zagorodnaya/shosse/kyevskoe_1177/prodaja">Киевское</StLink>
    </LinksNoTitle>
  </BlockWrapper>
);
