'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const jsType = ["String", "Array", "Number", "Object", "Date", "Boolean", "Function", "Undefined", "Null", "Symbol", "TypedArray"];
const Type = {};
jsType.forEach((type) => {
  Type["is" + type] = function (obj) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
  };
  type === "TypedArray" &&
    (Type["is" + type] = function (obj) {
      return (
        Object.prototype.toString
          .call(obj)
          .match(/(?<=\s).*(?=])/)
          .indexOf("Array") === 0
      );
    });
});

function clone(source) {
  if (source === null || typeof source !== "object") {
    return source;
  }
  let result = source;
  if (Type.isArray(source)) {
    result = [];
    source.forEach((index, item) => {
      result[index] = clone(item);
    });
  }
  if (Type.isTypedArray(source)) {
    result = [];
    let Ctor = source.constructor;
    if (source.constructor.from) {
      result = Ctor.from(source);
    } else {
      result = new Ctor(source.length);
      source.forEach((index, item) => {
        result[index] = clone(item);
      });
    }
  }
  if (Type.isObject(source)) {
    result = {};
    for (let key in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(key)) {
        result[key] = clone(source[key]);
      }
    }
  }
}

function merge(target, source, overwrite) {
  if (!Type.isObject(source) || !Type.isObject(target)) {
    return overwrite ? clone(source) : target;
  }
  for (let key in source) {
    let targetProp = target[key],
      sourceProp = source[key];
    if ((Type.isObject(targetProp) && Type.isObject(sourceProp)) || (Type.isArray(targetProp) && Type.isArray(sourceProp))) {
      merge(targetProp, sourceProp, overwrite);
    } else if (overwrite || !(key in target)) {
      target[key] = clone(source[key]);
    }
  }
  return target;
}

const STRATEGY_LIST = {
  linear: (progress) => {
    return progress;
  },
  easeIn: (progress) => {
    return STRATEGY_LIST.easeInQuad(progress);
  },
  easeInQuad: (progoress) => {
    return Math.pow(progoress, 2);
  },
  easeInCubic: (progress) => {
    return Math.pow(progress, 3);
  },
  easeInQuart: (progress) => {
    return Math.pow(progress, 4);
  },
  easeInQuint: (progress) => {
    return Math.pow(progress, 5);
  },
  easeOut: (progress) => {
    return STRATEGY_LIST.easeOutQuad(progress);
  },
  easeOutQuad: (progress) => {
    return progress * 2 - Math.pow(progress, 2);
  },
  easeOutCubic: (progress) => {
    return Math.pow(progress - 1, 3) + 1;
  },
  easeOutQuart: (progress) => {
    return 1 - Math.pow(progress - 1, 4);
  },
  easeOutQuint: (progress) => {
    return Math.pow(progress - 1, 5) + 1;
  },
};
const STRATEGY = {};
Object.keys(STRATEGY_LIST).forEach((key) => {
  STRATEGY[key] = key;
});

const defaultOptions = {
  delay: 17,
  reset: 1,
  duration: 2000,
  race: (progress, reset) => {
    return progress <= reset;
  },
  begin: () => {console.log("begin");},
  end: () => {console.log("end");},
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

class CssProper {
  constructor(map) {
    this.map = map;
    this.init();
  }
  init() {
    this.prop = this.map.prop;
    this.start = this.map.start;
    this.end = this.map.end;
    this.initial = this.map.initial;
  }
  getProp() {
    return this.prefix;
  }
  getValue() {
    return this.prop;
  }
  setValue(ele, progress) {
    let value = (this.endVal - this.startVal) * progress + this.initialVal;
    ele.style[this.prop] = value + this.suffix;
  }
}

class DimensionCssProper extends CssProper {
  constructor(map) {
    super(map);
    this.selfInit();
  }
  selfInit() {
    let startMatch = /(-?[\d,.]*)(.*)$/.exec(this.start),
      endMatch = /(-?[\d,.]*)(.*)$/.exec(this.end),
      initialMatch = /(-?[\d,.]*)(.*)$/.exec(this.initial);
    this.suffix = startMatch[2] || "px";
    this.startVal = startMatch[1];
    this.endVal = endMatch[1];
    this.initialVal = initialMatch[1] * 1;
  }
}

class OperateCssProper {
  constructor(fromProper, toProper, el) {
    this.el = el;
    [fromProper, toProper] = this.mergeProperBetweenFromAndTo(fromProper, toProper);
    this.init(fromProper, toProper);
  }
  init(fromProper, toProper) {
    this.properList = [];
    Object.keys(fromProper).forEach((prop) => {
      let proper = {
        prop: prop,
        initial: window.getComputedStyle(this.el)[prop],
        start: fromProper[prop],
        end: toProper[prop],
      };
      this.properList.push(new DimensionCssProper(proper));
    });
  }

  operate(ele, progress) {
    this.properList.forEach((proper) => {
      proper.setValue(ele, progress);
    });
  }
  mergeProperBetweenFromAndTo(fromProper, toProper) {
    Object.keys(toProper).forEach((prop) => {
      if (!fromProper[prop]) {
        fromProper[prop] = window.getComputedStyle(this.el)[prop];
      }
    });
    toProper = merge(toProper, fromProper, false);
    return [fromProper, toProper];
  }
}

const action = {
  fromTo: (el, from, to) => {
    let operator = new OperateCssProper(from, to, el);
    return function (progress) {
      operator.operate(el, progress);
    };
  },
  to: (el, to) => {
    let operator = new OperateCssProper({}, to, el);
    return function (progress) {
      operator.operate(el, progress);
    };
  },
};

exports.STRATEGY = STRATEGY;
exports.action = action;
exports.animation = animation;
