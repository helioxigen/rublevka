import React from 'react';
import styled from 'styled-components';
import { IconButton, Link } from '@components/UI';
import { useRouter } from 'next/router';
import { media } from '@utils';

const FloatingControls = ({ className, onFilterClick, isFilterVisible, isMapAvailable = true }) => {
    const {
        query: { dealType, kind, filter },
    } = useRouter();

    return (
        <div className={className} data-hide={!isFilterVisible}>
            {isMapAvailable && (
                <Link to="/catalog.map" query={[{ dealType, kind }, { filter }]} path={[dealType, 'map', kind]}>
                    <IconButton icon="placemark" floating red />
                </Link>
            )}
            <IconButton onClick={onFilterClick} icon="settings" floating red>
                Параметры
            </IconButton>
        </div>
    );
};

export default styled(FloatingControls)`
    position: fixed;
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 32px;

    height: 48px;

    z-index: 1250;

    @keyframes appear {
        from {
            transform: translateY(200%);
        }
        to {
            transform: translateY(0);
        }
    }

    animation: appear 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

    transition: transform 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &[data-hide='true'] {
        transform: translateY(200%);
    }

    ${media.desktop.at(
        css => css`
            display: none;
        `
    )}

    .placemark-button {
        padding: 0.7em;
        font-size: 20px;
        min-width: 48px;
        flex: 0;
        margin-right: 8px;

        ${media.tablet.at(
            css => css`
                display: none;
            `
        )}
    }

    .settings-button {
        line-height: 2.85;
        [data-icon] {
            font-size: 14px;
        }
        text-transform: initial;
    }
`;
