import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon, Content, IconButton } from '@components/UI';
import styled from 'styled-components';
import config from '@config';
import { media, sc } from '@utils';
import MainMenu from './MainMenu';
import { useInvertOnScroll, useScrollState, useScrollAnchors } from '@hooks';

const Navbar = ({ className, title, activeEntry, prevPage = { href: '/', as: '/' } }) => {
    const { pathname, push } = useRouter();

    const handlePrevPage = () => {
        push(prevPage.href, prevPage.as);
    };

    const isLanding = pathname === '/';

    const isScrollingDown = useScrollState(undefined, isLanding, isLanding ? 180 : 0);
    const isInverted = useInvertOnScroll(isLanding, 80);
    // const [ref, menuOpen, setIsMenuOpen] = useComponentVisible(false);
    const [menuOpen, setIsMenuOpen] = useState(false);
    const transitionActive = useScrollAnchors(130);

    const favoriteCount = useSelector(state => state.user.favorite.length);

    return (
        <header className={className} data-hide={isScrollingDown} data-islanding={isLanding} data-inverted={isInverted}>
            {isLanding && (
                <div className="adaptive-static-content">
                    <Link href="/">
                        <a className="logo">
                            <Icon className="logo-icon" name={config.app} />
                        </a>
                    </Link>
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
                </div>
            )}
            <div className="nav-container">
                <div className="floating-content" data-active={isLanding ? transitionActive : true}>
                    <Content className="content">
                        <IconButton onClick={handlePrevPage} className="go-back" secondary icon="arrow" mirror stroke />
                        <Link href="/">
                            <a className="logo">
                                <Icon className="logo-icon" name={config.app} />
                            </a>
                        </Link>
                        {title && <span className="page-title">{title}</span>}
                        <MainMenu
                            activeEntry={activeEntry}
                            isOpen={menuOpen}
                            onClose={() => setIsMenuOpen(false)}
                            favoriteCount={favoriteCount}
                        />
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
                </div>
            </div>
        </header>
    );
};

export default styled(Navbar)`
    width: 100%;
    /* position: fixed; */

    .nav-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 1350;
        height: inherit;
    }

    .adaptive-static-content {
        width: 100%;
        padding: 0 15px;

        height: inherit;

        box-sizing: border-box;

        color: white;

        position: absolute;

        display: flex;
        justify-content: space-between;

        ${media.desktop.at(
            css => css`
                display: none;
            `
        )}
    }

    .floating-content {
        width: 100%;
        padding: 0 15px;

        ${media.tablet.at(
            css => css`
                padding: 0;
            `
        )}

        height: inherit;

        box-sizing: border-box;

        color: ${sc.theme.colors.black};
        background-color: white;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);

        transition-property: background-color, transform;
        transition-duration: 225ms, 225ms;
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94), cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    font-size: 20px;

    ${media.desktop.to(
        css => css`
            &[data-islanding='true'] {
                &[data-inverted='true'] {
                    .nav-container {
                        pointer-events: none;
                    }

                    .menu-content {
                        pointer-events: all;
                    }

                    .floating-content {
                    }

                    .floating-content .content > *:not(${MainMenu}) {
                        display: none;
                    }
                }

                &[data-inverted='false'] {
                    .floating-content[data-active='false'] {
                        transform: translateY(-100%);
                    }
                }

                .floating-content[data-active='false'] {
                    transition: none;
                    background: none;
                }
            }

            &[data-hide='true'][data-inverted='false'] .floating-content {
                transform: translateY(-100%);
            }
        `
    )}

    .controls {
        display: flex;

        .menu-button {
            margin: 0 0 0 14px;
            padding: 0 0 0 10px;
            font-size: 20px;
        }

        ${media.desktop.at(
            css => css`
                font-size: 24px;
            `
        )}
    }

    .go-back {
        font-size: 20px;
        padding: 0 10px 0 0;
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

    ${media.desktop.at(
        css => css`
            height: 64px;
            font-size: 15px;

            .menu-button,
            .page-title {
                display: none;
            }
        `
    )}

    .logo-icon {
        display: none;
    }

    ${media.desktopL.at(
        css => css`
            ${MainMenu} {
                margin-left: 35px;
            }
        `
    )}

    ${media.tablet.at(
        css => css`
            .go-back,
            .page-title {
                display: none;
            }
            .logo-icon {
                display: block;
            }
        `
    )}

    &[data-islanding='true'] {
        max-height: 0;
    }

    &[data-islanding='true'] .floating-content {
        background: transparent;
        box-shadow: none;
        color: white;

        .go-back {
            display: none;
        }

        .logo-icon {
            display: block;
        }
    }

    &[data-islanding='true'][data-inverted='false'] .floating-content {
        color: ${sc.theme.colors.black};
        background-color: white;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
    }

    &[data-islanding='true'] .adaptive-static-content .logo-icon {
        display: block;
    }

    ${media.desktop.at(
        css => css`
            &[data-islanding='true'][data-inverted='true'] .floating-content {
                .callback-button {
                    border: 2px solid white;
                    background-color: transparent;

                    &:hover,
                    &:active {
                        background-color: white;
                        color: black;
                    }
                }
            }
        `
    )}

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

        ${media.desktopL.at(
            css => css`
                justify-content: initial;
            `
        )}
    }

    .header-right {
        display: flex;
        align-items: center;

        ${media.desktop.at(
            css => css`
                padding: 8px 0;
            `
        )}
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

        ${media.desktop.at(
            css => css`
                border-bottom: 2px solid ${sc.theme.colors.red};
            `
        )}
    }

    .callback-button {
        border: 2px solid transparent;

        ${media.desktop.at(
            css => css`
                margin: 0 24px 0 16px;
            `
        )}
    }

    .favorites {
        position: relative;
        margin: 0;

        svg {
            stroke-width: 2px;
        }

        .counter {
            opacity: 0;
            background-color: rgba(244, 67, 54, 0.9);
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
