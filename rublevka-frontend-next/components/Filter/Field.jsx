import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { sc } from '@utils';

const Field = ({ className, title, showReset, onReset, children }) => (
    <section className={className}>
        <header>
            {title}{' '}
            {showReset && (
                <button onClick={onReset} className="filter-reset" type="button">
                    <Icon name="times" viewBox="0 0 21 15.125" />
                </button>
            )}
        </header>
        {children}
    </section>
);

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
