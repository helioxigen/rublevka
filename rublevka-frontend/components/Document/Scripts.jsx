import React from 'react';
import config from '@config';

const getGtagScript = () => {
    return {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', '${config.external.gtagId}');
        `,
    };
};

const getYandexMetrikaScript = () => ({
    __html: `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${config.external.yandexMetrikaId}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
        `,
});

const getUISScript = () => ({
    __html: `
        var __cs = __cs || [];
        __cs.push(['setCsAccount', '${config.external.uisId}']);
        `,
});

export default () => (
    <>
        <script dangerouslySetInnerHTML={getUISScript()} />
        <script async src="https://app.uiscom.ru/static/cs.min.js" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.external.gtagId}>`} />
        <script dangerouslySetInnerHTML={getGtagScript()} />
        <script dangerouslySetInnerHTML={getYandexMetrikaScript()} />
        <noscript>
            <div>
                <img
                    src={`https://mc.yandex.ru/watch/${config.external.yandexMetrikaId}`}
                    style={{
                        position: 'absolute',
                        left: -9999,
                    }}
                    alt=""
                />
            </div>
        </noscript>
    </>
);
