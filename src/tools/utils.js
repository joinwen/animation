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
function extend(target, source) {
  for (let key in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
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
      target[key] = clone(source[key], true);
    }
  }
  return target;
}

export { extend, merge, clone, Type };
