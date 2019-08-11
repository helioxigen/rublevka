import { useState, useEffect } from 'react';

export default function useScrollAnchors(anchor) {
    const [anchorState, setAnchorsState] = useState(anchor);

    const handleScroll = () => {
        const { pageYOffset } = window;

        const nextState = anchor <= pageYOffset;

        if (nextState !== anchorState) {
            setAnchorsState(nextState);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return anchorState;
}
