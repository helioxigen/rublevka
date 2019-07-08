import { useEffect, useState } from 'react';

export default function useRefCallback() {
    const [node, setRef] = useState(null);

    useEffect(() => {
        if (node) {
            // Your Hook now has a reference to the ref element.
        }
    }, [node]);

    return [setRef];
}
