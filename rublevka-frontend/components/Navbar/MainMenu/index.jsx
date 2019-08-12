/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styled from 'styled-components';
import { IconButton, Button, AdaptiveSidebar } from '@components/UI';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CallbackModal } from '@components/Modals';
import { app, media, sc } from '@utils';
import { useLockBodyScroll, useIsomorphicLayoutEffect } from '@hooks';

const MainMenu = ({ className, onClose, isOpen, favoriteCount, activeEntry }) => {
    const { pathname, asPath } = useRouter();

    useIsomorphicLayoutEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [asPath]);

    useLockBodyScroll(isOpen);

    return (
        <AdaptiveSidebar isWebsiteMenu className={className} isOpen={isOpen} onClose={onClose}>
            <nav>
                <IconButton secondary onClick={onClose} className="close-button menu-only" icon="close" />
                <Link href="/">
                    <a className="menu-only" data-active={pathname === '/'}>
                        Главная
                    </a>
                </Link>
                <Link prefetch={false} href="/catalog?dealType=prodaja" as="/zagorodnaya/prodaja">
                    <a data-active={activeEntry === 'sale'}>Продажа</a>
                </Link>
                <Link href="/catalog?dealType=arenda" as="/zagorodnaya/arenda">
                    <a data-active={activeEntry === 'rent'}>Аренда</a>
                </Link>
                <Link href="/settlements.list" as="/zagorodnaya/kottedzhnye-poselki">
                    <a data-active={activeEntry === 'settlements'}>Посёлки</a>
                </Link>
                <Link href="/favorites">
                    <a className="menu-only favorites-entry" data-active={activeEntry === 'favorite'}>
                        Избранное {favoriteCount > 0 && <span className="counter">{favoriteCount}</span>}
                    </a>
                </Link>
                <Link href="/contacts">
                    <a data-active={activeEntry === 'contacts'}>Контакты</a>
                </Link>
            </nav>
            <div className="header-right">
                <a href={`tel:+${app.config.phoneNumbers}`} className="phone">
                    {app.config.phone}
                </a>
                <CallbackModal>
                    {onOpen => (
                        <Button
                            className="callback-button"
                            onClick={() => {
                                onOpen();
                                onClose();
                            }}
                        >
                            Обратный звонок
                        </Button>
                    )}
                </CallbackModal>
                <IconButton
                    target="__blank"
                    href={`https://wa.me/${app.config.whatsapp}`}
                    className="whatsapp-button menu-only"
                    icon="whatsapp"
                />
            </div>
        </AdaptiveSidebar>
    );
};

export default styled(MainMenu)`
    flex: 1 0 auto;

    nav {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .menu-content {
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    .favorites-entry {
        display: flex;
        align-items: center;
    }

    ${media.desktop.to(
        css => css`
            .close-button {
                display: inline-block;
                background: none;

                padding: 0;

                height: 2em;

                color: #bcbcbc;
                font-size: 24px;
                padding: 0 1em 0.5em 0;
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

                .callback-button {
                    flex: 1;
                    margin-right: 12px;
                    border: 0;
                }

                .whatsapp-button {
                    font-size: 28px;
                    height: 56px;
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
                padding: 12px 0;
            }
        `
    )}

    ${media.desktop.at(
        css => css`
            .menu-only {
                display: none;
            }

            nav a {
                margin: 0 15px;
            }
        `
    )}

    .counter {
        background: ${sc.theme.colors.red};
        border-radius: 50%;
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: white;
        display: inline-block;

        font-weight: 300;
        text-align: center;

        margin: 0 0 0 11px;
    }
`;
