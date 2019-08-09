import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { sc, media } from '@utils';
import { updateFilterField } from '@store';

const Field = ({ className, title, name, range, children, resetCheckFn, initialValue }) => {
    const defaultValue = initialValue || (range ? {} : []);

    const value = useSelector(state => state.properties.filter[name] || defaultValue);
    const dispatch = useDispatch();

    const onChange = v => dispatch(updateFilterField(name, v));

    const isResetShown = resetCheckFn ? resetCheckFn(value) : Object.keys(value).length > 0;

    const handleReset = () => onChange(defaultValue);

    return (
        <section className={className}>
            <header>
                {title}{' '}
                {isResetShown && (
                    <button onClick={handleReset} className="filter-reset" type="button">
                        <Icon name="times" />
                    </button>
                )}
            </header>
            {children({ onChange, value })}
        </section>
    );
};

export default styled(Field)`
    font-size: 15px;

    > header {
        margin-bottom: 10px;
        text-transform: uppercase;
        font-weight: 700;
        color: #232323;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ${media.desktop.to(
        css => css`
            .filter-reset {
                display: none !important;
            }
        `
    )}

    .filter-reset {
        ${sc.reset.button};

        outline: none;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0 0 0 1px;

        cursor: pointer;

        font-size: inherit;
        width: 1em;
        height: 1em;

        position: relative;

        border-radius: 50%;

        background-color: #d8d8d8;
        transition: background 0.2s;

        &:hover {
            background-color: #cbcbcb;
        }
    }

    ${Icon} {
        box-sizing: border-box;
        display: block;
        fill: #080808;
        width: 84%;
        height: 97%;
        position: absolute;
    }
`;
