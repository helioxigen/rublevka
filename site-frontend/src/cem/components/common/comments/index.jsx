import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Button,
  Heading,
  Grid: { Row, Col },
} = UI;
import CommentThread from './commentThread';
import CommentInputForm from './commentInputForm';

import sUtils from 'cem/styles/utils';

import * as dict from 'cem/constants/comments/dictionaries';

class Comments extends Component {
  onSubscribe() {
    const { entity, actions } = this.props;
    actions
      .subscribe(entity.key, entity.id)
      .then(() =>
        actions.pop(
          `success`,
          `${dict.popUpTitles[entity.key]} (ID: ${entity.id})`,
          `Вы подписались на комментарии`,
        ),
      );
  }

  onUnsubscribe() {
    const { entity, actions } = this.props;
    actions
      .unsubscribe(entity.key, entity.id)
      .then(() =>
        actions.pop(
          `success`,
          `${dict.popUpTitles[entity.key]} (ID: ${entity.id})`,
          `Вы отписались от комментариев`,
        ),
      );
  }

  render() {
    const { entity, state, actions, isSubscriptionAvailable } = this.props;
    const { items = {}, activeCommentId, subscription = {} } =
      state.comments[entity.key][entity.id] || {};
    const currentUser = state.users[state.auth.id].data || {};

    return (
      <section>
        <Heading size="md">
          Комментарии
          {!!isSubscriptionAvailable &&
            subscription.data &&
            subscription.data.status === true && (
              <Button
                className={sUtils.pushedLeft1}
                size="xs"
                onClick={::this.onUnsubscribe}
              >
                Отписаться
              </Button>
            )}
          {!!isSubscriptionAvailable &&
            subscription.data &&
            subscription.data.status === false && (
              <Button
                className={sUtils.pushedLeft1}
                size="xs"
                onClick={::this.onSubscribe}
              >
                Подписаться
              </Button>
            )}
        </Heading>
        <Row>
          {Object.keys(items)
            .map(key => items[key])
            .map(item => (
              <Col xs="20" key={item.id}>
                <CommentThread
                  comment={item}
                  currentUserPhoto={currentUser.photo}
                  entity={entity}
                  state={state}
                  actions={actions}
                  activeCommentId={activeCommentId}
                />
              </Col>
            ))}
        </Row>
        <Row>
          <Col xs="20">
            <CommentInputForm
              formKey="main"
              className={sUtils.pushedTop1_5}
              entity={entity}
              actions={actions}
              userPhoto={currentUser.photo}
              initialValues={{ text: `` }}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

export default Comments;
