import { useEffect, useLayoutEffect } from 'react';

export default function useIsomorphicLayoutEffect(effect, deps) {
    const useIsoEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    useIsoEffect(effect, deps);
}
