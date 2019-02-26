import React, { Component } from 'react';

import formSettings from 'cem/constants/requests/search/form';
import { validatorShortcut } from 'core/decorators/submitValidator';

import User from 'cem/containers/common/user';
import Comments from 'cem/containers/common/comments';

import Request from './request';
import Properties from 'cem/containers/common/propertyTable';
import Answers from 'cem/containers/common/answers';
import LeadsTable from 'cem/containers/requests/search/id/leadsTable';
import ModalAddProperty from 'cem/components/common/propertyTable/add';

import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class About extends Component {
  handlePropertiesAddition(properties) {
    const { values, actions, formKey, handleSubmit } = this.props;
    const data = {
      ...values,
      propertyIds: [...values.propertyIds, ...properties],
    };

    handleSubmit(() => {
      return actions.updateSearchRequest(formKey, data).then(() => {
        actions.pop(`success`, `Заявка (ID: ${formKey})`, `Успешно обновлена`);
        this.props.fields.toggle.onChange(undefined);
        actions.loadSearchRequest(formKey);
      });
    })();
  }

  render() {
    const {
      formKey,
      fields,
      data = {},
      isUpdateAllowed,
      isCommentingAllowed,
    } = this.props;

    return (
      <Container fluid className={s.section}>
        <Request {...this.props} />
        {formKey !== `create` &&
          data.state !== `new` &&
          data.state !== `assigned` && (
            <Row>
              <Col xs="20">
                <Heading size="md">
                  Подходящие объекты
                  {data.state === `in_progress` && (
                    <ModalAddProperty
                      onAdd={::this.handlePropertiesAddition}
                      propertyCategory={data.propertyCategory}
                      field={fields.propertyIds}
                    >
                      <Button
                        type="button"
                        className={sButton.btnRoundPlus}
                        block
                        size="lg"
                        onClick={() => this.toggle()}
                      >
                        <Icon className={s.icon} icon="modal" />
                      </Button>
                    </ModalAddProperty>
                  )}
                </Heading>
              </Col>
            </Row>
          )}
        {formKey !== `create` &&
          data.state !== `new` &&
          data.state !== `assigned` && (
            <Properties
              field={fields.propertyIds}
              toggle={fields.toggle}
              propertyCategory={data.propertyCategory}
              isStatic={data.state !== `in_progress` || !isUpdateAllowed}
              title="Подходящие объекты"
            />
          )}
        {formKey !== `create` &&
          data.state !== `new` &&
          data.state !== `assigned` && (
            <LeadsTable
              searchRequestId={data.id}
              category={data.propertyCategory}
              isStatic={data.state !== `in_progress` || !isUpdateAllowed}
            />
          )}
        {formKey !== `create` && isCommentingAllowed && (
          <Row className={sUtils.pushedBottom6}>
            <Col xs="20">
              <Comments entity={{ key: `searchRequests`, id: formKey }} />
            </Col>
          </Row>
        )}
        {data.state === `finished` && data.id && (
          <Answers kind="selection" requestId={data.id} />
        )}
        <Row>
          <Col sm="10">
            {data.createdByUser && (
              <User id={data.createdByUser.id} title="Заказчик" />
            )}
          </Col>
          <Col className={sUtils.pushedTopXs2} sm="10">
            {data.responsibleUser && (
              <User id={data.responsibleUser.id} title="Ответственный" />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default validatorShortcut(formSettings)(About);
