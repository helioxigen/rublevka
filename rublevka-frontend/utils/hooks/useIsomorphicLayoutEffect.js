import { useEffect } from 'react';

export default function useIsomorphicLayoutEffect(effect, deps) {
    const useIsoEffect = useEffect; // typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    useIsoEffect(effect, deps);
}
