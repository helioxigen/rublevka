import { useState, useRef, useEffect } from 'react';

export default function useScrollState() {
    const [isScrollingDown, setScrollDiff] = useState(false);
    const prevOffset = useRef(0);

    const handleScroll = () => {
        const { pageYOffset } = window;

        const diff = prevOffset.current - pageYOffset;

        if (Math.abs(diff) < 100) return;

        setScrollDiff(diff < 0);
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
