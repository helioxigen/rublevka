import React from 'react';
import styled from 'styled-components';
import { Hero, Block, Location } from '@components/Landing';
import { Button, CompactForm, Content } from '@components/UI';
import { CallbackModal } from '@components/Modals';
import { CallbackForm, SearchForm } from '@components/Forms';
import { page, media, sc } from '@utils';

const MainPage = ({ className }) => (
    <main className={className}>
        <Hero className="landing-hero" />
        <Content>
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
                <CallbackForm
                    className="form-static"
                    fields={{
                        name: {
                            placeholder: 'Имя',
                            required: true,
                        },
                        phone: {
                            placeholder: 'Телефон',
                            type: 'tel',
                            required: true,
                        },
                    }}
                    submitLabel="Оставить заявку"
                    defaultComment="Заявка на продажу"
                />
                <CallbackModal title="Заявка на продажу">
                    {onClick => (
                        <Button className="form-modal" onClick={onClick}>
                            Оставить заявку
                        </Button>
                    )}
                </CallbackModal>
            </Block>
            <Block
                className="sell-block"
                title="Лучшие предложения на Рублёвке"
                text="Рублёвка.ру — это только актуальные предложения на рынке, опыт экспертов и забота о клиенте. Мы создаём сервис для поиска, подбора и покупки недвижимости: удобный, быстрый и интуитивно понятный."
            >
                <Button red onClick={() => page.goTo.catalog({ dealType: 'prodaja' })}>
                    Подробнее
                </Button>
            </Block>
            <figure>
                <img src="/static/landing/placeholder.jpg" alt="" />
            </figure>
            <Location />
        </Content>
    </main>
);

export default styled(MainPage)`
    ${SearchForm} {
        padding: 0 15px;
        ${media.phoneL.at(
            css => css`
                padding: 0;
            `
        )}
    }

    .form-modal {
        display: none;
    }

    .form-static {
        input {
            padding-top: 20px;
            padding-bottom: 20px;
        }

        ${Button} {
            margin-top: 1em;
        }

        width: 100%;
        text-align: center;

        ${media.at(css => ({
            tablet: css`
                width: 50%;
                text-align: initial;
            `,
        }))}
    }

    .call-block {
        padding: 32px 15px;
        color: ${sc.theme.colors.black};
        background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);

        text-align: center;

        ${media.at(css => ({
            phoneL: css`
                padding: 80px 45px;
                margin: 30px 0;
            `,
            tablet: css`
                text-align: left;
            `,
            desktop: css`
                padding: 0 114px;
            `,
        }))}
    }

    ${Content} {
        ${media.phoneL.at(
            css => css`
                padding: 0 15px;
            `
        )}
        ${media.desktop.at(
            css => css`
                display: grid;

                grid-template:
                    repeat(2, 640px)
                    / auto [first] 40fr 60fr [last] auto;

                grid-gap: 30px;

                margin-top: 20px;

                .call-block {
                    padding: 0 114px;
                    grid-column: first / span last;
                    margin: 0;

                    .form-modal {
                        display: block;
                    }

                    .form-static {
                        display: none;
                    }
                }

                .sell-block {
                    padding: 0 42px;

                    grid-row: 2;
                    grid-column: 3;
                }
            `
        )}
    }

    .object-block {
        text-align: center;
    }

    ${media.phoneL.at(
        css => css`
            .object-block {
                display: none;
            }
        `
    )}

    ${media.phoneL.to(
        css => css`
            .call-block {
                background: url('/static/landing/call.background.jpg') center / cover no-repeat;
                color: white;
                text-align: center;
            }

            .sell-block {
                h3 {
                    text-align: left;
                }
                text-align: left;
                ${Button} {
                    height: 1em;
                    font-weight: 600;
                    line-height: initial;
                    padding: 0;
                    box-shadow: none;
                    &,
                    &:hover,
                    &:active {
                        background: none;
                    }

                    color: ${sc.theme.colors.red};
                }
            }

            figure {
                img {
                }
            }
        `
    )}

    figure {
        grid-row: 2;
        grid-column: first;

        margin: 0;
        img {
            width: 100%;
            height: 260px;
            object-fit: cover;

            object-position: 100% 80%;

            ${media.at(css => ({
                phoneL: css`
                    height: 440px;
                `,
                desktop: css`
                    height: 100%;
                    object-position: auto;
                `,
            }))}
        }
    }

    ${Location} {
        grid-column: first / span last;
        margin: 32px 0 0;

        ${media.at(css => ({
            tablet: css`
                margin: 60px 0 72px;
            `,
        }))}
    }
`;
