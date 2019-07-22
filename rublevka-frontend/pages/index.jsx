import React from 'react';
import styled from 'styled-components';
import { Hero, Block, Location } from '@components/Landing';
import { Button, CompactForm } from '@components/UI';
import { page, media, sc } from '@utils';

const MainPage = ({ className }) => (
    <main className={className}>
        <Hero className="landing-hero" />
        <Block
            className="object-block"
            title="Знаете номер объекта?"
            text="Введите номер объекта в поле ниже и сразу перейдите к просмотру."
        >
            <CompactForm
                onSubmit={id => page.goTo.catalog({ dealType: 'prodaja', filter: JSON.stringify({ id }) })}
                placeholder="Номер объекта"
                submitLabel="Показать"
            />
        </Block>
        <Block
            className="call-block"
            title="Хотите продать дом?"
            text="Просто оставьте заявку. Наш агент свяжется с вами и поможет всё организовать: проведёт фотосессию, создаст рекламную кампанию, покажет дом и подготовит сделку."
        >
            <Button>Оставить заявку</Button>
        </Block>
        <Block
            className="sell-block"
            title="Лучшие предложения на Рублёвке"
            text="Рублёвка.ру — это только актуальные предложения на рынке, опыт экспертов и забота о клиенте. Мы создаём сервис для поиска, подбора и покупки недвижимости: удобный, быстрый и интуитивно понятный."
        >
            <Button red>Подробнее</Button>
        </Block>
        <figure>
            <img src="/static/landing/placeholder.jpg" alt="" />
        </figure>
        <Location />
    </main>
);

export default styled(MainPage)`
    ${media.desktop.at(
        css => css`
            display: grid;

            grid-template:
                1fr repeat(2, 640px)
                / [start] 20px [first] 40fr 60fr [last] 20px [end];

            grid-gap: 30px;

            .call-block {
                padding: 0 114px;
                grid-column: first / span last;
                color: ${sc.theme.colors.black};
                background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);
            }

            .sell-block {
                padding: 0 42px;
                text-align: center;

                grid-row: 3;
                grid-column: 3;
            }
        `
    )}

    ${media.phoneL.at(
        css => css`
            .object-block {
                display: none;
            }
        `
    )}

    ${Hero} {
        grid-column: 1 / span end;
    }

    ${media.tablet.to(
        css => css`
            .call-block {
                background: url('/static/landing/call.background.jpg') center / cover no-repeat;
                color: white;
            }

            .sell-block {
                h3 {
                    text-align: left;
                }
                text-align: left;
                ${Button} {
                    font-weight: 600;
                    line-height: initial;
                    padding: 0;
                    &,
                    &:hover,
                    &:active {
                        background: none;
                    }

                    color: ${sc.theme.colors.red};
                }
            }

            figure {
                height: 260px;

                img {
                    object-position: auto 60%;
                }
            }
        `
    )}

    figure {
        grid-row: 3;
        grid-column: first;

        margin: 0;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    ${Location} {
        grid-column: first / span last;
        margin: 40px 0 0;

        ${media.xs`
            margin-bottom: 32px;
        `}

        ${media.md`
            margin: 60px 0 72px;
        `};
    }
`;
