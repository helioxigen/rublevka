import styled from 'styled-components';
import media from '../../../../utils/media';

export default styled.h2`
    margin: 0;
    line-height: 36px;
    font-size: 24px;
    color: #fff;
    font-weight: bold;

    ${media.xs`
        margin: 0;
        line-height: 48px;
        font-size: 40px;
        color: #fff;
        text-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
    `}

    ${media.md`
        line-height: 58px;
        font-size: 48px;
        text-shadow: 0px 0px 35px rgba(0, 0, 0, 0.35);
    `}
`;
