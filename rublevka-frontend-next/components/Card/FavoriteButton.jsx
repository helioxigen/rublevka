import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@components/UI';
import { toggleFavorite } from '@store/user/actions';
import { sc } from '@utils';

const FavoriteButton = ({ className, id, dealType }) => {
    const isFavorite = useSelector(state =>
        state.user.favorite.some(item => item.id === id && item.dealType === dealType)
    );
    const dispatch = useDispatch();

    const handleFavoriteToggle = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(toggleFavorite({ id, dealType }));
    };

    return (
        <button type="button" data-active={isFavorite} className={className} onClick={handleFavoriteToggle}>
            <Icon name="favorite" />
        </button>
    );
};

export default styled(FavoriteButton)`
    height: 54px;
    width: 52px;

    background: none;
    border: none;
    outline: none;

    z-index: 100;

    margin: 0;
    padding: 15px;
    box-sizing: border-box;

    cursor: pointer;

    z-index: 2;

    &:hover:not([data-active='true']) svg {
        fill: rgba(0, 0, 0, 0.5);
    }

    &[data-active='true'] svg {
        fill: ${sc.theme.colors.red};
    }

    svg {
        transition: 0.2s;
        stroke: #ffffff;
        stroke-width: 2px;
        fill: rgba(0, 0, 0, 0.3);
    }
`;
