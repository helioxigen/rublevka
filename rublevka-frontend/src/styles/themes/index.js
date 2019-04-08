import global from 'window-or-global';

const { config = {} } = global;
// Styles for satellites shoud copy 'rublevka' theme for the time being.
const themeName = config.theme !== 'default' ? 'rublevka' : 'default';

export default require(`styles/themes/${themeName}/index`).default;
