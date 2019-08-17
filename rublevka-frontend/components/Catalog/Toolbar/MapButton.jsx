import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Icon, Link } from '@components/UI';
import { sc } from '@utils';

const MapButton = ({ className }) => {
    const {
        query: { dealType, kind, filter },
    } = useRouter();

    return (
        <Link to="/catalog.map" query={[{ dealType, kind }, { filter }]} path={[dealType, 'map', kind]}>
            <button className={className} type="button">
                <Icon name="pin" />
                На карте
            </button>
        </Link>
    );
};

export default styled(MapButton)`
    border: none;
    display: flex;
    align-items: center;
    font-size: inherit;
    font-weight: 500;
    position: relative;
    cursor: pointer;
    outline: none;

    color: ${sc.theme.colors.red};

    padding: 8px 12px;

    [data-icon] {
        height: 18px;
        width: 18px;
        margin-right: 5px;
    }

    &::after {
        content: 'new';
        position: absolute;
        font-size: 12px;
        line-height: 14px;
        color: white;
        padding: 2px;
        top: -8px;
        right: -8px;

        background: #f5554a;
        border-radius: 4px;
    }
`;
