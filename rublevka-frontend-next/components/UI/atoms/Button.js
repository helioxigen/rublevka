import styled from 'styled-components';
import { sc } from '../../../utils';

export default styled.button`
    background: ${sc.ifProp('red', '#F44336', '#47b34c')};
    border: 0;

    border-radius: 6px;
    padding: 23px 24px;

    font-size: 18px;
    font-weight: 600;

    text-transform: uppercase;
    color: white;
`;
