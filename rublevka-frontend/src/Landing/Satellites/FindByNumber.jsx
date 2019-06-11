import React from 'react';
import styled from 'styled-components';

import InputMask from 'react-input-mask';

import media from '../../styles/media';

import CallbackModal from '../../request/v2019/CallbackModal';
import UI from '../../ui/v2019';
import { WrapperForm } from './Form/styled';
import PropertyNumber from './Form/PropertyNumber';

const {
  Grid: { Container, Col },
  Button,
  Visibility,
} = UI;

const Wrapper = styled.div`
  background: #f6f6f6;

  margin: 40px -10px;
  padding: 32px 0;

  ${media.xs`
    display: none;
  `}

  button {
    margin: 0;
  }

  div:last-child {
    flex-wrap: unset;

    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    button {
      flex: 1 0 35%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const Heading = styled.h3`
  margin: 0;
  line-height: 32px;
  font-size: 24px;
  text-align: center;
  color: #232323;

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
  margin-bottom: 20px;
  line-height: 24px;
  font-size: 15px;
  text-align: center;
  color: #232323;

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
  padding: 17px 24px 20px 24px;
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

const CallbackForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.sm`
    margin-left: -15px;
    align-items: flex-start;
  `}
`;

const Input = styled(InputMask)`
  width: 100%;
  padding: 0px 15px;
  padding-top: 17px;
  padding-bottom: 20px;
  margin-top: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  appearance: none;

  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;

  &::placeholder {
    color: #aaaaaa;
  }
`;

export default class FindByNumber extends React.Component {
  navigate = link => {
    const { history } = this.props;

    history.push(link);
  };

  render() {
    return (
      <Container>
        <Wrapper>
          <Col xs="12" lg="10">
            <Heading>Знаете номер объекта?</Heading>
            <Body>
              Введите номер объекта в поле ниже и сразу перейдите к просмотру.
            </Body>
            <PropertyNumber
              placeholder="НОМЕР ОБЪЕКТА"
              label="ПОКАЗАТЬ"
              navigate={this.navigate}
            />
          </Col>
        </Wrapper>
      </Container>
    );
  }
}
