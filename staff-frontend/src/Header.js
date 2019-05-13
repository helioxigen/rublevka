import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout } from './auth/actions';
import { store } from './store';
import { HollowButton, LabelSmall } from './UI';

const handleLogout = () => {
  localStorage.removeItem('reduxPersist:auth');
  store.dispatch(logout());
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Auth = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
`;

const Logout = styled(HollowButton)`
  margin: 10px 0px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const NameLabel = styled(LabelSmall)`
  margin-right: 12px;
`;

const BackButton = styled(HollowButton)`
  margin: 10px 0px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Header = (props) => {
  const {
    auth, onBackClick, backLabel, showBackButton,
  } = props;
  const { firstName, lastName } = auth;

  return (
    <Content>
      <div>
        {showBackButton && (
          <BackButton onClick={() => onBackClick()}>{backLabel}</BackButton>
        )}
      </div>
      <Auth>
        <NameLabel>{`${firstName} ${lastName}`}</NameLabel>
        <Logout onClick={() => handleLogout()}>Выйти</Logout>
      </Auth>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps)(Header);
