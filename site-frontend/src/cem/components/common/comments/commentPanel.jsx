import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

import UI from 'cem/components/ui';
const { Button } = UI;
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/id/content';

import { api } from 'core/config/constants';

const Image = ({ id }) => (
  <UI.Image
    src={
      id
        ? `${api.cloudfront}/${id}-128`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    kind="circle"
    width="42"
    height="42"
  />
);

const CommentBody = props => (
  <div className={s.flexBody}>
    <h5 className={s.commentTitle}>
      <Link to={`/staff/${props.userId}`}>{props.name}</Link>
    </h5>
    <ReactMarkdown className={s.commentBody} source={props.text} />
    <div>
      <a className={s.commentTime} href={`#comment-${props.id}`}>
        <FormattedDate value={props.time} mask="dd.mm.yyyy HH:MM" />
      </a>
      <Button
        className={s.commentBtn}
        size="xs"
        type="button"
        onClick={() =>
          props.actions.setActiveComment(
            props.entity.key,
            props.entity.id,
            props.id,
          )
        }
      >
        Ответить
      </Button>
    </div>
  </div>
);

export default class extends Component {
  render() {
    const {
      state,
      actions,
      text,
      createdAt,
      userId,
      entity,
      id,
      className,
    } = this.props;
    const { data: userData = {} } = state.users[userId] || {};

    return (
      <div className={cn(className, s.flex)} id={`comment-${id}`}>
        <Image id={userData.photo && userData.photo.id} />
        <CommentBody
          id={id}
          entity={entity}
          actions={actions}
          userId={userId}
          name={`${userData.firstName} ${userData.lastName}`}
          text={text}
          time={createdAt}
        />
      </div>
    );
  }
}
