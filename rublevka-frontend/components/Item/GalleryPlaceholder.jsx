import React from 'react';
import styled from 'styled-components';
import { Button } from '@components/UI';
import { CallbackModal } from '@components/Modals';
import { getFields } from '@components/Forms/CallbackForm/fieldTypes';
import { media } from '@utils';

const GalleryPlaceholder = ({ className, propertyId }) => (
    <div className={className}>
        <h3>Для объекта не загружено фотографий</h3>
        <CallbackModal
            title="Запросить фото"
            subheader={`Оставьте email и мы вышлем фото для объекта №${propertyId} в течение 30 минут`}
            fields={getFields('name', 'email')}
            submitLabel="Отправить"
            comment={propertyId}
        >
            {handleOpen => (
                <Button className="modal-toggle" secondary onClick={handleOpen}>
                    Запросить
                </Button>
            )}
        </CallbackModal>
    </div>
);

export default styled(GalleryPlaceholder)`
    background: radial-gradient(351.66px at 50% 50%, rgba(238, 238, 238, 0.25) 0%, rgba(238, 238, 238, 0.5) 100%);
    border-radius: 4px;

    padding: 24px 0;

    ${media.desktop.at(
        css => css`
            padding: 36px 0;
        `
    )}

    text-align: center;
    letter-spacing: 0.45px;
    text-transform: uppercase;

    > h3 {
        font-size: 15px;
        color: #666666;
        margin: 0 0 12px;
        font-weight: 600;
    }

    .modal-toggle {
        color: #47b34c;
        background: none;

        box-shadow: none;

        height: 1em;
    }
`;
