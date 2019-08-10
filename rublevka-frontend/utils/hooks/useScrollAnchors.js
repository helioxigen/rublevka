import isEqual from 'lodash/isEqual';
import { useState, useEffect } from 'react';

export default function useScrollAnchors(...anchors) {
    const [anchorsStates, setAnchorsStates] = useState(() => anchors.map(() => false));

    const handleScroll = () => {
        const { pageYOffset } = window;

        const nextState = anchors.map(a => a <= pageYOffset);

        if (!isEqual(anchorsStates, nextState)) {
            setAnchorsStates(nextState);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return anchorsStates;
}
