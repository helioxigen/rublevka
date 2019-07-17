import React, { useContext, useEffect } from 'react';

export const PageTitleContext = React.createContext();

export default function usePageTitle(title) {
    const [currentTitle, setTitle] = useContext(PageTitleContext);

    useEffect(() => {
        if (title) {
            setTitle(title);

            return () => {
                setTitle(null);
            };
        }
    }, [title]);

    return currentTitle;
}
