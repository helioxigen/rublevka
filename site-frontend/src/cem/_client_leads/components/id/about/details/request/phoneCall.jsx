import React, { Component } from 'react';

import CallDetails from '../call';
import ContactDetails from '../contact';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/constants/leads/form/phoneCall';

import UI from 'cem/components/ui';
const {
  Button,
  Heading,
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  changeKind(requestKind) {
    const { values, data } = this.props;
    const lead = {
      ...values,
      requestDetails: undefined,
    };

    this.props.actions
      .updateLead(data.id, lead)
      .then(() =>
        this.props.actions.pushPath(
          `/client_leads/${data.kind}/${data.id}?requestKind=${requestKind}`,
        ),
      );
  }

  render() {
    const {
      data,
      formKey,
      isUpdateAllowed,
      isSensitiveDataVisible,
    } = this.props;
    const state =
      (data && data.stateDetails && data.stateDetails.toApprove) || data.state;

    const isStatic =
      (formKey !== 'create' && !isUpdateAllowed) ||
      ['spam', 'rejected', 'processed'].indexOf(state) > -1;

    return (
      <section className={s.section}>
        <CallDetails phoneCallDetails={data.phoneCallDetails} />
        {(formKey === 'create' || isSensitiveDataVisible) && (
          <ContactDetails
            fields={this.props.fields.contactDetails}
            isStatic={isStatic}
          />
        )}

        {!isStatic && <Heading size="md">Запрос</Heading>}
        {!isStatic && (
          <Row className={sUtils.pushedBottom6} sm="center">
            <Col md="18">
              <Row sm="center">
                <Col sm="6" className={sUtils.flexWrap}>
                  <div className={sUtils.fullWidth}>
                    <Heading size="sm">Запрос по объектам</Heading>
                    <p className={sUtils.pushedTop2}>
                      Начните обработку лида здесь,
                      <br className={sUtils.hiddenSm} /> если клиент обратился
                      по
                      <br className={sUtils.hiddenSm} /> конкретному объекту или
                      <br className={sUtils.hiddenSm} /> объектам.
                    </p>
                  </div>
                  <div className={s.flexItem}>
                    {state === 'new' && (
                      <Button
                        size="xs"
                        kind="warning"
                        type="button"
                        onClick={() => ::this.changeKind('properties')}
                      >
                        выбрать тип заявки
                      </Button>
                    )}
                  </div>
                </Col>

                <Col sm="6" smOffset="1" className={sUtils.flexWrap}>
                  <div className={sUtils.fullWidth}>
                    <Heading size="sm">Запрос в свободной форме</Heading>
                    <p className={sUtils.pushedTop2}>
                      Начните обработку лида здесь,
                      <br className={sUtils.hiddenSm} /> если клиент оставил вам
                      свой
                      <br className={sUtils.hiddenSm} /> запрос в свободной
                      форме, а не
                      <br className={sUtils.hiddenSm} /> по конретному объекту.
                    </p>
                  </div>
                  <div className={s.flexItem}>
                    {state === 'new' && (
                      <Button
                        size="xs"
                        kind="warning"
                        onClick={() => ::this.changeKind('selection')}
                      >
                        выбрать тип заявки
                      </Button>
                    )}
                  </div>
                </Col>

                <Col sm="6" smOffset="1" className={sUtils.flexWrap}>
                  <div className={sUtils.fullWidth}>
                    <Heading size="sm">Запрос на продажу недвижмости</Heading>
                    <p className={sUtils.pushedTop2}>
                      Начните обработку лида здесь,
                      <br className={sUtils.hiddenSm} /> если клиент хочет
                      продать или
                      <br className={sUtils.hiddenSm} /> сдать свою
                      недвижимость.
                    </p>
                  </div>
                  <div className={s.flexItem}>
                    {state === 'new' && (
                      <Button
                        size="xs"
                        kind="warning"
                        onClick={() => ::this.changeKind('selling')}
                      >
                        выбрать тип заявки
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </section>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(About));
