import React from 'react';
import styled from 'styled-components';
import global from 'window-or-global';
import cn from 'classnames';

import StaticMask from '../../core/components/ui/staticMask';
import RequestModal from '../request/selectionModal';
import s from '../styles/components/request.css';
import sUtils from '../styles/utils.css';
import media from '../styles/media';
import UI from '../ui';

const { Button } = UI;

const Wrapper = styled.div`
  margin-top: 8px;
  position: relative;
  padding-top: 5.7rem;
  padding-bottom: 6.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-width: 100%;

  color: #fff;

  background: rgba(93, 91, 120, 0.84)
    url(//s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/satellites-background.jpg)
    center bottom no-repeat;
  background-size: cover;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: rgba(93, 91, 120, 0.84);
  }

  ${media.sm`
    padding-top: 7rem;
    padding-bottom: 8.7rem;
  `}

  ${media.md`
    margin-top: 0px;
  `}
`;

const InnerWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const NotFound = ({ resetFilter }) => (
  <Wrapper>
    <InnerWrapper>
      <h2 className={cn(s.titleMd, s.light)}>На сайте нет таких объектов</h2>
      <p className={s.textMd}>Подберем из закрытых предложений?</p>
      <a
        className={cn(s.titleMd, sUtils.pushedTopXs3Sm1_5)}
        href={`tel:+${global.config.phones.country}`}
        id="comagicDTPhoneNumber"
      >
        <StaticMask pattern="+1 (111) 111-11-11">
          {global.config.phones.country}
        </StaticMask>
      </a>

      <div>
        <RequestModal category="country">
          <Button
            className={cn(s.btn, sUtils.pushedTopXs2Sm5)}
            kind="success"
            size="lg"
          >
            Заказать звонок
          </Button>
        </RequestModal>
        <Button
          className={cn(s.btnRound, sUtils.pushedTopXs2Sm5)}
          onClick={resetFilter}
        >
          Сбросить фильтр
        </Button>
      </div>
    </InnerWrapper>
  </Wrapper>
);

export default NotFound;
