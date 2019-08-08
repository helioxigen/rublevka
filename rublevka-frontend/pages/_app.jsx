import React from 'react';
import { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Error from 'next/error';
import { Provider } from 'react-redux';
import withReduxStore from 'next-redux-wrapper';
import { DefaultSeo } from 'next-seo';
import { YMaps } from 'react-yandex-maps';
import nookies from 'nookies';
import NProgress from '@components/UI/atoms/NProgress';
import { Footer, Navbar } from '@components';
import { makeStore, initUser } from '../store';
import { app, sc, format, dict } from '@utils';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from '@config';

const GlobalStyles = createGlobalStyle`

    html, body {
        max-width: 100vw;
    }
    body {
        color: #232323;
        background: #fafafa;
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    }

    .scroll-locked {
        overflow: hidden;
        max-height: 100vh;
    }
`;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            const [dealType, kind] = dict.translit.byWord(ctx.query.dealType, ctx.query.kind);

            ctx.params = {
                dealType,
                kind,
            };

            pageProps = await Component.getInitialProps(ctx);
        }

        const { error } = ctx.store.getState().properties;

        if (ctx.req) {
            const { favorite = '[]', currency = app.config.defaultCurrency } = nookies.get(ctx);

            ctx.store.dispatch(initUser(JSON.parse(favorite), currency));
        }

        return { pageProps, notFound: error.hasError && error.message.message === 'Not Found' };
    }

    render() {
        const { Component, pageProps, store, notFound } = this.props;

        const {
            meta: { title = config.site.meta.title, description = config.site.meta.description, images } = {},
            prevPage,
            menuEntry,
            asPath,
        } = pageProps;

        return (
            <Container>
                <NProgress color={sc.theme.colors.red} spinner={false} />
                <DefaultSeo
                    title={title}
                    description={description}
                    canonical={`https://${config.site.domain}${asPath}`}
                    openGraph={{
                        type: 'website',
                        locale: 'ru_RU',
                        url: `https://${config.site.domain}${asPath}`,
                        images: images || [`https://${config.site.domain}/static/logos/${config.app}.jpg`],
                        site_name: format.capitalize(config.app),

                        title,
                        description,
                    }}
                />
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
                    }}
                >
                    <Provider store={store}>
                        <GlobalStyles />
                        <Navbar prevPage={prevPage} activeEntry={menuEntry} title={pageProps.title} />
                        {notFound ? <Error statusCode={404} /> : <Component {...pageProps} />}
                        <Footer />
                    </Provider>
                </YMaps>
            </Container>
        );
    }
}

export default withReduxStore(makeStore)(MyApp);
