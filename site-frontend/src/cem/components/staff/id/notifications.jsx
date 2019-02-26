import React, { Component } from 'react';
import get from 'lodash/get';

import notifications from 'cem/constants/users/notifications/list';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/constants/users/notifications/form';

import UI from 'cem/components/ui';
const {
  Grid,
  Table,
  Button,
  Heading,
  Form: { Input },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

class Notifications extends Component {
  update() {
    const { actions, values } = this.props;

    return actions.updateNotificationSettings(values).then(() => {
      actions.pop(`success`, `Настройки уведомлений сохранены`);
      actions.loadNotificationSettings();
    });
  }

  render() {
    const { fields, handleSubmit, pristine, error, submitting } = this.props;

    return (
      <Grid.Row>
        <section className={s.section}>
          <Grid.Row>
            <Grid.Col xs="20" className={sUtils.pushedBottom3}>
              <Heading size="md">Объекты</Heading>
              <Table.Container width="100%">
                <Table.Row>
                  <Table.Heading>Уведомление</Table.Heading>
                  <Table.Heading>Email</Table.Heading>
                </Table.Row>
                {notifications.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell width="70%">{item.title}</Table.Cell>
                    <Table.Cell>
                      <Input type="checkbox" {...get(fields, item.key)} />
                    </Table.Cell>
                  </Table.Row>
                ))}
                {/* <Table.Row>
                  <Table.Cell width="70%">Изменена цена на городской объект</Table.Cell>
                  <Table.Cell>
                    <Input type="checkbox" {...fields.notifications.city_property_offer_price_changed_email} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width="70%">Изменена цена на загородный объект</Table.Cell>
                  <Table.Cell>
                    <Input type="checkbox" {...fields.notifications.country_property_offer_price_changed_email} />
                  </Table.Cell>
                </Table.Row>*/}
              </Table.Container>
            </Grid.Col>
          </Grid.Row>
        </section>
        {!pristine && (
          <Button
            className={cn(sButton.btnFixedBottom)}
            type="button"
            disabled={error || submitting || pristine}
            kind="warning"
            size="md"
            block
            onClick={handleSubmit(::this.update)}
          >
            Сохранить
          </Button>
        )}
      </Grid.Row>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(Notifications));
