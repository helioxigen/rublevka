import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '../atoms';

const CompactForm = ({ className, placeholder, submitLabel, onSubmit }) => {
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        onSubmit(value);
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            <Input value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} />
            <Button type="submit" red>
                {submitLabel}
            </Button>
        </form>
    );
};

export default styled(CompactForm)`
    display: flex;
    width: 100%;
    height: 56px;

    ${Input}, ${Button} {
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        box-sizing: border-box;
    }

    ${Button} {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        flex: 0 120px;
    }

    ${Input} {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        flex: 1;

        margin: 0;

        &:focus,
        &:focus + ${Button} {
            border: 1px solid #f44336;
        }
    }
`;
