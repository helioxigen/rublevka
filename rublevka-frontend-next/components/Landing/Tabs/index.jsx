import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from './Tab';
import { media } from '../../../utils';
import Underline from './Underline';

const Tabs = ({ className, tabs, children }) => {
    const [[tabIndex, selectedTab], changeTab] = useState([1, 'sell']);

    return (
        <section className={className}>
            <header>
                <Underline style={{ transform: `translateX(${tabIndex * 100}%)` }} />
                <Underline mobile style={{ transform: `translateX(${(tabIndex - 1) * 100}%)` }} />
                {Object.entries(tabs).map(([name, title], idx) => (
                    <Tab
                        key={name}
                        data-name={name}
                        data-selected={selectedTab === name}
                        onClick={() => changeTab([idx, name])}
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
    header {
        display: flex;
        overflow-x: scroll;
        position: relative;

        margin: 0 -25px;

        max-width: 590px;

        ${Tab}::before {
            right: 25px;
            left: 25px;
        }

        ${Tab}, ${Underline} {
            width: 33%;
            padding-left: 25px;
            padding-right: 25px;

            ${media.xs`
                width: 25%;
            `}
        }

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .divider {
        min-height: 1px;
        min-width: 100%;
        background: #d8d8d8;

        margin: -1px -15px 25px;

        ${media.xs`
            margin: -1px 0 25px;
            background: linear-gradient(
                90deg,
                #eeeeee 0%,
                rgba(255, 255, 255, 0.05) 100%
            );
        `}
    }
`;
