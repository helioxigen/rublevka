import React, { Component } from 'react';

import ModalReject from 'cem/_client_leads/components/id/modal/reject';
import ModalToProcess from 'cem/_client_leads/components/id/modal/toProcess';
import UI from 'cem/components/ui';
const {
  Button, Tooltip,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

export default class extends Component {
  render() {
    const { state, stateToApprove, requestKind, process, handleSubmit, currentRequestDetails = { properties: [] } } = this.props;
    const canToSpam = state === 'new' && !stateToApprove;
    const canMoveToInProgress = state === 'new' && !!requestKind && !stateToApprove;
    const canToProcessed = state === 'in_progress' && !stateToApprove;
    const canToRejected = state === 'in_progress' && !stateToApprove;

    const isThenDeal = requestKind !== 'selling';

    const processingDisabled = requestKind === 'properties' && !currentRequestDetails.properties.length;

    return (
      <Row className={sUtils.textCenter}>
        <Col xs="20">
          {canToSpam && (
            <ModalReject submitBtn={<Button className={sButton.btnWide} kind="danger" size="lg" block type="button">Отметить как спам</Button>} onClick={reason => process('spam', { reason })}>
              <Button type="button" kind="danger" size="xs" className={sUtils.pushedRight2}>спам</Button>
            </ModalReject>
          )}

          {canMoveToInProgress && (
            <Button type="button" kind="primary" size="xs" onClick={() => process('in_progress', undefined, true)}>начать обработку</Button>
          )}

          {canToRejected && (
            <ModalReject submitBtn={<Button className={sButton.btnWide} kind="danger" size="lg" block type="button">Отклонить лид</Button>} onClick={reason => process('reject', { reason })}>
              <Button type="button" kind="danger" size="xs" className={sUtils.pushedRight2}>отклонить</Button>
            </ModalReject>
          )}

          {canToProcessed && isThenDeal && (
            <ModalToProcess submitBtn={<Button className={sButton.btnWide} kind="success" size="lg" block>Конвертировать лид</Button>} onClick={dealDetails => process('process', dealDetails, true)} handleSubmit={handleSubmit}>
              <Tooltip className={sUtils.pushedRight1} title="Прикрепите объекты к лиду" position="top" hidden={!processingDisabled}>
                <Button type="button" kind="success" size="xs" disabled={processingDisabled}>обработать</Button>
              </Tooltip>
            </ModalToProcess>
          )}

          {canToProcessed && !isThenDeal && (
            <Button type="button" kind="success" size="xs" onClick={() => process('process', undefined, true)}>обработать</Button>
          )}
        </Col>
      </Row>
    );
  }
}
