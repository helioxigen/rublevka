import React from 'react';
import { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';
import Navbar from '../components/Navbar';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    }
`;

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <GlobalStyles />
                <Navbar />
                <Component {...pageProps} />
            </Container>
        );
    }
}
