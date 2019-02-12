import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { apiPathTisa } from 'site/request/constants/defaults';

import global from 'window-or-global';

import * as EmailActions from 'site/actions/email';
import { setSharedRetargetingKey } from 'site/retargeting/actions';
import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';

import UI from 'site/ui';

import cn from 'classnames';
import s from 'site/styles/modal/subscribe';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

const {
  Grid,
  Grid: { Row, Col },
  Form: { Container, Input },
  Button,
} = UI;

const isJQ = global.config.domain === 'jq.estate';

class Subscribe extends Component {
  constructor() {
    super();

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(e, data) {
    e.preventDefault();

    const { actions } = this.props;

    if (!data.name || !data.email) {
      this.setState({ requiredName: true, requiredEmail: true });
    } else {
      return actions.subscribe(data.name, data.email).then(
        () => {
          this.setState({ result: 'success' });

          fetch(apiPathTisa, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              LastName: '',
              FirstName: data.name,
              MiddleName: '',
              Phone: '',
              Email: data.email,
              Description: '',
              AdvertisingCode: global.config.domain,
              FormDemand: 1001,
              ArticleCode: '',
            }),
          });
        },
        () => this.setState({ result: 'error' }),
      );
    }
  }

  render() {
    return (
      <Grid.Container fluid className={s.container}>
        <Row className={cn(s.content, st.forms.subscribeOverlay)}>
          <Col md="10" mdOffset="1">
            <h2 className={s.title}>Подпишитесь на рассылку</h2>

            <Container onSubmit={this.submit}>
              {isJQ && (
                <p className={s.description}>
                  Расскажем о скидках, поселках и лучших предложениях по аренде.
                  <br />
                  Раз в две недели — бонус: честный рассказ об одном из элитных
                  жилых комплексов.
                </p>
              )}

              {!isJQ && (
                <p className={s.description}>
                  Узнавайте первыми о новых предложениях рынка загородной
                  недвижимости.
                </p>
              )}

              <Row>
                <Col sm="4" md="3" mdOffset="2">
                  <Input
                    className={s.input}
                    type="text"
                    name="name"
                    size="lg"
                    block
                    pattern="[a-zA-ZА-Яа-я\s]+"
                    placeholder="Имя"
                    required={this.state.requiredName}
                  />
                </Col>
                <Col sm="4" md="3">
                  <Input
                    className={s.input}
                    type="email"
                    name="email"
                    size="lg"
                    block
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    placeholder="E-mail"
                    required={this.state.requiredEmail}
                  />
                </Col>

                {this.state.result !== 'success' && (
                  <Col sm="4" md="2">
                    <Button
                      className={cn(sUtils.width80XsFullSm, st.forms.button)}
                      type="submit"
                      size="sm"
                      kind="primary"
                    >
                      Подписаться
                    </Button>
                  </Col>
                )}

                {this.state.result === 'success' && (
                  <Col sm="2">
                    <Button
                      className={cn(
                        sUtils.width80XsFullSm,
                        st.forms.button,
                        s.btnDisabled,
                      )}
                      type="submit"
                      size="sm"
                      kind="primary"
                      disabled
                    >
                      Отправлено!
                    </Button>
                  </Col>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </Grid.Container>
    );
  }
}

const pickActions = dispatch => {
  const actions = {
    ...EmailActions,
    setSharedRetargetingKey,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  null,
  pickActions,
)(Subscribe);
