import React, { useState } from 'react';
import styled from 'styled-components';
import { cdn } from '@utils';
import Slice from './Slice';

const Shortcuts = ({ className, images }) => {
    const [isActive, changeActive] = useState(false);

    return (
        <figure className={className} onMouseEnter={() => changeActive(true)}>
            {images.slice(0, 6).map(({ id }, idx) => (
                <Slice key={id}>
                    {(isActive || idx === 0) && <img alt="" className="display" src={cdn.get.thumbnail(id, 512)} />}
                </Slice>
            ))}
        </figure>
    );
};

export default styled(Shortcuts)`
    display: flex;

    padding: 10px 0;
    box-sizing: border-box;

    position: relative;

    background: center / cover no-repeat;

    ${Slice} {
        flex: 1 1 auto;

        &::after {
            opacity: 0;
        }

        &:first-of-type {
            padding-left: 10px;
        }

        &:last-of-type {
            padding-right: 10px;
        }

        img {
            z-index: 1;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            object-fit: cover;
            width: 100%;
            height: 100%;
            pointer-events: none;

            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            transition: opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        &:first-child img,
        &:hover img {
            opacity: 1;
        }
    }

    img {
    }

    &:hover ${Slice}::after {
        opacity: 1;
    }
`;
