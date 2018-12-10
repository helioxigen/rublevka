import React from 'react';

import SellPropertyModal from 'site/request/SellPropertyModal';

import { BlockWrapper, SellProperty, TextWrapper, TitleSale, Btn, ColSale } from './styled';

export default () => (
  <ColSale xs="12" sm="6">
    <BlockWrapper>
      <SellProperty bgUrl="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/mainpage-sellProperty.jpg">
        <TextWrapper>
          <TitleSale>Хотите продать дом?</TitleSale>
          <SellPropertyModal>
            <Btn kind="success" size="sm">
              Оставить заявку
            </Btn>
          </SellPropertyModal>
        </TextWrapper>
      </SellProperty>
    </BlockWrapper>
  </ColSale>
);
