import React from 'react';
import styled, { css } from 'styled-components';
import { Icon, Button } from '../atoms';
import { sc } from '@utils';

const IconButton = ({ className, onClick, icon, red, mirror, stroke, children, href, target }) => (
    <Button
        as={href ? 'a' : undefined}
        target={target}
        href={href}
        data-icon={icon}
        onClick={onClick}
        className={`${className} ${icon}-button`}
        red={red}
    >
        <Icon name={icon} mirror={mirror} stroke={stroke} />
        {children}
    </Button>
);

export default styled(IconButton)`
    display: flex;
    justify-content: center;
    align-items: center;

    ${sc.ifProp('secondary')(
        css`
            background: none;
            padding: 0;
            color: inherit;

            min-width: auto;

            box-shadow: none;
        `
    )};

    ${sc.ifProp('floating')(
        css`
            background: ${sc.theme.colors.red};
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
            border-radius: ${sc.ifProp('children')('56px', '50%')};

            transition: box-shadow 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

            &:hover {
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.35);
            }

            &:active {
                box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
            }
        `
    )}

    &:hover,
    &:active {
        ${sc.ifProp('secondary')(
            css`
                color: ${sc.theme.colors.red};
                background: none;
            `
        )};
    }

    ${sc.ifProp('children')(
        '',
        css`
            padding: 0.5em;
            line-height: initial;
        `
    )}

    [data-icon] {
        display: block;
        ${sc.ifProp('children')('margin-right: 0.5em')};
        ${sc.ifProp('secondary')('padding: 0')};
    }
`;
