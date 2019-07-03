import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';
import { Button, Icon } from '@components/UI';
import PageLink from './PageLink';

const Pagination = ({ className, count, currentPage }) => {
    const topBorder = count - currentPage >= 3 ? currentPage : currentPage - 2;
    const paginationEnd = count - currentPage < 3 ? count - 2 : currentPage;

    return (
        <div className={className}>
            <Button red>Загрузить ещё</Button>
            <div className="pages">
                <Icon name="arrow-left" viewBox="0 0 6 10" />
                <PageLink page={1} current={currentPage === 1} />
                {currentPage > 3 && <span className="eclipse">...</span>}
                {range((currentPage < 3 ? 3 : topBorder) - 1, paginationEnd + 2).map(num => (
                    <PageLink key={num} page={num} current={currentPage === num} />
                ))}
                {count > 4 && count - currentPage > 2 && <span className="eclipse">...</span>}
                {count > 4 && <PageLink page={count} current={currentPage === count} />}
                <Icon name="arrow-left" viewBox="0 0 6 10" />
            </div>
        </div>
    );
};

export default styled(Pagination)`
    display: flex;
    flex-direction: column;
    align-items: center;

    .eclipse {
        width: 2.5em;
        text-align: center;
    }

    .pages {
        display: flex;
        align-items: center;

        ${Icon}:first-child {
            transform: scaleX(-1);
        }
    }
`;
