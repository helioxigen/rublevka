import xhr2 from 'xhr2';

// Patch XMLHttpReqeust used by 'dtHttp' as Node.js doesn't have it built-in
global.XMLHttpRequest = xhr2;

// Turn off warnings that are issued by 3rd party modules
global.console.warn = () => {};
