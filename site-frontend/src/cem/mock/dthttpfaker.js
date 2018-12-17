import fakeData from './apidata';

class DtHttpFaker {
  constructor(serviceUrl) {
    this.headers = {};
    this.serviceUrl = serviceUrl;
  }

  get(...params) {
    return this.makeFakeResponse({
      path: params[0],
      expectedCode: params[1],
      expectedResponse: params[2],
      method: 'get',
    });
  }

  post(...params) {
    return this.makeFakeResponse({
      path: params[0],
      expectedCode: params[1],
      expectedResponse: params[2],
      method: 'post',
    });
  }

  put(...params) {
    return this.makeFakeResponse({
      path: params[0],
      expectedCode: params[1],
      expectedResponse: params[2],
      method: 'put',
    });
  }

  delete(...params) {
    return this.makeFakeResponse({
      path: params[0],
      expectedCode: params[1],
      expectedResponse: params[2],
      method: 'delete',
    });
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }

  applyMiddleware() {}

  makeFakeResponse({ path, expectedCode, expectedResponseBody, method }) {
    if (!path) {
      console.log('Path to HTTP service is not defined!'); // eslint-disable-line no-console
      return Promise.reject({ body: '' });
    }
    return new Promise((resolve, reject) => {
      const responseCode = expectedCode || fakeData[path][method].defaultResponseCode;
      const responseBody =
        !!expectedCode && !!expectedResponseBody
          ? expectedResponseBody
          : fakeData[path][method][responseCode];

      if (responseCode >= 200 && responseCode < 300) {
        resolve({ body: responseBody });
      } else {
        reject({ body: responseBody });
      }
    });
  }
}

export default DtHttpFaker;
