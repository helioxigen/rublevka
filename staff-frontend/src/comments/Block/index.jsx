import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-flexbox-grid';
import Thread from './Thread';
import { loadComments } from '../actions';
import CommentInputForm from './InputForm';

class Block extends Component {
  state = {};

  componentWillMount() {
    const { entity, dispatch } = this.props;

    if (entity.key && entity.id) {
      dispatch(loadComments(entity.key, entity.id));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { entity, dispatch } = this.props;

    if (
      nextProps.entity.key !== entity.key
      || nextProps.entity.id !== entity.id
    ) {
      dispatch(loadComments(nextProps.entity.key, nextProps.entity.id));
    }
  }

  render() {
    const { entity, state, actions } = this.props;
    const { comments } = state;
    const data = comments[entity.key][entity.id] || {};
    const { items = {}, activeCommentId } = data;

    return (
      <div>
        <Row>
          {Object.keys(items)
            .map(key => items[key])
            .map(item => (
              <Thread
                key={item.id}
                comment={item}
                entity={entity}
                state={state}
                actions={actions}
                activeCommentId={activeCommentId}
              />
            ))}
        </Row>
        <CommentInputForm entity={entity} />
      </div>
    );
  }
}

const pickState = ({ auth, comments, users }) => ({
  state: { auth, comments, users },
});

export default connect(pickState)(Block);
