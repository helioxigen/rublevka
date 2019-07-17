/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IconButton, Button } from '@components/UI';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { app, media, sc } from '@utils';
import { useLockBodyScroll } from '@hooks';
import sidebarMenuExt from './sidebarMenu.ext';

const MainMenu = React.forwardRef(({ className, onClose, isOpen, favoriteCount }, ref) => {
    const { pathname, query, asPath } = useRouter();

    useEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [asPath]);

    useLockBodyScroll(isOpen);

    return (
        <div className={className} data-open={isOpen}>
            <div ref={ref} className="menu-content">
                <nav>
                    <IconButton secondary onClick={onClose} className="close-button menu-only" icon="close" />
                    <Link href="/">
                        <a className="menu-only" data-active={pathname === '/'}>
                            Главная
                        </a>
                    </Link>
                    <Link prefetch={false} href="/catalog?dealType=prodaja" as="/zagorodnaya/prodaja">
                        <a data-active={pathname === '/catalog' && query.dealType === 'prodaja'}>Продажа</a>
                    </Link>
                    <Link href="/catalog?dealType=arenda" as="/zagorodnaya/arenda">
                        <a data-active={pathname === '/catalog' && query.dealType === 'arenda'}>Аренда</a>
                    </Link>
                    <Link href="/settlements.list" as="/zagorodnaya/kottedzhnye-poselki">
                        <a data-active={pathname === '/settlements.list' || pathname === '/settlements.item'}>
                            Посёлки
                        </a>
                    </Link>
                    <Link href="/favorites">
                        <a className="menu-only" data-active={pathname === '/favorites'}>
                            Избранное {favoriteCount > 0 && <span className="counter">{favoriteCount}</span>}
                        </a>
                    </Link>
                    <Link href="/contacts">
                        <a data-active={pathname === '/contacts'}>Контакты</a>
                    </Link>
                </nav>
                <div className="header-right">
                    <a href={`tel:+${app.getConfig().phoneNumbers}`} className="phone">
                        {app.getConfig().phone}
                    </a>
                    <Button className="callback-button">Обратный звонок</Button>
                    <IconButton className="whatsapp-button menu-only" icon="whatsapp" />
                </div>
            </div>
        </div>
    );
});

export default styled(MainMenu)`
    flex: 1 0 auto;

    nav {
        height: 100%;
        display: flex;
        align-items: center;
    }

    ${sidebarMenuExt};

    .menu-content {
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    ${media.query.tabletLandscape} {
        .menu-only {
            display: none;
        }

        nav a {
            margin: 0 15px;
        }
    }

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
