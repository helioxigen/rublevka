import React, { Component } from 'react';

import TasksList from 'cem/containers/dashboard/tasksList';
import DealsList from 'cem/containers/dashboard/dealsList';
import LeadsList from 'cem/containers/dashboard/leadsList';

import UI from 'cem/components/ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import Pane from './pane';

import cn from 'classnames';
import s from 'cem/styles/utils';

class Header extends Component {
  render() {
    return (
      <Container fluid className={cn(s.section, s.paddingTop2)}>
        <Row>
          <Col xs="20" className={s.pushedBottom3}>
            <Pane title="Задачи">
              <Row>
                <Col xs="20">
                  <TasksList
                    kind="overdue"
                    declensionForms={[
                      'просроченная',
                      'просроченных',
                      'просроченных',
                    ]}
                  />
                </Col>
                <Col xs="20">
                  <TasksList
                    kind="today"
                    declensionForms={['на сегодня', 'на сегодня', 'на сегодня']}
                  />
                </Col>
                <Col xs="20">
                  <TasksList
                    kind="tomorrow"
                    declensionForms={['на завтра', 'на завтра', 'на завтра']}
                  />
                </Col>
              </Row>
            </Pane>
          </Col>
          <Col xs="20" className={s.pushedBottom3}>
            <Pane title="Лиды">
              <Row>
                <Col xs="20">
                  <LeadsList
                    kind="noTasks"
                    declensionForms={['без задач', 'без задач', 'без задач']}
                  />
                </Col>
                <Col xs="20">
                  <LeadsList
                    kind="new"
                    declensionForms={['новый', 'новых', 'новых']}
                  />
                </Col>
              </Row>
            </Pane>
          </Col>
          <Col xs="20" className={s.pushedBottom3}>
            <Pane title="Сделки">
              <Row>
                <Col xs="20">
                  <DealsList
                    kind="noTasks"
                    declensionForms={['без задач', 'без задач', 'без задач']}
                  />
                </Col>
              </Row>
            </Pane>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
