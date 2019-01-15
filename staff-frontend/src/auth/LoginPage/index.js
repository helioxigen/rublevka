import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Formik, Form, Field } from 'formik';
import { isValidNumber, AsYouType } from 'libphonenumber-js';
import {
  Main,
  Logo,
  Title,
  Paragraph,
  Input as InputBase,
  ErrorMessage,
  Button as ButtonBase,
  theme,
} from '../../UI';
import ruFlag from './img/ru.png';

const Header = styled.header`
  padding-top: 21px;
`;

const AuthSection = styled.section`
  padding-top: 198px;
  padding-bottom: 54px;
`;

const Description = styled(Paragraph)`
  padding-top: 30px;
`;

const PhoneContainer = styled.div`
  margin-top: 13px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Phone = styled.p`
  margin: 0;
  font-size: 22px;
  color: ${theme.blue};
  text-align: left;
`;

const Pen = styled.a`
  margin-left: 9px;
  color: ${theme.blue};
  text-decoration: none;
  font-size: 0.85em;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled(InputBase)`
  margin-top: 44px;
  background-image: url(${ruFlag});
  background-repeat: no-repeat;
  background-position 0px 19px;
  padding-left: 40px;
  width: calc(100% - 40px);
  margin-bottom: ${({ errors }) => (errors ? 8 : 24)}px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CodeInput = styled(InputBase)`
  margin-top: 44px;
  margin-bottom: ${({ errors }) => (errors ? 8 : 24)}px;
  letter-spacing: 15px;
`;

const Button = styled(ButtonBase)`
  margin-top: 26px;
  margin-bottom: 37px;
`;

const SendCode = styled.a`
  font-size: 18px;
  color: ${theme.blue};
  text-decoration: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default class extends React.Component {
  state = { phone: '+7', codeSent: false };

  renderForm = () => {
    const { phone, codeSent } = this.state;
    if (codeSent) {
      return (
        <Col md={5}>
          <Title>Войти</Title>
          <Description>Введите код из смс</Description>
          <PhoneContainer>
            <Phone>{new AsYouType().input(phone)}</Phone>
            <Pen onClick={() => this.setState({ codeSent: false })}>
              <i className="fas fa-pen" />
            </Pen>
          </PhoneContainer>
          <Formik
            initialValues={{ code: '' }}
            validate={(values) => {
              if (!values.code) {
                return { code: 'Введите код' };
              }

              if (values.code.toString().length !== 6) {
                return { code: 'Длина кода должна быть 6 символов' };
              }

              return {};
            }}
            onSubmit={() => alert('Sended')}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="code"
                  render={({ field, form: { touched, errors } }) => (
                    <div>
                      <CodeInput
                        {...field}
                        type="number"
                        autoComplete="off"
                        errors={touched[field.name] && errors[field.name]}
                      />
                      {touched[field.name] && errors[field.name] && (
                        <ErrorMessage>{errors[field.name]}</ErrorMessage>
                      )}
                    </div>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  Войти
                </Button>
              </Form>
            )}
          </Formik>
          <SendCode>Отправить повторно</SendCode>
        </Col>
      );
    }

    return (
      <Col md={5}>
        <Title>Войти</Title>
        <Description>Войдите в свой аккаунт, чтобы получить доступ к объектам.</Description>
        <Formik
          initialValues={{ phone }}
          validate={(values) => {
            if (!values.phone) {
              return { phone: 'Необходимо ввести номер телефона' };
            }

            if (!isValidNumber(values.phone)) {
              return { phone: 'Неверный номер телефона' };
            }

            return {};
          }}
          onSubmit={values => this.setState({ codeSent: true, phone: values.phone })}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="phone"
                render={({ field, form: { touched, errors } }) => (
                  <div>
                    <Input
                      {...field}
                      value={new AsYouType().input(field.value)}
                      type="tel"
                      autoComplete="off"
                      errors={touched[field.name] && errors[field.name]}
                    />
                    {touched[field.name] && errors[field.name] && (
                      <ErrorMessage>{errors[field.name]}</ErrorMessage>
                    )}
                  </div>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                Далее
              </Button>
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
