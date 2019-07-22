/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import { sc, media } from '@utils';

// const Button = ({ className, icon, label, forwardedAs = 'button', type = 'button' }) => {
//     return React.createElement(
//         forwardedAs,
//         {
//             className,
//             type,
//         },
//         icon,
//         label && <span className="label">{label}</span>
//     );
// };

export default styled.button`
    background: ${sc.ifProp('red')('#F44336', 'hsl(123, 43%, 49%)')};
    border: 0;
    padding: 0 1em;
    outline: none;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    height: 56px;
    max-height: 100%;

    border-radius: 8px;

    box-sizing: border-box;

    ${media.phoneL.at(
        css => css`
            border-radius: 6px;
        `
    )}

    text-decoration: none;

    font-size: 15px;
    font-weight: 600;

    ${media.tablet.at(
        css => css`
            font-weight: 600;
        `
    )}

    text-transform: uppercase;
    color: white;
    cursor: pointer;

    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
        background: ${sc.ifProp('red')('hsl(4, 92%, 53%)', 'hsla(123, 43%, 45%, 1)')};
    }

    &:active {
        background: ${sc.ifProp('red')('hsl(4, 92%, 44%)', 'hsla(123, 43%, 40%, 1)')};
        transform: scale(0.97);
    }
`;
