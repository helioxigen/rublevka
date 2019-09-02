import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAvatarImage } from '../../utils';
import { defaultFormat } from '../../date';
import { loadUser } from '../../users/actions';

const StMetaInfo = styled.div`
  margin-top: 64px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const avatarSize = 128;

const User = styled.div`
  display: flex;
  flex-direction: row;
`;

const Avatar = styled.img`
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  border-radius: ${avatarSize / 2}px;
`;

const UserInfo = styled.div`
  padding-left: 32px;
  padding-top: 16px;
`;

const UserName = styled.div`
  font-size: 26px;
  line-height: 25px;
  font-weight: 600;
`;

const UserPosition = styled.div`
  font-size: 18px;
  line-height: 17px;
  margin-top: 8px;
  font-weight: 500;
`;

const DateComp = styled.div`
  margin-bottom: 36px;
  text-align: right;
`;

const DateValue = styled.div`
  font-size: 20px;
  line-height: 19px;
  font-weight: 600;
`;

const DateTitle = styled.div`
  font-size: 16px;
  line-height: 15px;
  margin-top: 12px;
  font-weight: 500;
`;

class MetaInfo extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      property: { responsibleUser: { id: prevRespUserId } = {} },
    } = prevProps;
    const {
      property: { responsibleUser: { id: respUserId } = {} },
    } = this.props;
    if (prevRespUserId !== respUserId) {
      this.loadRespUser();
    }
  }

  loadRespUser = () => {
    const { dispatch } = this.props;
    const id = this.getRespUserId();
    dispatch(loadUser(id));
  };

  getRespUserId = () => {
    const { property } = this.props;
    const { responsibleUser } = property;
    return responsibleUser.id;
  };

  render() {
    const {
      users,
      property: { createdAt, updatedAt },
    } = this.props;
    const respUserId = this.getRespUserId();
    const user = (users[respUserId] || {}).data;

    if (!user) {
      return null;
    }

    const {
      photo: { id: photoId } = {},
      firstName,
      lastName,
    } = user;

    return (
      <StMetaInfo>
        <User>
          <Avatar src={getAvatarImage(photoId)} />
          <UserInfo>
            <UserName>{`${firstName} ${lastName}`}</UserName>
            <UserPosition>Ответственный сотрудник</UserPosition>
          </UserInfo>
        </User>
        <div>
          <DateComp>
            <DateValue>{defaultFormat(updatedAt)}</DateValue>
            <DateTitle>обновлён</DateTitle>
          </DateComp>
          <DateComp>
            <DateValue>{defaultFormat(createdAt)}</DateValue>
            <DateTitle>создан</DateTitle>
          </DateComp>
        </div>
      </StMetaInfo>
    );
  }
}

const pickState = ({ users }) => ({
  users,
});

export default connect(pickState)(MetaInfo);
