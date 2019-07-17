import React from 'react';
import { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withReduxStore from 'next-redux-wrapper';
import { YMaps } from 'react-yandex-maps';
import { PageTitleContext } from '@hooks/usePageTitle';
import { Footer } from '@components';
import Navbar from '../components/Navbar';
import { makeStore, setFavorite } from '../store';

const GlobalStyles = createGlobalStyle`
    body {
        color: #232323;
        background: #fafafa;
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    }

    .scroll-locked {
        overflow: hidden;
    }
`;

class MyApp extends App {
    state = {
        pageTitle: '',
    };

    setPageTitle = newTitle => {
        this.setState({
            pageTitle: newTitle,
        });
    };

    componentDidMount() {
        const { store } = this.props;

        const fav = localStorage.getItem('favorite');

        store.dispatch(setFavorite(JSON.parse(fav || '[]')));
    }

    render() {
        const { pageTitle } = this.state;
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <YMaps>
                    <PageTitleContext.Provider value={[pageTitle, this.setPageTitle]}>
                        <Provider store={store}>
                            <GlobalStyles />
                            <Navbar />
                            <Component {...pageProps} />
                            <Footer />
                        </Provider>
                    </PageTitleContext.Provider>
                </YMaps>
            </Container>
        );
    }
}

export default withReduxStore(makeStore)(MyApp);
