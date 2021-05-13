import { merge, Type } from "../tools/utils";
import { STRATEGY_LIST } from "../strategy";

const defaultOptions = {
  delay: 17,
  reset: 1,
  duration: 2000,
  race: (progress, reset) => {
    return progress <= reset;
  },
  begin: () => {console.log("begin")},
  end: () => {console.log("end")},
  strategy: "linear",
};

function calculateProgress() {
  let reset = 1;
  return function (progress, strategy, action) {
    let _progress = 0;
    if (reset % 2 === 0) {
      _progress = progress >= reset ? (reset++, 0) : reset - progress;
    } else {
      _progress = progress >= reset ? (reset++, 1) : progress - (reset - 1);
    }
    _progress = strategy(_progress);
    action(_progress);
  };
}

function animationWithRaf(options) {
  let start = Date.now(),
    calculateCb = calculateProgress();
  const { duration, action, race, strategy, reset } = options;
  let fn = () => {
    let passed = Date.now() - start,
      progress = passed / duration,
      id = null;
    if (race(progress, reset)) {
      calculateCb(progress, strategy, action);
      id = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(id);
      calculateCb(progress, strategy, action);
      options.end();
    }
  };
  fn();
  options.begin();
}

function animationWithInterval(options) {
  let start = Date.now(),
    calculateCb = calculateProgress();
  const { delay, duration, action, race, strategy, reset } = options;
  let id = setInterval(() => {
    let passed = Date.now() - start,
      progress = passed / duration;
    if (race(progress, reset)) {
      calculateCb(progress, strategy, action);
    } else {
      clearInterval(id);
      calculateCb(progress, strategy, action);
      options.end();
    }
  }, delay);
  options.begin();
}

function animation(options) {
  options = merge(defaultOptions, options, true);
  if (!Type.isFunction(options.strategy)) {
    options.strategy = STRATEGY_LIST[options.strategy];
  }
  if (window.requestAnimationFrame) {
    animationWithRaf(options);
  } else {
    animationWithInterval(options);
  }
}

export default animation;
