import { useState } from 'react';

export default function useFallbackImages(imagesList) {
    const [list, changeList] = useState(() => imagesList);

    const handleError = id => () => changeList(list.filter(im => im.id !== id));

    return [list, handleError];
}
