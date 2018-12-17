import React from 'react';

import * as dict from 'cem/_client_leads/constants/dictionaries';

import { fetchResource } from 'cem/helpers/autocomplete';
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form,
  StaticDictionary,
  Label,
  Form: { Group, Static },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';

export default ({ state, stateToApprove, id, leadKind, requestKind, data = {} }) => (
  <Row>
    <Col sm="20" md="18" mdOffset="1" lg="16" lgOffset={leadKind !== 'recommendation' ? 2 : 4}>
      <Row>
        <Col sm="3" md="4">
          <Group>
            <Form.Label block>Тип лида</Form.Label>
            <Static className={sUtils.fontSizeMd}>{dict.leadKinds[leadKind].title || '—'}</Static>
          </Group>
        </Col>
        <Col sm="5" md="4">
          <Group>
            <Form.Label block>Тип заявки</Form.Label>
            <Static className={sUtils.fontSizeMd}>
              {requestKind && dict.requestKinds[requestKind].title}
              {!requestKind && <span>—</span>}
            </Static>
          </Group>
        </Col>
        {id !== 'create' && (
          <Col sm="4">
            <Group>
              <Form.Label block>Дата поступления</Form.Label>
              <Static className={sUtils.fontSizeMd}>
                <FormattedDate mask="dd.mm.yyyy HH:MM" value={data.createdAt} />
              </Static>
            </Group>
          </Col>
        )}
        {leadKind !== 'recommendation' && (
          <Col sm="3" md="4">
            <Group>
              <Form.Label block>Источник</Form.Label>
              <Static className={sUtils.fontSizeMd}>
                <StaticDictionary
                  fetch={fetchResource('/v1/client_lead_sources', 'slug')}
                  value={data.clientLeadSourceId}
                  labelKey="title"
                />
              </Static>
            </Group>
          </Col>
        )}
        {id !== 'create' && (
          <Col sm="5" md="4">
            <Group>
              <Form.Label block>Статус</Form.Label>
              {!!stateToApprove && (
                <Label kind="warning" style={{ marginTop: '7px' }}>
                  ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ
                </Label>
              )}
              {!stateToApprove && (
                <Static className={cn(sUtils.fontSizeMd, s[dict.states[state].style])}>
                  {dict.states[state].title}
                </Static>
              )}
            </Group>
          </Col>
        )}
        {data.isRepeated && (
          <Col sm="5" md="4">
            <Group>
              <Form.Label block>Обращение</Form.Label>
              <Label kind="warning" style={{ marginTop: '7px' }}>
                Повторное
              </Label>
            </Group>
          </Col>
        )}
      </Row>
    </Col>
  </Row>
);
