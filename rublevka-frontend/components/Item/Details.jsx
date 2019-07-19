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

    ${media.mediaquery.tablet.at(
        css => css`
            width: 350px;
        `
    )}

    .details-value {
        display: flex;
        justify-content: space-between;

        margin: 20px 0;

        font-size: 16px;
        font-weight: 400;

        dt {
            color: ${sc.theme.colors.grey};
        }

        dd {
            margin: 0;
            font-weight: 500;
        }
    }
`;
