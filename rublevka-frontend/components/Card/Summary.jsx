import React from 'react';
import styled from 'styled-components';

const CardSummary = ({ className, values }) => (
    <p className={className}>
        {values.map(
            info =>
                info && (
                    <span key={info} className="summary-info">
                        {info}
                    </span>
                )
        )}
    </p>
);

export default styled(CardSummary)`
    font-size: 15px;
    text-transform: lowercase;

    color: #8e8e8e;

    .summary-info::before {
        content: ' · ';
    }

    .summary-info:first-of-type {
        &::before {
            content: '';
        }
    }
`;
