import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { format, sc, media } from '@utils';
import { Card } from '@components';

const VisibleCards = ({ className, items, clusterId, isOpen, onToggle }) => {
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    }, [clusterId]);

    return (
        <section data-open={isOpen} className={className}>
            <button type="button" className="toggle-view" onClick={() => onToggle()}>
                <Icon name="arrow-squared" />
            </button>
            <div ref={listRef} className="cards-list">
                <h4>Показано {format.titleByNumber(items.length, ['объект', 'объекта', 'объектов'])}</h4>
                <div className="cards-grid">
                    {items.map(data => (
                        <Card key={data.id} data={data} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default styled(VisibleCards)`
    .cards-list {
        padding: 16px 8px 90px;
        height: 100%;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;

        h4 {
            display: none;
        }
    }

    background: #fafafa;
    width: 100vw;

    position: fixed;
    height: 100%;

    padding: 48px 0 0;
    box-sizing: border-box;

    animation: ${sc.keyframes.fadeInBottom} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1);

    ${media.tablet.at(
        css => css`
            .cards-grid {
                display: grid;
                grid-gap: 8px;
                grid: auto / 1fr 1fr;
            }
        `
    )}

    ${media.desktop.at(
        css => css`
            position: relative;
            box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.15);
            z-index: 225;
            width: 382px;

            padding: 0;

            .cards-list {
                padding: 23px 20px;

                .cards-grid {
                    display: block;
                }

                h4 {
                    display: block;
                }
            }

            animation: ${sc.keyframes.slideRight} 225ms cubic-bezier(0, 0, 0.2, 1);
        `
    )}
    ${Card},
        h4 {
        margin: 0 0 16px;
    }

    h4 {
        font-size: 16px;
        font-weight: normal;
        color: #666666;
    }

    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1);

    &[data-open='false'] {
        transform: translateX(-100%);

        > .toggle-view ${Icon} svg {
            transform: scaleX(-1);
        }
    }

    .toggle-view {
        cursor: pointer;
        position: absolute;
        right: -22px;
        top: 16px;
        height: 23px;
        background: #fafafa;

        border: none;

        box-shadow: 5px 4px 5px 0px rgba(0, 0, 0, 0.15);

        border-radius: 2px;

        padding: 0;

        > span {
            padding: 6px;
        }

        svg,
        svg path {
            fill: #979797;
        }
    }
`;
