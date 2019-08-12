import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Hero, Block, Location } from '@components/Landing';
import { Button, CompactForm } from '@components/UI';
import { CallbackModal } from '@components/Modals';
import { CallbackForm } from '@components/Forms';
import { useInView } from 'react-intersection-observer';
import { page, media, sc } from '@utils';
import { fetchSettlements } from '@store';
import requests from '@requests';

const MainPage = ({ className }) => {
    const dispatch = useDispatch();
    const [figureRef, figureInView] = useInView({ triggerOnce: true });
    const [objectBlockRef, objectInView] = useInView({ triggerOnce: true });

    useEffect(() => {
        dispatch(fetchSettlements());
    }, []);

    return (
        <main className={className}>
            <Hero className="landing-hero" />
            <div className="page-content">
                <Block
                    ref={objectBlockRef}
                    className="object-block"
                    title="Знаете номер объекта?"
                    text="Введите номер объекта в поле ниже и сразу перейдите к просмотру."
                >
                    <CompactForm
                        onSubmit={requests.search.property.byId}
                        placeholder="Номер объекта"
                        submitLabel="Показать"
                    />
                </Block>
                <Block
                    data-inview={objectInView}
                    className="call-block"
                    title="Хотите продать дом?"
                    text="Просто оставьте заявку. Наш агент свяжется с вами и поможет всё организовать: проведёт фотосессию, создаст рекламную кампанию, покажет дом и подготовит сделку."
                >
                    <CallbackForm
                        className="form-static"
                        header={
                            <header className="touch-only">
                                <h3>Хотите продать дом?</h3>
                                <p>
                                    Просто оставьте заявку. Наш агент свяжется с вами и поможет всё организовать:
                                    проведёт фотосессию, создаст рекламную кампанию, покажет дом и подготовит сделку.
                                </p>
                            </header>
                        }
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
                        defaultComment="Заявка на продажу"
                    />
                    <CallbackModal title="Заявка на продажу">
                        {onClick => (
                            <Button className="form-modal-button" onClick={onClick}>
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
                    <Button className="sell-button" red onClick={() => page.goTo.catalog({ dealType: 'prodaja' })}>
                        Подробнее
                    </Button>
                </Block>
                <figure ref={figureRef}>{figureInView && <img src="/static/landing/placeholder.jpg" alt="" />}</figure>
                {figureInView && <Location />}
            </div>
        </main>
    );
};

// MainPage.getInitialProps = async () => ({ meta: config.site.meta });

export default styled(MainPage)`
    .form-modal {
        display: none;
    }

    .form-static {
        input {
            padding-top: 20px;
            padding-bottom: 20px;
        }

        h3,
        p {
            color: inherit;
        }

        footer {
            display: none;
        }

        width: 100%;
        text-align: center;

        ${media.at(css => ({
            phoneL: css`
                color: ${sc.theme.colors.black};
            `,
            tablet: css`
                width: 50%;
                text-align: initial;
            `,
            desktop: css`
                display: block;
            `,
        }))}
    }

    .call-block {
        padding: 32px 15px;
        color: ${sc.theme.colors.black};
        background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);

        text-align: center;

        .form-modal-button {
            display: none;
            margin-top: 1em;
        }

        ${media.desktop.to(
            css => css`
                > h3,
                > p {
                    display: none;
                }
                display: flex;
                flex-direction: column;
                justify-content: center;
            `
        )}

        height: 423px;

        ${media.at(css => ({
            phoneL: css`
                padding: 80px 45px;
                margin: 30px 0;
                height: 530px;
            `,
            tablet: css`
                text-align: left;
            `,
            desktop: css`
                padding: 0 114px;

                height: auto;

                .form-modal-button {
                    display: block;
                }
            `,
        }))}
    }

    .page-content {
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
                color: white;
                text-align: center;
                background: url('/static/landing/call.background.jpg') center / cover no-repeat;
            }

            .sell-block {
                h3 {
                    text-align: left;
                }
                text-align: left;
                .sell-button {
                    height: 1em;
                    font-weight: 600;
                    line-height: initial;
                    padding: 0;
                    box-shadow: none;
                    border-radius: 0;
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
