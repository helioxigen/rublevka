import React, { Component } from 'react';
import List, { Row } from 'cem/components/settings/dictionaries/list';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Container, Col },
  Grid,
} = UI;

import s from 'cem/styles/id/content';

export default () => (
  <section className={s.section}>
    <Container fluid>
      <Grid.Row>
        <Col xs="20">
          <Heading size="md">Словари</Heading>
        </Col>
      </Grid.Row>

      <List title="Сотрудники">
        <Row kind="staff_document_type">Типы документов</Row>
      </List>
      <List title="Контакты">
        <Row kind="contact_occupation">Роды деятельности</Row>
        <Row kind="contact_job_role">Роли</Row>
        <Row kind="auto_brand">Марки автомобилей</Row>
        <Row kind="auto_model">Модели автомобилей</Row>
        <Row kind="contact_position">Должности</Row>
        <Row kind="contact_link_type">Типы связанных контактов</Row>
        <Row kind="contact_document_type">Типы документов</Row>
      </List>
      <List title="Объекты">
        <Row kind="property_contact_link_type">Роли контактов</Row>
        <Row kind="property_document_type">Типы документов</Row>
        <Row kind="property_contract_type">Типы контрактов</Row>
        <Row kind="property_banner">Типы внешней рекламы</Row>
      </List>
      <List title="Корпусы ЖК">
        <Row kind="complex_building_document_type">Типы документов</Row>
      </List>
      <List title="Посёлки">
        <Row kind="settlement_type">Типы посёлков</Row>
        <Row kind="settlement_document_type">Типы документов</Row>
        <Row kind="settlement_external_infrastructure">
          Список внешней инфраструктуры
        </Row>
        <Row kind="settlement_internal_infrastructure">
          Список внутренней инфраструктуры
        </Row>
      </List>
      <List title="Сделки">
        <Row kind="deal_contact_type">Кем является контакт в сделке</Row>
      </List>
      <List title="Лиды">
        <Row kind="spam_reason">Причины спама</Row>
        <Row kind="client_lead_targeted_reject_reason">
          Причины отклонения целевых лидов
        </Row>
        <Row kind="client_lead_non_targeted_reject_reason">
          Причины отклонения нецелевых лидов
        </Row>
      </List>
    </Container>
  </section>
);
