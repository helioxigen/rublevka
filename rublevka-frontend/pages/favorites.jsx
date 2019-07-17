import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { PageContainer, Header, Switcher, CardsGrid, IconButton, Button } from '@components/UI';
import {} from 'reselect';
import { Card } from '@components';
import { page, sc, dict } from '@utils';
import { fetchFavorite, setFavorite } from '@store';

const FavoritePage = ({ className }) => {
    const [dealType, setDealType] = useState('sale');
    const favorites = useSelector(state => state.user.favorite);
    const dispatch = useDispatch();
    const list = useSelector(state => state.user.favoriteItems);
    const isEmpty = favorites.length === 0;
    const items = list.filter(i => favorites.some(f => f.id === i.id && f.dealType === dealType));
    const isOnly =
        favorites.length === 0 ||
        (favorites.every(i => i.dealType === 'sale') || favorites.every(i => i.dealType === 'rent'));

    useEffect(() => {
        if (favorites.length > 0) {
            dispatch(fetchFavorite(favorites.map(i => i.id)));
        }
    }, [favorites]);

    return (
        <PageContainer>
            <main className={className} data-empty={isEmpty}>
                <header>
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
                        <IconButton onClick={() => dispatch(setFavorite([]))} className="reset-favorite" icon="garbage">
                            Cбросить избранное
                        </IconButton>
                    </>
                ) : (
                    <>
                        <p className="message">Вы пока ещё ничего не добавили в избранное.</p>
                        <Button className="search-button" onClick={() => page.goTo.catalog({ dealType: 'prodaja' })}>
                            Начать новый поиск
                        </Button>
                    </>
                )}
            </main>
        </PageContainer>
    );
};

export default styled(FavoritePage)`
    padding: 48px 0;

    width: 1110px;
    margin: 0 auto;

    > header {
        display: flex;
        justify-content: space-between;

        margin-bottom: 32px;

        ${Header.Static} {
            margin: 0;
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
        margin: 0 auto;
        font-size: 17px;
        padding: 23px 24px;
    }

    &[data-empty='true'] {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
