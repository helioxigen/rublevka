import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from '../atoms';

const poof = keyframes`
  from {
    top: 0;
    opacity: 0.6;
  }
  
  to {
    top: -150%;
    opacity: 0;
  }
`;

const FavoriteIcon = ({ className, active }) => (
    <span data-active={active} className={className}>
        <Icon className="stableHeart" name="favorite" />
        <Icon className="floatHeart" name="favorite" />
    </span>
);

export default styled(FavoriteIcon)`
    position: relative;

    svg {
        transform-origin: center center;
        transition: all 0.15s ease-out;

        width: 100px;
        height: 120px;
    }

    .floatHeart {
        fill: none;

        opacity: 0;
    }

    /* .fl */

    &[data-active='true'] .floatHeart {
        animation: ${poof} 800ms;
    }
`;
