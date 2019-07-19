import React from 'react';
import styled from 'styled-components';
import { cdn } from '@utils';
import Slice from './Slice';

const Shortcuts = ({ className, images }) => {
    return (
        <figure style={{ backgroundImage: `url(${cdn.get.thumbnail(images[0].id)})` }} className={className}>
            {images.length > 1 &&
                images.slice(0, 6).map((el, index) => (
                    <React.Fragment key={images[index].id}>
                        <Slice />
                        <img alt={images[index].id} src={cdn.get.thumbnail(images[index].id, 512)} />
                    </React.Fragment>
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
        opacity: 0;

        &:first-of-type {
            padding-left: 10px;
        }

        &:last-of-type {
            padding-right: 10px;
        }

        & + img {
            z-index: 1;
            opacity: 0;
            position: absolute;

            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            object-fit: cover;

            width: 100%;
            height: 100%;
            transition: 0.1s;
        }

        &:hover + img {
            opacity: 1;
        }
    }

    &:hover ${Slice} {
        opacity: 1;
    }
`;
