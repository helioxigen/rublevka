import React from 'react';

import styled from 'styled-components';

const ItemHeader = ({ className, children, id }) => (
    <h1 className={className}>
        {children} <span>№ {id}</span>
    </h1>
);

export default styled(ItemHeader)`
    font-size: 24px;
    font-weight: 500;

    display: flex;
    flex-direction: column-reverse;

    span {
        font-size: 15px;
        margin-bottom: 8px;
        color: #919191;
    }
`;
