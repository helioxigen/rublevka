import { EventTypes } from 'redux-segment';

import { SEND_ANALYTICS } from 'core/constants/segment';

function sendAnalytics({ event, ...payload }) {
  return dispatch => {
    dispatch({
      type: SEND_ANALYTICS,
      meta: {
        analytics: {
          eventType: EventTypes.track,
          eventPayload: {
            event,
            properties: {
              ...payload,
            },
          },
        },
      },
    });
  };
}

export default sendAnalytics;
