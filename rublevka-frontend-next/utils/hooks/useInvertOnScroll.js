import { useState, useEffect } from 'react';

export default (isActive, scrollTop) => {
    const [inverted, changeInverted] = useState(isActive);

    const handleInvert = () => {
        if (!isActive) return;

        const nextInverted = window.scrollY < scrollTop;

        changeInverted(nextInverted);
    };

    useEffect(() => {
        if (!isActive) {
            if (inverted) {
                return changeInverted(false);
            }

            return () => {};
        }

        window.addEventListener('scroll', handleInvert);

        return () => {
            window.removeEventListener('scroll', handleInvert);
        };
    }, [isActive]);

    useEffect(() => {
        // if (!isLanding && !inverted) return;

        if (isActive && !inverted && window.scrollY < scrollTop) {
            changeInverted(true);
        }
    }, [isActive, inverted]);

    return inverted;
};
