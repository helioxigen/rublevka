import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@hooks';
import Header from './Header';
import Toolbar from './Toolbar';

export default ({ tag, title, noMap }) => {
    const titleRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        /**
         * @type {HTMLHeadingElement}
         */
        const titleEl = titleRef.current;

        if (!titleEl) return;

        const parentWidth = titleEl.parentElement.offsetWidth;

        const toolbarWidth = titleEl.nextElementSibling.offsetWidth;

        const titleWidth = titleEl.offsetWidth;

        const maxTitleWidth = parentWidth - toolbarWidth;

        if (titleWidth > maxTitleWidth) {
            const fontSize = parseInt(window.getComputedStyle(titleEl).fontSize, 10);

            const coef = titleWidth / fontSize;

            const offset = titleWidth - maxTitleWidth;

            const fontOffset = Math.round(offset / coef);

            titleEl.style.fontSize = `${fontSize - fontOffset}px`;
        }
    }, [titleRef.current]);

    return (
        <header>
            <Header ref={titleRef} as={tag}>
                {title}
            </Header>
            <Toolbar map={!noMap} />
        </header>
    );
};
