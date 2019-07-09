import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const ContactsPage = ({ className }) => {
    const size = typeof window !== 'undefined' && window.outerWidth < 992 ? 48 : 64;

    return (
        <main className={className}>
            <article className="contact">
                <header>
                    <h2>Офис в Жуковке</h2>
                    <p>Рублёво-Успенское шоссе, Жуковка, 44А, 2 этаж</p>
                </header>
                <p className="contact-info">
                    <Icon name="mail" />
                    info@rublevka.ru
                </p>
                <p className="contact-info">
                    <Icon name="phone" />
                    +7 (495) 432-33-22
                </p>
                <footer>
                    <p>Пн-пт, с 10:00 до 20:00.</p>
                </footer>
            </article>
            <YMaps>
                <Map
                    className="contacts-ymap"
                    instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
                    defaultState={{ center: [55.734871, 37.249479], zoom: 15 }}
                    width="100%"
                    height="100%"
                    modules={['layout.Image']}
                >
                    <Placemark
                        geometry={[55.734871, 37.249479]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: '/static/contacts/placemark.png',
                            iconImageSize: [size, size], // размер иконки
                            iconImageOffset: [(-1 * size) / 2, (-1 * size) / 2], // позиция иконки
                        }}
                    />
                </Map>
            </YMaps>
        </main>
    );
};

export default styled(ContactsPage)`
    position: relative;
    padding-top: 60px;

    height: 100vh;

    .contacts-ymap {
        width: 100%;
        height: 100%;
    }

    .contact {
        z-index: 10;
        position: absolute;
        top: 100px;
        left: 50px;
        padding: 20px 16px;

        background: white;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 4px;

        p {
            margin: 0;
        }

        h2 {
            margin: 0 0 12px;
            font-size: 24px;
        }

        header {
            margin-bottom: 20px;
        }

        .contact-info {
            display: flex;
            align-items: center;

            ${Icon} {
                margin-right: 8px;

                &[data-icon='mail'] {
                    width: 16px;
                    height: 12px;
                }

                &[data-icon='phone'] {
                    width: 14px;
                    height: 14px;
                }
            }

            &:first-of-type {
                margin-bottom: 12px;
            }
        }

        footer {
            margin-top: 24px;
        }
    }
`;
