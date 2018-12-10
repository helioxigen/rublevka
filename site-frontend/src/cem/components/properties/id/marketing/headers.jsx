import React from 'react';

import UI from 'cem/components/ui';
const {
  Table: { Row, Heading },
} = UI;

export const ordered = (
  <Row>
    <Heading width="10%">Когда поставят</Heading>
    <Heading width="15%">Сотрудник</Heading>
    <Heading width="65%">Тип</Heading>
    <Heading width="10%">Действия</Heading>
  </Row>
);

export const active = (
  <Row>
    <Heading width="10%">Дата установки</Heading>
    <Heading width="15%">Сотрудник</Heading>
    <Heading width="65%">Тип</Heading>
    <Heading width="10%">Действия</Heading>
  </Row>
);

export const removed = (
  <Row>
    <Heading width="10%">Дата снятия</Heading>
    <Heading width="15%">Сотрудник</Heading>
    <Heading width="20%">Тип</Heading>
    <Heading>Причина</Heading>
    <Heading width="10%">Действия</Heading>
  </Row>
);

export const denied = (
  <Row>
    <Heading width="10%">Дата отказа</Heading>
    <Heading width="15%">Сотрудник</Heading>
    <Heading width="20%">Тип</Heading>
    <Heading>Причина</Heading>
  </Row>
);
