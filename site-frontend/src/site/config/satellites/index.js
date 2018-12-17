import global from 'window-or-global';
import rublevka from './rublevka';
import jqestate from './jqestate';
import riga from './riga';
import kievka from './kievka';
import minka from './minka';

const configs = {
  rublevka,
  jqestate,
  riga,
  kievka,
  minka,
};

if (global.location) {
  const hostnameSplit = global.location.hostname.split('.');
  const domain = hostnameSplit[hostnameSplit.length - 2];

  global.config = configs[domain] || configs.jqestate;
}

export default configs;
