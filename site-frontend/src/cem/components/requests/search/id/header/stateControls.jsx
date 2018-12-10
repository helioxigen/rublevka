import React from 'react';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
  Button,
} = UI;

import ModalChangeState from '../modal/changeState';
import ModalReturn from '../modal/return';
import ModalCanceled from '../modal/cancel';
import ModalFinished from 'cem/containers/common/modal/questions';

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

const SubmitButton = ({ children, className, kind, disabled, ...props }) => <Button {...props} className={cn(s.btnWide, className)} kind={kind} type="submit" size="lg" block disabled={disabled}>{children}</Button>;

export default ({ state, values, changeState, isCurrentUserSupervisor, isCurrentUserCreator, isCurrentUserResponsible }) => (
  <Row xs="center">
    <Col xs="20">
      {state === 'new' && isCurrentUserSupervisor &&
        <ModalChangeState action={val => changeState('assign', val)} submitBtn={<SubmitButton className={sButton.btnWide} kind="success">Выбрать</SubmitButton>}>
          <Button type="button" kind="primary" size="xs" className={sUtils.pushedRight2}>выбрать исполнителя</Button>
        </ModalChangeState>
      }
      {state === 'new' && isCurrentUserSupervisor &&
        <ModalCanceled action={val => changeState('reject', val)} category={values.propertyCategory} kind="reject" submitBtn={<SubmitButton className={sButton.btnWide} kind="danger">Отклонить заявку</SubmitButton>}>
          <Button type="button" kind="danger" size="xs">отклонить заявку</Button>
        </ModalCanceled>
      }
      {state === 'assigned' && isCurrentUserResponsible &&
        <Button className={sUtils.pushedRight2} kind="accent" type="button" size="xs" onClick={() => changeState('in_progress', { reason: null })}>взять в работу</Button>
      }
      {state === 'in_progress' && isCurrentUserResponsible &&
        <Button className={sUtils.pushedRight2} kind="accent" type="button" size="xs" onClick={() => changeState('done')}>отдать на проверку</Button>
      }
      {state === 'done' && isCurrentUserSupervisor &&
        <Button className={sUtils.pushedRight2} kind="accent" type="button" size="xs" onClick={() => changeState('approve')}>заявка выполнена</Button>
      }
      {state === 'approved' && isCurrentUserCreator &&
        <ModalFinished kind="selection" nextState="successful" action={val => changeState('finished', val)} submitBtn={<SubmitButton className={sButton.btnWide} kind="success">Подтвердить</SubmitButton>}>
          <Button className={sUtils.pushedRight2} kind="accent" type="button" size="xs">заявка выполнена</Button>
        </ModalFinished>
      }
      {((state === 'done' && isCurrentUserSupervisor) || (state === 'approved' && isCurrentUserCreator)) &&
        <ModalReturn action={val => changeState('return', val)} kind="return" submitBtn={<SubmitButton kind="warning" className={sButton.btnWide}>Вернуть на доработку</SubmitButton>}>
          <Button className={sUtils.pushedRight2} type="button" size="xs" kind="warning">вернуть на доработку</Button>
        </ModalReturn>
      }
    </Col>
  </Row>
);
