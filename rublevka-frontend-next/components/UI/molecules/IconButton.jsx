import React from 'react';
import styled, { css } from 'styled-components';
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

    ${sc.ifProp(
        'iconOnly',
        css`
            background: none;
            padding: 0;
            color: inherit;
        `
    )};

    &:hover,
    &:active {
        ${sc.ifProp(
            'iconOnly',
            css`
                color: ${sc.theme.colors.red};
                background: none;
            `
        )};
    }

    ${Icon} {
        display: block;
        ${sc.ifProp('children', 'margin-right: 0.5em', 'padding: 0.5em')};
        ${sc.ifProp('iconOnly', 'padding: 0')};
    }
`;
