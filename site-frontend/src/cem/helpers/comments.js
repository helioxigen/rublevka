export const groupChildrenComments = items => items.filter(item => !item.parentId).map(item => ({
  ...item,
  children: items.map(childItem => childItem.parentId === item.id ? childItem : false).filter(i => i),
}));
