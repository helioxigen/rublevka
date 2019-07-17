import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useLockBodyScroll(isActive) {
    useIsomorphicLayoutEffect(() => {
        if (!isActive) return () => {};
        document.body.classList.add('scroll-locked');
        // Re-enable scrolling when component unmounts
        return () => {
            document.body.classList.remove('scroll-locked');
        };
    }, [isActive]);
}
