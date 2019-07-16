import { css } from 'styled-components';
import { sc, media } from '@utils';

export default sc.createExt(media.upToDesktop)(
    css`
        &[data-open='true']::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
        }

        .menu-content {
            position: fixed;
            height: 100vh;
            width: 320px;
            right: -320px;

            background: white;
            overflow-y: scroll;
            color: #232323;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
            transition: transform 225ms cubic-bezier(0, 0, 0.2, 1);
            flex-direction: column;
            padding: 18px 20px 25px;
            box-sizing: border-box;
        }

        z-index: 1500;

        &[data-open='true'] .menu-content {
            transform: translateX(-100%);
        }

        .close-button {
            display: inline-block;
            background: none;

            padding: 0;

            color: #bcbcbc;
            font-size: 24px;
        }

        .header-right {
            flex-wrap: wrap;

            .phone {
                margin: 0;
                height: auto;
                flex: 1 100%;

                font-size: 18px;
                font-weight: bold;
                margin: 0 0 16px;
            }

            button {
                padding: 0;
            }

            .callback-button {
                flex: 1;
                margin-right: 12px;
                border: 0;
            }

            .whatsapp-button {
                font-size: 28px;
            }
        }

        nav,
        nav a {
            display: block;
            height: auto;
        }

        nav a {
            letter-spacing: 0.5625px;
            font-weight: bold;
        }

        nav > * {
            margin: 0 0 24px;
        }

        z-index: 5;
    `
);
