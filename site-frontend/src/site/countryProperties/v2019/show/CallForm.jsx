import React from 'react';
import styled from 'styled-components';

import { FormattedNumber } from 'react-intl';

import media from 'site/styles/media';
import { WrapperBase, Title as TitleBase } from './styled';
import UI from 'site/ui';

const { Visibility } = UI;

const Wrapper = styled(WrapperBase)`
  ${media.md`
    width: 100%;
    padding: 24px 20px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
  `}
`;

const Title = styled(TitleBase)`
  text-align: center;

  ${media.md`
    display: none;
  `}
`;

const Body = styled.p`
  margin: 4px 0px;
  line-height: 21px;
  font-size: 15px;
  text-align: center;

  color: #232323;
`;

const Price = styled.p`
  margin: 0;
  line-height: 29px;
  font-size: 24px;
  font-weight: 500;

  color: #232323;
`;

const SmallPrice = styled.p`
  margin: 0;
  margin-top: 6px;
  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.352941px;

  color: rgba(35, 35, 35, 0.5);
`;

const Divider = styled.div`
  margin: 24px -20px;
  width: calc(100% + 40px);
  height: 1px;
  background-color: #eeeeee;
`;

const Author = styled.div`
  padding-right: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 10px;
  background-color: #eeeeee;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.45px;
  text-transform: uppercase;
  color: #232323;
`;

const Position = styled.p`
  margin: 0;
  margin-top: 4px;
  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.352941px;
  color: rgba(35, 35, 35, 0.5);
`;

const CallbackForm = styled.form`
  margin-top: 4px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0px 15px;
  padding-top: 17px;
  padding-bottom: 20px;
  margin-top: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: none;

  line-height: 18px;
  font-size: 15px;
  letter-spacing: 0.535714px;
  text-transform: uppercase;
  font-weight: bold;

  &::-webkit-placeholder {
    color: #aaaaaa;
  }
`;

const Callback = styled.button`
  margin-top: 16px;
  padding: 21px 32px 17px 32px;
  line-height: 18px;
  font-size: 15px;
  letter-spacing: 0.47px;
  text-transform: uppercase;
  background: #47b34c;
  border-radius: 8px;
  border: none;
  font-weight: bold;

  color: #ffffff;

  ${media.md`
    width: 100%;
  `}
`;

const Agreement = styled.p`
  margin: 0;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.1px;

  color: #232323;
`;

const Link = styled.a`
  margin: 0;
  text-decoration: none;
  color: #f44336;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.1px;
`;

export default ({ priceData: { currency, price, priceForBlock }, kind }) => (
  <Wrapper>
    <Visibility md="hidden" lg="hidden">
      <Title>Обратный звонок</Title>
      <Body>
        Понравился дом? Оставьте заявку ниже и наш менеджер свяжется с вами в течение дня.
      </Body>
    </Visibility>
    <Visibility xs="hidden" sm="hidden">
      <Price>
        <FormattedNumber
          style="currency"
          maximumSignificantDigits={1}
          currency={currency}
          value={price}
        />
      </Price>
      {kind === 'land' && (
        <SmallPrice>
          <FormattedNumber
            style="currency"
            maximumSignificantDigits={1}
            currency={currency}
            value={priceForBlock}
          />{' '}
          / сот.
        </SmallPrice>
      )}
      <Divider />
      {/* <Author>
            {!!data.photo && <Avatar src={`${global.config.cloudfront || cloudfront}/${data.photo.id}`} alt="Фотография агента" />}
            <TextBlock>
              <Name>{data.firstName} {data.lastName}</Name>
              <Position>Агент загородной недвижимости</Position>
            </TextBlock>
          </Author> */}
    </Visibility>
    <CallbackForm>
      <Input type="text" placeholder="Имя" />
      <Input type="text" placeholder="Номер телефона" />
      <Visibility md="hidden" lg="hidden">
        <Callback>Отправить</Callback>
      </Visibility>
      <Visibility xs="hidden">
        <Callback>забронировать просмотр</Callback>
      </Visibility>
    </CallbackForm>
    <Visibility md="hidden" lg="hidden">
      <Agreement>
        Отправляя заявку, вы соглашаетесь с нашей{' '}
        <Link href="/static/privacy-policy.pdf" target="_blank">
          политикой конфиденциальности
        </Link>
        .
      </Agreement>
    </Visibility>
  </Wrapper>
);
