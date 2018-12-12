import global from 'window-or-global';
import Raven from 'raven-js';

const { track: sTrack, identify: sIdentify, alias: sAlias } = global.analytics || {};
const { reachGoal: yaTrack } = global.yaCounter || {};

export const track = ({ event, ...props } = {}) => {
  try {
    sTrack(event, props);
    yaTrack(event);
  } catch (e) {
    Raven.captureException(e);
  }
};

export const alias = sAlias;
export const identify = sIdentify;
