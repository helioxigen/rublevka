import React, { Component } from 'react';
import styled from 'styled-components';
import Panel from './Panel';
import InputForm from './InputForm';

const NestedCommentsWrapper = styled.div`
  padding-left: 56px;
  border-left: 1px dashed rgba(128, 128, 128, 0.5);
`;

const StThread = styled.div`
  width: 100%;
`;

class Thread extends Component {
  state = {};

  render() {
    const {
      comment, entity, state, actions, activeCommentId,
    } = this.props;
    const { children } = comment;

    return (
      <StThread>
        <Panel
          comment={comment}
          entity={entity}
          state={state}
          actions={actions}
        />
        {activeCommentId === comment.id && (
          <InputForm entity={entity} parentId={comment.id} />
        )}
        {children && (
          <NestedCommentsWrapper>
            {children.map(childComment => (
              <>
                <Thread
                  comment={childComment}
                  entity={entity}
                  state={state}
                  actions={actions}
                  activeCommentId={activeCommentId}
                />
              </>
            ))}
          </NestedCommentsWrapper>
        )}
      </StThread>
    );
  }
}

export default Thread;
