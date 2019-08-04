import React from 'react';
import styled from 'styled-components';
import { sc, media } from '@utils';

const ItemDetails = ({ className, values }) => (
    <dl className={className}>
        {values
            .filter(([, value]) => value)
            .map(([label, value, measurement]) => (
                <div className="details-value" key={value}>
                    <dt>{label}</dt>
                    <dd>
                        {value} {measurement}
                    </dd>
                </div>
            ))}
    </dl>
);

export default styled(ItemDetails)`
    margin: 0;
    font-size: 14px;
    font-weight: 400;

    .details-value {
        display: flex;
        justify-content: space-between;

        font-size: 1em;
        margin: 9px 0;

        &:last-child {
            margin-bottom: 0;
        }

        dt {
            color: ${sc.theme.colors.grey};
        }

        dd {
            margin: 0;
            font-weight: 400;
        }
    }

    ${media.tablet.at(
        css => css`
            width: 350px;
            font-size: 16px;

            .details-value {
                margin: 20px 0;
            }
        `
    )}
`;
