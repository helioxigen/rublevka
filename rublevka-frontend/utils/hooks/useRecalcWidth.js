import { useEffect, useState, useRef } from 'react';

export default function useRecalcWidth() {
    const ref = useRef(null);
    const [recalculate, trigger] = useState(true);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
        }
    }, [recalculate, ref.current]);

    return [ref, trigger, width];
}
