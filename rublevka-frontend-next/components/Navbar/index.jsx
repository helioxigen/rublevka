import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon, Button, PageContainer as Container } from '@components/UI';
import styled from 'styled-components';
import config from '@config';
import { app, media } from '@utils';

const Navbar = ({ className }) => {
    const { pathname } = useRouter();

    const isLanding = pathname === '/';

    const [inverted, toggleInverted] = useState(isLanding);

    const handleInvert = () => {
        const nextInverted = window.scrollY < 80;

        toggleInverted(nextInverted);
    };

    useEffect(() => {
        if (!isLanding) return () => {};

        window.addEventListener('scroll', handleInvert);

        return () => {
            toggleInverted(false);
            window.removeEventListener('scroll', handleInvert);
        };
    }, [pathname]);

    useEffect(() => {
        if (isLanding && !inverted) {
            toggleInverted(true);
        }

        if (!isLanding && inverted) {
            toggleInverted(false);
        }
    }, [pathname]);

    return (
        <header className={className} data-inverted={inverted}>
            <div className="container">
                <nav>
                    <Link prefetch href="/">
                        <a className="logo">
                            <Icon className="logo-icon" name={config.app} viewBox="0 0 448 67" />
                        </a>
                    </Link>
                    <Link prefetch href="/catalog?dealType=prodaja" as="/zagorodnaya/prodaja">
                        <a>Продажа</a>
                    </Link>
                    <Link prefetch href="/catalog?dealType=arenda" as="/zagorodnaya/arenda">
                        <a>Аренда</a>
                    </Link>
                    <Link prefetch href="/settlements" as="/zagorodnaya/kottedzhnye-poselki">
                        <a>Посёлки</a>
                    </Link>
                    <Link prefetch href="/contacts">
                        <a>Контакты</a>
                    </Link>
                </nav>
                <div className="header-right">
                    <a href={`tel:+${app.getConfig().phoneNumbers}`} className="phone">
                        {app.getConfig().phone}
                    </a>
                    <Button>Обратный звонок</Button>
                    <Icon className="favorite-icon" name="favorite" />
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

    .favorite-icon {
        margin-left: 24px;
        stroke-width: 2px;
        stroke: black;
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

        margin: 0 15px;
        color: black;
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

        .favorite-icon {
            stroke: white;
        }
    }

    a:hover {
        color: #f44336;
    }
`;
