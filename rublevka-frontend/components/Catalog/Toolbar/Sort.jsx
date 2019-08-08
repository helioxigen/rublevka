import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CombinedSelect } from '@components/UI';
import { changeOrderBy } from '@store';
import { format } from '@utils';

const Sort = ({ className, totalItems }) => {
    const total = useSelector(state => state.properties.pagination.total);
    const value = useSelector(state => state.properties.orderBy) || '';

    const dispatch = useDispatch();

    const handleChange = type => dispatch(changeOrderBy(type));

    return (
        <div className={className}>
            <span className="sort-label">
                {format.titleByNumber(totalItems || total, ['объект', 'объекта', 'объектов'])} отсортированы{' '}
            </span>
            <CombinedSelect
                className="select"
                options={[
                    ['', 'По умолчанию'],
                    ['price.asc', 'По возрастанию цены'],
                    ['price.desc', 'По убыванию цены'],
                    ['mkadDistance.asc', 'По удалённости от МКАД'],
                ]}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default styled(Sort)`
    display: flex;
    align-items: center;

    max-width: 100vw;
    box-sizing: border-box;

    .sort-label {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        flex: 0 1 auto;
    }

    .select {
        flex: 1 0 auto;
        margin-left: 5px;
        .select-display {
            color: #f4665c;
            span::first-letter {
                text-transform: lowercase;
            }
        }

        ul {
            width: 250px;
            right: -12px;
        }
    }
`;
