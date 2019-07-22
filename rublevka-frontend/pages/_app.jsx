import React from 'react';
import { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withReduxStore from 'next-redux-wrapper';
import { YMaps } from 'react-yandex-maps';
import { Footer, Navbar } from '@components';
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
    componentDidMount() {
        const { store } = this.props;

        const fav = localStorage.getItem('favorite');

        store.dispatch(setFavorite(JSON.parse(fav || '[]')));
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
                    />
                    <link href="/static/favicon.png" rel="icon" />
                </Head>
                <YMaps>
                    <Provider store={store}>
                        <GlobalStyles />
                        <Navbar title={pageProps.title} />
                        <Component {...pageProps} />
                        <Footer />
                    </Provider>
                </YMaps>
            </Container>
        );
    }
}

export default withReduxStore(makeStore)(MyApp);
