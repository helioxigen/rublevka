import React, { Component } from 'react';

import config from 'cem/config';

import UI from 'cem/components/ui';
const { Heading, Button, Alert, Form, Grid: { Container, Row, Col }, Form: { Group, Input } } = UI;

import sUtils from 'cem/styles/utils';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event, user) {
    event.preventDefault();

    this.props.actions
      .login(user)
      .then(({ id }) => {
        window.Intercom('boot', { app_id: config.intercom.app_id, user_id: id });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { auth } = this.props.state;

    if (auth.token) {
      return (
        <Container className={sUtils.pushedTop8}>
          <Row>
            <Col xs="20" sm="7" smOffset="6">
              <Alert>
                <Heading size="md" className={sUtils.resetIndent}>Вы уже вошли</Heading>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container className={sUtils.pushedTop8}>
        <Row xs="center">
          <Col xs="20">
            <Heading size="lg" className={sUtils.pushedBottom6}>Вход в ЦЕМ</Heading>
          </Col>
        </Row>
        <Row>
          <Col sm="8" smOffset="6">
            {auth.errors &&
              <Alert>
                {auth.errors.map(error => <p><strong>{error.param}</strong>: {error.message}</p>)}
              </Alert>}
            <Form.Container onSubmit={this.handleOnSubmit}>
              <Group>
                <Input id="email" type="email" name="email" placeholder="E-mail" block />
              </Group>
              <Group>
                <Input id="password" type="password" name="password" placeholder="Пароль" block />
              </Group>
              <Row>
                <Col xs="20">
                  <Button type="submit" kind="primary" size="md" block>Войти</Button>
                </Col>
              </Row>
            </Form.Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
