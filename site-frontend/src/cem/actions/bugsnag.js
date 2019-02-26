export const sendError = (name, message) => dispatch => {
  if (window.Bugsnag) Bugsnag.notify(name, message, {}, 'error');
  dispatch({
    type: 'bugsnag.send.error',
    name,
  });
};
