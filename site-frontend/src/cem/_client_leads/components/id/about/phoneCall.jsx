import React, { Component } from 'react';

import Deal from 'cem/containers/common/deal';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form, Button, Heading,
  Grid: { Row, Col },
} = UI;

import FormField from 'cem/helpers/formField';

import CallDetails from './details/call';
import ContactDetails from './details/contact';
import Status from './status';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class About extends Component {
  changeKind(requestKind) {
    const { data } = this.props;

    this.props.actions.pushPath(`/client_leads/${data.kind}/${data.id}?requestKind=${requestKind}`);
  }

  update() {
    const { values, formKey } = this.props;

    this.props.actions.updateLead(formKey, values);
  }

  render() {
    const {
      handleSubmit, formKey, pristine, error, submitting,
      data,
      isUpdateAllowed, isSensitiveDataVisible,
    } = this.props;
    const state = (data && data.stateDetails && data.stateDetails.toApprove) || data.state;

    const isStatic = (formKey !== `create` && !isUpdateAllowed) || data.stateDetails.toApprove || [`spam`, `rejected`, `processed`].indexOf(state) > -1;

    return (
      <Form.Container className={s.section} onSubmit={handleSubmit(::this.update)}>
        <CallDetails phoneCallDetails={data.phoneCallDetails} />

        {data.state === `processed` && data.dealId &&
          <Row className={sUtils.pushedBottom3}>
            <Col xs="20">
              <Deal id={data.dealId} />
            </Col>
          </Row>
        }

        {(formKey === `create` || isSensitiveDataVisible) && <ContactDetails fields={this.props.fields.contactDetails} isStatic isPhoneStatic />}

        {!isStatic && <Heading size="md">Запрос</Heading>}
        {!isStatic && (
          <Row className={sUtils.pushedBottom6} sm="center">
            <Col md="18">
              <Row sm="center">
                <Col sm="6" className={sUtils.flexWrap}>
                  <div className={sUtils.fullWidth}>
                    <Heading size="sm">Запрос по объектам</Heading>
                    <p className={sUtils.pushedTop2}>Начните обработку лида здесь,<br className={sUtils.hiddenSm} /> если клиент обратился по<br className={sUtils.hiddenSm} /> конкретному объекту или<br className={sUtils.hiddenSm} /> объектам.</p>
                  </div>
                  <div className={s.flexItem}>
                    {state === `new` && (
                      <Button size="xs" kind="warning" type="button" onClick={() => ::this.changeKind(`properties`)}>выбрать тип заявки</Button>
                    )}
                  </div>
                </Col>

                <Col sm="6" smOffset="1" className={sUtils.flexWrap}>
                  <div className={sUtils.fullWidth}>
                    <Heading size="sm">Запрос в свободной форме</Heading>
                    <p className={sUtils.pushedTop2}>Начните обработку лида здесь,<br className={sUtils.hiddenSm} /> если клиент оставил вам свой<br className={sUtils.hiddenSm} /> запрос в свободной форме, а не<br className={sUtils.hiddenSm} /> по конретному объекту.</p>
                  </div>
                  <div className={s.flexItem}>
                    {state === `new` && (
                      <Button size="xs" kind="warning" type="button" onClick={() => ::this.changeKind(`selection`)}>выбрать тип заявки</Button>
                    )}
                  </div>
                </Col>

                <Col sm="6" smOffset="1" className={sUtils.flexWrap}>
                  <div className={sUtils.fullWidth}>
                    <Heading size="sm">Запрос на продажу недвижмости</Heading>
                    <p className={sUtils.pushedTop2}>Начните обработку лида здесь,<br className={sUtils.hiddenSm} /> если клиент хочет продать или<br className={sUtils.hiddenSm} /> сдать свою недвижимость.</p>
                  </div>
                  <div className={s.flexItem}>
                    {state === `new` && (
                      <Button size="xs" kind="warning" type="button" onClick={() => ::this.changeKind(`selling`)}>выбрать тип заявки</Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        <Row className={sUtils.pushedBottom3}>
          <Col sm="20">
            <Heading size="md">Комментарий</Heading>

            <FormField field={this.props.fields.note}>
              <Form.Textarea className={s.textarea} rows="9" block kind="primary" disabled={isStatic} />
            </FormField>
          </Col>
        </Row>
        <Row>
          <Col xs="20">
            <Status data={data} state={this.props.state} actions={this.props.actions} />
          </Col>
        </Row>
        {formKey === `create` && <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} kind="success" size="md" block>Добавить</Button>}
        {formKey !== `create` && <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} kind="warning" size="md" block>Сохранить</Button>}
      </Form.Container>
    );
  }
}

export default About;
