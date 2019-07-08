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
                <Icon name="arrow-squared" /> Вернуться к выдаче
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
            padding: 8px 9px 8px 7px;
        }

        &:hover {
            box-shadow: -1px 0px 3px black;

            ${Icon} {
                transform: translateX(-70%);
            }
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
