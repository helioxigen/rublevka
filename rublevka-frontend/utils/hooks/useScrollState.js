import { useState, useRef, useEffect } from 'react';

export default function useScrollState(blocked = false) {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const prevOffset = useRef(0);

    const handleScroll = () => {
        const { pageYOffset } = window;

        const blocker = document.querySelector('.floating-border');

        const diff = prevOffset.current - pageYOffset;

        const isBlocked = blocked && blocker && blocker.offsetTop < pageYOffset + window.screen.height;

        if (isBlocked) {
            if (isScrollingDown) return;

            setIsScrollingDown(true);
            return;
        }

        if (Math.abs(diff) < 100) return;

        setIsScrollingDown(isBlocked ? false : diff < 0);
        prevOffset.current = pageYOffset;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return isScrollingDown;
}
