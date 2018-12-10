import React from 'react';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
  Button,
} = UI;

import ModalChangeState from '../modal/changeState';

import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const SubmitButton = ({ children, className, kind, disabled, ...props }) => (
  <Button {...props} className={cn(sButton.btnWide, className)} kind={kind} type="submit" size="lg" block disabled={disabled}>{children}</Button>
);

export default ({ state, changeState, isCurrentUserSupervisor, isCurrentUserChief }) => (
  <Row className={cn(sUtils.pushedBottom2, sUtils.textCenter)}>
    <Col xs="20">
      {state === 'new' && isCurrentUserSupervisor &&
        <Button className={sUtils.pushedRight2} size="xs" kind="accent" type="button" onClick={() => changeState('approve', {})}>Подтвердить</Button>
      }
      {state === 'approved' && isCurrentUserChief &&
        <ModalChangeState action={val => changeState('finish', val)} kind="finish" submitBtn={<SubmitButton className={sButton.btnWide} kind="success">Подтвердить</SubmitButton>}>
          <Button className={sUtils.pushedRight2} size="xs" kind="accent" type="button">Подтвердить</Button>
        </ModalChangeState>
      }
      {((state === 'new' && isCurrentUserSupervisor) || (state === 'approved' && isCurrentUserChief)) &&
        <ModalChangeState action={val => changeState('reject', val)} kind="reject" submitBtn={<SubmitButton kind="danger">Отменить</SubmitButton>}>
          <Button size="xs" kind="danger" type="button">Отменить</Button>
        </ModalChangeState>
      }
    </Col>
  </Row>
);
