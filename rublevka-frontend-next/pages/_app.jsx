import React from 'react';
import { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withReduxStore from 'next-redux-wrapper';
import Navbar from '../components/Navbar';
import { makeStore } from '../store';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    }
`;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, url: ctx.pathname };
    }

    render() {
        const { Component, pageProps, url, store } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <GlobalStyles />
                    {pageProps.statusCode !== 404 && <Navbar inverts={url === '/'} />}
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(makeStore)(MyApp);
