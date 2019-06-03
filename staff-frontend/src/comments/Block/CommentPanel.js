import React, { Component } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { setActiveComment } from '../actions';
import Avatar from './Avatar';
import { defaultFormat } from '../../date';

const StCommentPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Meta = styled.div`
  padding-left: 22px;
`;

const CommentDate = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 13px;
  color: #808080;
`;

const Name = styled(RouterLink)`
  margin-top: 0px;
  font-weight: 700;
  font-size: 20px;
  line-height: 19px;
  color: #000000;
`;

const Text = styled(ReactMarkdown)`
  margin-top: 0;
  font-size: 18px;
  line-height: 23px;
  color: #000000;
`;

const ReplyButton = styled.button`
  box-shadow: none;
  background: transparent;
  cursor: pointer;
  border: none;
  font-size: 16px;
  line-height: 15px;
  padding: 0px;
  color: #808080;
`;

class CommentPanel extends Component {
  state = {};

  render() {
    const {
      comment, entity, users, dispatch,
    } = this.props;
    const {
      id, text, createdAt, userId,
    } = comment;
    const user = users[userId].data || {};
    const { firstName = '', lastName = '', photo } = user;
    const name = `${firstName || ''} ${lastName}`;

    return (
      <StCommentPanel id={`comment-${id}`}>
        <TopRow>
          <Avatar id={photo && photo.id} />
          <Meta>
            <Name to={`/staff/${userId}`}>{name}</Name>
            <a href={`#comment-${id}`}>
              <CommentDate>{defaultFormat(createdAt)}</CommentDate>
            </a>
          </Meta>
        </TopRow>
        <Text source={text} />
        <div>
          <ReplyButton
            onClick={() =>
              dispatch(setActiveComment(entity.key, entity.id, id))
            }
          >
            Ответить
          </ReplyButton>
        </div>
      </StCommentPanel>
    );
  }
}

const pickState = ({ users }) => ({
  users,
});

export default connect(pickState)(CommentPanel);
