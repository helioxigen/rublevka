import React from 'react';
import styled from 'styled-components';
import { getAvatarImage } from '../../utils';

const size = 48;

const AvatarSt = styled.img`
  width: ${size}px;
  height: ${size}px;
  border-radius: ${size / 2}px;
`;

const Avatar = ({ id }) => <AvatarSt src={getAvatarImage(id)} />;

export default Avatar;
