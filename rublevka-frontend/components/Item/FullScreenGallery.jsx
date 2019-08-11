import React, { useState } from 'react';
import styled from 'styled-components';

import dynamic from 'next/dynamic';
import { CallbackModal } from '@components/Modals';
import { Button, IconButton, FavoriteButton } from '@components/UI';
import Gallery from '@components/Gallery';
import { getFields } from '@components/Forms/CallbackForm/fieldTypes';
import { optional, media } from '@utils';

const Modal = dynamic(() => import('react-modal'));

const FullScreenGallery = ({ className, dealType, specification, id, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImages, setImages] = useState([]);

    return (
        <>
            {children(images => {
                setIsOpen(true);
                setImages(images);
            })}
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                bodyOpenClassName="scroll-locked"
                overlayClassName={className}
                className="modal"
            >
                <header>
                    <h1>
                        <span className="header-content">
                            {optional.str(
                                specification.floors && `${specification.floors}-этажный дом, `,
                                specification.area && `${specification.area} м², `
                            )}
                        </span>
                        <span className="header-id">№ {id}</span>
                    </h1>
                    <CallbackModal fields={getFields('name', 'phone', 'comment')} title="Забронировать просмотр">
                        {handleOpen => (
                            <Button className="callback-button" onClick={handleOpen}>
                                Оставить заявку
                            </Button>
                        )}
                    </CallbackModal>
                    <FavoriteButton id={id} className="favorite-button" red dealType={dealType}>
                        {isFav => (isFav ? 'В избранном' : 'В избранное')}
                    </FavoriteButton>
                    <IconButton onClick={() => setIsOpen(false)} secondary icon="times" />
                </header>
                <Gallery keyboardControl images={currentImages} />
            </Modal>
        </>
    );
};

export default styled(FullScreenGallery)`
    background: #232323;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15000;

    display: flex;
    justify-content: center;
    align-items: center;
    header {
        display: flex;
        align-items: center;
        color: white;

        margin: 0 0 73px;

        h1 {
            font-size: 18px;
            flex: 1;
            margin: 0;
        }

        .callback-button,
        .favorite-button {
            padding: 0 24px;
            border-radius: 32px;
            font-size: 15px;
            height: 36px;
            text-transform: initial;
            color: white;
            margin-right: 15px;
            letter-spacing: 0.535714px;
        }

        .times-button {
            color: #656565;
            font-size: 24px;
            padding: 0;

            position: relative;
            z-index: 15000;

            height: 36px;
            width: 36px;
        }

        .favorite-button {
            display: flex;
            align-items: center;
            background: #666;
            font-weight: 600;

            min-width: 129px;
            box-sizing: initial;

            .favorite-icon {
                margin-right: 8px;
                font-size: 18px;
            }
        }

        ${media.desktop.to(
            css => css`
                .header-content,
                .callback-button,
                .favorite-button {
                    display: none;
                }

                padding: 0 15px;
            `
        )}
    }

    .modal {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 16px 0 50px;

        ${media.desktop.at(
            css => css`
                padding: 16px 50px 50px;
            `
        )}

        display: flex;
        flex-direction: column;
    }

    ${Gallery} {
        display: flex;
        flex-direction: column;
        flex: 1;
        .gallery-display {
            position: initial;
            flex: 1;
            height: 60vh;

            display: flex;
            flex-direction: column;
            .react-swipe-container {
                flex: 1;

                * {
                    height: 100%;
                }
            }
            &::before,
            &::after {
                display: none;
            }

            .control {
                opacity: 1;
                width: 80px;
            }

            img {
                height: 100%;
                width: auto;

                ${media.desktop.to(
                    css => css`
                        width: 100%;
                        object-fit: contain;
                    `
                )}
            }
        }

        .gallery-nav {
            margin: 16px auto 0;

            ${media.desktop.at(
                css => css`
                    width: 50%;
                `
            )}
        }
    }
`;
