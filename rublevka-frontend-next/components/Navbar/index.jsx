import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon, Button } from '@components/UI';
import styled from 'styled-components';
import config from '@config';
import { app, media, sc } from '@utils';

const Navbar = ({ className }) => {
    const { pathname, query } = useRouter();

    const isLanding = pathname === '/';

    const [inverted, toggleInverted] = useState(isLanding);

    const favoriteCount = useSelector(state => state.user.favorite.length);

    const handleInvert = () => {
        if (!isLanding) return;

        const nextInverted = window.scrollY < 80;

        toggleInverted(nextInverted);
    };

    useEffect(() => {
        if (!isLanding) return () => {};

        window.addEventListener('scroll', handleInvert);

        return () => {
            window.removeEventListener('scroll', handleInvert);
            toggleInverted(false);
        };
    }, [pathname]);

    useEffect(() => {
        // if (!isLanding && !inverted) return;

        if (isLanding && !inverted) {
            toggleInverted(true);
            console.log('TOGGLEQ', inverted);
        }

        if (!isLanding && inverted) {
            toggleInverted(false);
            console.log('TOGGLE', inverted);
        }
    }, [pathname]);

    return (
        <header className={className} data-inverted={inverted}>
            <div className="container">
                <nav>
                    <Link href="/">
                        <a className="logo">
                            <Icon className="logo-icon" name={config.app} />
                        </a>
                    </Link>
                    <Link href="/catalog?dealType=prodaja" as="/zagorodnaya/prodaja">
                        <a data-active={pathname === '/catalog' && query.dealType === 'prodaja'}>Продажа</a>
                    </Link>
                    <Link href="/catalog?dealType=arenda" as="/zagorodnaya/arenda">
                        <a data-active={pathname === '/catalog' && query.dealType === 'arenda'}>Аренда</a>
                    </Link>
                    <Link href="/settlements" as="/zagorodnaya/kottedzhnye-poselki">
                        <a data-active={pathname === '/settlements'}>Посёлки</a>
                    </Link>
                    <Link href="/contacts">
                        <a data-active={pathname === '/contacts'}>Контакты</a>
                    </Link>
                </nav>
                <div className="header-right">
                    <a href={`tel:+${app.getConfig().phoneNumbers}`} className="phone">
                        {app.getConfig().phone}
                    </a>
                    <Button>Обратный звонок</Button>
                    <Link href="/favorites">
                        <a className="favorites">
                            <Icon className="favorite-icon" name="favorite" />
                            <span className="counter" data-show={favoriteCount > 0}>
                                {favoriteCount === 0 ? 1 : favoriteCount}
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default styled(Navbar)`
    position: fixed;
    height: 60px;
    width: 100%;

    z-index: 1000;

    background: white;

    font-size: 15px;

    &[data-inverted='false'] {
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
    }

    transition: 225ms;

    .container {
        display: flex;
        justify-content: space-between;
        height: 100%;

        margin: 0 auto;
        width: auto;

        ${media.sm`
            max-width: 740px;
        `}

        ${media.md`
            max-width: 960px;
        `}

        ${media.lg`
            max-width: 1360px;
        `}
    }

    .logo svg {
        fill: black;
    }

    nav {
        height: 100%;
        display: flex;
        align-items: center;
    }

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

    a {
        font-size: 1em;
        text-decoration: none;
        text-transform: uppercase;

        color: black;

        height: 100%;
        display: flex;
        align-items: center;
    }

    a:not(.logo){
        margin: 0 15px;
    }

    a[data-active="true"] {
        color: ${sc.theme.colors.red};
        border-bottom: 2px solid ${sc.theme.colors.red};
    }

    ${Button} {
        font-size: 1em;
        border: 2px solid transparent;
    }

    &[data-inverted='true'] {
        background: none;

        a {
            color: white;
        }

        ${Button} {
            color: white;
            border: 2px solid white;
            background: none;
        }

        ${Button}:hover, ${Button}:active {
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

    a:hover {
        color: #f44336;
    }

    .favorites{
        position: relative;
        margin: 0;

        svg {
            stroke-width: 2px;
            stroke: black;
        }

        .counter {
            opacity: 0;
            background: rgba(244,67,54,0.9);
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

            &[data-show="true"] {
                opacity: 1;
            }
        }
    }
`;
