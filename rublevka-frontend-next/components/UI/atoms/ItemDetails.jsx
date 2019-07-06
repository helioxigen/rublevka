import React from 'react';
import styled from 'styled-components';
import { sc } from '@utils';

const ItemDetails = ({ className, title, values }) => (
    <section className={className}>
        <header>
            <h2>{title}</h2>
        </header>
        <dl>
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
    </section>
);

export default styled(ItemDetails)`
    width: 350px;

    header {
        margin: 0 0 15px 0;
    }

    h2 {
        font-size: 21px;
        font-weight: bold;
    }

    h2,
    dl {
        margin: 0;
    }

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
