import styled from 'styled-components';
import { CallbackForm } from '@components/Forms';
import { media } from '@utils';

export default styled.main`
    h1 {
        font-size: 28px;
        line-height: 36px;

        margin: 0 0 24px;

        ${media.desktop.at(
            css => css`
                font-size: 44px;
                line-height: 56px;
            `
        )}
    }

    ${CallbackForm} {
        background: white;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 8px;

        padding: 32px 28px 40px;

        color: black;

        footer {
            display: none;
        }

        h2 {
            font-size: 28px;
            line-height: 32px;
            margin: 0 0 0.5em;
            text-align: center;
        }
    }

    .title button {
        padding: 0 30px;
    }

    .breadcrumbs {
        ${media.desktop.to(
            css => css`
                display: none;
            `
        )}
    }

    .details {
        margin-top: 48px;
    }

    nav a {
        color: rgba(255, 255, 255, 0.75) !important;
    }
`;
