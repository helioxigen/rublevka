import React from 'react';
import styled from 'styled-components';

const OfferSwitch = ({ className, items = [], value, onChange }) => (
    <section data-selected-idx={items.findIndex(([, val]) => val === value)} className={className}>
        <div className="inner">
            {items.map(([label, val]) => (
                <button
                    key={val}
                    type="button"
                    data-selected={value === val}
                    data-value={val}
                    onClick={() => onChange(val)}
                >
                    {label}
                </button>
            ))}
        </div>
    </section>
);

export default styled(OfferSwitch)`
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 4px;

    display: flex;

    position: relative;

    .inner {
        border: 1px solid #d9d9d9;
        border-radius: inherit;
        flex: 1;
        display: flex;
    }

    button {
        background: none;
        outline: none;
        border: none;

        flex: 1;

        position: relative;
        z-index: 3;

        padding: 12px 0;

        font-size: 16px;

        transition: color 0.2s;

        cursor: pointer;

        &[data-selected='true'] {
            color: white;
        }
    }

    ::before {
        content: '';
        position: absolute;
        left: 0;
        width: 50%;
        height: 100%;

        z-index: 2;

        background: #f44336;

        transition: transform 225ms cubic-bezier(0, 0, 0.2, 1);

        transform: translateX(0);
    }

    &[data-selected-idx='1']::before {
        transform: translateX(100%);
    }
`;
