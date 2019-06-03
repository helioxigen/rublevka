import React from 'react';
import styled from 'styled-components';
import { YMaps, Map as YMap, Placemark } from 'react-yandex-maps';

import InputMask from 'react-input-mask';
import Helmet from 'react-helmet';
import { helmet } from '../config/seo';

import StaticMask from '../core/components/ui/staticMask';

import media from '../styles/media';
import UI from '../ui/v2019';
import callIcon from './call.png';
import flagIcon from '../assets/icons/flag.png';
import { ogMeta } from '../helpers';

const isRublevka = global.config.domain === 'rublevka.ru';

const {
  Grid: { Container, Col },
} = UI;

const Wrapper = styled.section`
  background-color: #fafafa;
`;

const TextContainer = styled.div`
  padding-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h3`
  margin: 0;
  line-height: 32px;
  font-size: 24px;
  color: #232323;

  ${media.xs`
    line-height: 48px;
    font-size: 40px;
  `}

  ${media.md`
    line-height: 56px;
    font-size: 48px;
  `}
`;

const TimeText = styled.p`
  margin: 0;
  margin-top: 24px;
  line-height: 34px;
  font-size: 21px;
  text-align: center;

  color: #232323;
`;

const CallLink = styled.a`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const CallIcon = styled.img`
  margin-right: 10px;
  width: 28px;
  height: 28px;
`;

const Phone = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 15px;
  font-weight: 500;
  color: #232323;

  ${media.xs`
    line-height: 28px;
    font-size: 18px;
  `}

  ${media.md`
    line-height: 34px;
    font-size: 21px;
  `}
`;

const Body = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 15px;
  color: #232323;
  margin-top: 12px;

  ${media.xs`
    margin-top: 16px;
    line-height: 28px;
    font-size: 18px;
  `}

  ${media.md`
    line-height: 34px;
    font-size: 21px;
  `}
`;

const BoldText = styled(Body)`
  margin-top: 0;
  margin-bottom: 16px;

  ${media.xs`
    margin-bottom: 24px;
  `}

  ${media.xs`
    font-weight: bold;
    margin-bottom: 32px;
  `}
`;

const FormTitle = styled.p`
  margin: 0;
  margin-top: 40px;
  margin-bottom: 8px;
  text-align: center;
  line-height: 24px;
  font-size: 18px;
  text-align: center;

  color: #232323;
`;

const RequestForm = styled.form`
  margin-top: 4px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &::-webkit-input-placeholder {
    color: #aaaaaa;
  }
`;

const TextInput = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  min-height: 112px;
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

  &::-webkit-input-placeholder {
    color: #aaaaaa;
  }
`;

const SendBtn = styled.button`
  margin-top: 16px;
  padding: 21px 32px 17px 32px;
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  background: #47b34c;
  border-radius: 8px;
  border: none;
  font-weight: bold;

  color: #ffffff;

  ${media.md`
    max-width: 100%;
  `}
`;

const MapContainer = styled.div`
  padding-top: 32px;
  padding-bottom: 48px;
  width: 100%;
  height: 300px;

  ${media.xs`
    height: 522px;
  `}

  ${media.lg`
    height: 640px;
  `}
`;

const { description, title } = helmet.pages.feedback;

export default () => {
  const size =
    typeof window !== 'undefined' && window.outerWidth < 992 ? 48 : 64;

  return (
    <Wrapper>
      <Helmet
        title={helmet.pages.feedback.title}
        meta={[
          { name: 'description', content: helmet.pages.feedback.description },
          ...ogMeta({
            title,
            description,
          }),
        ]}
      />
      <Container>
        <TextContainer>
          <Heading>Есть вопросы?</Heading>
          <TimeText>
            Вы можете задать их в будние дни с 10:00 до 20:00 по телефону
            горячей линии:
          </TimeText>
          <CallLink href={`tel:+${isRublevka ? '74954323322' : '74954321313'}`}>
            <CallIcon src={callIcon} />
            <Phone>
              <StaticMask pattern="+1 (111) 111-11-11">
                {isRublevka ? '74954323322' : '74954321313'}
              </StaticMask>
            </Phone>
          </CallLink>
        </TextContainer>
        <FormTitle>Или задайте вопрос через форму ниже:</FormTitle>
        <Col md="4" mdOffset="4">
          <RequestForm>
            <Input type="text" placeholder="Имя" />
            <Input type="tel" mask="+9 (999) 999-99-99" placeholder="телефон" />
            <TextInput placeholder="Текст" />
            <SendBtn>Отправить</SendBtn>
          </RequestForm>
        </Col>
        <TextContainer>
          <Heading>Как нас найти</Heading>
          <Body>Наш офис находится по адресу:</Body>
          <BoldText>Рублёво-Успенское шоссе, Жуковка, 44А</BoldText>
        </TextContainer>
        <MapContainer>
          <YMaps>
            <YMap
              instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
              defaultState={{ center: [55.734871, 37.249479], zoom: 15 }}
              width="100%"
              height="100%"
              modules={['layout.Image']}
            >
              <Placemark
                geometry={[55.734871, 37.249479]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: flagIcon,
                  iconImageSize: [size, size], // размер иконки
                  iconImageOffset: [(-1 * size) / 2, (-1 * size) / 2], // позиция иконки
                }}
              />
            </YMap>
          </YMaps>
        </MapContainer>
      </Container>
    </Wrapper>
  );
};
