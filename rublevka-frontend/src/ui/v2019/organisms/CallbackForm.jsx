import React from 'react';
import Input from '../atoms/Input';
import PhoneInput from '../molecules/PhoneInput';
import SubmitButton from '../atoms/SubmitButton';
import { Form } from '../templates';
import uis from '../../../uis';

import UI from '../index';
import styled from 'styled-components';
import media from '../../../styles/media';
import TextArea from '../atoms/TextArea';

const { Icon } = UI;

const FormStatus = {
  Initial: 1,
  Sent: 2,
  Fail: 3,
};

const RetryIcon = styled(Icon).attrs({
  icon: 'retry',
})`
  width: 18px;
  height: 18px;

  margin-right: 12px;

  fill: white;
`;

const Header = styled.h3`
  margin: 0;
  margin-top: 8px;
  font-weight: 500;
  color: #232323;
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  text-align: center;

  ${media.xs`
    margin: 0;
    line-height: 29px;
  `}
`;

const Body = styled.p`
  margin: 0;
  margin-top: 12px;
  color: #232323;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  font-weight: 500;

  ${media.xs`
    margin-top: 8px;
    font-size: 16px;
  `}
`;

export default class extends React.Component {
  state = {
    status: FormStatus.Initial,
    errorFields: [],
    values: {},
  };

  handleSubmit = e => {
    e.preventDefault();

    const { values } = this.state;
    const { fields } = this.props;

    const errorFields = Object.entries(fields)
      .filter(([fieldName, { required }]) => required && !values[fieldName])
      .map(([name]) => name);

    if (errorFields.length > 0) {
      return this.setState({
        errorFields,
      });
    }

    const {
      values: { name, phone, comment },
    } = this.state;

    if (process.env.HOST === 'dev2.rublevka.ru') {
      return Promise.resolve().then(() =>
        this.setState({ status: FormStatus.Sent }),
      );
    }

    uis
      .send(name, phone.match(/\d+/g).join(''), comment)
      .then(() => this.setState({ status: FormStatus.Sent }))
      .catch(() => this.setState({ status: FormStatus.Fail }));
  };

  handleChange = name => e => {
    const { values, errorFields } = this.state;
    const { value } = e.target;

    this.setState({
      errorFields: value ? errorFields.filter(n => n !== name) : errorFields,
      values: {
        ...values,
        [name]: value,
      },
    });
  };

  getStatus = () => {
    const { status } = this.state;

    return {
      Fail: status === FormStatus.Fail,
      Initial: status === FormStatus.Initial,
      Sent: status === FormStatus.Sent,
    };
  };

  render() {
    const { values, errorFields } = this.state;
    const { fields, submitLabel, header, footer } = this.props;

    const status = this.getStatus();

    return status.Initial || status.Fail ? (
      <Form onSubmit={this.handleSubmit}>
        {header}
        {Object.entries(fields).map(
          ([name, { type = 'text', placeholder }]) => {
            switch (type) {
              case 'textarea':
                return (
                  <TextArea
                    placeholder={placeholder}
                    onChange={this.handleChange(name)}
                    value={values[name]}
                  />
                );
              case 'tel':
                return (
                  <PhoneInput
                    hasError={errorFields.includes(name)}
                    value={values[name]}
                    onChange={this.handleChange(name)}
                  />
                );
              default:
                return (
                  <Input
                    hasError={errorFields.includes(name)}
                    type={type}
                    placeholder={placeholder}
                    onChange={this.handleChange(name)}
                    value={values[name]}
                  />
                );
            }
          },
        )}
        {errorFields.length > 0 && (
          <p className="error">Не заполнены обязательные поля</p>
        )}
        {status.Fail && (
          <p className="error">При отправке формы позникла ошибка</p>
        )}
        {status.Initial && (
          <SubmitButton type="submit">{submitLabel}</SubmitButton>
        )}
        {status.Fail && (
          <SubmitButton>
            <RetryIcon />
            Попробовать еще
          </SubmitButton>
        )}
        {footer}
      </Form>
    ) : (
      <Form>
        <Header>Заявка отправлена</Header>
        <Body>
          Наш менеджер свяжется с вами в течение рабочего дня с 11 до 18.
        </Body>
      </Form>
    );
  }
}
