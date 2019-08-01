import React from 'react';
import styled from 'styled-components';

import { media } from '@utils';
import { Content } from '../templates';

const NavigatorBox = ({ className, fromName = 'МКАД', toName, minutes }) => (
    <div className={className}>
        <Content className="content">
            <div className="wrapper">
                <div className="navigation-box">
                    <img src="/static/shared/yandex-nav.png" alt="" height="40px" className="navigator-image" />
                    <div className="locations-bars">
                        <div className="from-bar">
                            <div color="#ff3333" className="from-point">
                                A
                            </div>
                            <div className="from-location-name">{toName}</div>
                        </div>
                        <div className="from-bar-arrows" />
                        <div className="from-bar">
                            <div color="#4296ea" className="to-point">
                                B
                            </div>
                            <div className="from-location-name">{fromName}</div>
                        </div>
                    </div>
                    <div className="traffic-block">
                        <div className="traffic-minutes-block">{minutes} минут</div>
                        <div className="traffic-description">С учётом пробок</div>
                    </div>
                </div>
            </div>
        </Content>
    </div>
);

export default styled(NavigatorBox)`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    justify-content: center;

    .content {
        width: 100%;
        height: inherit;
        position: absolute;
    }

    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .navigation-box {
        width: 259px;
        display: flex;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        position: absolute;
        top: 50%;
        /* right: calc(50% - 470px); */
        right: 0px;

        transform: translateY(-50%);
        box-shadow: rgba(0, 0, 0, 0.06) 0px 22px 65px;
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        padding: 24px 14px 28px;
        z-index: 1000;

        ${media.desktop.to(
            css =>
                css`
                    display: none;
                `
        )}
    }

    .traffic-description {
        margin-top: 4px;
        color: rgb(151, 151, 151);
        font-size: 14px;
    }

    .traffic-minutes-block {
        padding-left: 35px;
        background-image: url(/static/shared/green.svg);
        background-size: 25px;
        color: rgb(27, 27, 27);
        font-size: 18px;
        font-weight: 700;
        line-height: 30px;
        background-repeat: no-repeat;
        background-position: left center;
    }

    .traffic-block {
        margin-top: 30px;
        text-align: center;
    }

    .navigator-image {
        display: block;
        vertical-align: middle;
        border-style: none;

        margin-bottom: 18px;
    }

    .locations-bars {
        width: 100%;
    }

    .from-bar {
        height: 31px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(229, 229, 229);
        border-image: initial;
        padding: 0px 8px;
    }

    .from-point {
        min-width: 18px;
        width: 18px;
        height: 18px;
        background-color: rgb(255, 51, 51);
        color: rgb(255, 255, 255);
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
    }

    .to-point {
        width: 18px;
        height: 18px;
        background-color: rgb(66, 150, 234);
        color: rgb(255, 255, 255);
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
    }

    .from-location-name {
        margin-left: 8px;
        color: rgb(100, 100, 100);
        font-size: 13px;
        line-height: 31px;
        white-space: nowrap;
        overflow: hidden;
    }

    .from-bar-arrows {
        width: 27px;
        height: 20px;
        background-image: url(/static/shared/double-arrows.svg),
            linear-gradient(
                270deg,
                rgba(255, 255, 255, 0) 0%,
                rgb(255, 255, 255) 31%,
                rgb(255, 255, 255) 69%,
                rgba(255, 255, 255, 0) 100%
            );
        position: relative;
        z-index: 1;
        background-repeat: no-repeat;
        background-position: center center;
        margin: -5px 0px -2px;
    }
`;
