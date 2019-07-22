import React from 'react';
import styled from 'styled-components';
import { Icon, Content, PageContainer } from '@components/UI';
import { Map, Placemark, ZoomControl } from 'react-yandex-maps';
import { ContactToolbar } from '@components/Toolbars';
import { app, media } from '@utils';

const ContactsPage = ({ className }) => {
    const size = typeof window !== 'undefined' && window.outerWidth < 992 ? 48 : 64;

    const { email, phone, phoneNumbers } = app.config;

    return (
        <PageContainer as="main" className={className}>
            <Content>
                <article className="contact">
                    <header>
                        <h2>Офис в Жуковке</h2>
                        <p>Рублёво-Успенское шоссе, Жуковка, 44А, 2 этаж</p>
                    </header>
                    <p className="contact-info">
                        <Icon name="mail" />
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>
                    <p className="contact-info">
                        <Icon name="phone" />
                        <a href={`tel:+${phoneNumbers}`}>{phone}</a>
                    </p>
                    <footer>
                        <p>Пн-пт, с 10:00 до 20:00.</p>
                    </footer>
                    <ContactToolbar />
                </article>
            </Content>
            <section className="contacts-map">
                <Map
                    instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
                    defaultState={{ center: [55.734871, 37.249479], zoom: 15 }}
                    width="100%"
                    height="100%"
                    modules={['layout.Image']}
                >
                    <ZoomControl
                        options={{
                            position: {
                                left: 'auto',
                                right: 10,
                                top: 108,
                            },
                        }}
                    />
                    <Placemark
                        geometry={[55.734871, 37.249479]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: '/static/shared/placemark.png',
                            iconImageSize: [size, size], // размер иконки
                            iconImageOffset: [(-1 * size) / 2, (-1 * size) / 2], // позиция иконки
                        }}
                    />
                </Map>
            </section>
        </PageContainer>
    );
};

ContactsPage.getInitialProps = async () => ({
    title: 'Контакты',
});

export default styled(ContactsPage)`
    position: relative;

    box-sizing: border-box;

    margin: 0;

    ${media.mediaquery.tablet.at(
        css => css`
            height: 100vh;
        `
    )}

    .contacts-map {
        height: 80vw;

        ${media.mediaquery.tablet.at(
            css => css`
                width: 100%;
                height: 100%;
            `
        )}
    }

    ${Content} {
        ${media.mediaquery.tablet.at(
            css => css`
                position: absolute;
                height: 100%;
                left: 0;
                right: 0;
            `
        )}
    }

    ${ContactToolbar} {
        ${media.mediaquery.tablet.at(
            css => css`
                display: none;
            `
        )}

        margin-top: 24px;
    }

    .contact {
        z-index: 10;
        padding: 24px 15px;

        ${media.mediaquery.tablet.at(
            css => css`
                padding: 20px 16px;
                position: absolute;
                top: 14px;
                left: 0;
            `
        )}

        ${media.mediaquery.tabletLandscape.at(
            css => css`
                top: 40px;
            `
        )}

        background: white;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        color: #212121;

        ${media.mediaquery.tablet.at(
            css => css`
                letter-spacing: 0.352941px;
            `
        )}

        ${media.mediaquery.tablet.at(
            css => css`
                font-size: 16px;
            `
        )}

        a {
            text-decoration: none;
            color: inherit;
        }

        p {
            margin: 0;
        }

        h2 {
            margin: 0 0 12px;
            font-size: 24px;
        }

        ${media.mediaquery.tablet.to(
            css => css`
                .contact-info {
                    font-size: 17px;
                }
            `
        )}

        header {
            margin-bottom: 20px;
        }

        .contact-info {
            display: flex;
            align-items: center;

            ${Icon} {
                margin-right: 8px;
                font-size: calc(1em - 1em / 17);
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
