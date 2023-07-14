// eslint-disable-next-line @typescript-eslint/no-var-requires
const ms = require('ms');

export const getSecondsFromExpireString = (expireString = '1m'): number => {
  const parameterAsMilliseconds: number = ms(expireString);
  return parameterAsMilliseconds / 1000;
};
