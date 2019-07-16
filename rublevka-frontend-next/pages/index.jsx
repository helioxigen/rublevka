import React from 'react';
import { LandingLayout } from '../components/UI/templates';
import Hero from '../components/Landing/Hero';
import Block from '../components/Landing/Block';
import { Button } from '../components/UI/atoms';
import Location from '@components/Landing/Location';
import CompactForm from '@components/UI/molecules/CompactForm';
import { page } from '@utils';

export default () => (
    <LandingLayout>
        <Hero />
        <Block
            className="object-block"
            title="Знаете номер объекта?"
            text="Введите номер объекта в поле ниже и сразу перейдите к просмотру."
        >
            <CompactForm
                onSubmit={id => page.goTo.catalog({ dealType: 'prodaja', filter: JSON.stringify({ id }) })}
                placeholder="Номер объекта"
                submitLabel="Показать"
            />
        </Block>
        <Block
            className="call-block"
            title="Хотите продать дом?"
            text="Просто оставьте заявку. Наш агент свяжется с вами и поможет всё организовать: проведёт фотосессию, создаст рекламную кампанию, покажет дом и подготовит сделку."
        >
            <Button>Оставить заявку</Button>
        </Block>
        <figure>
            <img src="/static/landing/placeholder.jpg" alt="" />
        </figure>
        <Block
            className="sell-block"
            title="Лучшие предложения на Рублёвке"
            text="Рублёвка.ру — это только актуальные предложения на рынке, опыт экспертов и забота о клиенте. Мы создаём сервис для поиска, подбора и покупки недвижимости: удобный, быстрый и интуитивно понятный."
        >
            <Button red>Подробнее</Button>
        </Block>
        <Location />
    </LandingLayout>
);
