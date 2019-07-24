import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@components/UI';
import NavList from './NavList';
import { dict, media } from '@utils';
import config from '@config';
import { setCurrency } from '@store';

// const kinds = [['Дом', 'dom'], ['Таунхаус'], ['Квартира'], ['Участок']];

const getKinds = (kinds, sale = true) =>
    kinds.map(name => {
        const dealType = sale ? 'prodaja' : 'arenda';
        const kind = dict.translit.byWord(name);

        return [
            dict.translateKind(name).noun,
            {
                href: `/catalog?dealType=${dealType}&kind=${kind}`,
                as: `/zagorodnaya/${dealType}/${kind}`,
            },
        ];
    });

const Footer = ({ className }) => {
    const currency = useSelector(state => state.user.currency);
    const dispatch = useDispatch();

    return (
        <footer className={className}>
            <div className="container floating-border">
                <section className="nav-lists">
                    <NavList title="Купить" links={getKinds(['house', 'townhouse', 'flat', 'land'])} />
                    <NavList title="Снять" links={getKinds(['house', 'townhouse', 'flat'])} />
                    <NavList
                        title="Прочее"
                        links={[['Посёлки', { href: '/settlements.list', as: '/zagorodnaya/kottedzhnye-poselki' }]]}
                    />
                    <NavList title="Компания" links={[['Контакты', { href: '/contacts' }]]} />
                </section>
                <section className="bottom">
                    <Icon className="logo-icon" name={config.app} />
                    <select value={currency} onChange={e => dispatch(setCurrency(e.target.value))}>
                        <option value="eur">EUR – €</option>
                        <option value="usd">USD – $</option>
                        <option value="rub">RUB – ₽</option>
                    </select>
                </section>
            </div>
        </footer>
    );
};

export default styled(Footer)`
    border-top: 1px solid #ebebeb;
    background: white;

    padding: 24px 15px 64px;

    ${media.desktop.at(
        css => css`
            padding: 48px 0 64px;
        `
    )}

    .container {
        max-width: 920px;
        margin: 0 auto;
    }

    .nav-lists {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .nav-lists {
        border-bottom: 1px solid #ebebeb;
    }

    ${NavList} {
        flex: 100%;

        margin-bottom: 24px;

        ${media.tablet.at(
            css => css`
                flex: 50%;
            `
        )}

        ${media.desktop.at(
            css => css`
                flex: 25%;

                margin-bottom: 32px;
            `
        )}
    }

    .logo-icon {
        display: flex;
        width: 107px;
        svg {
            fill: #666;
        }

        margin: 32px 0 0;

        ${media.tablet.at(
            css => css`
                margin: 0;
            `
        )}
    }

    .bottom {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-start;

        margin-top: 24px;

        ${media.tablet.at(
            css => css`
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                margin-top: 32px;
            `
        )}
    }

    select {
        padding: 12px 15px;
        background: rgba(255, 255, 255, 0.0001);
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
        line-height: 18px;
        text-transform: uppercase;
        color: #232323;
        appearance: none;
    }
`;
