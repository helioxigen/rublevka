export default function recursiveCleanUp(input) {
  const obj = { ...input };

  Object.keys(obj).map((key) => {
    const value = obj[key];

    if (value === undefined) delete obj[key];
    if (value === null) delete obj[key];
    if (typeof value === 'string' && value.length === 0) delete obj[key];

    if ((value instanceof Object) && !(value instanceof Array) && !(value instanceof Function)) {
      if (Object.keys(recursiveCleanUp(value)).length === 0) {
        delete obj[key];
      } else {
        obj[key] = recursiveCleanUp(value);
      }
    }
  });

  return obj;
}
