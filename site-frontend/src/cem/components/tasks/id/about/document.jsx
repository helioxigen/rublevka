import React, { Component } from 'react';
import { API } from 'core/config/resources';

import { reduxForm } from 'redux-form';

import { FormattedDate } from 'react-formatted';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  Form: { Input, Group },
  Table: { Row, Cell },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import { documentFormSettings } from 'cem/constants/tasks/form';

class Form extends Component {
  create() {
    const {
      taskId,
      actions,
      values: { file },
    } = this.props;

    actions.uploadDocument(taskId, file);
  }

  archive() {
    const { taskId, actions } = this.props;

    actions.archiveDocument(taskId);
  }

  delete() {
    const { taskId, actions } = this.props;

    actions.deleteDocument(taskId);
  }

  render() {
    const { taskId, data, fields, handleSubmit, auth } = this.props;

    return (
      <Row>
        {data && (
          <Cell>
            <FormattedDate mask="dd.mm.yy HH:MM" value={data.createdAt} />
          </Cell>
        )}
        {!data && (
          <Cell>
            <FormField field={fields.file} className={sUtils.resetIndentation}>
              <Input type="file" value={``} />
            </FormField>
          </Cell>
        )}
        <Cell>{data && data.uploaderTitle}</Cell>
        <Cell>{data && data.archiverTitle}</Cell>
        <Cell>
          {data && (
            <FormattedDate mask="dd.mm.yy HH:MM" value={data.archivedAt} />
          )}
        </Cell>
        <Cell>
          <Group className={sUtils.resetIndentation}>
            {!data && (
              <Button
                className={sButton.btnTableAction}
                size="xs"
                type="button"
                onClick={handleSubmit(::this.create)}
              >
                <Icon className={s.btnIcon} icon="checkmark" />
              </Button>
            )}
            {data && !data.archivedAt && (
              <Button
                className={sButton.btnTableAction}
                size="xs"
                type="button"
                onClick={::this.archive}
              >
                <Icon className={s.btnIcon} icon="archive" />
              </Button>
            )}
            {data && (
              <a
                className={sButton.btnTableAction}
                size="xs"
                type="button"
                href={`${API}/v1/tasks/${taskId}/document/download?token=${
                  auth.token
                }`}
              >
                <Icon className={s.btnIcon} icon="download" />
              </a>
            )}
            {data && !data.archivedAt && (
              <Button
                className={sButton.btnTableAction}
                size="xs"
                type="button"
                onClick={::this.delete}
              >
                <Icon className={s.btnIcon} icon="delete" />
              </Button>
            )}
          </Group>
        </Cell>
      </Row>
    );
  }
}

export default reduxForm(documentFormSettings)(Form);
