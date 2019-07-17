import styled from 'styled-components';
import { Button } from '../atoms';

export default styled.section`
    background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 32px 15px;

    ${Button} {
        padding: 0 28px;
    }
`;
