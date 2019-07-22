import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { IconButton } from '@components/UI';
import { media, sc } from '@utils';

const Modal = dynamic(() => import('react-modal'));
const CallbackForm = dynamic(() => import('@components/Forms').then(i => i.CallbackForm));

const CallbackModal = ({ className, children = () => {} }) => {
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
                    header={
                        <header>
                            <h3>Обратный звонок</h3>
                            <p>Оставьте свою заявку и наш менеджер свяжется с вами в течение 5 минут.</p>
                        </header>
                    }
                    fields={{
                        name: {
                            placeholder: 'Имя',
                            required: true,
                        },
                        phone: {
                            placeholder: 'Телефон',
                            type: 'tel',
                            required: true,
                        },
                    }}
                    submitLabel="Оставить заявку"
                    footer={
                        <footer>
                            Отправляя заявку, вы соглашаетесь с нашей{' '}
                            <a href="/privacy">политикой конфиденциальности</a>.
                        </footer>
                    }
                />
            </Modal>
        </>
    );
};

export default styled(CallbackModal)`
    background: rgba(0, 0, 0, 0.3);
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

        ${media.mediaquery.tabletLandscape.at(
            css => css`
                padding: 32px 24px;
            `
        )}
    }
`;
