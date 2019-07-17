import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { format, sc } from '@utils';
import { Card } from '@components';

const VisibleCards = ({ className, items, clusterId, onToggle }) => {
    const listRef = useRef(null);
    const [open, toggle] = useState(true);

    useEffect(onToggle, [open]);
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
        toggle(true);
    }, [clusterId]);

    return (
        <section data-open={open} className={className}>
            <button type="button" className="toggle-view" onClick={() => toggle(!open)}>
                <Icon name="arrow-squared" />
            </button>
            <div ref={listRef} className="cards-list">
                <h4>Показано {format.titleByNumber(items.length, ['объект', 'объекта', 'объектов'])}</h4>
                {items.map(data => (
                    <Card key={data.id} data={data} />
                ))}
            </div>
        </section>
    );
};

export default styled(VisibleCards)`
    background: #fafafa;
    box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.15);
    z-index: 225;
    width: 382px;

    .cards-list {
        padding: 23px 20px;
        height: 100%;
        box-sizing: border-box;
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

    animation: ${sc.keyframes.slideRight} 225ms cubic-bezier(0, 0, 0.2, 1);

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
        height: 24px;
        background: #fafafa;

        border: none;

        box-shadow: 5px 4px 5px 0px rgba(0, 0, 0, 0.15);

        border-radius: 2px;

        svg,
        svg path {
            fill: #979797;
        }
    }
`;
