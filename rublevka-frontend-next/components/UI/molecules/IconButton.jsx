import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from '../atoms';

const IconButton = ({ className, icon, red, children }) => (
    <Button className={className} red={red}>
        <Icon name={icon} />
        {children}
    </Button>
);

export default styled(IconButton)`
    display: flex;
    justify-content: center;
    align-items: center;

    ${Icon} {
        display: block;
        margin-right: 0.5em;
    }
`;
