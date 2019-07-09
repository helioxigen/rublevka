import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from '../atoms';
import { sc } from '@utils';

const IconButton = ({ className, onClick, icon, red, children }) => (
    <Button data-icon={icon} onClick={onClick} className={className} red={red}>
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
        ${p => (p.children ? 'margin-right: 0.5em' : 'padding: 0.5em')};
    }
`;
