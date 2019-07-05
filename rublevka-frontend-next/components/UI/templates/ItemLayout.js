import styled from 'styled-components';
import { Header } from '../atoms';

export default styled.main`
    display: flex;

    display: grid;
    grid: auto / 70% auto;
    grid-gap: 0 20px;

    > article,
    > aside {
        background: #ffffff;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        border-radius: 4px;
    }

    > article {
        padding: 24px 20px;

        ${Header.Item} {
            margin-bottom: 20px;
        }
    }

    > aside {
        > * {
            padding: 24px 20px;
        }

        header {
            display: flex;
            flex-direction: column;
            justify-content: center;

            border-bottom: 1px solid #eeeeee;
        }
    }
`;
