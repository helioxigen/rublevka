import React from 'react';
import config from '@config';

const getRoistatScript = () => ({
    __html: `
    (function(w, d, s, h, id) {    w.roistatProjectId = id; w.roistatHost = h;    var p = d.location.protocol == "https:" ? "https://" : "http://";    var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init";    var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);})(window, document, 'script', 'cloud.roistat.com', '02e219e3c2c3adfb1226ddb6002d4830');
    `,
});

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
        <script dangerouslySetInnerHTML={getRoistatScript()} />
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
