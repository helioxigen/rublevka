import React, { Component } from 'react';

import ModalReject from 'cem/_client_leads/show/modal/reject';
import ModalToProcess from 'cem/_client_leads/show/modal/toProcess';
import UI from 'cem/components/ui';
const {
  Button,
  Tooltip,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

export default class extends Component {
  state = {
    isOpened: false,
    toState: undefined,
  };

  toggle(isOpened: boolean = !this.state.isOpened, toState) {
    this.setState({ isOpened, toState });
  }

  open(toState) {
    this.toggle(true, toState);
  }

  close() {
    this.toggle(false);
  }

  render() {
    const {
      state,
      stateToApprove,
      requestKind,
      process: toProcess,
      handleSubmit,
      currentRequestDetails = { properties: [] },
    } = this.props;
    const canToSpam = state === 'new' && !stateToApprove;
    const canMoveToInProgress =
      state === 'new' && !!requestKind && !stateToApprove;
    const canToProcessed = state === 'in_progress' && !stateToApprove;
    const canToRejected =
      (state === 'new' || state === 'in_progress') && !stateToApprove;

    const isThenDeal = requestKind !== 'selling';

    const processingDisabled =
      requestKind === 'properties' && !currentRequestDetails.properties.length;

    return (
      <Row className={sUtils.textCenter}>
        <Col xs="20">
          {canToSpam && (
            <Button
              type="button"
              kind="danger"
              className={sUtils.pushedRight2}
              onClick={() => this.open('spam')}
            >
              спам
            </Button>
          )}

          {canToRejected && (
            <Button
              type="button"
              kind="danger"
              className={sUtils.pushedRight2}
              onClick={() => this.open('reject')}
            >
              отклонить лид
            </Button>
          )}

          {canMoveToInProgress && (
            <Button
              type="button"
              kind="primary"
              onClick={() => toProcess('in_progress', undefined, true)}
            >
              начать обработку
            </Button>
          )}

          {canToProcessed && isThenDeal && (
            <ModalToProcess
              submitBtn={
                <Button
                  className={sButton.btnWide}
                  kind="success"
                  size="lg"
                  block
                >
                  Перевести в сделку
                </Button>
              }
              onClick={dealDetails => toProcess('process', dealDetails, true)}
              handleSubmit={handleSubmit}
            >
              <Tooltip
                className={sUtils.pushedRight1}
                title="Прикрепите объекты к лиду"
                position="top"
                isHidden={!processingDisabled}
              >
                <Button
                  type="button"
                  kind="success"
                  disabled={processingDisabled}
                >
                  перевести в сделку
                </Button>
              </Tooltip>
            </ModalToProcess>
          )}

          {canToProcessed && !isThenDeal && (
            <Button
              type="button"
              kind="success"
              onClick={() => toProcess('process', undefined, true)}
            >
              обработать
            </Button>
          )}

          <ModalReject
            toState={this.state.toState}
            onClick={reasonId => toProcess(this.state.toState, { reasonId })}
            isOpened={this.state.isOpened}
            close={::this.close}
          />
        </Col>
      </Row>
    );
  }
}
