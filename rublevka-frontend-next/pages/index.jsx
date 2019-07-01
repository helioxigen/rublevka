import React from 'react';
import { LandingLayout } from '../components/UI/templates';
import Hero from '../components/Landing/Hero';
import Block from '../components/Landing/Block';
import { Button } from '../components/UI/atoms';

export default () => (
    <LandingLayout>
        <Hero />
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
    </LandingLayout>
);
