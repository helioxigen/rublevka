import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../atoms';

const ProfileCard = ({ className, avatar, alt, name, subheader }) => (
    <header className={className}>
        <Avatar className="avatar" src={avatar} alt={alt} />
        <div className="info">
            <header>{name}</header>
            <p>{subheader}</p>
        </div>
    </header>
);

export default styled(ProfileCard)`
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #232323;

    .avatar {
        margin-right: 10px;
        font-size: 80px;
        flex: 1 0 auto;
    }

    header {
        margin-bottom: 4px;
        font-weight: bold;
        text-transform: uppercase;
    }

    p {
        margin: 0;
        font-size: 15px;
        font-weight: 500;
        color: rgba(35, 35, 35, 0.5);
    }
`;
