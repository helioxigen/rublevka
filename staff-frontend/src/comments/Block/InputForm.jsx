import React, { Component } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { theme } from '../../UI';
import { loadComments, createComment } from '../actions';

const StInput = styled.div`
  background: #ffffff;
  border: 1px solid rgba(128, 128, 128, 0.2);
  box-sizing: border-box;
  border-radius: 2px;
  padding: 16px;
  width: 100%;
  margin-bottom: 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const SubmitButtton = styled.button`
  border: none;
  background: ${theme.blue};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.23);
  border-radius: 3px;
  padding: 9px 32px;
  font-size: 16px;
  line-height: 15px;
  color: #ffffff;
  cursor: pointer;
`;

const Input = styled(TextareaAutosize)`
  font-size: 16px;
  line-height: 15px;
  color: black;
  outline: none;
  width: 100%;
  display: block;
  transition: border-bottom 0.3s ease-in-out;
  border: none;
  background-color: transparent;
  overflow-y: hidden;
  &::placeholder {
    opacity: 0.25;
  }
  min-block-size: 100px;
`;

class CommentInput extends Component {
  state = { inputValue: '' };

  onSubmitSuccess() {
    const { entity, dispatch } = this.props;
    dispatch(loadComments(entity.key, entity.id));
    this.setState({ inputValue: '' });
  }

  createComment = async (text) => {
    const { entity, dispatch, parentId } = this.props;
    await dispatch(createComment(entity.key, entity.id, { parentId, text }));
    this.onSubmitSuccess();
  };

  onSubmitClick = () => {
    const { inputValue } = this.state;

    if (inputValue && inputValue.trim()) {
      this.createComment(inputValue);
    }
  };

  render() {
    return (
      <StInput>
        <Input
          multiline
          placeholder="Написать комментарий..."
          onChange={(event) => {
            const text = event.target.value;
            this.setState({ inputValue: text });
          }}
        />
        <ButtonRow>
          <SubmitButtton onClick={this.onSubmitClick}>Отправить</SubmitButtton>
        </ButtonRow>
      </StInput>
    );
  }
}

export default connect()(CommentInput);
