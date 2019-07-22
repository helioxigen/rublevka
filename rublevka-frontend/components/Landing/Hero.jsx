import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { app, media } from '../../utils';
import Tabs from './Tabs';
// import Form from '../../../rublevka-frontend/src/Landing/Satellites/Form';

const SearchForm = dynamic(() => import('@components/Forms').then(f => f.SearchForm));

const LandingHero = ({ className }) => (
    <section className={className}>
        <h2 className="landing-header">
            Начните поиск лучших
            <br />
            домов на {app.ifDomain('Рублёвке', 'Новой Риге')}
        </h2>
        <Tabs
            tabs={{
                objectNumber: 'Номер объекта',
                sale: 'Продажа',
                rent: 'Аренда',
                settlements: 'Посёлки',
            }}
        >
            {type => <SearchForm key={type} type={type} />}
        </Tabs>
    </section>
);

export default styled(LandingHero)`
    display: grid;
    grid: auto 2fr 56px 3fr auto / 
        [start] 10% 
            [border-start] 1fr 
                [middle-start] 
                    repeat(2, 3fr) 
                [middle-end] 1fr 
            [border-end] 10% 
        [end];

    /* grid-template-rows: auto 1fr 56px 1fr auto; */

    ${media.phoneL.to(
        css => css`
            display: block;
            padding: 0 0 24px;
            height: auto;
            background: url('/static/landing/background.jpg') top / 100% 180px no-repeat;
            background-color: white;
        `
    )}
    
    ${media.phoneL.at(
        css => css`
            min-height: 100vh;
        `
    )}

    background: url('/static/landing/background.jpg') center / cover no-repeat;

    .landing-header {
        margin: 0;
        font-size: 24px;
        color: #fff;
        font-weight: bold;

        ${media.phoneL.at(
            css => css`
                font-size: 32px;
                text-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
            `
        )}

        ${media.tablet.at(
            css => css`
                font-size: 40px;
                text-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
            `
        )}

        ${media.desktop.at(
            css => css`
                font-size: 45px;
                text-shadow: 0px 0px 35px rgba(0, 0, 0, 0.35);
            `
        )}

        grid-row: 2;
        grid-column: border-start / span border-end;

        align-self: end;
        
        ${media.desktop.at(
            css => css`
                grid-column: border-start / span [middle-end];
            `
        )}

        ${media.phoneL.to(
            css => css`
                font-size: 28px;
                box-sizing: border-box;
                padding: 0 15px 1em;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                height: 180px;
            `
        )}
    }

    ${Tabs} {
        grid-row: 4;
        grid-column: border-start / border-end;
        
        ${media.desktopL.at(
            css => css`
                grid-column: middle-start / span middle-end;
            `
        )}
    }
`;
