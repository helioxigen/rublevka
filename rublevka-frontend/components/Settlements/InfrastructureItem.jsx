import React from 'react';
import styled from 'styled-components';
import Icon from '@components/UI/atoms/Icon';
import { media } from '@utils';

const ItemIcon = ({ className, iconName }) => {
    return (
        <div className={className}>
            <Icon className="item-icon" name={iconName} />
        </div>
    );
};

const StyledItemIcon = styled(ItemIcon)`
    margin-left: 35px;
    margin-right: 15px;

    .item-icon {
        width: 32px;
        height: 32px;
    }
`;

const ItemArrow = ({ className }) => {
    return (
        <div className={className}>
            <Icon name="red-arrow-up" />
        </div>
    );
};

const StyledItemArrrow = styled(ItemArrow)`
    margin-left: auto;
    margin-right: 32px;
    ${props => props.rotateArrow && `transform: rotate(180deg);`}
`;

const ItemText = ({ className, children }) => {
    return <p className={className}>{children}</p>;
};

const StyledItemText = styled(ItemText)`
    font-size: 44px;
    line-height: 48px;
    letter-spacing: 0.5px;

    color: #232323;
`;

const InfrastructureItem = ({ className, iconName, header, content, isContentVisible, setContentVisible }) => {
    // const [isContentVisible, setContentVisible] = useState(false);

    return (
        <div
            className={className}
            onClick={() => {
                setContentVisible(!isContentVisible);
            }}
            onKeyPress={() => {
                setContentVisible(!isContentVisible);
            }}
            aria-hidden
        >
            <div className="heading">
                <StyledItemIcon iconName={iconName} />
                <StyledItemText>{header}</StyledItemText>
                <StyledItemArrrow className="arrow" rotateArrow={!isContentVisible} />
            </div>
            <div className={`content ${isContentVisible ? 'content-visible' : 'content-hidden'}`}>{content}</div>
        </div>
    );
};

export default styled(InfrastructureItem)`
    background: #ffffff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    margin: 10px;
    height: 100%;

    .heading {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        height: 84px;
        cursor: pointer;
    }

    .content {
        ${media.desktop.at(
            css => css`
                margin-left: 80px;
                margin-right: 136px;
            `
        )}

        ${media.desktop.to(
            css => css`
                margin: 0 16px 20px 16px;
                padding-bottom: 24px;
            `
        )}


    font-size: 16px;
        line-height: 26px;

        overflow: hidden;
        transition: max-height 0.2s ease-out;
    }

    ${media.desktop.at(
        css => css`
            .content-hidden {
                max-height: 0;
            }
            .content-visible {
                max-height: 100px;
                padding-bottom: 24px;
            }
        `
    )}

    .arrow {
        ${media.mdMax`display: none`}
    }
`;
