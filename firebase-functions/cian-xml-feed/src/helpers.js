const { writeFile } = require('fs');

// const mapDocs = doc => Object.assign({}, { docID: doc.id }, doc.data());
const mapDocs = doc => ({ docID: doc.id, ...doc.data() });

const writeFileAsync = (path, data) => new Promise((resolve, reject) => {
  writeFile(path, data, { encoding: 'utf8' }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(path);
    }
  });
});

const upperCaseFirst = (str = 'a') => [str[0].toUpperCase(), ...str.slice(1)].join('');

module.exports = {
  mapDocs,
  writeFileAsync,
  upperCaseFirst,
};
