import React from 'react';
import styled from 'styled-components';
import { cdn } from '@utils';
import Slice from './Slice';

const Shortcuts = ({ className, images }) => (
    <figure
        className={className}
        style={{
            backgroundImage: `url(${cdn.get.thumbnail(images[0].id)})`,
        }}
    >
        {images.length > 1 &&
            images.slice(0, 6).map((el, index) => (
                <React.Fragment key={images[index].id}>
                    <Slice />
                    <img alt={images[index].id} src={cdn.get.thumbnail(images[index].id)} />
                </React.Fragment>
            ))}
    </figure>
);

export default styled(Shortcuts)`
    display: flex;

    padding: 10px 0;

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
    }

    &:hover ${Slice} {
        opacity: 1;
    }
`;
