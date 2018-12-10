import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const { Button, Form: { Container, Group, Textarea } } = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { api } from 'core/config/constants';

const Image = ({ id }) => (
  <UI.Image
    src={
      id ? (
        `${api.cloudfront}/${id}-128`
      ) : (
        'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
      )
    }
    kind="circle"
    width="42"
    height="42"
  />
);

const Body = props => (
  <section className={s.flexBody}>
    <Group className={sUtils.paddingBottom1}>
      <Textarea
        className={s.textarea}
        rows="7"
        block
        {...props.fields.text}
        value={props.fields.text.value || ''}
      />
    </Group>
    <Button kind="accent" size="xs">
      Отправить
    </Button>
  </section>
);

class CommentInput extends Component {
  onSubmitSuccess() {
    const { entity, actions, resetForm } = this.props;

    resetForm();
    actions
      .loadComments(entity.key, entity.id)
      .then(() => actions.getSubscriptionStatus(entity.key, entity.id));
  }

  createComment() {
    const { entity, actions, values: { text, parentId = null } } = this.props;

    return actions.createComment(entity.key, entity.id, { parentId, text });
  }

  render() {
    const { fields, handleSubmit, className, userPhoto } = this.props;

    return (
      <Container
        className={cn(className, s.flex)}
        onSubmit={handleSubmit(::this.createComment, ::this.onSubmitSuccess)}
      >
        <Image id={userPhoto && userPhoto.id} />
        <Body fields={fields} />
      </Container>
    );
  }
}

const formSettings = {
  form: 'commentInput',
  fields: ['parentId', 'text'],
  validate: (values) => {
    const errors = {};
    if (!values.text) errors.text = 'Введите комментарий!';
    return errors;
  },
};

export default reduxForm(formSettings)(submitValidator()(CommentInput));
