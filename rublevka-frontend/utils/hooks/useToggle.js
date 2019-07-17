import { useState } from 'react';

export default (initial = false) => {
    const [value, changeValue] = useState(initial);

    const toggle = () => changeValue(!value);

    return [value, toggle];
};
