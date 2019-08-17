import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { PageContainer, Header, Switcher, CardsGrid, IconButton, Button, Content } from '@components/UI';
import {} from 'reselect';
import { Card } from '@components';
import { page, sc, media } from '@utils';
import { fetchFavorite, setFavorite } from '@store';

const FavoritePage = ({ className }) => {
    const [dealType, setDealType] = useState('sale');
    const favorites = useSelector(state => state.user.favorite);
    const dispatch = useDispatch();
    const list = useSelector(state => state.user.favoriteItems);
    const isEmpty = favorites.length === 0;
    const items = list.filter(i => favorites.some(f => f.id === i.id && f.dealType === dealType));
    const isOnlySale = favorites.every(i => i.dealType === 'sale');
    const isOnlyRent = favorites.every(i => i.dealType === 'rent');
    const isOnly = favorites.length === 0 || (isOnlySale || isOnlyRent);

    useEffect(() => {
        if (isOnlyRent && dealType !== 'rent') {
            setDealType('rent');
        }
        if (favorites.length > 0) {
            dispatch(fetchFavorite(favorites.map(i => i.id)));
        }
    }, [favorites]);

    const handleAlertReset = () => {
        // eslint-disable-next-line no-alert, no-restricted-globals
        const isPermit = confirm('Вы уверены, что хотите полностью стереть избранное?');
        if (isPermit) {
            dispatch(setFavorite([]));
        }
    };

    return (
        <PageContainer>
            <main className={className} data-empty={isEmpty}>
                <Content compact>
                    <header className="favorite-header">
                        <Header.Static>Избранное</Header.Static>
                        {!isOnly && (
                            <Switcher
                                items={[['Продажа', 'sale'], ['Аренда', 'rent']]}
                                value={dealType}
                                onChange={setDealType}
                            />
                        )}
                    </header>
                    {favorites.length !== 0 ? (
                        <>
                            <CardsGrid>
                                {items.map(data => (
                                    <Card key={data.id} dealTypeExplicit={dealType} data={data} />
                                ))}
                            </CardsGrid>
                            <IconButton onClick={handleAlertReset} className="reset-favorite" icon="garbage">
                                Cбросить избранное
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <p className="message">Вы пока ещё ничего не добавили в избранное.</p>
                            <Button
                                className="search-button"
                                onClick={() => page.goTo.catalog({ dealType: 'prodaja' })}
                            >
                                Начать новый поиск
                            </Button>
                        </>
                    )}
                </Content>
            </main>
        </PageContainer>
    );
};

FavoritePage.getInitialProps = async () => ({ title: 'Избранное', menuEntry: 'favorites' });

export default styled(FavoritePage)`
    margin: 0 auto;

    .favorite-header {
        display: flex;

        margin: 24px 0 16px;

        ${media.tablet.at(
            css => css`
                margin: 48px 0 32px;
            `
        )}

        justify-content: center;

        ${media.tablet.at(
            css => css`
                justify-content: space-between;
            `
        )}

        ${Header.Static} {
            margin: 0;

            display: none;

            &:only-child {
                width: 100%;
                text-align: center;
            }

            ${media.tablet.at(
                css => css`
                    display: block;
                `
            )}
        }

        ${Switcher} {
            width: 250px;

            border-radius: 12px;

            .inner {
                border-color: ${sc.theme.colors.red};
            }

            button {
                font-size: 15px;
                color: ${sc.theme.colors.red};
                text-transform: uppercase;
                font-weight: 600;

                &[data-selected='true'] {
                    color: white;
                }
            }
        }
    }

    .reset-favorite {
        margin: 40px auto 0;

        background: white;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
        color: #f44336;

        text-transform: uppercase;

        font-size: 15px;
    }

    .message {
        text-align: center;
        font-size: 21px;
        margin: 0 0 48px;
    }

    .search-button {
        display: block;
        margin: 0 auto;
        font-size: 17px;
        padding: 0 24px;
    }

    &[data-empty='true'] {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
