import React from 'react';
import styled from 'styled-components';
import { media, sc } from '@utils';

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
                background: rgba(0, 0, 0, 0.3);
            }

            .menu-content {
                position: fixed;
                height: 100%;
                width: 320px;
                ${sc.ifProp('left')('left: -325px', 'right: -325px')};

                font-size: 15px;

                top: 0;
                bottom: 0;

                background: white;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                color: #232323;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
                transition: transform 225ms cubic-bezier(0, 0, 0.2, 1);
                flex-direction: column;
                padding: 3px 0px 25px;
                box-sizing: border-box;
            }

            .menu-content > div {
                padding-left: 20px;
                padding-right: 20px;
            }

            .menu-content > nav > button {
                padding-left: 20px;
                padding-right: 20px;
            }

            .menu-content > * > * {
                padding-left: 20px;
                padding-right: 20px;
            }

            z-index: 1500;

            &[data-open='true'] .menu-content {
                transform: translateX(${sc.ifProp('left')(101, -101)}%);
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

export default ({ className, children, isOpen, onClose, left, as }) => (
    <AdaptiveSidebar
        as={as}
        className={className}
        data-open={isOpen}
        data-clicks
        onClick={handleClickAway(onClose)}
        left={left}
    >
        <div className="menu-content">{children}</div>
    </AdaptiveSidebar>
);
