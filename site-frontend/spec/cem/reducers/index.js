import toastr from './toastr';
import tasks from './tasks';
// import commentsByTaskId from './commentsByTaskId';

export default () => {
  context(`[Reducers]:`, () => {
    tasks();
    // commentsByTaskId();
    toastr();
  });
};
