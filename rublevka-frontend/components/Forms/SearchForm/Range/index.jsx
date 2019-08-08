/* eslint-disable consistent-return */
import React, { useRef } from 'react';
import styled from 'styled-components';
import initial from 'lodash/initial';
import last from 'lodash/last';
import { media } from '../../../../utils';
import Input from './Input';
import Options from '../Options';
import { useToggle, useIsomorphicLayoutEffect } from '@hooks';

const Range = ({ className, onChange, closeMenu, getItemProps, isOpen, options = [], value, inputRef }) => {
    const [lastFocus, toggleLastFocus] = useToggle(false);
    const toRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        if (isOpen && lastFocus) {
            toggleLastFocus(false);
        }
    }, [isOpen]);

    return (
        <div className={className} data-isopen={isOpen}>
            <Input
                placeholder="ОТ"
                value={value.from || ''}
                ref={inputRef}
                onFocus={() => lastFocus && toggleLastFocus(false)}
                onChange={e => {
                    const { fromValue } = e.target;

                    if (!fromValue) return onChange({ from: '' });

                    const from = parseInt(fromValue, 10);

                    if (from > value.to) {
                        return;
                    }

                    if (from === last(options)) {
                        closeMenu();
                    }

                    onChange({ from });
                }}
            />
            <span className="line">–</span>
            <Input
                placeholder="ДО"
                data-focus-last={lastFocus}
                onFocus={() => toggleLastFocus(true)}
                ref={toRef}
                value={value.to || ''}
                onChange={({ target: { toValue } }) => onChange({ to: toValue ? parseInt(toValue, 10) : '' })}
            />
            <Options.List
                className="range-from"
                getItemProps={getItemProps}
                items={options.slice(0, 10).map(({ label, value: from }) => ({
                    label,
                    value: { from },
                }))}
                onItemClick={(event, item) => {
                    // eslint-disable-next-line no-param-reassign
                    event.nativeEvent.preventDownshiftDefault = true;

                    onChange(item.value);

                    if (item.value.from === last(options).value) {
                        return closeMenu();
                    }

                    if (!toRef.current) return {};

                    return toRef.current.focus();
                }}
            />
            <Options.List
                className="range-to"
                getItemProps={getItemProps}
                items={initial(options)
                    .filter(({ value: to }) => to > (value.from || 0))
                    .slice(0, 10)
                    .map(({ label, value: to }) => ({
                        label,
                        value: { to },
                    }))}
                onItemClick={(event, item) => {
                    // eslint-disable-next-line no-param-reassign
                    event.nativeEvent.preventDownshiftDefault = true;

                    onChange(item.value);
                    closeMenu();
                }}
            />
        </div>
    );
};

export default styled(Range)`
    display: grid;
    grid: auto 220px / 1fr auto 1fr;

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

        overflow-y: scroll;
    }

    input:first-of-type:not(:focus) ~ input:last-of-type:not(:focus):not([data-focus-last='true']) ~ .range-from,
    input[data-focus-last='true'] ~ .range-to,
    input:first-of-type:focus ~ .range-from,
    input:last-of-type:focus ~ .range-to {
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
