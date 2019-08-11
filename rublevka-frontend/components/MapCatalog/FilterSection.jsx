import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Switcher, IconButton } from '@components/UI';
import { page, sc, media, format, dict } from '@utils';
import { Filter } from '@components';
import BackButton from './BackButton';
import { useToggle } from '@hooks';

const FilterBlock = ({ className, itemsCount, settlementName, onResetItems }) => {
    const {
        query: { dealType },
    } = useRouter();

    const { total } = useSelector(state => state.map);
    const [isFilterOpen, toggleFilter] = useToggle(false);

    const emptyFocus = !itemsCount;

    return (
        <section className={className} data-filter={isFilterOpen}>
            <header>
                {!emptyFocus && (
                    <BackButton onClick={onResetItems} className="reset-button">
                        {format.titleByNumber(itemsCount, ['объект', 'объекта', 'объектов'])} в посёлке {settlementName}
                    </BackButton>
                )}
                <BackButton className="catalog-button" onClick={() => page.goTo.catalog()}>
                    Вернуться к выдаче
                </BackButton>
                {emptyFocus && <IconButton secondary icon="settings" onClick={toggleFilter} />}
            </header>
            <Filter
                totalItems={total}
                isFetching={false}
                isOpen={isFilterOpen}
                onClose={toggleFilter}
                dealType={dict.translit.byWord(dealType)}
            >
                <Switcher
                    items={[['Продажа', 'prodaja'], ['Аренда', 'arenda']]}
                    value={dealType}
                    onChange={value => page.pushQuery({ dealType: value })}
                />
            </Filter>
        </section>
    );
};

export default styled(FilterBlock)`
    z-index: 250;
    width: 100%;

    ${media.desktop.to(
        css => css`
            overflow: visible;
        `
    )}

    > header {
        ${media.desktop.at(
            css => css`
                border-bottom: 1px solid #d9d9d9;
            `
        )}
    }

    .cards-label {
        display: none;
    }

    .catalog-label {
        display: block;
    }

    ${media.desktop.to(
        css => css`
            ${BackButton} {
                flex: 1;
                padding-left: 15px;
                justify-content: flex-start;
            }

            > header {
                display: flex;
                background: white;
                position: fixed;
                width: 100%;
                height: 48px;
                box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
                transition: transform 225ms;
            }

            &[data-filter='true'] > header {
                transform: translateY(-100%);
            }

            .cards-label[data-cards='true'] {
                display: block;

                & + .catalog-label {
                    display: none;
                }
            }

            .reset-button + .catalog-button {
                display: none;
            }

            .catalog-button {
            }
        `
    )}

    .settings-button {
        width: 48px;
        font-size: 16px;
        color: ${sc.theme.colors.red};
        padding-right: 15px;
    }

    ${media.desktop.at(
        css => css`
            background: #ffffff;

            width: 295px;
            box-shadow: 1px 0px 8px rgba(0, 0, 0, 0.15);
            height: 100%;

            > header {
                border-bottom: 1px solid #d9d9d9;
            }

            ${BackButton} {
                height: 64px;
            }

            ${Filter} {
                padding: 24px 30px;
            }

            .settings-button {
                display: none;
            }

            .reset-button {
                display: none;
            }
        `
    )}

    ${Filter} {
        ${Switcher} {
            margin-bottom: 24px;

            ${media.desktop.to(
                css => css`
                    margin: 21px 20px 16px;
                `
            )}
        }
    }

    overflow-y: scroll;
`;
