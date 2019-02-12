import raf from 'raf';

const animate = (duration, easing, onUpdate, onStart, onEnd) => {
  const start = Date.now();

  if (typeof onStart === 'function') {
    onStart();
  }

  (function loop() {
    const pos = (Date.now() - start) / duration;

    if (pos > 1) {
      onUpdate(1);

      if (typeof onEnd === 'function') {
        onEnd();
      }
    } else {
      raf(loop);

      onUpdate(easing(pos));
    }
  })();
};

export default animate;
