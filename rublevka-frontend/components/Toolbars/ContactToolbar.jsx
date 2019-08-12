import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@components/UI';
import { app, sc } from '@utils';

const ContactToolbar = ({ className, isStatic = false }) => (
    <div className={className} dara-static={isStatic}>
        <IconButton target="__blank" href={`https://wa.me/${app.config.whatsapp}`} icon="whatsapp">
            Написать
        </IconButton>
        <IconButton href={`tel:${app.config.phoneNumbers}`} icon="phone.filled" />
    </div>
);

export default styled(ContactToolbar)`
    display: flex;
    color: white;

    &[data-static='false'] {
        animation: ${sc.keyframes.slideInBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    z-index: 3500;

    .whatsapp-button {
        font-size: 15px;
        margin: 0 8px 0 0;
        flex: 1;
        letter-spacing: 0.3px;
        [data-icon] {
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
