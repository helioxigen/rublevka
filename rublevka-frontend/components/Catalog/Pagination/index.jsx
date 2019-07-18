import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';
import { Button, Icon } from '@components/UI/atoms';
import PageLink from './PageLink';

const Pagination = ({ className, count, currentPage }) => {
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
            <Button className="load-more" red>
                Загрузить ещё
            </Button>
            <div className="pages">
                <Icon name="arrow" mirror />
                <PageLink page={1} current={currentPage === 1} />
                {currentPage > 3 && <span className="eclipse">...</span>}
                {range(start, end).map(num => (
                    <PageLink key={num} page={num} current={currentPage === num} />
                ))}
                {count > 4 && count - currentPage > 2 && <span className="eclipse">...</span>}
                {count > 4 && <PageLink page={count} current={currentPage === count} />}
                <Icon name="arrow" />
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

    .eclipse {
        width: 2.5em;
        text-align: center;
    }

    ${Button} {
        margin-bottom: 32px;
    }

    .pages {
        display: flex;
        align-items: center;
    }
`;
