import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@components/UI';
import { toggleFavorite } from '@store/user/actions';

const FavoriteButton = ({ className, id, dealType }) => {
    const isFavorite = useSelector(state =>
        state.user.favorites.some(item => item.id === id && item.dealType === dealType)
    );
    const dispatch = useDispatch();

    const handleFavoriteToggle = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(toggleFavorite({ id, dealType }));
    };

    return <Icon className={className} onClick={handleFavoriteToggle} data-active={isFavorite} name="favorite" />;
};

export default styled(FavoriteButton)`
    height: 54px;
    width: 52px;

    margin: 0;
    padding: 15px;

    z-index: 2;
`;
