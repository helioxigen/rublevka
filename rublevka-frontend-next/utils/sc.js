import { css } from 'styled-components';

const ifProp = (name, ifTrue, ifFalse) => props => (props[name] ? ifTrue : ifFalse);

export default {
    ifProp,
    reset: {
        button: css`
            background: none;
            border: none;
            font-size: inherit;
        `,
    },
};
