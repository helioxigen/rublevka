import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { sc } from '@utils';

const Field = ({ className, title, children }) => (
    <section className={className}>
        <header>
            {title}{' '}
            <button className="filter-reset" type="button">
                <Icon name="times" viewBox="0 0 21 15.125" />
            </button>
        </header>
        {children}
    </section>
);

export default styled(Field)`
    > header {
        margin-bottom: 10px;
        text-transform: uppercase;
        font-size: 15px;
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

        padding: 2px 0 0 1px;

        cursor: pointer;

        width: 20px;
        height: 20px;

        border-radius: 50%;

        transition: background 0.2s;

        &:hover {
            background-color: #cbcbcb;
        }
    }

    ${Icon} {
        box-sizing: border-box;
        display: block;
        fill: #080808;
        width: 100%;
        height: 100%;
    }
`;
