import React from 'react';
import styled from 'styled-components';
import compact from 'lodash/compact';

const ItemSummary = ({ className, values }) => (
    <section className={className}>
        {compact(values).map(([label, value, name]) => (
            <div key={value} className="summary-param">
                <p className="summary-value">{value}</p>
                <p className="summary-label" data-name={name}>
                    {label}
                </p>
            </div>
        ))}
    </section>
);

export default styled(ItemSummary)`
    display: flex;
    .summary-param {
        margin: 0 24px;

        &:first-child {
            margin-left: 0;
        }

        p {
            margin: 0;
        }

        .summary-value {
            font-size: 21px;
            font-weight: 600;

            margin-bottom: 8px;
        }

        .summary-label {
            font-size: 15px;
            font-weight: 400;

            color: #919191;
        }
    }
`;
