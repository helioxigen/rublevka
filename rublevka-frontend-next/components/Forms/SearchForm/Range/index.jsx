import React from 'react';
import styled from 'styled-components';
import initial from 'lodash/initial';
import { media } from '../../../../utils';
import Input from './Input';
import Options from '../Options';

const Range = ({ className, onChange, getItemProps, options = [], value }) => (
    <div className={className}>
        <Input
            placeholder="ОТ"
            value={value.from || ''}
            onChange={e => {
                const from = parseInt(e.target.value, 10);

                if (from > value.to) {
                    return;
                }

                onChange({ from });
            }}
        />
        <span className="line">–</span>
        <Input placeholder="ДО" value={value.to || ''} onChange={e => onChange({ to: parseInt(e.target.value, 10) })} />
        <Options.List
            className="range-from"
            getItemProps={getItemProps}
            items={options.map(({ label, value: from }) => ({
                label,
                value: { from },
            }))}
            onItemClick={(event, item) => {
                // eslint-disable-next-line no-param-reassign
                event.nativeEvent.preventDownshiftDefault = true;

                onChange(item.value);
            }}
        />
        <Options.List
            className="range-to"
            getItemProps={getItemProps}
            items={initial(options)
                .filter(({ value: to }) => to > (value.from || 0))
                .map(({ label, value: to }) => ({
                    label,
                    value: { to },
                }))}
            onItemClick={(event, item) => {
                // eslint-disable-next-line no-param-reassign
                event.nativeEvent.preventDownshiftDefault = true;

                onChange(item.value);
            }}
        />
    </div>
);

export default styled(Range)`
    display: grid;
    grid: auto / 1fr auto 1fr;

    ${Input} {
        width: calc(100% - 16px);
    }

    ${Input}:first-of-type {
        margin-left: 16px;
    }

    ${Input}:last-of-type {
        margin-right: 16px;
    }

    ${Options.List} {
        grid-column: 1 / -1;
        display: none;
    }

    ${Input}:first-of-type:focus ~ .range-from {
        display: block;
    }

    ${Input}:last-of-type:focus ~ .range-to {
        display: block;
    }

    .range-to {
        text-align: right;
    }

    li {
        padding: 8px 28px;
    }

    .line {
        margin: 0 4px;
        line-height: 15px;
        font-size: 13px;
        font-weight: 500;
        color: #232323;

        align-self: center;

        display: none;
        ${media.xs`
        display: block;
    `}
    }
`;
