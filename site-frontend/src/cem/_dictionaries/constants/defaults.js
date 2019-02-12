export const resourceName = '_dictionaries';
export const apiPath = '/v1/dictionary_items';

export const groups = {
  call_goal: {
    filter: {
      kind: ['task_contact_goal'],
    },
  },
  email_goal: {
    filter: {
      kind: ['task_contact_goal'],
    },
  },
  sms_goal: {
    filter: {
      kind: ['task_contact_goal'],
    },
  },
  meeting_goal: {
    filter: {
      kind: ['task_meeting_goal'],
    },
  },
  negotiation_goal: {
    filter: {
      kind: ['task_negotiation_goal'],
    },
  },

  call_successful_result: {
    filter: {
      kind: ['task_successful_contact_result'],
    },
  },
  call_unsuccessful_result: {
    filter: {
      kind: ['task_unsuccessful_contact_result'],
    },
  },

  email_successful_result: {
    filter: {
      kind: ['task_successful_contact_result'],
    },
  },
  email_unsuccessful_result: {
    filter: {
      kind: ['task_unsuccessful_contact_result'],
    },
  },

  sms_successful_result: {
    filter: {
      kind: ['task_successful_contact_result'],
    },
  },
  sms_unsuccessful_result: {
    filter: {
      kind: ['task_unsuccessful_contact_result'],
    },
  },

  meeting_successful_result: {
    filter: {
      kind: ['task_successful_meeting_result'],
    },
  },
  meeting_unsuccessful_result: {
    filter: {
      kind: ['task_unsuccessful_meeting_result'],
    },
  },

  negotiation_successful_result: {
    filter: {
      kind: ['task_successful_negotiation_result'],
    },
  },
  negotiation_unsuccessful_result: {
    filter: {
      kind: ['task_unsuccessful_negotiation_result'],
    },
  },

  preview_successful_result: {
    filter: {
      kind: ['task_successful_preview_result'],
    },
  },
  preview_unsuccessful_result: {
    filter: {
      kind: ['task_unsuccessful_preview_result'],
    },
  },

  client_lead_spam_reason: {
    filter: {
      kind: ['spam_reason'],
    },
  },

  client_lead_reject_reason: {
    filter: {
      kind: [
        'client_lead_targeted_reject_reason',
        'client_lead_non_targeted_reject_reason',
      ],
    },
  },
};

export const getDefaultsByGroup = group => groups[group] || {};
