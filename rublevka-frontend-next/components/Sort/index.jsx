import React from 'react';
import styled from 'styled-components';
import { sc } from '@utils';

const Sort = ({ className, value = 'price', onChange }) => (
    <div className={className}>
        Сортировать:{' '}
        <div className="switch" data-selected={value}>
            <button type="button" disabled={value === 'price'} onClick={() => onChange('price')}>
                <span>По цене</span>
            </button>{' '}
            <button type="button" disabled={value === 'area'} onClick={() => onChange('area')}>
                По площади
            </button>
        </div>
    </div>
);

export default styled(Sort)`
    display: flex;
    align-items: center;

    font-size: 16px;
    color: #232323;

    .switch {
        margin-left: 16px;

        display: flex;

        position: relative;

        &::before {
            content: '';
            display: block;
            width: 50%;
            height: 100%;
            border-radius: 6px;
            background: #eeeeee;
            position: absolute;
            z-index: 1;
            transition: transform 400ms;
            transform: translateX(0);
            top: 0;
            left: 0;
        }

        &[data-selected='area']::before {
            transform: translateX(100%);
        }

        /* button:first-child span {
            position: relative;
            z-index: 3;
        } */

        /* button:first-child::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 6px;
            background: #eeeeee;
            position: absolute;
            z-index: 1;
            transition: transform 225ms;
            transform: translateX(0);
            top: 0;
        }

        &[data-selected='area'] button:first-child::before {
            transform: translateX(100%);
        }

        button:last-child {
            z-index: 3;
        } */

        button {
            display: flex;
            width: 125px;
            justify-content: center;

            z-index: 2;

            position: relative;
            padding: 11px 0;

            ${sc.reset.button};
            outline: none;

            color: inherit;

            &:disabled {
                color: inherit;
            }

            &:not(:disabled) {
                opacity: 0.65;
                cursor: pointer;
            }
        }
    }
`;
