import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const AdaptiveSidebar = styled.div`
    ${media.desktop.to(
        css => css`
            &[data-open='true']::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
            }

            .menu-content {
                position: fixed;

                font-size: 15px;

                background: white;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                color: #232323;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
                transition: transform 225ms cubic-bezier(0, 0, 0.2, 1);
                flex-direction: column;

                /* for right menu */
                ${({ isWebsiteMenu, left }) =>
                    isWebsiteMenu &&
                    `
                    padding: 18px 0px 25px;
                    height: 100%;
                    width: 320px;
                    top: 0;
                    bottom: 0;
                    ${left ? 'left: -325px' : 'right: -325px'}
                `}

                ${({ isWebsiteMenu }) =>
                    !isWebsiteMenu &&
                    `
                    padding: 18px 20px 25px;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    bottom: 0;
                    left: 0;
                `} 

                box-sizing: border-box;
            }

            ${({ isWebsiteMenu }) =>
                isWebsiteMenu &&
                `    .menu-content > div {
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .menu-content {
                    padding-top: 0;
                }

                .menu-content > nav > * {
                    line-height: 2.8;
                    padding: 0 0 0 20px
                }`}

            z-index: 1500;

            &[data-open='true'] .menu-content {
                ${({ isWebsiteMenu, left }) => !isWebsiteMenu && `transform: translateY(${left ? 0 : -101}%);`}

                ${({ isWebsiteMenu, left }) => isWebsiteMenu && `transform: translateX(${left ? 101 : -101}%);`}
            }

            &[data-open='false'] .menu-content {
                ${({ isWebsiteMenu, left }) => !isWebsiteMenu && `transform: translateY(${left ? 101 : -101}%);`}
            }
        `
    )}
`;

const handleClickAway = cb => e => {
    if (e.target.dataset.clicks) {
        cb();

        // document.createElement('div');
    }
};

export default ({ className, children, isOpen, onClose, left, as, outer, isWebsiteMenu = false }) => (
    <AdaptiveSidebar
        as={as}
        className={className}
        data-open={isOpen}
        data-clicks
        onClick={handleClickAway(onClose)}
        left={left}
        isWebsiteMenu={isWebsiteMenu}
    >
        {outer}
        <div className="menu-content">{children}</div>
    </AdaptiveSidebar>
);
