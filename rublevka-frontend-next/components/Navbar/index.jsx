import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon, Button, Content, PageContainer, IconButton } from '@components/UI';
import styled from 'styled-components';
import config from '@config';
import { app, media, sc } from '@utils';
import MainMenu from './MainMenu';
import { useComponentVisible, useInvertOnScroll } from '@hooks';

const Navbar = ({ className }) => {
    const { pathname } = useRouter();

    const isLanding = pathname === '/';

    const isInverted = useInvertOnScroll(isLanding, 80);
    const [ref, menuOpen, setIsMenuOpen] = useComponentVisible(false);

    const favoriteCount = useSelector(state => state.user.favorite.length);

    return (
        <header className={className} data-islanding={isLanding} data-inverted={isInverted}>
            <Content className="content">
                <Link href="/">
                    <a className="logo">
                        <Icon className="logo-icon" name={config.app} />
                    </a>
                </Link>
                <MainMenu
                    ref={ref}
                    isOpen={menuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    favoriteCount={favoriteCount}
                />
                <div className="controls">
                    <Link href="/favorites">
                        <a className="favorites">
                            <Icon iconOnly className="favorite-icon" name="favorite" stroke />
                            <span className="counter" data-show={favoriteCount > 0}>
                                {favoriteCount === 0 ? 1 : favoriteCount}
                            </span>
                        </a>
                    </Link>
                    <IconButton iconOnly onClick={() => setIsMenuOpen(true)} className="menu-button" icon="hamburger" />
                </div>
            </Content>
        </header>
    );
};

export default styled(Navbar)`
    width: 100%;
    position: fixed;

    z-index: 1000;

    color: ${sc.theme.colors.black};
    background: white;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);

    font-size: 15px;

    .controls {
        display: flex;

        font-size: 20px;

        .menu-button {
            margin: 0 0 0 25px;
        }

        ${media.desktop`
            font-size: 24px;
        `}
    }

    ${media.upToMinDesktop`
        height: 48px;
        padding: 0 15px;
        box-sizing: border-box;

        color: ${sc.theme.colors.black};

        position: absolute;

        &[data-isLanding="true"]{
            background: none;
            box-shadow: none;
            color: white;
        }
    `}

    ${media.desktop`
        height: 60px;
        
        .menu-button {
            display: none;
        }
    `}

    a {
        font-size: 1em;
        text-decoration: none;
        text-transform: uppercase;

        color: inherit;

        height: 100%;
        display: flex;
        align-items: center;
    }

    .content {
        display: flex;
        height: 100%;

        ${media.upToDesktop`
            justify-content: space-between;
        `}
    }

    transition: 225ms;
    /* 
    .logo svg {
        fill: black;
    } */

    .header-right {
        display: flex;
        align-items: center;
    }

    .logo {
        margin-right: 15px;
        width: 130px;

        ${Icon} {
            width: 100%;
            height: 100%;
        }
    }

    .phone {
        font-size: 1.2em;
        margin-right: 16px;
    }

    a[data-active='true'] {
        color: ${sc.theme.colors.red};

        ${media.lg`
            border-bottom: 2px solid ${sc.theme.colors.red};
        `}
    }

    .callback-button {
        font-size: 1em;
        border: 2px solid transparent;
    }

    ${media.desktop`
        a:not(.logo) {
            margin: 0 15px;
        }

        &[data-islanding="true"][data-inverted='true'] {
            background: none;
            box-shadow: initial;
            color: white;

            a {
                color: white;
            }

            .callback-button {
                color: white;
                border: 2px solid white;
                background: none;
            }

            .callback-button:hover,
            .callback-button:active {
                background: white;
                color: black;
            }

            .logo-icon svg {
                fill: white;
            }

            .favorite-icon svg {
                stroke: white;
            }
        }
    `}

    a:hover {
        color: #f44336;
    }

    .favorites {
        position: relative;
        margin: 0;

        svg {
            stroke-width: 2px;
        }

        .counter {
            opacity: 0;
            background: rgba(244, 67, 54, 0.9);
            border-radius: 50%;
            width: 18px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            color: white;

            font-weight: 300;
            text-align: center;

            position: absolute;
            top: 10px;
            right: -9px;

            transition: 0.2s;

            &[data-show='true'] {
                opacity: 1;
            }
        }
    }
`;
