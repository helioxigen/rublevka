import updateId from './update';

export default function (id, data, requestKind) {
  return (dispatch) => {
    const lead = {
      ...data,
      requestDetails: {
        properties: requestKind === 'properties' ? [] : undefined,
        ...data.requestDetails,
        requestKind,
      },
    };

    dispatch(updateId(id, lead));
  };
}
