import React from 'react';
import styled from 'styled-components';
import { IconButton, Icon } from '@components/UI';
import { app, sc } from '@utils';

const ContactToolbar = ({ className }) => (
    <div className={className}>
        <IconButton href={`https://wa.me/${app.getConfig().phoneNumbers}`} icon="whatsapp">
            Написать
        </IconButton>
        <IconButton href={`tel:${app.getConfig().phoneNumbers}`} icon="phone.filled" />
    </div>
);

export default styled(ContactToolbar)`
    display: flex;
    color: white;

    animation: ${sc.keyframes.slideInBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    .whatsapp-button {
        font-size: 15px;
        margin: 0 8px 0 0;
        flex: 1;
        letter-spacing: 0.3px;
        ${Icon} {
            font-size: 28px;
            margin: 0 10px 0 0;

            position: relative;

            svg {
                position: absolute;
                top: -2px;
            }
        }
    }

    a:last-child {
        font-size: 20px;
        width: 56px;
    }
`;
