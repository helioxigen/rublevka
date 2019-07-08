import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { YMaps, Map, Clusterer, Placemark, ZoomControl } from 'react-yandex-maps';
import { Icon, Modal, OfferSwitcher } from '@components/UI';
import { setDealType } from '@store';
import { sc, dict, format } from '@utils';
import { Filter, Card } from '@components';
import { useToggle } from '@hooks';

const initialMapState = {
    items: [],
    filter: {},
};

const MapMode = ({ className, dealType, onClose }) => {
    const router = useRouter();
    const items = useSelector(state => state.map.list);
    const dispatch = useDispatch();

    const [cardsOpen, toggleCardsOpen] = useToggle(false);

    return (
        <div className={className}>
            <aside className="controls">
                <section className="filter">
                    <button type="button" className="back-button" onClick={onClose}>
                        <Icon name="arrow" mirror /> Вернуться к выдаче
                    </button>
                    <div className="filter-container">
                        <OfferSwitcher
                            value={dealType}
                            onChange={value =>
                                router.push(
                                    {
                                        pathname: '/catalog',
                                        query: {
                                            ...router.query,
                                            dealType: dict.translit.byWord(value),
                                        },
                                    },
                                    {
                                        pathname: `/zagorodnaya/${dict.translit.byWord(dealType)}/map${
                                            router.kind ? `/${dict.translit.byWord(router.kind)}` : ''
                                        }`,
                                        query: {
                                            ...(router.query.filter ? { filter: router.query.filter } : {}),
                                        },
                                    }
                                )
                            }
                        />
                        <Filter dealType={dealType} />
                    </div>
                </section>
                <section className="cards" data-open={cardsOpen}>
                    {/* <Icon name="chevron" onClick={toggleCardsOpen} /> */}
                    <div className="cards-list">
                        <h4>
                            Показано
                            {format.titleByNumber(items.length, ['объект', 'объекта', 'объектов'])}
                        </h4>
                        {/* {items.map(data => (
                            <Card key={data.id} dealType={dealType} data={data} />
                        ))} */}
                    </div>
                </section>
            </aside>

            <YMaps preload>
                <Map
                    className="yandex-map"
                    state={{
                        center: [55.73, 36.95],
                        zoom: 11,
                    }}
                    onLoad={y => console.log(y)}
                    width="100%"
                    height="100%"
                >
                    <ZoomControl
                        options={{
                            position: {
                                left: 'auto',
                                right: 10,
                                top: 108,
                            },
                        }}
                    />
                    <Clusterer
                        options={{
                            preset: 'islands#invertedVioletClusterIcons',
                            minClusterSize: 1,
                            gridSize: 128,
                        }}
                        instanceRef={ref => console.log(ref)}
                    >
                        {items
                            .filter(i => i.location)
                            .map(({ id, location }) => (
                                <Placemark
                                    key={id}
                                    geometry={[location.latitude, location.longitude]}
                                    properties={{
                                        hintContent: 'Собственный значок метки',
                                        balloonContent: 'Это красивая метка',
                                    }}
                                    options={{
                                        iconLayout: 'default#image',
                                    }}
                                />
                            ))}
                        {/* {[[55.734871, 37.249479]].map(coords => (
                            <Placemark
                                key={coords[0]}
                                geometry={coords}
                                options={{
                                    iconLayout: 'default#image',
                                }}
                            />
                        ))} */}
                    </Clusterer>
                </Map>
            </YMaps>
        </div>
    );
};

export default styled(MapMode)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    z-index: 15000;

    background: white;

    .yandex-map {
        width: 100%;
        height: 100%;
    }

    .controls {
        animation: ${sc.keyframes.slideRight} 225ms cubic-bezier(0, 0, 0.2, 1);

        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;

        z-index: 200;

        display: flex;

        .filter {
            background: #ffffff;
            box-shadow: 1px 0px 8px rgba(0, 0, 0, 0.15);
            z-index: 250;
            width: 295px;

            .back-button {
                background: none;
                border: none;
                outline: none;
                width: 100%;

                font-size: 16px;

                height: 64px;
                display: flex;
                justify-content: center;
                align-items: center;

                ${Icon} {
                    position: absolute;
                    left: 10%;
                }
            }

            .filter-container {
                padding: 0 30px;

                border-top: 1px solid #d9d9d9;
            }

            ${Filter} {
                background: white;

                [class^='grid'] {
                    padding: 0;
                }
            }

            ${OfferSwitcher} {
                margin: 24px 0;
            }

            overflow-y: scroll;
        }

        .cards {
            animation: ${sc.keyframes.slideRight} 225ms 225ms cubic-bezier(0, 0, 0.2, 1);
            background: #fafafa;
            box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.15);
            z-index: 225;
            width: 382px;

            .cards-list {
                padding: 23px 20px;
                height: 100%;
                overflow-y: scroll;
                overflow-x: hidden;
            }

            ${Card}, h4 {
                margin: 0 0 16px;
            }

            h4 {
                font-size: 16px;
                font-weight: normal;
                color: #666666;
            }

            position: relative;

            transition: transform 225ms cubic-bezier(0, 0, 0.2, 1);

            &[data-open='false'] {
                transform: translateX(-100%);

                ${Icon} {
                    transform: scaleX(-1);
                }
            }

            ${Icon} {
                cursor: pointer;
                position: absolute;
                right: -22px;
                top: 16px;
                background: #fafafa;

                box-shadow: 5px 4px 5px 0px rgba(0, 0, 0, 0.15);

                border-radius: 2px;
            }
        }

        .cards,
        .filter {
            position: relative;
        }
    }
`;
