import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { CallbackForm } from '@components/Forms';
import { IconButton } from '@components/UI';
import { media, sc } from '@utils';

const CallbackModal = ({
    className,
    children = () => {},
    fields,
    submitLabel,
    title = 'Обратный звонок',
    subheader = 'Оставьте свою заявку и наш менеджер свяжется с вами в течение 30 минут.',
    comment = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {children(() => setIsOpen(true))}
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                bodyOpenClassName="scroll-locked"
                overlayClassName={className}
                className="modal"
            >
                <IconButton onClick={() => setIsOpen(false)} icon="times" secondary />
                <CallbackForm
                    title={title}
                    fields={fields}
                    subheader={subheader}
                    submitLabel={submitLabel}
                    defaultComment={`[${title}] ${comment}`}
                />
            </Modal>
        </>
    );
};

export default styled(CallbackModal)`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15000;

    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        background: #ffffff;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        border-radius: 4px;

        outline: none;

        .times-button {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 24px;
            color: rgba(8, 8, 8, 0.3);
        }

        position: relative;

        text-align: center;

        width: 400px;

        padding: 32px 16px;

        header {
            h3 {
                font-size: 24px;
            }
            p {
                line-height: 24px;
                letter-spacing: 0.352941px
                font-size: 16px;
                margin: 8px 0 16px;
            }
        }

        footer {
            font-size: 14px;

            a{
                text-decoration: none;
                color: ${sc.theme.colors.red};
            }
        }

        ${media.desktop.at(
            css => css`
                padding: 32px 24px;
            `
        )}
    }
`;
