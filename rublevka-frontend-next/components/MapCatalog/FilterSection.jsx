import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Icon, Switcher } from '@components/UI';
import { page, sc } from '@utils';
import { Filter } from '@components';

const FilterBlock = ({ className }) => {
    const {
        query: { dealType },
    } = useRouter();

    return (
        <section className={className}>
            <button type="button" className="back-button" onClick={() => page.goTo.catalog()}>
                <Icon copy name="arrow-squared" />
                <Icon name="arrow-squared" />
                Вернуться к выдаче
            </button>
            <Switcher
                items={[['Продажа', 'prodaja'], ['Аренда', 'arenda']]}
                value={dealType}
                onChange={value => page.pushQuery({ dealType: value })}
            />
            <Filter dealType={dealType} />
        </section>
    );
};

export default styled(FilterBlock)`
    background: #ffffff;
    box-shadow: 1px 0px 8px rgba(0, 0, 0, 0.15);
    z-index: 250;
    width: 295px;

    .back-button {
        background: none;
        border: none;
        outline: none;
        width: 100%;
        cursor: pointer;

        font-size: 16px;
        border-bottom: 1px solid #d9d9d9;

        transition: 0.3s;

        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        ${Icon} {
            position: absolute;
            left: 10%;
            transition: 0.3s;

            font-size: 14px;

            width: 1em;
            height: 1em;

            background: ${sc.theme.colors.lightGrey};
            border-radius: 50%;
            padding: 7px 4px 7px 10px;

            &:nth-child(2) {
                padding: 7px 8px 7px 6px;
            }

            svg:nth-child(2) {
                transform: rotate(180deg) translate(0.4em, 1em);
            }
        }

        &:hover {
            [data-icon='arrow-squared']:nth-child(2) {
                transform: scale(0);
            }
        }

        .icon {
            position: relative;

            font-size: 28px;

            width: 1em;
            height: 1em;

            background: ${sc.theme.colors.lightGrey};
            border-radius: 50%;
            /* padding: 8px 9px 8px 7px; */

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                position: absolute;

                display: flex;

                /* transform: rotate(45deg); */

                left: 7px;
                top: 4px;

                width: 12px;
                height: 12px;

                &::before,
                &::after {
                    content: '';
                    display: inline-block;
                    height: 100%;
                    width: 15%;
                    background-color: black;
                    border-radius: 1px;
                    position: relative;
                    transition: 300ms ease-in-out transform;
                }

                &::before {
                    /* transform: rotate(45deg) translate(-1.2em, -20%); */
                    /* left: 18px;
                    top: -4px; */
                }

                &::after {
                    /* transform: rotate(90deg) translate(283%,-26%); */
                    /* left: 40px;
                    top: -4px; */
                }
            }
        }

        &:hover {
            color: white;
            background: ${sc.theme.colors.red};
        }
    }

    /* > *:not(.back-button) {
        margin: 0 30px;
    } */

    ${Switcher}, ${Filter} {
        margin: 24px 30px;
    }

    overflow-y: scroll;
`;
