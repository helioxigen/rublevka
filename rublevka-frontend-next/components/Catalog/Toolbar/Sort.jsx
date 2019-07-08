import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CombinedSelect } from '@components/UI';
import { changeOrderBy } from '@store';

const Sort = ({ className }) => {
    const total = useSelector(state => state.properties.pagination.total);
    const value = useSelector(state => state.properties.orderBy) || '';

    const dispatch = useDispatch();

    const handleChange = type => dispatch(changeOrderBy(type));

    return (
        <div className={className}>
            {total.toLocaleString('ru')} объектов отсортированы{' '}
            <CombinedSelect
                options={[
                    ['', 'По умолчанию'],
                    ['price.asc', 'По возрастанию цены'],
                    ['price.desc', 'По убыванию цены'],
                    ['mkadDistance.desc', 'По удалённости от МКАД'],
                    ['mkadDistance.asc', 'По близости к МКАД'],
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

    ${CombinedSelect} {
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
