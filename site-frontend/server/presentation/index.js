import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { API } from 'core/config/sources';

import Presentation from './src/components';
const css = fs.readFileSync('server/presentation/assets/style.css', 'UTF-8');

const sendResponse = (res, content) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <style>
          ${css}
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
};

export default (req, res) => {
  API.get(`/v1/properties/${req.params.category}/${req.params.id}`).then(
    ({ body: property }) => {
      API.get(`/v1/users/me?token=${req.params.token}`).then(
        ({ body: { id } }) => {
          API.get(`/v1/users/staff/${id}?token=${req.params.token}`).then(
            ({ body: broker }) => {
              const showLogo = req.params.showLogo === 'logo';
              if (property.residentialComplexId) {
                API.get(
                  `/v1/residential_complexes/${property.residentialComplexId}`,
                ).then(({ body: residentialComplex }) => {
                  const content = renderToString(
                    <Presentation
                      data={property}
                      broker={broker}
                      showLogo={showLogo}
                      residentialComplex={residentialComplex}
                    />,
                  );
                  sendResponse(res, content);
                });
              } else {
                const content = renderToString(
                  <Presentation
                    data={property}
                    broker={broker}
                    showLogo={showLogo}
                  />,
                );
                sendResponse(res, content);
              }
            },
          );
        },
      );
    },
  );
};
