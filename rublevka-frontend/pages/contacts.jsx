import React from 'react';
import styled from 'styled-components';
import { Icon, Content, PageContainer } from '@components/UI';
import { Map, Placemark, ZoomControl } from 'react-yandex-maps';
import { ContactToolbar } from '@components/Toolbars';
import { media, sc, format } from '@utils';
import config from '@config';

const ContactsPage = ({ className }) => {
    // const [minutesFromMkad, setMinutesFromMkad] = useState(20);

    const size = typeof window !== 'undefined' && window.outerWidth < 992 ? 48 : 64;

    const { email, phone, phoneNumbers } = config.site;

    // const onLoad = ymaps => {
    //     mapRef.behaviors.disable('scrollZoom');
    //     console.log('onload');
    //     // we need to get nearest mkad km
    //     const nearestMkadKm = [55.764307, 37.365169];

    //     ymaps
    //         .route([
    //             { type: 'wayPoint', point: [nearestMkadKm[0], nearestMkadKm[1]] },
    //             { type: 'wayPoint', point: [55.734871, 37.249479] },
    //         ])
    //         .then(route => {
    //             try {
    //                 const points = route.getWayPoints();
    //                 const lastPointId = points.getLength() - 1;

    //                 points.options.set('preset', 'islands#redStretchyIcon');
    //                 points.get(0).properties.set('iconContent', 'МКАД');

    //                 const lastPoint = points.get(lastPointId);
    //                 lastPoint.properties.set('iconContent', null);
    //                 lastPoint.properties.set('ico', null);
    //                 lastPoint.options.set('opacity', 0);

    //                 lastPoint.options.set({
    //                     preset: 'islands#grayStretchyIcon',
    //                     iconContentLayout: ymaps.templateLayoutFactory.createClass(''),
    //                     balloonContentLayout: ymaps.templateLayoutFactory.createClass(''),
    //                 });
    //                 const duration = route.getJamsTime();

    //                 setMinutesFromMkad(Math.round(duration / 60));

    //                 route.getPaths().options.set({
    //                     opacity: 0.9,
    //                     strokeColor: '#A52AFB',
    //                     strokeWidth: 3,
    //                 });
    //                 mapRef.geoObjects.add(route.getPaths());
    //             } catch (ex) {
    //                 console.log(ex);
    //             }
    //         });
    // };

    return (
        <PageContainer as="main" className={className}>
            <Content className="content">
                <div className="content-container">
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
                        <ContactToolbar isStatic />
                    </article>
                </div>
            </Content>
            <section className="contacts-map">
                <Map
                    // onLoad={ymaps => onLoad(ymaps)}
                    // instanceRef={ref => {
                    //     if (ref) {
                    //         mapRef = ref;
                    //     }
                    // }}
                    instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
                    defaultState={{ center: [55.734871, 37.249479], zoom: 15, controls: [] }}
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
                    {/* <NavigatorBox toName="Рублёвка.ру" minutes={minutesFromMkad} /> */}
                </Map>
            </section>
        </PageContainer>
    );
};

ContactsPage.getInitialProps = async () => ({
    title: 'Контакты',
    meta: {
        title: `Контактная информация - агентство недвижимости ${format.capitalize(config.host)}`,
        description: `Адреса и телефоны офисов агентства недвижимости ${format.capitalize(config.host)}`,
    },
    menuEntry: 'contacts',
});

export default styled(ContactsPage)`
    position: relative;

    box-sizing: border-box;

    margin: 0;

    ${media.tablet.at(
        css => css`
            height: calc(100vh - 170px);
        `
    )}

    .contacts-map {
        height: 80vw;

        ${media.tablet.at(
            css => css`
                width: 100%;
                height: 100%;

                position: absolute;
                right: 0;
                left: 0;
            `
        )}
    }

    .content {
        ${media.tablet.at(
            css => css`
                position: absolute;
                height: 100%;
                left: 0;
                right: 0;
            `
        )}

        ${media.desktop.at(
            css => css`
                padding: 0 50px;
            `
        )}

        .content-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
    }

    ${ContactToolbar} {
        ${media.tablet.at(
            css => css`
                display: none;
            `
        )}

        z-index: 1;
        margin-top: 24px;
    }

    .contact {
        z-index: 10;
        padding: 24px 15px;

        ${media.tablet.at(
            css => css`
                padding: 20px 16px;
                position: absolute;
                top: 14px;
            `
        )}

        ${media.desktop.at(
            css => css`
                top: 40px;
            `
        )}

        background: white;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        color: #212121;

        ${media.tablet.at(
            css => css`
                letter-spacing: 0.352941px;
            `
        )}

        ${media.tablet.at(
            css => css`
                font-size: 16px;
            `
        )}

        .contact-info a {
            text-decoration: none;
            color: inherit;

            &:hover {
                color: ${sc.theme.colors.red};
            }
        }

        p {
            margin: 0;
        }

        h2 {
            margin: 0 0 12px;
            font-size: 24px;
        }

        ${media.tablet.to(
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
