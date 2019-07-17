import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Price, Link, FavoriteButton } from '@components/UI';
import { dict, itemTitle, format, media, cdn } from '@utils';
import Shortcuts from './Shortcuts';
import Gallery from './Gallery';
import Summary from './Summary';

const Card = ({
    className,
    dealTypeExplicit,
    data,
    data: { id, images = [], landDetails = {}, specification = {}, location = {}, kind },
}) => {
    const {
        query: { dealType: dealTypeT = dict.translit.byWord(dealTypeExplicit) },
    } = useRouter();

    const dealType = dict.translit.byWord(dealTypeT);

    return (
        <Link
            to="/item"
            query={[{ dealType: dealTypeT, kind: dict.translit.byWord(kind), id }]}
            path={[dealTypeT, dict.translit.byWord(kind), id]}
        >
            <article className={className}>
                <header>
                    <span className="card-id">№{id}</span>
                    <FavoriteButton id={id} dealType={dealType} />

                    {images.length > 0 && <Shortcuts images={images} />}
                    {images.length > 0 && <Gallery images={images} />}
                </header>
                <section className="card-body">
                    <h3>{itemTitle.generate(dealType, true, false, { landDetails, specification, location, kind })}</h3>
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
        </Link>
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

    ${FavoriteButton} {
        top: 0;
        right: 0;
    }

    .card-id,
    ${FavoriteButton} {
        position: absolute;
        z-index: 4;
    }

    header {
        height: 220px;
        width: 100%;
        overflow: hidden;
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
        }

        ${Summary} {
            margin: 0 0 20px 0;
        }

        ${Price} {
            margin: 0;
            font-size: 18px;
        }
    }

    ${Shortcuts} {
        display: none;
    }

    ${media.query.desktop} {
        ${Shortcuts} {
            display: flex;
        }

        ${Gallery} {
            display: none;
        }
    }

    ${media.lg`
        ${FavoriteButton}:not([data-active="true"]) {
            opacity: 0;
            transition: 0.3s;
        }
        &:hover ${FavoriteButton} {
            opacity: 1;
        }
    `}

    h3 {
        margin-bottom: 5px;
        font-weight: 600;
    }

    &:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    }
`;
