import React, { useState } from 'react';
import styled from 'styled-components';
import { CombinedSelect } from '@components/UI';
import { sc } from '@utils';

const Sort = ({ className, total = 0, value = '', onChange }) => (
    <div className={className}>
        {total.toLocaleString('ru')} объектов отсортированы{' '}
        <CombinedSelect
            options={[
                ['', 'По умолчанию'],
                ['price.asc', 'По возрастанию цены'],
                ['price.desc', 'По убыванию цены'],
                ['mkadDistance.asc', 'По удалённости от МКАД'],
                ['mkadDistance.desc', 'По близости к МКАД'],
            ]}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default styled(Sort)`
    display: flex;
    align-items: center;

    font-size: 16px;
    font-weight: 500;
    color: #232323;

    background: #f2f2f2;
    border-radius: 4px;

    padding: 8px 12px;

    ${CombinedSelect} {
        margin-left: 5px;
        .select-display {
            color: #f4665c;
            span::first-letter {
                text-transform: lowercase;
            }
        }

        ul {
            width: 250px;
            right: -12px;
        }
    }
`;
