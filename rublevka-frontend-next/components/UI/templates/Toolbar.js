import styled from 'styled-components';

export default styled.div`
    display: flex;

    font-size: 16px;
    font-weight: 500;
    color: #232323;

    > * {
        background: #f2f2f2;
        border-radius: 4px;

        padding: 8px 12px;

        &:not(:last-child) {
            margin-right: 11px;
        }
    }
`;
