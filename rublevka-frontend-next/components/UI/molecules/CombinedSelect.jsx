import React, { useState } from 'react';
import styled from 'styled-components';
import { SelectList } from '../atoms';
import { media, sc } from '@utils';
import { useComponentVisible } from '@hooks';

const CombinedSelect = ({ className, options, value, onChange }) => {
    // const [isOpen, changeOpen] = useState(false);
    const [, label] = options.find(([val]) => val === value) || [];

    const [ref, isOpen, setIsOpen] = useComponentVisible(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleChange = v => {
        toggleMenu();
        onChange(v);
    };

    return (
        <div className={className} ref={ref}>
            <a
                data-open={isOpen}
                className="select-display"
                role="button"
                tabIndex={0}
                onKeyPress={toggleMenu}
                onClick={toggleMenu}
            >
                <span>{label}</span>
            </a>
            {isOpen && <SelectList values={options} selected={value} onChange={handleChange} />}
            <select value={value} onChange={e => handleChange(e.target.value)}>
                {options.map(([optValue, optLabel]) => (
                    <option key={optValue} value={optValue}>
                        {optLabel}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default styled(CombinedSelect)`
    position: relative;

    .select-display {
        cursor: pointer;
        display: flex;
        align-items: center;
        outline: none;

        span {
            display: block;
        }
    }

    .select-display::after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 4px 4px 0 4px;
        border-color: #000000 transparent transparent transparent;

        margin-left: 4px;
    }

    .select-display[data-open='true']::after {
        transform: scaleY(-1);
    }

    ${SelectList} {
        display: none;
        position: absolute;
        z-index: 100;
        font-weight: normal;

        animation: ${sc.keyframes.slideIn} 0.3s both;
    }

    ${SelectList} ~ .select-display {
        transform: scaleY(-1);
    }

    ${media.md`
        select {
            display: none;
        }

        ${SelectList} {
            display: block;
        }
    `}
`;
