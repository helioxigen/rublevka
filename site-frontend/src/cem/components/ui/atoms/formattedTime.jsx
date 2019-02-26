import React from 'react';

export default () => ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const minutesStr =
    String(minutes).length < 2 ? `0${minutes}` : String(minutes);
  const secondsStr =
    String(seconds).length < 2 ? `0${seconds}` : String(seconds);

  return (
    <span>
      {minutesStr}:{secondsStr}
    </span>
  );
};
