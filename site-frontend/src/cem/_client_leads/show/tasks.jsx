import React from 'react';

import Tasks from 'cem/_tasks/timeline';

export default ({ id, data = {}, isTaskCreationAllowed }) => {
  const { responsibleUser = {} } = data;

  const taskCreationParams = {
    clientLeadId: id,
    contactId: data.contactId,
    responsibleUserId: responsibleUser.id,
    linkKind: 'client_lead',
  };

  return (
    <Tasks
      id={id}
      group="byClientLead"
      pk="clientLeadId"
      isTaskCreationAllowed={isTaskCreationAllowed}
      taskCreationParams={taskCreationParams}
    />
  );
};
