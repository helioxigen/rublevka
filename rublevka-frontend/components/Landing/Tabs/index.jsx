import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Tab from './Tab';
import { media, sc } from '../../../utils';

const Tabs = ({ className, tabs, children }) => {
    const [selectedTab, changeTab] = useState('sale');
    const tabsContainer = useRef(null);

    const handleTabChange = name => () => {
        const { offsetLeft, offsetWidth } = tabsContainer.current.querySelector(`[data-name=${selectedTab}]`);

        const underline = document.createElement('span');

        underline.className = 'underline';

        underline.style.width = `${offsetWidth}px`;
        underline.style.left = `${offsetLeft}px`;

        underline.addEventListener('transitionend', e => e.target.remove());

        tabsContainer.current.appendChild(underline);

        changeTab(name);
    };

    useEffect(() => {
        const underline = tabsContainer.current.querySelector(`.underline`);
        if (!underline) return;

        const { offsetWidth, offsetLeft } = tabsContainer.current.querySelector(`[data-name=${selectedTab}]`);
        underline.style.width = `${offsetWidth}px`;
        underline.style.left = `${offsetLeft}px`;
    }, [selectedTab]);

    return (
        <section className={className}>
            <header ref={tabsContainer}>
                {Object.entries(tabs).map(([name, title]) => (
                    <Tab
                        key={name}
                        data-name={name}
                        data-selected={selectedTab === name}
                        onClick={handleTabChange(name)}
                    >
                        {title}
                    </Tab>
                ))}
            </header>
            <div className="divider" />
            {children(selectedTab)}
        </section>
    );
};

export default styled(Tabs)`
    .underline {
        position: absolute;
        height: 2px;
        transition: left 225ms ease;
        bottom: 0;
        background: ${sc.theme.colors.red};

        ${media.xs`
            background: #fff;
        `}
    }

    > header {
        display: flex;
        overflow-x: scroll;
        position: relative;

        max-width: 530px;

        justify-content: space-between;

        ::-webkit-scrollbar {
            display: none;
        }

        padding: 0 15px;

        ${media.phoneL.at(
            css => css`
                padding: 0;
            `
        )}
    }

    .divider {
        min-height: 1px;
        min-width: 100%;
        background: #d8d8d8;

        margin: -1px 0 20px;

        ${media.tablet.at(
            css => css`
                margin: -1px 0 25px;
                background: linear-gradient(90deg, #eeeeee 0%, rgba(255, 255, 255, 0.05) 100%);
            `
        )}
    }

    [data-name='objectNumber'] {
        display: none;

        ${media.phoneL.at(
            css => css`
                display: block;
            `
        )}
    }

    ${media.phoneL.to(
        css => css`
            ${Tab} {
                width: calc(80% / 3);
                height: 50px;
            }
        `
    )}
`;
