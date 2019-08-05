import React from 'react';
import styled from 'styled-components';
import { dict, format, media } from '@utils';

const Layouts = ({ className, layouts }) => (
    <div className={className}>
        {Object.entries(layouts).map(([key, count]) => (
            <span key={key}>
                {count > 1 && count} {format.titleByNumber(count, dict.declesions.get(key), true)}
            </span>
        ))}
    </div>
);

export default styled(Layouts)`
    display: grid;
    grid: auto / repeat(2, 1fr);
    font-size: 14px;
    grid-gap: 7px;

    ${media.phoneL.at(
        css => css`
            font-size: 15px;
            grid-gap: 7px;
        `
    )}

    ${media.tablet.at(
        css => css`
            grid: auto / repeat(3, 1fr);
            grid-gap: 20px;
        `
    )}
`;
