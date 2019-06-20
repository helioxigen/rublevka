import React from 'react';
import styled from 'styled-components';

import InputMask from 'react-input-mask';

import media from '../../styles/media';

import CallbackModal from '../../request/v2019/CallbackModal';
import UI from '../../ui/v2019';
import uis from '../../uis';
import CallbackForm from '../../ui/v2019/organisms/CallbackForm';

const {
  Grid: { Container, Col },
  Button,
  Visibility,
} = UI;

const Wrapper = styled.div`
  background: url(${require('./img/call.bg.jpg')}) center / cover no-repeat;
  padding: 32px 0;
  margin: 0 -10px;
  color: white;

  ${media.xs`
    margin: 30px 0px;
    padding: 80px 45px;
    background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);
    color: #232323;
  `}

  ${media.md`
    padding: 176px 114px;
  `}
`;

const Heading = styled.h3`
  margin: 0;
  line-height: 32px;
  font-size: 24px;
  text-align: center;

  ${media.xs`
    margin-bottom: 16px;
    line-height: 48px;
    font-size: 40px;
    text-align: left;
  `}

  ${media.md`
    margin-bottom: 28px;
    line-height: 56px;
    font-size: 48px;
  `}
`;

const Body = styled.p`
  margin: 0;
  margin-top: 12px;
  margin-bottom: 16px;
  line-height: 24px;
  font-size: 15px;
  text-align: center;

  ${media.xs`
    margin: 0;
    margin-bottom: 20px;
    line-height: 26px;
    font-size: 16px;
    text-align: left;
  `}

  ${media.md`
    margin: 0;
    line-height: 30px;
    font-size: 18px;
  `}
`;

const CallbackBtn = styled(Button)`
  position: static;
  z-index: unset;
  margin-top: 16px;
  padding: 20px 24px;
  line-height: 18px;
  font-size: 15px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 8px;
  border: none;
  font-weight: bold;

  color: #ffffff;

  ${media.md`
    margin-top: 36px;
    margin-bottom: 44px;
    padding: 23px 24px;
    border-radius: 6px;
    border: none;
    line-height: 18px;
    font-size: 17px;
  `}
`;

export default class extends React.Component {
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
    return (
      <Container>
        <Wrapper>
          <Col xs="12" lg="10">
            <Heading>Хотите продать дом?</Heading>
            <Body>
              Просто оставьте заявку. Наш агент свяжется с вами и поможет всё
              организовать: проведёт фотосессию, создаст рекламную кампанию,
              покажет дом и подготовит сделку.
            </Body>
            <Visibility lg="hidden">
              <Col xs="12" sm="6">
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
                  submitLabel="Оставить заявку"
                />
              </Col>
            </Visibility>
            <Visibility xs="hidden" sm="hidden" md="hidden">
              <CallbackModal>
                <CallbackBtn kind="success">Оставить заявку</CallbackBtn>
              </CallbackModal>
            </Visibility>
          </Col>
        </Wrapper>
      </Container>
    );
  }
}
