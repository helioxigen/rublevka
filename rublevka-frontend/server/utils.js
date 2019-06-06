import path from 'path';

export const relativeTo = dir => pathName =>
  path.resolve(__dirname, dir, pathName);
