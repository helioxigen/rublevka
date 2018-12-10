import React, { Component } from 'react';

import CommentPanel from './commentPanel';
import CommentInputForm from './commentInputForm';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class CommentThread extends Component {
  render() {
    const { comment, entity, state, actions, currentUserPhoto, activeCommentId } = this.props;
    return (
      <div>
        <CommentPanel {...comment} className={s.commentPanel} entity={entity} state={state} actions={actions} />
        {activeCommentId === comment.id &&
          <CommentInputForm formKey={comment.id.toString()} className={cn(sUtils.paddingLeft6_5, sUtils.pushedBottom2_5)} entity={entity} actions={actions} userPhoto={currentUserPhoto} initialValues={{ text: '', parentId: comment.id }} />
        }
        {comment.children.map(childComment =>
          (<div key={childComment.id}>
            <CommentPanel {...childComment} className={cn(sUtils.pushedBottom1, sUtils.paddingLeft6_5)} isInner entity={entity} state={state} actions={actions} />
            {activeCommentId === childComment.id &&
              <CommentInputForm formKey={comment.id.toString()} className={cn(sUtils.paddingLeft6_5, sUtils.pushedBottom2_5)} entity={entity} actions={actions} userPhoto={currentUserPhoto} initialValues={{ text: '', parentId: comment.id }} />
            }
          </div>),
        )}
      </div>
    );
  }
}

export default CommentThread;
