import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Formik, Form, Field } from 'formik';
import {
  Main,
  Logo,
  Title,
  BodyBig,
  ErrorMessage,
  Button as ButtonBase,
  theme,
} from '../../UI';
import { login } from '../actions';

const Header = styled.header`
  padding-top: 21px;
`;

const AuthSection = styled.section`
  padding-top: 198px;
  padding-bottom: 54px;
`;

const Description = styled(BodyBig)`
  padding-top: 30px;
`;

const CustomField = styled(Field)`
  outline: none;
  display: block;
  transition: border-bottom 0.3s ease-in-out;
  border: none;
  border-bottom: 1px solid ${({ errors }) => (errors ? theme.red : theme.alto)};
  padding: 10px 0px;
  font-family: 'FSElliotPro';
  color: #333;
  font-size: 20px;
  background-color: transparent;

  &:focus {
    border-bottom: 2px solid
      ${({ errors }) => (errors ? theme.red : theme.blue)};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    opacity: 0.25;
  }

  margin-top: 44px;
  width: calc(100% - 40px);
  margin-bottom: ${({ errors }) => (errors ? 8 : 24)}px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled(ButtonBase)`
  margin-top: 26px;
  margin-bottom: 37px;
`;

const validatePassword = (value) => {
  if (!value) {
    return 'Введите пароль';
  }
  return null;
};

const validateEmail = (value) => {
  if (!value) {
    return 'Введите E-mail';
  }
  return null;
};

class LoginPage extends React.Component {
  state = {};

  setFieldValue = (key, value) => {
    this.setState({ [key]: value });
  };

  renderForm = () => {
    const { dispatch, auth } = this.props;
    const { errors: serverErrors = [] } = auth;
    const emailError = serverErrors.some(el => el.code === 'invalid_email')
      ? 'Неверный E-mail'
      : null;
    const passError = serverErrors.some(el => el.code === 'invalid_password')
      ? 'Неверный пароль'
      : null;

    // TODO разобраться, почему из инпута, вложенного в Field не приходит значение
    return (
      <Col md={5}>
        <Title>Войти</Title>
        <Description>
          Войдите в свой аккаунт, чтобы получить доступ к объектам.
        </Description>
        <Formik
          onSubmit={(values) => {
            const { email, password } = values;
            dispatch(login({ email, password }));
          }}
        >
          {({ errors }) => (
            <Form>
              <CustomField
                validate={validateEmail}
                name="email"
                type="email"
                autoComplete="on"
                placeholder="E-mail"
              />
              {(errors.email || emailError) && (
                <ErrorMessage>{errors.email || emailError}</ErrorMessage>
              )}
              <CustomField
                validate={validatePassword}
                name="password"
                type="password"
                placeholder="Пароль"
              />
              {(errors.password || passError) && (
                <ErrorMessage>{errors.password || passError}</ErrorMessage>
              )}
              <Button type="submit">Войти</Button>
            </Form>
          )}
        </Formik>
      </Col>
    );
  };

  render() {
    return (
      <>
        <Header>
          <Helmet>
            <title>Войти</title>
          </Helmet>
          <Grid>
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
          </Grid>
        </Header>
        <Main>
          <AuthSection>
            <Grid>
              <Row center="md">{this.renderForm()}</Row>
            </Grid>
          </AuthSection>
        </Main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps)(LoginPage);
