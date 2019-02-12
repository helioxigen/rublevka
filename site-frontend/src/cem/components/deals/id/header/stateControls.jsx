import React from 'react';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
  Button,
} = UI;

import ModalChangeState from 'cem/components/deals/id/modal/modalChangeState';
import ModalCanceled from 'cem/components/deals/id/modal/modalCanceled';

import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const SubmitButton = ({ children, kind, disabled }) => (
  <Button
    className={sButton.btnWide}
    kind={kind}
    type="submit"
    size="lg"
    block
    disabled={disabled}
  >
    {children}
  </Button>
);

export default ({ state, stateToApprove, values, actions }) => {
  const canMoveToPresentation = state === 'negotiation' && !stateToApprove;
  const canMoveToNegotiation =
    (state === 'presentation' || state === 'deposit_paid') && !stateToApprove;
  const canMoveToDepositPaid =
    (state === 'negotiation' || state === 'agreement') && !stateToApprove;
  const canMoveToAgreement = state === 'deposit_paid' && !stateToApprove;
  const canMoveToSuccessful = state === 'agreement' && !stateToApprove;
  const canCloseDeal =
    (state === 'presentation' ||
      state === 'negotiation' ||
      state === 'deposit_paid' ||
      state === 'agreement') &&
    !stateToApprove;

  return (
    <Row className={sUtils.textCenter}>
      <Col xs="20">
        {canMoveToPresentation && (
          <ModalChangeState
            initialValues={values}
            nextState="presentation"
            actions={actions}
            submitBtn={<SubmitButton kind="success">В переговоры</SubmitButton>}
          >
            <Button
              className={sUtils.pushedRight2}
              kind="warning"
              size="xs"
              type="button"
            >
              в показы
            </Button>
          </ModalChangeState>
        )}
        {canMoveToNegotiation && (
          <ModalChangeState
            initialValues={values}
            nextState="negotiation"
            actions={actions}
            submitBtn={<SubmitButton kind="success">В переговоры</SubmitButton>}
          >
            <Button
              className={sUtils.pushedRight2}
              kind="warning"
              size="xs"
              type="button"
            >
              в переговоры
            </Button>
          </ModalChangeState>
        )}
        {canMoveToDepositPaid && (
          <ModalChangeState
            initialValues={values}
            nextState="deposit_paid"
            actions={actions}
            submitBtn={
              <SubmitButton kind="success">Задаток внесен</SubmitButton>
            }
          >
            <Button
              className={sUtils.pushedRight2}
              size="xs"
              kind="accent"
              type="button"
            >
              внесен задаток
            </Button>
          </ModalChangeState>
        )}
        {canMoveToAgreement && (
          <ModalChangeState
            initialValues={values}
            nextState="agreement"
            actions={actions}
            submitBtn={
              <SubmitButton kind="success">Заключение договора</SubmitButton>
            }
          >
            <Button
              className={sUtils.pushedRight2}
              size="xs"
              kind="accent"
              type="button"
            >
              заключение договора
            </Button>
          </ModalChangeState>
        )}
        {canMoveToSuccessful && (
          <ModalChangeState
            initialValues={values}
            nextState="successful"
            actions={actions}
            submitBtn={
              <SubmitButton kind="success">Завершить сделку</SubmitButton>
            }
          >
            <Button
              className={sUtils.pushedRight2}
              size="xs"
              kind="accent"
              type="button"
            >
              сделка состоялась
            </Button>
          </ModalChangeState>
        )}
        {canCloseDeal && (
          <ModalCanceled
            initialValues={values}
            actions={actions}
            submitBtn={
              <SubmitButton kind="danger">Закрыть сделку</SubmitButton>
            }
          >
            <Button
              className={sUtils.pushedTopXs2}
              kind="danger"
              size="xs"
              type="button"
            >
              сделка не заключена
            </Button>
          </ModalCanceled>
        )}
      </Col>
    </Row>
  );
};
