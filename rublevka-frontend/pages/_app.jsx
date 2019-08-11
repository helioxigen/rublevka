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
import config from '@config';

require('intersection-observer');

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

const isProduction = process.env.NODE_ENV === 'production';

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

        if (error.hasError && (error.message.message || error.message) === 'Not Found') {
            return { pageProps: {}, notFound: true };
        }

        if (ctx.req) {
            const { favorite = '[]', currency = app.config.defaultCurrency } = nookies.get(ctx);

            ctx.store.dispatch(initUser(JSON.parse(favorite), currency));
        }

        // const isProduction = process.env.NODE_ENV === 'production';
        // const { REACT_APP_GOOGLE_ANALYTICS_ID, REACT_APP_YANDEX_METRIKA_ID } = process.env;

        return { pageProps };
    }

    getGtagScript = () => {
        return {
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', '${config.external.gtagId}');
        `,
        };
    };

    getYandexMetrikaScript = () => ({
        __html: `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${config.external.yandexMetrikaId}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
        `,
    });

    getUISScript = () => ({
        __html: `
        var __cs = __cs || [];
        __cs.push(['setCsAccount', '${config.external.uisId}']);
        `,
    });

    render() {
        const {
            Component,
            pageProps,
            store,
            notFound,
            router: { asPath = '' },
        } = this.props;

        const {
            meta: { title = config.site.meta.title, description = config.site.meta.description, images } = {},
            prevPage,
            menuEntry,
        } = pageProps;

        const asPathname = asPath.split('?')[0];

        return (
            <Container>
                <NProgress color={sc.theme.colors.red} spinner={false} />
                <DefaultSeo
                    title={title}
                    description={description}
                    canonical={`https://${config.site.domain}${asPathname}`}
                    openGraph={{
                        type: 'website',
                        locale: 'ru_RU',
                        url: `https://${config.site.domain}${asPath}`,
                        images: images || [
                            {
                                width: 512,
                                height: 512,
                                url: `https://${config.site.domain}/static/logos/${config.app}.jpg`,
                                alt: `${config.site.domain} logo`,
                            },
                        ],
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
                    {isProduction && (
                        <>
                            <script dangerouslySetInnerHTML={this.getUISScript()} />
                            <script async src="https://app.uiscom.ru/static/cs.min.js" />
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${config.external.gtagId}>`}
                            />
                            <script dangerouslySetInnerHTML={this.getGtagScript()} />
                            <script dangerouslySetInnerHTML={this.getYandexMetrikaScript()} />
                            <noscript>
                                <div>
                                    <img
                                        src={`https://mc.yandex.ru/watch/${config.external.yandexMetrikaId}`}
                                        style={{
                                            position: 'absolute',
                                            left: -9999,
                                        }}
                                        alt=""
                                    />
                                </div>
                            </noscript>
                        </>
                    )}
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
