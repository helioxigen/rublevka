import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Price, FavoriteButton, PageLink } from '@components/UI';
import { dict, itemTitle, format, media, sc } from '@utils';
import Shortcuts from './Shortcuts';
import Gallery from './Gallery';
import Summary from './Summary';

const Card = ({
    className,
    dealTypeExplicit,
    prevPage,
    data,
    data: { id, images = [], landDetails = {}, specification = {}, location = {}, kind },
}) => {
    const { query } = useRouter();

    const dealType = dealTypeExplicit || dict.translit.byWord(query.dealType);

    const publicImages = images.filter(i => i.isPublic).slice(0, 6);

    return (
        <PageLink to="item" params={{ dealType, id, kind, prevPage }}>
            <article className={className}>
                <header
                    style={{
                        backgroundImage: 'url(/static/placeholder.svg)',
                    }}
                >
                    <span className="card-id">№{id}</span>
                    <FavoriteButton className="favorite-button" id={id} dealType={dealType} />

                    {images.length > 0 && <Shortcuts images={publicImages} />}
                    {images.length > 0 && <Gallery images={publicImages} />}
                </header>
                <section className="card-body">
                    <h3>
                        <PageLink to="item" params={{ dealType, id, kind, prevPage }}>
                            <a>
                                {itemTitle.generate(dealType, true, false, {
                                    landDetails,
                                    specification,
                                    location,
                                    kind,
                                })}
                            </a>
                        </PageLink>
                    </h3>
                    <Summary
                        values={[
                            landDetails.area && `${Math.round(landDetails.area)} сот`,
                            specification.area && `${Math.round(specification.area)} м²`,
                            specification.bedrooms &&
                                format.titleByNumber(specification.bedrooms, ['спальня', 'спальни', 'спален']),
                        ]}
                    />
                    <Price deal={data[`${dealType}Offer`] || {}} dealType={dealType} />
                </section>
            </article>
        </PageLink>
    );
};

export default styled(Card)`
    position: relative;
    background: #ffffff;
    transition: 0.3s;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    display: block;

    .card-id {
        top: 15px;
        left: 0;

        padding: 5px;
        background: rgba(0, 0, 0, 0.5);

        border-radius: 0 4px 4px 0;

        line-height: 18px;
        font-size: 15px;
        font-weight: 500;

        color: #ffffff;

        text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);
    }

    .favorite-button {
        top: 0;
        right: 0;
        font-size: 24px;
    }

    .card-id,
    .favorite-button {
        position: absolute;
        z-index: 4;
    }

    header {
        height: 220px;
        width: 100%;
        overflow: hidden;

        background: center / cover no-repeat;
    }

    figure {
        height: 100%;
        margin: 0;
        position: relative;
        width: 100%;
    }

    display: flex;
    flex-direction: column;

    section.card-body {
        padding: 15px 10px;

        flex: 1;

        display: flex;
        flex-direction: column;

        h3 {
            margin: 0 0 6px 0;
            flex: 1 0 auto;
            color: ${sc.theme.colors.black};

            a {
                text-decoration: none;
                color: inherit;
            }
        }

        ${Summary} {
            margin: 0 0 20px 0;
        }

        ${Price} {
            margin: 0;
            font-size: 18px;
        }
    }

    ${media.desktop.at(
        css => css`
            .favorite-button:not([data-active='true']) {
                opacity: 0;
                transition: opacity 0.3s;
            }
            &:hover .favorite-button {
                opacity: 1;
            }
        `
    )}

    ${media.touch} {
        ${Shortcuts} {
            display: none;
        }

        ${Gallery} {
            display: block;
        }
    }

    h3 {
        margin-bottom: 5px;
        font-weight: 600;
    }

    &:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    }
`;
