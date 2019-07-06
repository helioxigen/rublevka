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
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -8px;

    ${media.xs`
        margin-bottom: -12px;
    `}

    span {
        flex: 1 0 calc(100% / 3);
        max-width: calc(100% / 3);

        &:nth-child(3n + 3) {
            text-align: end;

            &:not(:last-child) {
                margin-bottom: 11px;

                ${media.xs`
                    margin-bottom: 15px;
                `}
            }
        }
    }
`;
