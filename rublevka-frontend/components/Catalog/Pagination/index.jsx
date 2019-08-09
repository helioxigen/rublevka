import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import range from 'lodash/range';
import { Button, Icon } from '@components/UI/atoms';
import PageLink from './PageLink';
import { fetchProperties } from '@store';

const Pagination = ({ className, count, currentPage, dealType }) => {
    const dispatch = useDispatch();
    const { query, filter, orderBy } = useSelector(state => state.properties);

    const isLeft = currentPage < 3;
    const isRight = count - currentPage < 3;

    const pad = {
        start: currentPage - 1,
        end: currentPage + 2,
    };

    const rightStart = isRight ? count - 3 : pad.start;
    const rightEnd = isRight ? count : pad.end;

    const start = isLeft ? 2 : rightStart;
    const end = isLeft ? 5 : rightEnd;

    return (
        <div className={className}>
            <Button
                className="load-more"
                red
                onClick={() => dispatch(fetchProperties(dealType, currentPage + 1, query, filter, orderBy, true))}
            >
                Загрузить ещё
            </Button>
            <div className="pages">
                {currentPage !== 1 && (
                    <PageLink className="arrow-link" page={currentPage - 1}>
                        <Icon name="arrow" mirror />
                    </PageLink>
                )}
                <PageLink page={1} current={currentPage === 1} />
                {currentPage > 3 && <span className="eclipse">...</span>}
                {range(start, end).map(num => (
                    <PageLink key={num} page={num} current={currentPage === num} />
                ))}
                {count > 4 && count - currentPage > 2 && <span className="eclipse">...</span>}
                {count > 4 && <PageLink page={count} current={currentPage === count} />}
                {currentPage !== count && (
                    <PageLink className="arrow-link" page={currentPage + 1}>
                        <Icon name="arrow" />
                    </PageLink>
                )}
            </div>
        </div>
    );
};

export default styled(Pagination)`
    display: flex;
    flex-direction: column;
    align-items: center;

    grid-area: pagination;

    align-self: center;

    .load-more {
        margin-bottom: 32px;
    }

    .arrow-link {
        font-size: 20px;
        &:hover {
            background: none;
        }
    }

    .eclipse {
        width: 2.5em;
        text-align: center;
    }

    .pages {
        display: flex;
        align-items: center;
    }
`;
