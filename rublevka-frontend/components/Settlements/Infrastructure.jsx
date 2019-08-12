import React, { useState } from 'react';
import styled from 'styled-components';

import dynamic from 'next/dynamic';

import { media, dict } from '@utils';

import InfrastructureItem from './InfrastructureItem';
import { Section } from '.';

const Slider = dynamic(() => {
    import('slick-carousel/slick/slick.css');
    import('slick-carousel/slick/slick-theme.css');

    return import('react-slick');
});

const SwipeInterlayer = ({ className, children }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
    };

    return (
        <div className={className}>
            <div className="tablet-version">
                <Slider {...settings}>{children}</Slider>
            </div>
            <div className="desktop-version">{children}</div>
        </div>
    );
};

const StyledSwipeInterlayer = styled(SwipeInterlayer)`
    .tablet-version {
        overflow: hidden;

        ${media.desktop.at(
            css =>
                css`
                    display: none;
                `
        )}
    }

    .desktop-version {
        ${media.desktop.to(
            css =>
                css`
                    display: none;
                `
        )}

        > *:first-child {
            margin-top: 32px;
        }
    }
`;

const Infrastructure = ({ properties }) => {
    const [visibleItem, setVisibleItem] = useState(null);

    const handleItemClick = id => {
        if (visibleItem === id) {
            setVisibleItem(null);
        } else {
            setVisibleItem(id);
        }
    };

    const sampleProperty = properties[Object.keys(properties).pop()];

    if (!sampleProperty || !sampleProperty.communication) {
        return <></>;
    }

    const { gasSupply, powerSupply, sewerageSupply, waterSupply } = sampleProperty.communication;

    return (
        <Section title="Инфраструктура">
            <StyledSwipeInterlayer>
                {/* <InfrastructureItem iconName="shield" header="Безопасность" content="Поселок надежно охранется: КПП, патрулирование 24 часа в сутки, видеонаблюдение. Установлены пожарные гидранты."/> */}
                {gasSupply && (
                    <InfrastructureItem
                        isContentVisible={visibleItem === 'gas'}
                        setContentVisible={() => handleItemClick('gas')}
                        iconName="fire"
                        header="Газоснабжение"
                        content={dict.details.get(gasSupply)}
                    />
                )}
                {waterSupply && (
                    <InfrastructureItem
                        isContentVisible={visibleItem === 'water'}
                        setContentVisible={() => handleItemClick('water')}
                        iconName="water"
                        header="Водоснабжение"
                        content={dict.details.get(waterSupply, ['central', 'ое'])}
                    />
                )}
                {powerSupply && (
                    <InfrastructureItem
                        isContentVisible={visibleItem === 'power'}
                        setContentVisible={() => handleItemClick('power')}
                        iconName="plug"
                        header="Электроснабжение"
                        content={`${powerSupply}кВт`}
                    />
                )}
                {sewerageSupply && (
                    <InfrastructureItem
                        isContentVisible={visibleItem === 'sewerage'}
                        setContentVisible={() => handleItemClick('sewerage')}
                        iconName="water-tap"
                        header="Канализация"
                        content={dict.details.get(sewerageSupply, ['central', 'ая'])}
                    />
                )}
            </StyledSwipeInterlayer>
        </Section>
    );
};

export default styled(Infrastructure)``;
