import React from 'react';
import styled from 'styled-components';
import RangeInput from './RangeInput';
import { media } from '../../../../utils';

const Range = ({ className, onChange, items, bound, initialValue }) => (
    <div className={className}>
        <RangeInput
            placeholder="ОТ"
            onChange={value => onChange({ from: value })}
            items={items}
            bound={bound}
            initialValue={initialValue.from}
            type="from"
        />
        <span className="divider" />
        <RangeInput
            placeholder="ДО"
            onChange={value => onChange({ to: value })}
            items={items}
            bound={bound}
            initialValue={initialValue.to}
            type="to"
        />
    </div>
);

export default styled(Range)`
    .divider {
        margin: 0 4px;
        line-height: 15px;
        font-size: 13px;
        font-weight: 500;
        color: #232323;

        display: none;
        ${media.xs`
        display: block;
    `}
    }
`;
