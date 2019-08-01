import React from 'react';
import { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withReduxStore from 'next-redux-wrapper';
import { YMaps } from 'react-yandex-maps';
import nookies from 'nookies';
import NProgress from '@components/UI/atoms/NProgress';
import { Footer, Navbar } from '@components';
import { makeStore, initUser } from '../store';
import { app, sc } from '@utils';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        if (ctx.req) {
            const { favorite = '[]', currency = app.config.defaultCurrency } = nookies.get(ctx);

            ctx.store.dispatch(initUser(JSON.parse(favorite), currency));
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <NProgress color={sc.theme.colors.red} spinner={false} />
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
                    />
                    <link href="/static/favicon.png" rel="icon" />
                </Head>
                <YMaps
                    query={{
                        apikey: 'f39a3e9a-410f-431a-a7ff-5d6e570c3834',
                        ns: 'use-load-option',
                        load: 'package.full',
                    }}
                >
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
