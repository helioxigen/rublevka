import { useEffect } from 'react';

export default function useLockBodyScroll(isActive) {
    useEffect(() => {
        if (!isActive) return () => {};
        document.body.classList.add('scroll-locked');
        // Re-enable scrolling when component unmounts
        return () => {
            document.body.classList.remove('scroll-locked');
        };
    }, [isActive]);
}
