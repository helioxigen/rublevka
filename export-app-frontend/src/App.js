import React, { Component } from 'react';
import styled from 'styled-components';
import { IntlProvider, addLocaleData } from 'react-intl';
import ru from 'react-intl/locale-data/ru';

import Search from './Search';
import List from './List';
import Login from './Login';
import Footer from './Footer';
// import History from './History';

import { FBRublevka } from './firebase';
import getItems from './List/requests/getItems';
// import getHistory from './List/requests/getHistory';
import { subscribe } from './List/requests';
import rublevkaLogo from './rublevka.svg';

addLocaleData(ru);

const Header = styled.header`
  text-align: center;
  margin-bottom: 36px;
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
    user: {
      canView: true,
    },

    itemsOnSale: [],
    itemsOnRent: [],
    itemsLoading: false,
    itemsError: false,
  };

  componentDidMount() {
    this.setState({ itemsLoading: true, itemsError: false });

    this.unsubscribeFromAuth = FBRublevka.auth.onAuthStateChanged((userData) => {
      if (userData) {
        const { email, displayName, photoURL } = userData;
        const data = { displayName, photoURL };

        FBRublevka.get('users', email).then((doc) => {
          FBRublevka.setWithKey('users', email, data);

          if (doc.data().canView) {
            this.unsubscribeFromProperties = subscribe(this.getItems);
            // this.unsubscribeFromHistory = subscribeToHistory(this.getHistory);
          }

          this.updateUser({ email, ...doc.data() });
        });
      }
    });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribeFromAuth === 'function') {
      this.unsubscribeFromAuth();
    }

    if (typeof this.unsubscribeFromProperties === 'function') {
      this.unsubscribeFromProperties();
    }

    // if (typeof this.unsubscribeFromHistory === 'function') {
    //   this.unsubscribeFromHistory();
    // }
  }

  // getHistory = () => {
  //   getHistory().then(history => this.setState({ history }));
  // };

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
    const { user = {} } = this.state;
    const { currentUser = {} } = FBRublevka.auth || {};

    return (
      <IntlProvider locale="ru">
        <main>
          <Header>
            <Logo src={rublevkaLogo} />
          </Header>

          <div className="container">
            {/* <History history={history} /> */}

            {!user.isLoggedIn && <Login firebaseInstance={FBRublevka} />}
            {user.admin && (
              <>
                <Search user={user} />
                <List {...this.state} />
              </>
            )}
            {user.isLoggedIn && (!user.admin || !user.canView) && (
              <Alert>Нет прав</Alert>
            )}
            {user.isLoggedIn && <Footer currentUser={currentUser} />}
          </div>
        </main>
      </IntlProvider>
    );
  }
}

export default App;
