/* eslint-disable react/style-prop-object */
import React from 'react';
import styled from 'styled-components';

import { FormattedNumber } from 'react-intl';
import InputMask from 'react-input-mask';

import media from '../../../styles/media';
import UI from '../../../ui';
import { WrapperBase, Title as TitleBase } from './styled';
import agentAvatar from './img/avatar.jpg';
import uis from '../../../uis';
import CallbackForm from '../../../ui/v2019/organisms/CallbackForm';

const { Visibility, Icon } = UI;

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

  color: rgba(35, 35, 35, 0.5);
`;

const Divider = styled.div`
  margin: 24px -20px;
  width: calc(100% + 40px);
  height: 1px;
  background-color: #eeeeee;
`;

const Agent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Avatar = styled.img`
  min-width: 80px;
  max-width: 80px;
  height: 80px;
  border-radius: 40px;
  object-fit: cover;
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
  letter-spacing: 0.45px;
  font-weight: bold;
  text-transform: uppercase;
  color: #232323;
`;

const Position = styled.p`
  margin: 0;
  margin-top: 4px;
  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(35, 35, 35, 0.5);
`;

const CallbackFormOld = styled.form`
  margin-top: 4px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.md`
    margin-bottom: 0px;
  `}
`;

const Input = styled(InputMask)`
  width: 100%;
  padding: 16px 15px 14px;
  margin-top: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  appearance: none;

  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;

  &::-webkit-input-placeholder {
    color: #aaaaaa;
  }

  ${media.md`
    padding: 17px 15px 15px;
  `}
`;

const Callback = styled.button`
  margin-top: 16px;
  padding: 21px 32px 17px;
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  background: #47b34c;
  border-radius: 8px;
  border: none;
  font-weight: bold;

  color: #ffffff;

  ${media.md`
    padding: 21px 0px 17px;
    width: 100%;
  `}
`;

const Agreement = styled.p`
  margin: 0;
  line-height: 20px;
  font-size: 14px;
  text-align: center;

  color: #232323;
`;

const Link = styled.a`
  margin: 0;
  text-decoration: none;
  color: #f44336;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
`;

const FavoriteWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #aaaaaa;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
`;

const FavoriteIcon = styled(Icon)`
  width: 24px;
  height: 22px;
  stroke: #f44336;
  stroke-width: 2px;
  fill: transparent;
  margin-right: 8px;
`;

const Header = styled.h3`
  margin: 0;
  margin-top: 20px;
  font-weight: 500;
  color: #232323;
  font-size: 24px;
  line-height: 32px;
  font-weight: normal;
  text-align: center;

  ${media.xs`
    margin: 0;
    line-height: 29px;
  `}
`;

export default class CallForm extends React.Component {
  state = {
    sent: false,
    values: {},
  };

  handleValueChange = name => e => {
    this.setState({
      values: {
        ...this.state.values,
        [name]: e.target.value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      values: { name, phone },
    } = this.state;

    uis.send(name, phone.match(/\d+/g).join(''));
    this.setState({ sent: true });
  };

  render() {
    const { sent, values } = this.state;
    const {
      priceData: { currency, price, priceForBlock },
      kind,
      toggleFavorite,
      dealType,
    } = this.props;

    return (
      <Wrapper>
        <Visibility md="hidden" lg="hidden">
          <Title>Обратный звонок</Title>
          <Body>
            Понравился дом? Оставьте заявку ниже и наш менеджер свяжется с вами
            в течение дня.
          </Body>
        </Visibility>
        <Visibility xs="hidden" sm="hidden">
          <Price>
            <FormattedNumber
              style="currency"
              currency={currency}
              value={price}
              maximumSignificantDigits={12}
            />
            {dealType === 'rent' ? ' / месяц' : ''}
          </Price>
          {kind === 'land' && (
            <SmallPrice>
              <FormattedNumber
                style="currency"
                currency={currency}
                value={Math.round(priceForBlock)}
                maximumSignificantDigits={12}
              />{' '}
              / сот.
            </SmallPrice>
          )}
          <Divider />
          <Agent>
            <Avatar src={agentAvatar} alt="Фотография агента" />
            <TextBlock>
              <Name>Елена Зверева</Name>
              <Position>Агент загородной недвижимости</Position>
            </TextBlock>
          </Agent>
        </Visibility>
        <CallbackForm
          fields={{
            name: {
              placeholder: 'Имя',
              required: true,
            },
            phone: {
              placeholder: 'Телефон',
              type: 'tel',
              required: true,
            },
          }}
          fullWidth
          submitLabel="Забронировать просмотр"
        />
        <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
          <Divider />
          <FavoriteWrapper onClick={toggleFavorite}>
            <FavoriteIcon icon="favorite" />В избранное
          </FavoriteWrapper>
        </Visibility>
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
  }
}
