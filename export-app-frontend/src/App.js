import React, { Component } from 'react';
import styled from 'styled-components';
import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';

import Search from './Search';
import List from './List';
import Login from './Login';
import { FirebaseDefaultInstance } from './firebase';
import getItems from './List/requests/getItems';
import subscribeToItems from './List/requests/subscribeToItems';
import rublevkaLogo from './rublevka.svg';

addLocaleData(ru);

const Header = styled.header`
  text-align: center;
  margin-bottom: 36px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  min-height: 44px;
`;

const UserInfoImg = styled.img`
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
`;

const UserInfoName = styled.p`
  color: #393a3a;
  font-weight: bold;
`;

const Logo = styled.img`
  height: 32px;
`;

const Alert = styled.div`
  padding: 24px;
  background: #fff;
  text-align: center;
  font-size: 24px;
  border: 2px solid #e53f53;
  color: #e53f53;
  margin-bottom: 36px;
`;

class App extends Component {
  state = {
    user: {},

    itemsOnSale: [],
    itemsOnRent: [],
    itemsLoading: false,
    itemsError: false,
  };

  componentDidMount() {
    this.setState({ itemsLoading: true, itemsError: false });

    this.unsubscribeFromProperties = subscribeToItems(this.getItems);

    this.unsubscribe = FirebaseDefaultInstance.auth.onAuthStateChanged(
      (userData) => {
        if (userData) {
          FirebaseDefaultInstance.get('users', userData.email).then((doc) => {
            if (!doc.exists) {
              FirebaseDefaultInstance.setWithKey('users', userData.email, {});
            }

            this.updateUser(doc.data());
          });
        }
      },
    );
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }

    if (typeof this.unsubscribeFromProperties === 'function') {
      this.unsubscribe();
    }
  }

  getItems = () => {
    getItems()
      .then((newState) => {
        this.setState(newState);
      })
      .catch(() => {
        this.setState({ itemsError: true, itemsOnSale: [], itemsOnRent: [] });
      })
      .finally(() => {
        this.setState({ itemsLoading: false });
      });
  };

  updateUser = (data) => {
    this.setState(state => ({
      user: {
        ...state.user,
        ...data, // { admin: Boolean, canView: Boolean }
        isLoggedIn: !!data,
      },
    }));
  };

  render() {
    const { user } = this.state;
    const { currentUser = {} } = FirebaseDefaultInstance.auth || {};

    return !user.isLoggedIn ? (
      <Login firebaseInstance={FirebaseDefaultInstance} />
    ) : (
      <IntlProvider locale="ru">
        <main>
          <Header>
            <Logo src={rublevkaLogo} />
          </Header>

          <div className="container">
            {user.admin && (
              <>
                <Search />
                <List {...this.state} />
              </>
            )}
            {(!user.admin || !user.canView) && <Alert>Нет прав</Alert>}
            <Footer>
              <UserInfo>
                {currentUser && (
                  <>
                    <UserInfoImg src={currentUser.photoURL} />

                    <UserInfoName>{currentUser.displayName}</UserInfoName>
                  </>
                )}
              </UserInfo>
            </Footer>
          </div>
        </main>
      </IntlProvider>
    );
  }
}

export default App;
