import { useState, useRef, useEffect } from 'react';

export default function useScrollState(blocked = false, initialIsScrolling = false, threshold = 0) {
    const [isScrollingDown, setIsScrollingDown] = useState(initialIsScrolling);
    const prevOffset = useRef(0);

    const handleScroll = () => {
        const { pageYOffset } = window;

        // console.log({ pageYOffset, threshold, isScrollingDown, initialIsScrolling });
        if (pageYOffset <= threshold && threshold) {
            // if (isScrollingDown === initialIsScrolling) return;

            setIsScrollingDown(true);
            return;
        }

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
