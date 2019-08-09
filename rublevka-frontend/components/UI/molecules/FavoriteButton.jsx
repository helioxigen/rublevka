import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@components/UI/atoms';
import { toggleFavorite } from '@store/user/actions';
import { sc } from '@utils';

const FavoriteButton = ({ className, id, dealType, children }) => {
    const favorite = useSelector(state => state.user.favorite);
    const isFavorite = favorite.some(item => item.id === id && item.dealType === dealType);
    const dispatch = useDispatch();

    const [play, changePlay] = useState(false);

    const handleFavoriteToggle = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(toggleFavorite({ id, dealType }));
        changePlay(true);
    };

    return (
        <button
            type="button"
            data-active={isFavorite}
            data-play={play}
            className={className}
            onClick={handleFavoriteToggle}
        >
            <span className="favorite-icon">
                <Icon name="favorite" className="stable" />
                <Icon name="favorite" className="float" />
            </span>
            {children && <span className="text">{children(isFavorite)}</span>}
        </button>
    );
};

export default styled(FavoriteButton)`
    background: none;
    border: none;
    outline: none;

    z-index: 100;

    margin: 0;
    padding: 15px;
    box-sizing: border-box;

    cursor: pointer;

    z-index: 2;

    &[data-active='true'] svg {
        fill: ${sc.theme.colors.red};
        stroke-width: 0;
    }

    &:active .favorite-icon {
        transform: scale(0.8);
    }

    .favorite-icon {
        display: block;
        position: relative;
        transition: 0.2s;

        > * {
            display: block;
        }

        svg {
            stroke: ${sc.ifProp('red')(sc.theme.colors.red, 'white')};
            transition: 0.2s;
            stroke-width: 2px;
            fill: ${sc.ifProp('red')('none', 'rgba(0, 0, 0, 0.3)')};
        }
        .float {
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    &[data-active='true'] .favorite-icon svg {
        fill: ${sc.theme.colors.red};
        stroke-width: 0;
    }

    &[data-active='true'][data-play='true'] .float {
        animation: ${sc.keyframes.poof} 800ms;
    }
`;
