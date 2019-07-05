import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../atoms';

const ProfileCard = ({ className, avatar, alt, name, subheader }) => (
    <section className={className}>
        <Avatar src={avatar} alt={alt} />
        <div className="info">
            <header>{name}</header>
            <p>{subheader}</p>
        </div>
    </section>
);

export default styled(ProfileCard)`
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #232323;

    ${Avatar} {
        margin-right: 10px;
        font-size: 80px;
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
