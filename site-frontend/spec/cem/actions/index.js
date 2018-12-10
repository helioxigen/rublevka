import contacts from './contacts';
import tasks from './tasks';
// import commentsByTaskId from './commentsByTaskId';

export default () => {
  context(`[Action creators]:`, () => {
    contacts();
    tasks();
    // commentsByTaskId();
  });
};
