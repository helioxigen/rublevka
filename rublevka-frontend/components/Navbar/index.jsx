import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon, Button, Content, PageContainer, IconButton } from '@components/UI';
import styled from 'styled-components';
import config from '@config';
import { app, media, sc } from '@utils';
import MainMenu from './MainMenu';
import { useComponentVisible, useInvertOnScroll, usePageTitle } from '@hooks';

const Navbar = ({ className }) => {
    const { pathname } = useRouter();

    const isLanding = pathname === '/';

    const isInverted = useInvertOnScroll(isLanding, 80);
    // const [ref, menuOpen, setIsMenuOpen] = useComponentVisible(false);
    const [menuOpen, setIsMenuOpen] = useState(false);

    const favoriteCount = useSelector(state => state.user.favorite.length);

    const title = usePageTitle();

    return (
        <header className={className} data-islanding={isLanding} data-inverted={isInverted}>
            <Content className="content">
                {/* <IconButton className="" secondary icon="arrow" mirror stroke /> */}
                <Link href="/">
                    <a className="logo">
                        <Icon className="go-back" name="arrow" mirror stroke />
                        <Icon className="logo-icon" name={config.app} />
                    </a>
                </Link>
                {title && <span className="page-title">{title}</span>}
                <MainMenu isOpen={menuOpen} onClose={() => setIsMenuOpen(false)} favoriteCount={favoriteCount} />
                <div className="controls">
                    <Link href="/favorites">
                        <a className="favorites">
                            <Icon secondary className="favorite-icon" name="favorite" stroke />
                            <span className="counter" data-show={favoriteCount > 0}>
                                {favoriteCount === 0 ? 1 : favoriteCount}
                            </span>
                        </a>
                    </Link>
                    <IconButton
                        secondary
                        onClick={() => setIsMenuOpen(true)}
                        className="menu-button"
                        icon="hamburger"
                    />
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

    font-size: 20px;

    .controls {
        display: flex;

        .menu-button {
            margin: 0 0 0 25px;
        }

        ${media.query.tabletLandscape} {
            font-size: 24px;
        }
    }

    .page-title {
        font-weight: 500;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-bottom: 5px;
        justify-content: center;
        pointer-events: none;
        font-size: 16px;
    }

    height: 48px;
    padding: 0 15px;
    box-sizing: border-box;

    position: absolute;

    ${media.query.tabletLandscape} {
        height: 60px;
        position: fixed;
        font-size: 15px;

        .menu-button,
        .page-title {
            display: none;
        }
    }

    .logo-icon {
        display: none;
    }

    ${media.query.desktop} {
        ${MainMenu} {
            margin-left: 35px;
        }
    }

    ${media.query.tablet} {
        .go-back {
            display: none;
        }

        .logo-icon {
            display: block;
        }
    }

    &[data-islanding='true'] {
        background: none;
        box-shadow: initial;
        color: white;

        .go-back {
            display: none;
        }

        .logo-icon {
            display: block;
        }

        ${media.query.tabletLandscape} {
            &[data-inverted='false'] {
                color: ${sc.theme.colors.black};
                background: white;
                box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
            }
        }
    }

    &[data-islanding='true'][data-inverted='true'] {
        ${media.query.tabletLandscape} {
            .callback-button {
                border: 2px solid white;
                background: none;

                &:hover,
                &:active {
                    background: white;
                    color: black;
                }
            }
        }
    }

    ${media.query.tablet} {
        .page-title {
            display: none;
        }
    }

    a {
        font-size: 1em;
        text-decoration: none;
        text-transform: uppercase;

        color: inherit;

        height: 100%;
        display: flex;
        align-items: center;
    }

    a:not(.logo):hover {
        color: #f44336;
    }

    .content {
        display: flex;
        justify-content: space-between;
        height: 100%;

        ${media.query.desktop} {
            justify-content: initial;
        }
    }

    transition: color 225ms;

    .header-right {
        display: flex;
        align-items: center;
    }

    .logo-icon {
        font-size: 130px;
        height: 100%;
    }

    .phone {
        font-size: 1.2em;
        margin-right: 16px;
    }

    a[data-active='true'] {
        color: ${sc.theme.colors.red};

        ${media.query.tabletLandscape} {
            border-bottom: 2px solid ${sc.theme.colors.red};
        }
    }

    .callback-button {
        border: 2px solid transparent;

        ${media.query.tabletLandscape} {
            line-height: 43px;
            margin: 0 24px 0 16px;
        }
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
