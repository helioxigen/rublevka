import styled from 'styled-components';
import { CallbackForm } from '@components/Forms';

export default styled.div`
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    box-sizing: border-box;
    padding: 48px 144px;

    margin: 0 auto;

    background: white;
    position: relative;
    top: -30px;

    width: 925px;

    text-align: center;

    ${CallbackForm} {
        margin: 0 auto;
        max-width: 350px;
    }

    > header {
        font-size: 44px;
        font-weight: bold;
        margin-bottom: 18px;
    }

    > p {
        font-size: 21px;
        margin: 0 0 24px;
    }
`;
