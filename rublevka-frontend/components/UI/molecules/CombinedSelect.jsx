import React from 'react';
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
            {isOpen && (
                <SelectList className="desktop select-list" values={options} selected={value} onChange={handleChange} />
            )}
            <select value={value} onChange={e => onChange(e.target.value)}>
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

    .select-list {
        position: absolute;
        z-index: 100;
        font-weight: normal;

        animation: ${sc.keyframes.slideIn} 0.3s both;
    }

    select {
        display: none;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    ${media.desktop.to(
        css => css`
            .desktop {
                display: none;
            }
            select {
                display: block;
            }
            .select-display {
                pointer-events: none;
            }
        `
    )}
`;
