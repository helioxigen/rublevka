import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Price } from '../atoms';
import config from '@config';
import { media } from '@utils';
import { useToggle } from '@hooks';

const MultiPrice = ({ className, kind, landDetails, price = {}, dealType }) => {
    const [isOpen, toggleOpen] = useToggle(false);
    const { currency } = useSelector(state => state.user);

    return (
        <div
            className={className}
            role="button"
            tabIndex={0}
            onKeyDown={() => toggleOpen()}
            onClick={() => toggleOpen()}
            data-open={isOpen}
        >
            <Price
                className="display-price"
                showSubheader
                kind={kind}
                landDetails={landDetails}
                deal={price}
                dealType={dealType}
                currency={currency}
            />
            <div className="hidden">
                {config.currencies
                    .filter(c => c.code !== currency)
                    .map(({ code }) => (
                        <Price
                            key={code}
                            showSubheader
                            kind={kind}
                            landDetails={landDetails}
                            deal={price}
                            dealType={dealType}
                            currency={code}
                        />
                    ))}
            </div>
        </div>
    );
};

export default styled(MultiPrice)`
    display: block;
    position: relative;
    outline: none;

    ${Price} {
        font-size: 20px;

        margin-bottom: 12px;

        font-weight: bold;

        ${media.desktop.at(
            css => css`
                font-size: 21px;
                margin: 0;
                padding: 25px 21px;
            `
        )}
    }

    .display-price {
        ${media.desktop.at(
            css => css`
                font-size: 24px;
            `
        )}

        display: flex;
        align-items: center;
        flex-wrap: wrap;

        position: relative;
        z-index: 5000;

        &::after {
            content: '';
            display: block;
            margin-left: 4px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 5px 5px 0 5px;
            border-color: black transparent transparent transparent;
        }
    }

    .hidden {
        ${media.desktop.at(
            css => css`
                background: #ffffff;
                box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
                border-radius: 4px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;

                height: 200%;

                ::before {
                    content: '';
                    display: block;
                    flex: 1 0 100%;
                    display: block;
                    height: 50%;
                }

                display: flex;
                flex-wrap: wrap;
            `
        )}
    }

    ${media.desktop.at(
        css => css`
            .hidden {
                display: none;
            }
            &:hover .hidden {
                display: flex;
            }

            &:hover .display-price::after {
                transform: scaleY(-1);
            }
        `
    )}

    ${media.desktop.to(
        css => css`
            .hidden {
                display: none;
            }
            &[data-open='true'] .hidden {
                display: block;
            }
            &[data-open='true'] .display-price::after {
                transform: scaleY(-1);
            }
        `
    )}
`;
