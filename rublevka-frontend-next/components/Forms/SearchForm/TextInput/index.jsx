import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';

const TextInput = ({ className, placeholder, value, onChange }) => (
    <div className={className}>
        <Icon name="search" />
        <input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
);

export default styled(TextInput)`
    padding: 0 0 0 56px;
    position: relative;
    background: white;

    input {
        background: none;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-size: 18px;
    }

    input::placeholder {
        color: #aaa;
    }

    ${Icon} {
        position: absolute;
        left: 20px;
        fill: #aaa;
        height: 100%;
    }

    &:focus {
        box-shadow: inset 0px 0px 6px rgba(153, 153, 153, 0.4);
    }
`;
