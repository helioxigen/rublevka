import React, { Component, PropTypes } from 'react';

import global from 'window-or-global';
import sbjs from 'sourcebuster';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import loadDuties from 'site/currentDuty/actions';
import { createClientLead } from 'landing/request/actions';
import { setSharedRetargetingKey } from 'site/retargeting/actions';
import sendAnalytics from 'core/analytics/actions';

import UI from 'site/ui';
const {
  Button,
  Form,
  Grid: { Container, Row, Col },
  Form: { Group, Input },
} = UI;

import cn from 'classnames';
import s from 'landing/styles/request/request';
import sUtils from 'site/styles/utils';

import * as analyticsEvents from 'core/analytics/constants';

class SelectionForm extends Component {
  static propTypes = {
    propertyCategory: PropTypes.string.isRequired,
  }

  state = {
    isOpened: false,
    requestSent: false,
  }

  componentDidMount() {
    this.props.actions.sendAnalytics(analyticsEvents.searchRequestOpened());
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  submit(e) {
    e.preventDefault();

    const data = {
      kind: `online`,

      requestDetails: {
        category: this.props.propertyCategory,
        requestKind: `purchase`,
      },

      contactDetails: {
        firstName: this.state.firstName,
        phoneNumber: this.state.phoneNumber,
      },

      clientLeadSource: global.config.domain,
      marketing: {
        utms: {
          source: sbjs.get.current.src,
          medium: sbjs.get.current.mdm,
          campaign: sbjs.get.current.cmp,
          content: sbjs.get.current.cnt,
          term: sbjs.get.current.trm,
        },
      },
    };

    this.props.actions.createClientLead(data).then(() => {
      this.setState({ requestSent: true }, () => {
        this.props.actions.setSharedRetargetingKey(`vk`);

        this.props.actions.sendAnalytics(analyticsEvents.searchRequestSubmitted(data));
      });
    });
  }

  render() {
    return (
      <Form.Container className={this.props.className} onSubmit={::this.submit}>
        {!this.state.requestSent && (
          <Container fluid>
            <Row>
              <Col xs="12">
                <div className={sUtils.pushedBottom4_5}>
                  <h3 className={s.title}>
                    Заказать обратный звонок
                  </h3>
                </div>

                <Group>
                  <Input
                    block
                    type="text"
                    placeholder="Имя"
                    value={this.state.firstName}
                    onChange={(e) => this.onChange(`firstName`, e.target.value) }
                    className={s.input}
                  />
                  <Input
                    block
                    type="tel"
                    mask="+7 (111) 111-11-11"
                    placeholder="+7 (___) ___-__-__"
                    value={this.state.phoneNumber}
                    required
                    onChange={(e) => this.onChange(`phoneNumber`, e.target.value) }
                    className={s.input}
                  />
                </Group>

                <Button className={s.btn} kind="success" size="lg">
                  Перезвоните мне
                </Button>
              </Col>
            </Row>
          </Container>
        )}

        {!!this.state.requestSent && (
          <div>
            <h2 className={cn(s.title)}>
              Заявка отправлена!
            </h2>
            <p>
              Через 10 минут наш агент свяжется с вами
            </p>
          </div>
        )}
      </Form.Container>
    );
  }
}

// redux connectors
const pickState = () => {
  return {
    state: {},
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadDuties,
    createClientLead,
    setSharedRetargetingKey,
    sendAnalytics,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(SelectionForm);
