export default ({ response, resolve, reject }) => {
  if (response.status >= 200 && response.status < 300) {
    resolve(response);
  } else {
    reject(response);
  }
};
