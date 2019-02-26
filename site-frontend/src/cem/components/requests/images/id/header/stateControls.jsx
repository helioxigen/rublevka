import React from 'react';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
  Button,
} = UI;

import ModalChangeState from '../modal/modalChangeState';
import ModalCanceled from '../modal/modalCanceled';
import ModalFinished from 'cem/containers/common/modal/questions';

import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const SubmitButton = ({ children, className, kind, disabled, ...props }) => (
  <Button
    {...props}
    className={cn(sButton.btnWide, className)}
    kind={kind}
    type="submit"
    size="lg"
    block
    disabled={disabled}
  >
    {children}
  </Button>
);

export default ({
  values,
  state,
  changeState,
  isCurrentUserSupervisor,
  isCurrentUserCreator,
  isCurrentUserResponsible,
}) => (
  <Row className={sUtils.textCenter}>
    <Col xs="20">
      {state === 'new' && isCurrentUserSupervisor && (
        <ModalChangeState
          action={val => changeState('in_progress', val)}
          submitBtn={
            <SubmitButton className={sButton.btnWide} kind="success">
              Назначить
            </SubmitButton>
          }
        >
          <Button
            className={sUtils.pushedRight2}
            size="xs"
            kind="primary"
            type="button"
          >
            отправить в работу
          </Button>
        </ModalChangeState>
      )}
      {state === 'in_progress' && isCurrentUserResponsible && (
        <Button
          className={sUtils.pushedRight2}
          size="xs"
          kind="accent"
          type="button"
          onClick={() => changeState('done')}
          disabled={!(values.images && !!values.images.length)}
        >
          заявка выполнена
        </Button>
      )}
      {state === 'done' && isCurrentUserSupervisor && (
        <Button
          className={sUtils.pushedRight2}
          size="xs"
          kind="accent"
          type="button"
          onClick={() => changeState('approve')}
        >
          заявка проверена
        </Button>
      )}
      {state === 'approved' && isCurrentUserCreator && (
        <ModalFinished
          kind="image"
          nextState="successful"
          action={val => changeState('finish', val)}
          submitBtn={<SubmitButton kind="success">Подтвердить</SubmitButton>}
        >
          <Button
            className={sUtils.pushedRight2}
            size="xs"
            kind="accent"
            type="button"
          >
            заявка выполнена
          </Button>
        </ModalFinished>
      )}
      {((state === 'done' && isCurrentUserSupervisor) ||
        (state === 'approved' && isCurrentUserCreator)) && (
        <ModalCanceled
          action={val => changeState('return', val)}
          kind="return"
          submitBtn={
            <SubmitButton kind="warning">Вернуть на доработку</SubmitButton>
          }
        >
          <Button
            className={sUtils.pushedRight2}
            size="xs"
            kind="warning"
            type="button"
          >
            вернуть на доработку
          </Button>
        </ModalCanceled>
      )}
      {isCurrentUserSupervisor &&
        ['finished', 'rejected'].indexOf(state) === -1 && (
          <ModalCanceled
            action={val => changeState('reject', val)}
            kind="reject"
            submitBtn={<SubmitButton kind="danger">Отменить</SubmitButton>}
          >
            <Button
              className={sUtils.pushedTopXs2}
              size="xs"
              kind="danger"
              type="button"
            >
              Отменить
            </Button>
          </ModalCanceled>
        )}
    </Col>
  </Row>
);
