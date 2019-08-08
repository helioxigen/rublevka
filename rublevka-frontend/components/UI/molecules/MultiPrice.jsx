import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Price } from '../atoms';
import config from '@config';
import { media } from '@utils';
import { useToggle } from '@hooks';

const MultiPrice = ({ className, kind, landDetails, price = {}, dealType, short }) => {
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
                className="display-price price"
                showSubheader
                kind={kind}
                landDetails={landDetails}
                deal={price}
                dealType={dealType}
                currency={currency}
            />
            <div className="hidden">
                <div className="hidden-prices">
                    {config.currencies
                        .filter(c => c.code !== currency)
                        .map(({ code }) => (
                            <Price
                                className="price"
                                key={code}
                                showSubheader
                                kind={kind}
                                landDetails={landDetails}
                                deal={price}
                                dealType={dealType}
                                currency={code}
                                short={short}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default styled(MultiPrice)`
    display: block;
    position: relative;
    outline: none;

    .price {
        font-size: 20px;

        margin-bottom: 12px;

        flex: 1 0 auto;

        font-weight: 500;

        ${media.desktop.at(
            css => css`
                font-size: 21px;
                margin: 0;
            `
        )}
    }

    .display-price {
        font-weight: bold;

        ${media.desktop.at(
            css => css`
                font-size: 24px;
                font-size: 500;
            `
        )}

        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;

        position: relative;
        z-index: 150;

        &::after {
            content: '';
            display: block;
            margin-left: 10px;
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

                padding: 0 20px;

                height: 180%;

                ::before {
                    content: '';
                    display: block;
                    flex: 1 0 100%;
                    display: block;
                    height: 40%;
                }

                .hidden-prices {
                    height: 60%;

                    display: flex;
                    align-items: center;
                }
            `
        )}
    }

    ${media.desktop.at(
        css => css`
            padding: 25px 21px;

            .hidden {
                display: none;
            }
            .display-price:hover + .hidden {
                display: block;
            }

            .display-price:hover::after {
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
