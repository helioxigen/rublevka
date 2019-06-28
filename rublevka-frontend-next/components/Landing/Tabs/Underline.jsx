import styled from 'styled-components';
import { media, sc } from '../../../utils';

export default styled.span`
    position: absolute;

    display: ${sc.ifProp('mobile', 'block', 'none')};

    ${media.xs`
        display: ${sc.ifProp('mobile', 'none', 'block')};
    `}

    ::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-bottom: 2px solid #f44336;
        ${media.xs`
          border-bottom: 3px solid #fff;
        `}
    }

    transition: 0.3s;

    height: 100%;
`;
