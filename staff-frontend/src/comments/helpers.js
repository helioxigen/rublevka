export const groupChildrenComments = (items, parentId) =>
  items
    .filter(el => el.parentId === parentId)
    .map(item => ({
      ...item,
      children: groupChildrenComments(items, item.id),
    }));

export default { groupChildrenComments };
