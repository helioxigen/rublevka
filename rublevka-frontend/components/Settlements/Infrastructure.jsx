import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import { media, dict } from '@utils';

import InfrastructureItem from './InfrastructureItem';

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
    }
`;

const Infrastructure = ({ properties }) => {
    const sampleProperty = properties[Object.keys(properties).pop()];

    if (!sampleProperty || !sampleProperty.communication) {
        return <></>;
    }

    const { gasSupply } = sampleProperty.communication;
    const { powerSupply } = sampleProperty.communication;
    const { sewerageSupply } = sampleProperty.communication;
    const { waterSupply } = sampleProperty.communication;

    return (
        <StyledSwipeInterlayer>
            {/* <InfrastructureItem iconName="shield" header="Безопасность" content="Поселок надежно охранется: КПП, патрулирование 24 часа в сутки, видеонаблюдение. Установлены пожарные гидранты."/> */}
            {gasSupply && (
                <InfrastructureItem iconName="fire" header="Газоснабжение" content={dict.details.get(gasSupply)} />
            )}
            {waterSupply && (
                <InfrastructureItem
                    iconName="water"
                    header="Водоснабжение"
                    content={dict.details.get(waterSupply, 'ое')}
                />
            )}
            {powerSupply && (
                <InfrastructureItem iconName="plug" header="Электроснабжение" content={`${powerSupply}кВт`} />
            )}
            {sewerageSupply && (
                <InfrastructureItem
                    iconName="water-tap"
                    header="Канализация"
                    content={dict.details.get(sewerageSupply, 'ая')}
                />
            )}
        </StyledSwipeInterlayer>
    );
};

export default styled(Infrastructure)``;
