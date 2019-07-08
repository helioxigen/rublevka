import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { format } from '@utils';
import { Card } from '@components';

const VisibleCards = ({ className, items }) => {
    const [open, toggle] = useState(true);

    return (
        <section data-open={open} className={className}>
            <Icon name="arrow" onClick={toggle} />
            <div className="cards-list">
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

        > ${Icon} {
            transform: scaleX(-1);
        }
    }

    > ${Icon} {
        cursor: pointer;
        position: absolute;
        right: -22px;
        top: 16px;
        background: #fafafa;

        box-shadow: 5px 4px 5px 0px rgba(0, 0, 0, 0.15);

        border-radius: 2px;
    }
`;
