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
                <>
                    <Slice />
                    <img alt={images[index].id} src={cdn.get.thumbnail(images[index].id)} />
                </>
            ))}
    </figure>
);

export default styled(Shortcuts)`
    display: flex;

    padding: 10px;

    position: relative;

    background: center / cover no-repeat;

    ${Slice} {
        flex: 1 1 auto;
        opacity: 0;
    }

    &:hover ${Slice} {
        opacity: 1;
    }
`;
