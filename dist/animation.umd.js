(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fly = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$e =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$a = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$9 = fails$a;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$9(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$2 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString$1 = {}.toString;

	var classofRaw$1 = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var fails$8 = fails$a;
	var classof$4 = classofRaw$1;

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$8(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$4(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$4 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$1 = indexedObject;
	var requireObjectCoercible$3 = requireObjectCoercible$4;

	var toIndexedObject$3 = function (it) {
	  return IndexedObject$1(requireObjectCoercible$3(it));
	};

	var isObject$5 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$4 = isObject$5;

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive$2 = function (input, PREFERRED_STRING) {
	  if (!isObject$4(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$4(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$4(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$4(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var requireObjectCoercible$2 = requireObjectCoercible$4;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$3 = function (argument) {
	  return Object(requireObjectCoercible$2(argument));
	};

	var toObject$2 = toObject$3;

	var hasOwnProperty = {}.hasOwnProperty;

	var has$6 = function hasOwn(it, key) {
	  return hasOwnProperty.call(toObject$2(it), key);
	};

	var global$d = global$e;
	var isObject$3 = isObject$5;

	var document = global$d.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$3(document) && isObject$3(document.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document.createElement(it) : {};
	};

	var DESCRIPTORS$3 = descriptors;
	var fails$7 = fails$a;
	var createElement = documentCreateElement;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$3 && !fails$7(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$2 = descriptors;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$1 = createPropertyDescriptor$2;
	var toIndexedObject$2 = toIndexedObject$3;
	var toPrimitive$1 = toPrimitive$2;
	var has$5 = has$6;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$2 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$2(O);
	  P = toPrimitive$1(P, true);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has$5(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
	};

	var objectDefineProperty = {};

	var isObject$2 = isObject$5;

	var anObject$4 = function (it) {
	  if (!isObject$2(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var DESCRIPTORS$1 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$3 = anObject$4;
	var toPrimitive = toPrimitive$2;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$1 ? $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$3(O);
	  P = toPrimitive(P, true);
	  anObject$3(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$2;

	var createNonEnumerableProperty$6 = DESCRIPTORS ? function (object, key, value) {
	  return definePropertyModule$1.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$4 = {exports: {}};

	var global$c = global$e;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;

	var setGlobal$3 = function (key, value) {
	  try {
	    createNonEnumerableProperty$5(global$c, key, value);
	  } catch (error) {
	    global$c[key] = value;
	  } return value;
	};

	var global$b = global$e;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$b[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof store$2.inspectSource != 'function') {
	  store$2.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource$2 = store$2.inspectSource;

	var global$a = global$e;
	var inspectSource$1 = inspectSource$2;

	var WeakMap$1 = global$a.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

	var shared$4 = {exports: {}};

	var store$1 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.12.1',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var id = 0;
	var postfix = Math.random();

	var uid$2 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var shared$3 = shared$4.exports;
	var uid$1 = uid$2;

	var keys = shared$3('keys');

	var sharedKey$1 = function (key) {
	  return keys[key] || (keys[key] = uid$1(key));
	};

	var hiddenKeys$3 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$9 = global$e;
	var isObject$1 = isObject$5;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
	var objectHas = has$6;
	var shared$2 = sharedStore;
	var sharedKey = sharedKey$1;
	var hiddenKeys$2 = hiddenKeys$3;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap = global$9.WeakMap;
	var set, get, has$4;

	var enforce = function (it) {
	  return has$4(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$2.state) {
	  var store = shared$2.state || (shared$2.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$4 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$2[STATE] = true;
	  set = function (it, metadata) {
	    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$4(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };
	  has$4 = function (it) {
	    return objectHas(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$4,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var global$8 = global$e;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;
	var has$3 = has$6;
	var setGlobal$1 = setGlobal$3;
	var inspectSource = inspectSource$2;
	var InternalStateModule = internalState;

	var getInternalState = InternalStateModule.get;
	var enforceInternalState = InternalStateModule.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$4.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has$3(value, 'name')) {
	      createNonEnumerableProperty$3(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }
	  if (O === global$8) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$3(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});

	var global$7 = global$e;

	var path$1 = global$7;

	var path = path$1;
	var global$6 = global$e;

	var aFunction$2 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$2 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$2(path[namespace]) || aFunction$2(global$6[namespace])
	    : path[namespace] && path[namespace][method] || global$6[namespace] && global$6[namespace][method];
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger$3 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var toInteger$2 = toInteger$3;

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$3 = function (argument) {
	  return argument > 0 ? min$1(toInteger$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toInteger$1 = toInteger$3;

	var max = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger$1(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};

	var toIndexedObject$1 = toIndexedObject$3;
	var toLength$2 = toLength$3;
	var toAbsoluteIndex = toAbsoluteIndex$1;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$1($this);
	    var length = toLength$2(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var has$2 = has$6;
	var toIndexedObject = toIndexedObject$3;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$1 = hiddenKeys$3;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$2(hiddenKeys$1, key) && has$2(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$2(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$2 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$2;

	var hiddenKeys = enumBugKeys$1.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$1 = getBuiltIn$2;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$2 = anObject$4;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$2(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var has$1 = has$6;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$6 = fails$a;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails$6(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$5 = global$e;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
	var redefine$3 = redefine$4.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$5;
	  } else if (STATIC) {
	    target = global$5[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$5[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$2(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$3(target, key, sourceProperty, options);
	  }
	};

	var $$6 = _export;

	// `Date.now` method
	// https://tc39.es/ecma262/#sec-date.now
	$$6({ target: 'Date', stat: true }, {
	  now: function now() {
	    return new Date().getTime();
	  }
	});

	var redefine$2 = redefine$4.exports;

	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var nativeDateToString = DatePrototype[TO_STRING];
	var getTime = DatePrototype.getTime;

	// `Date.prototype.toString` method
	// https://tc39.es/ecma262/#sec-date.prototype.tostring
	if (new Date(NaN) + '' != INVALID_DATE) {
	  redefine$2(DatePrototype, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare -- NaN check
	    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
	  });
	}

	var getBuiltIn = getBuiltIn$2;

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var $$5 = _export;
	var global$4 = global$e;
	var userAgent$1 = engineUserAgent;

	var slice = [].slice;
	var MSIE = /MSIE .\./.test(userAgent$1); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout /* , ...arguments */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func -- spec requirement
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	};

	// ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	$$5({ global: true, bind: true, forced: MSIE }, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global$4.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global$4.setInterval)
	});

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var aFunction = aFunction$1;

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$3 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$1 = Array.isArray || function isArray(arg) {
	  return classof$3(arg) == 'Array';
	};

	var global$3 = global$e;
	var userAgent = engineUserAgent;

	var process = global$3.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] < 4 ? 1 : match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$1 = engineV8Version;
	var fails$5 = fails$a;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function () {
	  return !String(Symbol()) ||
	    // Chrome 38 Symbol has incorrect toString conversion
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$2 = global$e;
	var shared$1 = shared$4.exports;
	var has = has$6;
	var uid = uid$2;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$1('wks');
	var Symbol$1 = global$2.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol$5 = function (name) {
	  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    if (NATIVE_SYMBOL && has(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var isObject = isObject$5;
	var isArray = isArray$1;
	var wellKnownSymbol$4 = wellKnownSymbol$5;

	var SPECIES$2 = wellKnownSymbol$4('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$1 = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var bind = functionBindContext;
	var IndexedObject = indexedObject;
	var toObject$1 = toObject$3;
	var toLength$1 = toLength$3;
	var arraySpeciesCreate = arraySpeciesCreate$1;

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$1($this);
	    var self = IndexedObject(O);
	    var boundFunction = bind(callbackfn, that, 3);
	    var length = toLength$1(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push.call(target, value); // filterOut
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$1(7)
	};

	var fails$4 = fails$a;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$4(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

	var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$4 = _export;
	var forEach$1 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$$4({ target: 'Array', proto: true, forced: [].forEach != forEach$1 }, {
	  forEach: forEach$1
	});

	var wellKnownSymbol$3 = wellKnownSymbol$5;

	var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$2 = wellKnownSymbol$5;

	var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$2 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$1 = classof$2;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$1(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var redefine$1 = redefine$4.exports;
	var toString = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  redefine$1(Object.prototype, 'toString', toString, { unsafe: true });
	}

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$3 = _export;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;

	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$3({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var anObject$1 = anObject$4;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$1(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var regexpStickyHelpers = {};

	var fails$3 = fails$a;

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	regexpStickyHelpers.UNSUPPORTED_Y = fails$3(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	regexpStickyHelpers.BROKEN_CARET = fails$3(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared = shared$4.exports;

	var nativeExec = RegExp.prototype.exec;
	var nativeReplace = shared('native-string-replace', String.prototype.replace);

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$2 = _export;
	var exec = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$2({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var redefine = redefine$4.exports;
	var regexpExec$1 = regexpExec$2;
	var fails$2 = fails$a;
	var wellKnownSymbol$1 = wellKnownSymbol$5;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;

	var SPECIES$1 = wellKnownSymbol$1('species');
	var RegExpPrototype = RegExp.prototype;

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	var REPLACE = wellKnownSymbol$1('replace');
	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$2(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol$1(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$2(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExpPrototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty$1(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var toInteger = toInteger$3;
	var requireObjectCoercible$1 = requireObjectCoercible$4;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible$1($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	var classof = classofRaw$1;
	var regexpExec = regexpExec$2;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classof(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject = anObject$4;
	var toLength = toLength$3;
	var requireObjectCoercible = requireObjectCoercible$4;
	var advanceStringIndex = advanceStringIndex$1;
	var regExpExec = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : regexp[MATCH];
	      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative(nativeMatch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      if (!rx.global) return regExpExec(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var global$1 = global$e;
	var DOMIterables = domIterables;
	var forEach = arrayForEach;
	var createNonEnumerableProperty = createNonEnumerableProperty$6;

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	}

	var jsType = ["String", "Array", "Number", "Object", "Date", "Boolean", "Function", "Undefined", "Null", "Symbol", "TypedArray"];
	var Type = {};
	jsType.forEach(function (type) {
	  Type["is" + type] = function (obj) {
	    return Object.prototype.toString.call(obj) === "[object " + type + "]";
	  };

	  type === "TypedArray" && (Type["is" + type] = function (obj) {
	    return Object.prototype.toString.call(obj).match(/(?<=\s).*(?=])/).indexOf("Array") === 0;
	  });
	});

	function clone(source) {
	  if (source === null || _typeof(source) !== "object") {
	    return source;
	  }

	  var result = source;

	  if (Type.isArray(source)) {
	    result = [];
	    source.forEach(function (index, item) {
	      result[index] = clone(item);
	    });
	  }

	  if (Type.isTypedArray(source)) {
	    result = [];
	    var Ctor = source.constructor;

	    if (source.constructor.from) {
	      result = Ctor.from(source);
	    } else {
	      result = new Ctor(source.length);
	      source.forEach(function (index, item) {
	        result[index] = clone(item);
	      });
	    }
	  }

	  if (Type.isObject(source)) {
	    result = {};

	    for (var key in source) {
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

	  for (var key in source) {
	    var targetProp = target[key],
	        sourceProp = source[key];

	    if (Type.isObject(targetProp) && Type.isObject(sourceProp) || Type.isArray(targetProp) && Type.isArray(sourceProp)) {
	      merge(targetProp, sourceProp, overwrite);
	    } else if (overwrite || !(key in target)) {
	      target[key] = clone(source[key]);
	    }
	  }

	  return target;
	}

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$2;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys);
	};

	var $$1 = _export;
	var toObject = toObject$3;
	var nativeKeys = objectKeys;
	var fails$1 = fails$a;

	var FAILS_ON_PRIMITIVES = fails$1(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject(it));
	  }
	});

	var STRATEGY_LIST = {
	  linear: function linear(progress) {
	    return progress;
	  },
	  easeIn: function easeIn(progress) {
	    return STRATEGY_LIST.easeInQuad(progress);
	  },
	  easeInQuad: function easeInQuad(progoress) {
	    return Math.pow(progoress, 2);
	  },
	  easeInCubic: function easeInCubic(progress) {
	    return Math.pow(progress, 3);
	  },
	  easeInQuart: function easeInQuart(progress) {
	    return Math.pow(progress, 4);
	  },
	  easeInQuint: function easeInQuint(progress) {
	    return Math.pow(progress, 5);
	  },
	  easeOut: function easeOut(progress) {
	    return STRATEGY_LIST.easeOutQuad(progress);
	  },
	  easeOutQuad: function easeOutQuad(progress) {
	    return progress * 2 - Math.pow(progress, 2);
	  },
	  easeOutCubic: function easeOutCubic(progress) {
	    return Math.pow(progress - 1, 3) + 1;
	  },
	  easeOutQuart: function easeOutQuart(progress) {
	    return 1 - Math.pow(progress - 1, 4);
	  },
	  easeOutQuint: function easeOutQuint(progress) {
	    return Math.pow(progress - 1, 5) + 1;
	  }
	};
	var STRATEGY = {};
	Object.keys(STRATEGY_LIST).forEach(function (key) {
	  STRATEGY[key] = key;
	});

	var defaultOptions = {
	  delay: 17,
	  reset: 1,
	  duration: 2000,
	  race: function race(progress, reset) {
	    return progress <= reset;
	  },
	  begin: function begin() {
	    console.log("begin");
	  },
	  end: function end() {
	    console.log("end");
	  },
	  strategy: "linear"
	};

	function calculateProgress() {
	  var reset = 1;
	  return function (progress, strategy, action) {
	    var _progress = 0;

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
	  var start = Date.now(),
	      calculateCb = calculateProgress();
	  var duration = options.duration,
	      action = options.action,
	      race = options.race,
	      strategy = options.strategy,
	      reset = options.reset;

	  var fn = function fn() {
	    var passed = Date.now() - start,
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
	  var start = Date.now(),
	      calculateCb = calculateProgress();
	  var delay = options.delay,
	      duration = options.duration,
	      action = options.action,
	      race = options.race,
	      strategy = options.strategy,
	      reset = options.reset;
	  var id = setInterval(function () {
	    var passed = Date.now() - start,
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

	var fails = fails$a;
	var wellKnownSymbol = wellKnownSymbol$5;
	var V8_VERSION = engineV8Version;

	var SPECIES = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $ = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var CssProper = /*#__PURE__*/function () {
	  function CssProper(map) {
	    _classCallCheck(this, CssProper);

	    this.map = map;
	    this.init();
	  }

	  _createClass(CssProper, [{
	    key: "init",
	    value: function init() {
	      this.prop = this.map.prop;
	      this.start = this.map.start;
	      this.end = this.map.end;
	      this.initial = this.map.initial;
	    }
	  }, {
	    key: "getProp",
	    value: function getProp() {
	      return this.prefix;
	    }
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      return this.prop;
	    }
	  }, {
	    key: "setValue",
	    value: function setValue(ele, progress) {
	      var value = (this.endVal - this.startVal) * progress + this.initialVal;
	      ele.style[this.prop] = value + this.suffix;
	    }
	  }]);

	  return CssProper;
	}();

	var DimensionCssProper = /*#__PURE__*/function (_CssProper) {
	  _inherits(DimensionCssProper, _CssProper);

	  var _super = _createSuper(DimensionCssProper);

	  function DimensionCssProper(map) {
	    var _this;

	    _classCallCheck(this, DimensionCssProper);

	    _this = _super.call(this, map);

	    _this.selfInit();

	    return _this;
	  }

	  _createClass(DimensionCssProper, [{
	    key: "selfInit",
	    value: function selfInit() {
	      var startMatch = /(-?[\d,.]*)(.*)$/.exec(this.start),
	          endMatch = /(-?[\d,.]*)(.*)$/.exec(this.end),
	          initialMatch = /(-?[\d,.]*)(.*)$/.exec(this.initial);
	      this.suffix = startMatch[2] || "px";
	      this.startVal = startMatch[1];
	      this.endVal = endMatch[1];
	      this.initialVal = initialMatch[1] * 1;
	    }
	  }]);

	  return DimensionCssProper;
	}(CssProper);

	var OperateCssProper = /*#__PURE__*/function () {
	  function OperateCssProper(fromProper, toProper, el) {
	    _classCallCheck(this, OperateCssProper);

	    this.el = el;

	    var _this$mergeProperBetw = this.mergeProperBetweenFromAndTo(fromProper, toProper);

	    var _this$mergeProperBetw2 = _slicedToArray(_this$mergeProperBetw, 2);

	    fromProper = _this$mergeProperBetw2[0];
	    toProper = _this$mergeProperBetw2[1];
	    this.init(fromProper, toProper);
	  }

	  _createClass(OperateCssProper, [{
	    key: "init",
	    value: function init(fromProper, toProper) {
	      var _this = this;

	      this.properList = [];
	      Object.keys(fromProper).forEach(function (prop) {
	        var proper = {
	          prop: prop,
	          initial: window.getComputedStyle(_this.el)[prop],
	          start: fromProper[prop],
	          end: toProper[prop]
	        };

	        _this.properList.push(new DimensionCssProper(proper));
	      });
	    }
	  }, {
	    key: "operate",
	    value: function operate(ele, progress) {
	      this.properList.forEach(function (proper) {
	        proper.setValue(ele, progress);
	      });
	    }
	  }, {
	    key: "mergeProperBetweenFromAndTo",
	    value: function mergeProperBetweenFromAndTo(fromProper, toProper) {
	      var _this2 = this;

	      Object.keys(toProper).forEach(function (prop) {
	        if (!fromProper[prop]) {
	          fromProper[prop] = window.getComputedStyle(_this2.el)[prop];
	        }
	      });
	      toProper = merge(toProper, fromProper, false);
	      return [fromProper, toProper];
	    }
	  }]);

	  return OperateCssProper;
	}();

	var action = {
	  fromTo: function fromTo(el, from, to) {
	    var operator = new OperateCssProper(from, to, el);
	    return function (progress) {
	      operator.operate(el, progress);
	    };
	  },
	  to: function to(el, _to) {
	    var operator = new OperateCssProper({}, _to, el);
	    return function (progress) {
	      operator.operate(el, progress);
	    };
	  }
	};

	exports.STRATEGY = STRATEGY;
	exports.action = action;
	exports.animation = animation;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLnVtZC5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5kYXRlLm5vdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuZGF0ZS50by1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi50aW1lcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1mdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mb3ItZWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcubWF0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5mb3ItZWFjaC5qcyIsIi4uL3NyYy90b29scy91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmtleXMuanMiLCIuLi9zcmMvc3RyYXRlZ3kvaW5kZXguanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkubWFwLmpzIiwiLi4vc3JjL2Nzcy9jc3MtcHJvcGVyLmpzIiwiLi4vc3JjL2Nzcy9kaW1lbnNpb24vaW5kZXguanMiLCIuLi9zcmMvY3NzL29wZXJhdGUtY3NzLXByb3Blci5qcyIsIi4uL3NyYy9hY3Rpb24vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdC5jYWxsKGl0LCAnJykgOiBPYmplY3QoaXQpO1xufSA6IE9iamVjdDtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbCh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aWVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjEyLjEnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMjEgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEID0gJ09iamVjdCBhbHJlYWR5IGluaXRpYWxpemVkJztcbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQIHx8IHNoYXJlZC5zdGF0ZSkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKHdtaGFzLmNhbGwoc3RvcmUsIGl0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChvYmplY3RIYXMoaXQsIFNUQVRFKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICB2YXIgc3RhdGU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIH1cbiAgICBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgICBpZiAoIXN0YXRlLnNvdXJjZSkge1xuICAgICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICAgIH1cbiAgfVxuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBzZXRHbG9iYWwoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKCF1bnNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICB9IGVsc2UgaWYgKCFub1RhcmdldEdldCAmJiBPW2tleV0pIHtcbiAgICBzaW1wbGUgPSB0cnVlO1xuICB9XG4gIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzKGhpZGRlbktleXMsIGtleSkgJiYgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eW5hbWVzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG5cbi8vIGBEYXRlLm5vd2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWRhdGUubm93XG4kKHsgdGFyZ2V0OiAnRGF0ZScsIHN0YXQ6IHRydWUgfSwge1xuICBub3c6IGZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cbn0pO1xuIiwidmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG5cbnZhciBEYXRlUHJvdG90eXBlID0gRGF0ZS5wcm90b3R5cGU7XG52YXIgSU5WQUxJRF9EQVRFID0gJ0ludmFsaWQgRGF0ZSc7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciBuYXRpdmVEYXRlVG9TdHJpbmcgPSBEYXRlUHJvdG90eXBlW1RPX1NUUklOR107XG52YXIgZ2V0VGltZSA9IERhdGVQcm90b3R5cGUuZ2V0VGltZTtcblxuLy8gYERhdGUucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZGF0ZS5wcm90b3R5cGUudG9zdHJpbmdcbmlmIChuZXcgRGF0ZShOYU4pICsgJycgIT0gSU5WQUxJRF9EQVRFKSB7XG4gIHJlZGVmaW5lKERhdGVQcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIHZhbHVlID0gZ2V0VGltZS5jYWxsKHRoaXMpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IG5hdGl2ZURhdGVUb1N0cmluZy5jYWxsKHRoaXMpIDogSU5WQUxJRF9EQVRFO1xuICB9KTtcbn1cbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgTVNJRSA9IC9NU0lFIC5cXC4vLnRlc3QodXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0IC8qICwgLi4uYXJndW1lbnRzICovKSB7XG4gICAgdmFyIGJvdW5kQXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICAgIHZhciBhcmdzID0gYm91bmRBcmdzID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBzY2hlZHVsZXIoYm91bmRBcmdzID8gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIHNwZWMgcmVxdWlyZW1lbnRcbiAgICAgICh0eXBlb2YgaGFuZGxlciA9PSAnZnVuY3Rpb24nID8gaGFuZGxlciA6IEZ1bmN0aW9uKGhhbmRsZXIpKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IDogaGFuZGxlciwgdGltZW91dCk7XG4gIH07XG59O1xuXG4vLyBpZTktIHNldFRpbWVvdXQgJiBzZXRJbnRlcnZhbCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZml4XG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS90aW1lcnMtYW5kLXVzZXItcHJvbXB0cy5odG1sI3RpbWVyc1xuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZm9yY2VkOiBNU0lFIH0sIHtcbiAgLy8gYHNldFRpbWVvdXRgIG1ldGhvZFxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS90aW1lcnMtYW5kLXVzZXItcHJvbXB0cy5odG1sI2RvbS1zZXR0aW1lb3V0XG4gIHNldFRpbWVvdXQ6IHdyYXAoZ2xvYmFsLnNldFRpbWVvdXQpLFxuICAvLyBgc2V0SW50ZXJ2YWxgIG1ldGhvZFxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS90aW1lcnMtYW5kLXVzZXItcHJvbXB0cy5odG1sI2RvbS1zZXRpbnRlcnZhbFxuICBzZXRJbnRlcnZhbDogd3JhcChnbG9iYWwuc2V0SW50ZXJ2YWwpXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0KTtcbiAgICB9O1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbi8vIGBJc0FycmF5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNhcnJheVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LWlzYXJyYXkgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSA8IDQgPyAxIDogbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIVN0cmluZyhTeW1ib2woKSkgfHxcbiAgICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgIVN5bWJvbC5zaGFtICYmIFY4X1ZFUlNJT04gJiYgVjhfVkVSU0lPTiA8IDQxO1xufSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpIHx8ICEoTkFUSVZFX1NZTUJPTCB8fCB0eXBlb2YgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID09ICdzdHJpbmcnKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgICB9XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXlzcGVjaWVzY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbEFycmF5LCBsZW5ndGgpIHtcbiAgdmFyIEM7XG4gIGlmIChpc0FycmF5KG9yaWdpbmFsQXJyYXkpKSB7XG4gICAgQyA9IG9yaWdpbmFsQXJyYXkuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGVsc2UgaWYgKGlzT2JqZWN0KEMpKSB7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmIChDID09PSBudWxsKSBDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gbmV3IChDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEMpKGxlbmd0aCA9PT0gMCA/IDAgOiBsZW5ndGgpO1xufTtcbiIsInZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcblxudmFyIHB1c2ggPSBbXS5wdXNoO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgZm9yRWFjaCwgbWFwLCBmaWx0ZXIsIHNvbWUsIGV2ZXJ5LCBmaW5kLCBmaW5kSW5kZXgsIGZpbHRlck91dCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBJU19GSUxURVJfT1VUID0gVFlQRSA9PSA3O1xuICB2YXIgTk9fSE9MRVMgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCwgc3BlY2lmaWNDcmVhdGUpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgc2VsZiA9IEluZGV4ZWRPYmplY3QoTyk7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrZm4sIHRoYXQsIDMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgY3JlYXRlID0gc3BlY2lmaWNDcmVhdGUgfHwgYXJyYXlTcGVjaWVzQ3JlYXRlO1xuICAgIHZhciB0YXJnZXQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgfHwgSVNfRklMVEVSX09VVCA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbHVlLCByZXN1bHQ7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWx1ZSA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gYm91bmRGdW5jdGlvbih2YWx1ZSwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgdGFyZ2V0W2luZGV4XSA9IHJlc3VsdDsgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCkgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWx1ZTsgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDQ6IHJldHVybiBmYWxzZTsgICAgICAgICAgICAgLy8gZXZlcnlcbiAgICAgICAgICBjYXNlIDc6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyT3V0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHRhcmdldDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4gIGZvckVhY2g6IGNyZWF0ZU1ldGhvZCgwKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbiAgbWFwOiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4gIGZpbHRlcjogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb21lXG4gIHNvbWU6IGNyZWF0ZU1ldGhvZCgzKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5ldmVyeWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmV2ZXJ5XG4gIGV2ZXJ5OiBjcmVhdGVNZXRob2QoNCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiAgZmluZDogY3JlYXRlTWV0aG9kKDUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRJbmRleFxuICBmaW5kSW5kZXg6IGNyZWF0ZU1ldGhvZCg2KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJPdXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1hcnJheS1maWx0ZXJpbmdcbiAgZmlsdGVyT3V0OiBjcmVhdGVNZXRob2QoNylcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSAhU1RSSUNUX01FVEhPRCA/IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG59IDogW10uZm9yRWFjaDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IHt9LnRvU3RyaW5nIDogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbn07XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZycpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbmlmICghVE9fU1RSSU5HX1RBR19TVVBQT1JUKSB7XG4gIHJlZGVmaW5lKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIHRvU3RyaW5nLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLWFycmF5LXByb3RvdHlwZS1pbmRleG9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IE5FR0FUSVZFX1pFUk8gfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvcixcbi8vIHNvIHdlIHVzZSBhbiBpbnRlcm1lZGlhdGUgZnVuY3Rpb24uXG5mdW5jdGlvbiBSRShzLCBmKSB7XG4gIHJldHVybiBSZWdFeHAocywgZik7XG59XG5cbmV4cG9ydHMuVU5TVVBQT1JURURfWSA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUkUoJ2EnLCAneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnYWJjZCcpICE9IG51bGw7XG59KTtcblxuZXhwb3J0cy5CUk9LRU5fQ0FSRVQgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTc3MzY4N1xuICB2YXIgcmUgPSBSRSgnXnInLCAnZ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ3N0cicpICE9IG51bGw7XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIHJlZ2V4cC9uby1hc3NlcnRpb24tY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAsIHJlZ2V4cC9uby1sYXp5LWVuZHMgLS0gdGVzdGluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVnZXhwL25vLXVzZWxlc3MtcXVhbnRpZmllciAtLSB0ZXN0aW5nICovXG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuL3JlZ2V4cC1mbGFncycpO1xudmFyIHN0aWNreUhlbHBlcnMgPSByZXF1aXJlKCcuL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xudmFyIG5hdGl2ZVJlcGxhY2UgPSBzaGFyZWQoJ25hdGl2ZS1zdHJpbmctcmVwbGFjZScsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG5cbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvO1xuICB2YXIgcmUyID0gL2IqL2c7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTEsICdhJyk7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTIsICdhJyk7XG4gIHJldHVybiByZTEubGFzdEluZGV4ICE9PSAwIHx8IHJlMi5sYXN0SW5kZXggIT09IDA7XG59KSgpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWSB8fCBzdGlja3lIZWxwZXJzLkJST0tFTl9DQVJFVDtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxudmFyIE5QQ0dfSU5DTFVERUQgPSAvKCk/Py8uZXhlYygnJylbMV0gIT09IHVuZGVmaW5lZDtcblxudmFyIFBBVENIID0gVVBEQVRFU19MQVNUX0lOREVYX1dST05HIHx8IE5QQ0dfSU5DTFVERUQgfHwgVU5TVVBQT1JURURfWTtcblxuaWYgKFBBVENIKSB7XG4gIHBhdGNoZWRFeGVjID0gZnVuY3Rpb24gZXhlYyhzdHIpIHtcbiAgICB2YXIgcmUgPSB0aGlzO1xuICAgIHZhciBsYXN0SW5kZXgsIHJlQ29weSwgbWF0Y2gsIGk7XG4gICAgdmFyIHN0aWNreSA9IFVOU1VQUE9SVEVEX1kgJiYgcmUuc3RpY2t5O1xuICAgIHZhciBmbGFncyA9IHJlZ2V4cEZsYWdzLmNhbGwocmUpO1xuICAgIHZhciBzb3VyY2UgPSByZS5zb3VyY2U7XG4gICAgdmFyIGNoYXJzQWRkZWQgPSAwO1xuICAgIHZhciBzdHJDb3B5ID0gc3RyO1xuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgZmxhZ3MgPSBmbGFncy5yZXBsYWNlKCd5JywgJycpO1xuICAgICAgaWYgKGZsYWdzLmluZGV4T2YoJ2cnKSA9PT0gLTEpIHtcbiAgICAgICAgZmxhZ3MgKz0gJ2cnO1xuICAgICAgfVxuXG4gICAgICBzdHJDb3B5ID0gU3RyaW5nKHN0cikuc2xpY2UocmUubGFzdEluZGV4KTtcbiAgICAgIC8vIFN1cHBvcnQgYW5jaG9yZWQgc3RpY2t5IGJlaGF2aW9yLlxuICAgICAgaWYgKHJlLmxhc3RJbmRleCA+IDAgJiYgKCFyZS5tdWx0aWxpbmUgfHwgcmUubXVsdGlsaW5lICYmIHN0cltyZS5sYXN0SW5kZXggLSAxXSAhPT0gJ1xcbicpKSB7XG4gICAgICAgIHNvdXJjZSA9ICcoPzogJyArIHNvdXJjZSArICcpJztcbiAgICAgICAgc3RyQ29weSA9ICcgJyArIHN0ckNvcHk7XG4gICAgICAgIGNoYXJzQWRkZWQrKztcbiAgICAgIH1cbiAgICAgIC8vIF4oPyArIHJ4ICsgKSBpcyBuZWVkZWQsIGluIGNvbWJpbmF0aW9uIHdpdGggc29tZSBzdHIgc2xpY2luZywgdG9cbiAgICAgIC8vIHNpbXVsYXRlIHRoZSAneScgZmxhZy5cbiAgICAgIHJlQ29weSA9IG5ldyBSZWdFeHAoJ14oPzonICsgc291cmNlICsgJyknLCBmbGFncyk7XG4gICAgfVxuXG4gICAgaWYgKE5QQ0dfSU5DTFVERUQpIHtcbiAgICAgIHJlQ29weSA9IG5ldyBSZWdFeHAoJ14nICsgc291cmNlICsgJyQoPyFcXFxccyknLCBmbGFncyk7XG4gICAgfVxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcpIGxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcblxuICAgIG1hdGNoID0gbmF0aXZlRXhlYy5jYWxsKHN0aWNreSA/IHJlQ29weSA6IHJlLCBzdHJDb3B5KTtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtYXRjaC5pbnB1dCA9IG1hdGNoLmlucHV0LnNsaWNlKGNoYXJzQWRkZWQpO1xuICAgICAgICBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKGNoYXJzQWRkZWQpO1xuICAgICAgICBtYXRjaC5pbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgICAgcmUubGFzdEluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIH0gZWxzZSByZS5sYXN0SW5kZXggPSAwO1xuICAgIH0gZWxzZSBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HICYmIG1hdGNoKSB7XG4gICAgICByZS5sYXN0SW5kZXggPSByZS5nbG9iYWwgPyBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCA6IGxhc3RJbmRleDtcbiAgICB9XG4gICAgaWYgKE5QQ0dfSU5DTFVERUQgJiYgbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGBcbiAgICAgIC8vIGZvciBOUENHLCBsaWtlIElFOC4gTk9URTogVGhpcyBkb2Vzbicgd29yayBmb3IgLyguPyk/L1xuICAgICAgbmF0aXZlUmVwbGFjZS5jYWxsKG1hdGNoWzBdLCByZUNvcHksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldID09PSB1bmRlZmluZWQpIG1hdGNoW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hlZEV4ZWM7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBleGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmV4ZWNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLmV4ZWNcbiQoeyB0YXJnZXQ6ICdSZWdFeHAnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAvLi8uZXhlYyAhPT0gZXhlYyB9LCB7XG4gIGV4ZWM6IGV4ZWNcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBtb3ZlZCB0byBlbnRyeSBwb2ludHNcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBSZWdFeHBQcm90b3R5cGUgPSBSZWdFeHAucHJvdG90eXBlO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyAjcmVwbGFjZSBuZWVkcyBidWlsdC1pbiBzdXBwb3J0IGZvciBuYW1lZCBncm91cHMuXG4gIC8vICNtYXRjaCB3b3JrcyBmaW5lIGJlY2F1c2UgaXQganVzdCByZXR1cm4gdGhlIGV4ZWMgcmVzdWx0cywgZXZlbiBpZiBpdCBoYXNcbiAgLy8gYSBcImdyb3BzXCIgcHJvcGVydHkuXG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG4vLyBJRSA8PSAxMSByZXBsYWNlcyAkMCB3aXRoIHRoZSB3aG9sZSBtYXRjaCwgYXMgaWYgaXQgd2FzICQmXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MDI0NjY2L2dldHRpbmctaWUtdG8tcmVwbGFjZS1hLXJlZ2V4LXdpdGgtdGhlLWxpdGVyYWwtc3RyaW5nLTBcbnZhciBSRVBMQUNFX0tFRVBTXyQwID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9wcmVmZXItZXNjYXBlLXJlcGxhY2VtZW50LWRvbGxhci1jaGFyIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiAnYScucmVwbGFjZSgvLi8sICckMCcpID09PSAnJDAnO1xufSkoKTtcblxudmFyIFJFUExBQ0UgPSB3ZWxsS25vd25TeW1ib2woJ3JlcGxhY2UnKTtcbi8vIFNhZmFyaSA8PSAxMy4wLjMoPykgc3Vic3RpdHV0ZXMgbnRoIGNhcHR1cmUgd2hlcmUgbj5tIHdpdGggYW4gZW1wdHkgc3RyaW5nXG52YXIgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPSAoZnVuY3Rpb24gKCkge1xuICBpZiAoLy4vW1JFUExBQ0VdKSB7XG4gICAgcmV0dXJuIC8uL1tSRVBMQUNFXSgnYScsICckMCcpID09PSAnJztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG4vLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbi8vIFdlZXggSlMgaGFzIGZyb3plbiBidWlsdC1pbiBwcm90b3R5cGVzLCBzbyB1c2UgdHJ5IC8gY2F0Y2ggd3JhcHBlclxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjLCBzaGFtKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcblxuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFdlIGNhbid0IHVzZSByZWFsIHJlZ2V4IGhlcmUgc2luY2UgaXQgY2F1c2VzIGRlb3B0aW1pemF0aW9uXG4gICAgICAvLyBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbiBpbiBWOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMwNlxuICAgICAgcmUgPSB7fTtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICAgIHJlLmZsYWdzID0gJyc7XG4gICAgICByZVtTWU1CT0xdID0gLy4vW1NZTUJPTF07XG4gICAgfVxuXG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIShcbiAgICAgIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTICYmXG4gICAgICBSRVBMQUNFX0tFRVBTXyQwICYmXG4gICAgICAhUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICApKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgdmFyICRleGVjID0gcmVnZXhwLmV4ZWM7XG4gICAgICBpZiAoJGV4ZWMgPT09IHJlZ2V4cEV4ZWMgfHwgJGV4ZWMgPT09IFJlZ0V4cFByb3RvdHlwZS5leGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0sIHtcbiAgICAgIFJFUExBQ0VfS0VFUFNfJDA6IFJFUExBQ0VfS0VFUFNfJDAsXG4gICAgICBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRTogUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICB9KTtcbiAgICB2YXIgc3RyaW5nTWV0aG9kID0gbWV0aG9kc1swXTtcbiAgICB2YXIgcmVnZXhNZXRob2QgPSBtZXRob2RzWzFdO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBzdHJpbmdNZXRob2QpO1xuICAgIHJlZGVmaW5lKFJlZ0V4cFByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJlZ2V4TWV0aG9kLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cblxuICBpZiAoc2hhbSkgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFJlZ0V4cFByb3RvdHlwZVtTWU1CT0xdLCAnc2hhbScsIHRydWUpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgY29kZVBvaW50QXQsIGF0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgcG9zKSB7XG4gICAgdmFyIFMgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBzaXplID0gUy5sZW5ndGg7XG4gICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBzaXplKSByZXR1cm4gQ09OVkVSVF9UT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBmaXJzdCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpKSA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkZcbiAgICAgICAgPyBDT05WRVJUX1RPX1NUUklORyA/IFMuY2hhckF0KHBvc2l0aW9uKSA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkcgPyBTLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpIDogKGZpcnN0IC0gMHhEODAwIDw8IDEwKSArIChzZWNvbmQgLSAweERDMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcblxuLy8gYEFkdmFuY2VTdHJpbmdJbmRleGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFkdmFuY2VzdHJpbmdpbmRleFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUywgaW5kZXgsIHVuaWNvZGUpIHtcbiAgcmV0dXJuIGluZGV4ICsgKHVuaWNvZGUgPyBjaGFyQXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9jbGFzc29mLXJhdycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKHR5cGVvZiBleGVjID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHJlc3VsdCA9IGV4ZWMuY2FsbChSLCBTKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVnRXhwIGV4ZWMgbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbiAgfVxuXG4gIHJldHVybiByZWdleHBFeGVjLmNhbGwoUiwgUyk7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG4vLyBAQG1hdGNoIGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygnbWF0Y2gnLCAxLCBmdW5jdGlvbiAoTUFUQ0gsIG5hdGl2ZU1hdGNoLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5tYXRjaGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLm1hdGNoXG4gICAgZnVuY3Rpb24gbWF0Y2gocmVnZXhwKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgbWF0Y2hlciA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbTUFUQ0hdO1xuICAgICAgcmV0dXJuIG1hdGNoZXIgIT09IHVuZGVmaW5lZCA/IG1hdGNoZXIuY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW01BVENIXShTdHJpbmcoTykpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQG1hdGNoXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShuYXRpdmVNYXRjaCwgcmVnZXhwLCB0aGlzKTtcbiAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcblxuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QocmVnZXhwKTtcbiAgICAgIHZhciBTID0gU3RyaW5nKHRoaXMpO1xuXG4gICAgICBpZiAoIXJ4Lmdsb2JhbCkgcmV0dXJuIHJlZ0V4cEV4ZWMocngsIFMpO1xuXG4gICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB2YXIgbiA9IDA7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgd2hpbGUgKChyZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKSkgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIEFbbl0gPSBtYXRjaFN0cjtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgICAgbisrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG4gPT09IDAgPyBudWxsIDogQTtcbiAgICB9XG4gIF07XG59KTtcbiIsIi8vIGl0ZXJhYmxlIERPTSBjb2xsZWN0aW9uc1xuLy8gZmxhZyAtIGBpdGVyYWJsZWAgaW50ZXJmYWNlIC0gJ2VudHJpZXMnLCAna2V5cycsICd2YWx1ZXMnLCAnZm9yRWFjaCcgbWV0aG9kc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIENTU1J1bGVMaXN0OiAwLFxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiAwLFxuICBDU1NWYWx1ZUxpc3Q6IDAsXG4gIENsaWVudFJlY3RMaXN0OiAwLFxuICBET01SZWN0TGlzdDogMCxcbiAgRE9NU3RyaW5nTGlzdDogMCxcbiAgRE9NVG9rZW5MaXN0OiAxLFxuICBEYXRhVHJhbnNmZXJJdGVtTGlzdDogMCxcbiAgRmlsZUxpc3Q6IDAsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiAwLFxuICBIVE1MQ29sbGVjdGlvbjogMCxcbiAgSFRNTEZvcm1FbGVtZW50OiAwLFxuICBIVE1MU2VsZWN0RWxlbWVudDogMCxcbiAgTWVkaWFMaXN0OiAwLFxuICBNaW1lVHlwZUFycmF5OiAwLFxuICBOYW1lZE5vZGVNYXA6IDAsXG4gIE5vZGVMaXN0OiAxLFxuICBQYWludFJlcXVlc3RMaXN0OiAwLFxuICBQbHVnaW46IDAsXG4gIFBsdWdpbkFycmF5OiAwLFxuICBTVkdMZW5ndGhMaXN0OiAwLFxuICBTVkdOdW1iZXJMaXN0OiAwLFxuICBTVkdQYXRoU2VnTGlzdDogMCxcbiAgU1ZHUG9pbnRMaXN0OiAwLFxuICBTVkdTdHJpbmdMaXN0OiAwLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiAwLFxuICBTb3VyY2VCdWZmZXJMaXN0OiAwLFxuICBTdHlsZVNoZWV0TGlzdDogMCxcbiAgVGV4dFRyYWNrQ3VlTGlzdDogMCxcbiAgVGV4dFRyYWNrTGlzdDogMCxcbiAgVG91Y2hMaXN0OiAwXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICAvLyBzb21lIENocm9tZSB2ZXJzaW9ucyBoYXZlIG5vbi1jb25maWd1cmFibGUgbWV0aG9kcyBvbiBET01Ub2tlbkxpc3RcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUgJiYgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoICE9PSBmb3JFYWNoKSB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCAnZm9yRWFjaCcsIGZvckVhY2gpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIENvbGxlY3Rpb25Qcm90b3R5cGUuZm9yRWFjaCA9IGZvckVhY2g7XG4gIH1cbn1cbiIsImNvbnN0IGpzVHlwZSA9IFtcIlN0cmluZ1wiLCBcIkFycmF5XCIsIFwiTnVtYmVyXCIsIFwiT2JqZWN0XCIsIFwiRGF0ZVwiLCBcIkJvb2xlYW5cIiwgXCJGdW5jdGlvblwiLCBcIlVuZGVmaW5lZFwiLCBcIk51bGxcIiwgXCJTeW1ib2xcIiwgXCJUeXBlZEFycmF5XCJdO1xuY29uc3QgVHlwZSA9IHt9O1xuanNUeXBlLmZvckVhY2goKHR5cGUpID0+IHtcbiAgVHlwZVtcImlzXCIgKyB0eXBlXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBcIiArIHR5cGUgKyBcIl1cIjtcbiAgfTtcbiAgdHlwZSA9PT0gXCJUeXBlZEFycmF5XCIgJiZcbiAgICAoVHlwZVtcImlzXCIgKyB0eXBlXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbiAgICAgICAgICAuY2FsbChvYmopXG4gICAgICAgICAgLm1hdGNoKC8oPzw9XFxzKS4qKD89XSkvKVxuICAgICAgICAgIC5pbmRleE9mKFwiQXJyYXlcIikgPT09IDBcbiAgICAgICk7XG4gICAgfSk7XG59KTtcblxuZnVuY3Rpb24gY2xvbmUoc291cmNlKSB7XG4gIGlmIChzb3VyY2UgPT09IG51bGwgfHwgdHlwZW9mIHNvdXJjZSAhPT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgbGV0IHJlc3VsdCA9IHNvdXJjZTtcbiAgaWYgKFR5cGUuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgcmVzdWx0ID0gW107XG4gICAgc291cmNlLmZvckVhY2goKGluZGV4LCBpdGVtKSA9PiB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gY2xvbmUoaXRlbSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKFR5cGUuaXNUeXBlZEFycmF5KHNvdXJjZSkpIHtcbiAgICByZXN1bHQgPSBbXTtcbiAgICBsZXQgQ3RvciA9IHNvdXJjZS5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoc291cmNlLmNvbnN0cnVjdG9yLmZyb20pIHtcbiAgICAgIHJlc3VsdCA9IEN0b3IuZnJvbShzb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBuZXcgQ3Rvcihzb3VyY2UubGVuZ3RoKTtcbiAgICAgIHNvdXJjZS5mb3JFYWNoKChpbmRleCwgaXRlbSkgPT4ge1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gY2xvbmUoaXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgaWYgKFR5cGUuaXNPYmplY3Qoc291cmNlKSkge1xuICAgIHJlc3VsdCA9IHt9O1xuICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICByZXN1bHRba2V5XSA9IGNsb25lKHNvdXJjZVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNvdXJjZSkge1xuICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG92ZXJ3cml0ZSkge1xuICBpZiAoIVR5cGUuaXNPYmplY3Qoc291cmNlKSB8fCAhVHlwZS5pc09iamVjdCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIG92ZXJ3cml0ZSA/IGNsb25lKHNvdXJjZSkgOiB0YXJnZXQ7XG4gIH1cbiAgZm9yIChsZXQga2V5IGluIHNvdXJjZSkge1xuICAgIGxldCB0YXJnZXRQcm9wID0gdGFyZ2V0W2tleV0sXG4gICAgICBzb3VyY2VQcm9wID0gc291cmNlW2tleV07XG4gICAgaWYgKChUeXBlLmlzT2JqZWN0KHRhcmdldFByb3ApICYmIFR5cGUuaXNPYmplY3Qoc291cmNlUHJvcCkpIHx8IChUeXBlLmlzQXJyYXkodGFyZ2V0UHJvcCkgJiYgVHlwZS5pc0FycmF5KHNvdXJjZVByb3ApKSkge1xuICAgICAgbWVyZ2UodGFyZ2V0UHJvcCwgc291cmNlUHJvcCwgb3ZlcndyaXRlKTtcbiAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZSB8fCAhKGtleSBpbiB0YXJnZXQpKSB7XG4gICAgICB0YXJnZXRba2V5XSA9IGNsb25lKHNvdXJjZVtrZXldLCB0cnVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IHsgZXh0ZW5kLCBtZXJnZSwgY2xvbmUsIFR5cGUgfTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBuYXRpdmVLZXlzKDEpOyB9KTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZBSUxTX09OX1BSSU1JVElWRVMgfSwge1xuICBrZXlzOiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXModG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG4iLCJjb25zdCBTVFJBVEVHWV9MSVNUID0ge1xuICBsaW5lYXI6IChwcm9ncmVzcykgPT4ge1xuICAgIHJldHVybiBwcm9ncmVzcztcbiAgfSxcbiAgZWFzZUluOiAocHJvZ3Jlc3MpID0+IHtcbiAgICByZXR1cm4gU1RSQVRFR1lfTElTVC5lYXNlSW5RdWFkKHByb2dyZXNzKTtcbiAgfSxcbiAgZWFzZUluUXVhZDogKHByb2dvcmVzcykgPT4ge1xuICAgIHJldHVybiBNYXRoLnBvdyhwcm9nb3Jlc3MsIDIpO1xuICB9LFxuICBlYXNlSW5DdWJpYzogKHByb2dyZXNzKSA9PiB7XG4gICAgcmV0dXJuIE1hdGgucG93KHByb2dyZXNzLCAzKTtcbiAgfSxcbiAgZWFzZUluUXVhcnQ6IChwcm9ncmVzcykgPT4ge1xuICAgIHJldHVybiBNYXRoLnBvdyhwcm9ncmVzcywgNCk7XG4gIH0sXG4gIGVhc2VJblF1aW50OiAocHJvZ3Jlc3MpID0+IHtcbiAgICByZXR1cm4gTWF0aC5wb3cocHJvZ3Jlc3MsIDUpO1xuICB9LFxuICBlYXNlT3V0OiAocHJvZ3Jlc3MpID0+IHtcbiAgICByZXR1cm4gU1RSQVRFR1lfTElTVC5lYXNlT3V0UXVhZChwcm9ncmVzcyk7XG4gIH0sXG4gIGVhc2VPdXRRdWFkOiAocHJvZ3Jlc3MpID0+IHtcbiAgICByZXR1cm4gcHJvZ3Jlc3MgKiAyIC0gTWF0aC5wb3cocHJvZ3Jlc3MsIDIpO1xuICB9LFxuICBlYXNlT3V0Q3ViaWM6IChwcm9ncmVzcykgPT4ge1xuICAgIHJldHVybiBNYXRoLnBvdyhwcm9ncmVzcyAtIDEsIDMpICsgMTtcbiAgfSxcbiAgZWFzZU91dFF1YXJ0OiAocHJvZ3Jlc3MpID0+IHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KHByb2dyZXNzIC0gMSwgNCk7XG4gIH0sXG4gIGVhc2VPdXRRdWludDogKHByb2dyZXNzKSA9PiB7XG4gICAgcmV0dXJuIE1hdGgucG93KHByb2dyZXNzIC0gMSwgNSkgKyAxO1xuICB9LFxufTtcbmNvbnN0IFNUUkFURUdZID0ge307XG5PYmplY3Qua2V5cyhTVFJBVEVHWV9MSVNUKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgU1RSQVRFR1lba2V5XSA9IGtleTtcbn0pO1xuZXhwb3J0IHsgU1RSQVRFR1lfTElTVCwgU1RSQVRFR1kgfTtcbiIsImltcG9ydCB7IG1lcmdlLCBUeXBlIH0gZnJvbSBcIi4uL3Rvb2xzL3V0aWxzXCI7XG5pbXBvcnQgeyBTVFJBVEVHWV9MSVNUIH0gZnJvbSBcIi4uL3N0cmF0ZWd5XCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBkZWxheTogMTcsXG4gIHJlc2V0OiAxLFxuICBkdXJhdGlvbjogMjAwMCxcbiAgcmFjZTogKHByb2dyZXNzLCByZXNldCkgPT4ge1xuICAgIHJldHVybiBwcm9ncmVzcyA8PSByZXNldDtcbiAgfSxcbiAgYmVnaW46ICgpID0+IHtjb25zb2xlLmxvZyhcImJlZ2luXCIpfSxcbiAgZW5kOiAoKSA9PiB7Y29uc29sZS5sb2coXCJlbmRcIil9LFxuICBzdHJhdGVneTogXCJsaW5lYXJcIixcbn07XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVByb2dyZXNzKCkge1xuICBsZXQgcmVzZXQgPSAxO1xuICByZXR1cm4gZnVuY3Rpb24gKHByb2dyZXNzLCBzdHJhdGVneSwgYWN0aW9uKSB7XG4gICAgbGV0IF9wcm9ncmVzcyA9IDA7XG4gICAgaWYgKHJlc2V0ICUgMiA9PT0gMCkge1xuICAgICAgX3Byb2dyZXNzID0gcHJvZ3Jlc3MgPj0gcmVzZXQgPyAocmVzZXQrKywgMCkgOiByZXNldCAtIHByb2dyZXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcHJvZ3Jlc3MgPSBwcm9ncmVzcyA+PSByZXNldCA/IChyZXNldCsrLCAxKSA6IHByb2dyZXNzIC0gKHJlc2V0IC0gMSk7XG4gICAgfVxuICAgIF9wcm9ncmVzcyA9IHN0cmF0ZWd5KF9wcm9ncmVzcyk7XG4gICAgYWN0aW9uKF9wcm9ncmVzcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGlvbldpdGhSYWYob3B0aW9ucykge1xuICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpLFxuICAgIGNhbGN1bGF0ZUNiID0gY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcbiAgY29uc3QgeyBkdXJhdGlvbiwgYWN0aW9uLCByYWNlLCBzdHJhdGVneSwgcmVzZXQgfSA9IG9wdGlvbnM7XG4gIGxldCBmbiA9ICgpID0+IHtcbiAgICBsZXQgcGFzc2VkID0gRGF0ZS5ub3coKSAtIHN0YXJ0LFxuICAgICAgcHJvZ3Jlc3MgPSBwYXNzZWQgLyBkdXJhdGlvbixcbiAgICAgIGlkID0gbnVsbDtcbiAgICBpZiAocmFjZShwcm9ncmVzcywgcmVzZXQpKSB7XG4gICAgICBjYWxjdWxhdGVDYihwcm9ncmVzcywgc3RyYXRlZ3ksIGFjdGlvbik7XG4gICAgICBpZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICAgIGNhbGN1bGF0ZUNiKHByb2dyZXNzLCBzdHJhdGVneSwgYWN0aW9uKTtcbiAgICAgIG9wdGlvbnMuZW5kKCk7XG4gICAgfVxuICB9O1xuICBmbigpO1xuICBvcHRpb25zLmJlZ2luKCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGlvbldpdGhJbnRlcnZhbChvcHRpb25zKSB7XG4gIGxldCBzdGFydCA9IERhdGUubm93KCksXG4gICAgY2FsY3VsYXRlQ2IgPSBjYWxjdWxhdGVQcm9ncmVzcygpO1xuICBjb25zdCB7IGRlbGF5LCBkdXJhdGlvbiwgYWN0aW9uLCByYWNlLCBzdHJhdGVneSwgcmVzZXQgfSA9IG9wdGlvbnM7XG4gIGxldCBpZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBsZXQgcGFzc2VkID0gRGF0ZS5ub3coKSAtIHN0YXJ0LFxuICAgICAgcHJvZ3Jlc3MgPSBwYXNzZWQgLyBkdXJhdGlvbjtcbiAgICBpZiAocmFjZShwcm9ncmVzcywgcmVzZXQpKSB7XG4gICAgICBjYWxjdWxhdGVDYihwcm9ncmVzcywgc3RyYXRlZ3ksIGFjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaWQpO1xuICAgICAgY2FsY3VsYXRlQ2IocHJvZ3Jlc3MsIHN0cmF0ZWd5LCBhY3Rpb24pO1xuICAgICAgb3B0aW9ucy5lbmQoKTtcbiAgICB9XG4gIH0sIGRlbGF5KTtcbiAgb3B0aW9ucy5iZWdpbigpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gbWVyZ2UoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIHRydWUpO1xuICBpZiAoIVR5cGUuaXNGdW5jdGlvbihvcHRpb25zLnN0cmF0ZWd5KSkge1xuICAgIG9wdGlvbnMuc3RyYXRlZ3kgPSBTVFJBVEVHWV9MSVNUW29wdGlvbnMuc3RyYXRlZ3ldO1xuICB9XG4gIGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgYW5pbWF0aW9uV2l0aFJhZihvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBhbmltYXRpb25XaXRoSW50ZXJ2YWwob3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkbWFwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLm1hcDtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnbWFwJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIH0sIHtcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiY2xhc3MgQ3NzUHJvcGVyIHtcbiAgY29uc3RydWN0b3IobWFwKSB7XG4gICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnByb3AgPSB0aGlzLm1hcC5wcm9wO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLm1hcC5zdGFydDtcbiAgICB0aGlzLmVuZCA9IHRoaXMubWFwLmVuZDtcbiAgICB0aGlzLmluaXRpYWwgPSB0aGlzLm1hcC5pbml0aWFsO1xuICB9XG4gIGdldFByb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJlZml4O1xuICB9XG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnByb3A7XG4gIH1cbiAgc2V0VmFsdWUoZWxlLCBwcm9ncmVzcykge1xuICAgIGxldCB2YWx1ZSA9ICh0aGlzLmVuZFZhbCAtIHRoaXMuc3RhcnRWYWwpICogcHJvZ3Jlc3MgKyB0aGlzLmluaXRpYWxWYWw7XG4gICAgZWxlLnN0eWxlW3RoaXMucHJvcF0gPSB2YWx1ZSArIHRoaXMuc3VmZml4O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDc3NQcm9wZXI7XG4iLCJpbXBvcnQgQ3NzUHJvcGVyIGZyb20gXCIuLi9jc3MtcHJvcGVyXCI7XG5jbGFzcyBEaW1lbnNpb25Dc3NQcm9wZXIgZXh0ZW5kcyBDc3NQcm9wZXIge1xuICBjb25zdHJ1Y3RvcihtYXApIHtcbiAgICBzdXBlcihtYXApO1xuICAgIHRoaXMuc2VsZkluaXQoKTtcbiAgfVxuICBzZWxmSW5pdCgpIHtcbiAgICBsZXQgc3RhcnRNYXRjaCA9IC8oLT9bXFxkLC5dKikoLiopJC8uZXhlYyh0aGlzLnN0YXJ0KSxcbiAgICAgIGVuZE1hdGNoID0gLygtP1tcXGQsLl0qKSguKikkLy5leGVjKHRoaXMuZW5kKSxcbiAgICAgIGluaXRpYWxNYXRjaCA9IC8oLT9bXFxkLC5dKikoLiopJC8uZXhlYyh0aGlzLmluaXRpYWwpO1xuICAgIHRoaXMuc3VmZml4ID0gc3RhcnRNYXRjaFsyXSB8fCBcInB4XCI7XG4gICAgdGhpcy5zdGFydFZhbCA9IHN0YXJ0TWF0Y2hbMV07XG4gICAgdGhpcy5lbmRWYWwgPSBlbmRNYXRjaFsxXTtcbiAgICB0aGlzLmluaXRpYWxWYWwgPSBpbml0aWFsTWF0Y2hbMV0gKiAxO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBEaW1lbnNpb25Dc3NQcm9wZXI7XG4iLCJpbXBvcnQgeyBtZXJnZSB9IGZyb20gXCIuLi90b29scy91dGlsc1wiO1xuaW1wb3J0IERpbWVuc2lvbkNzc1Byb3BlciBmcm9tIFwiLi9kaW1lbnNpb25cIjtcblxuY2xhc3MgT3BlcmF0ZUNzc1Byb3BlciB7XG4gIGNvbnN0cnVjdG9yKGZyb21Qcm9wZXIsIHRvUHJvcGVyLCBlbCkge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICBbZnJvbVByb3BlciwgdG9Qcm9wZXJdID0gdGhpcy5tZXJnZVByb3BlckJldHdlZW5Gcm9tQW5kVG8oZnJvbVByb3BlciwgdG9Qcm9wZXIpO1xuICAgIHRoaXMuaW5pdChmcm9tUHJvcGVyLCB0b1Byb3Blcik7XG4gIH1cbiAgaW5pdChmcm9tUHJvcGVyLCB0b1Byb3Blcikge1xuICAgIHRoaXMucHJvcGVyTGlzdCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGZyb21Qcm9wZXIpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGxldCBwcm9wZXIgPSB7XG4gICAgICAgIHByb3A6IHByb3AsXG4gICAgICAgIGluaXRpYWw6IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwpW3Byb3BdLFxuICAgICAgICBzdGFydDogZnJvbVByb3Blcltwcm9wXSxcbiAgICAgICAgZW5kOiB0b1Byb3Blcltwcm9wXSxcbiAgICAgIH07XG4gICAgICB0aGlzLnByb3Blckxpc3QucHVzaChuZXcgRGltZW5zaW9uQ3NzUHJvcGVyKHByb3BlcikpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlcmF0ZShlbGUsIHByb2dyZXNzKSB7XG4gICAgdGhpcy5wcm9wZXJMaXN0LmZvckVhY2goKHByb3BlcikgPT4ge1xuICAgICAgcHJvcGVyLnNldFZhbHVlKGVsZSwgcHJvZ3Jlc3MpO1xuICAgIH0pO1xuICB9XG4gIG1lcmdlUHJvcGVyQmV0d2VlbkZyb21BbmRUbyhmcm9tUHJvcGVyLCB0b1Byb3Blcikge1xuICAgIE9iamVjdC5rZXlzKHRvUHJvcGVyKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICBpZiAoIWZyb21Qcm9wZXJbcHJvcF0pIHtcbiAgICAgICAgZnJvbVByb3Blcltwcm9wXSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwpW3Byb3BdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRvUHJvcGVyID0gbWVyZ2UodG9Qcm9wZXIsIGZyb21Qcm9wZXIsIGZhbHNlKTtcbiAgICByZXR1cm4gW2Zyb21Qcm9wZXIsIHRvUHJvcGVyXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPcGVyYXRlQ3NzUHJvcGVyO1xuIiwiaW1wb3J0IE9wZXJhdGVDc3NQcm9wZXIgZnJvbSBcIi4uL2Nzcy9vcGVyYXRlLWNzcy1wcm9wZXJcIjtcblxuY29uc3QgYWN0aW9uID0ge1xuICBmcm9tVG86IChlbCwgZnJvbSwgdG8pID0+IHtcbiAgICBsZXQgb3BlcmF0b3IgPSBuZXcgT3BlcmF0ZUNzc1Byb3Blcihmcm9tLCB0bywgZWwpO1xuICAgIHJldHVybiBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgIG9wZXJhdG9yLm9wZXJhdGUoZWwsIHByb2dyZXNzKTtcbiAgICB9O1xuICB9LFxuICB0bzogKGVsLCB0bykgPT4ge1xuICAgIGxldCBvcGVyYXRvciA9IG5ldyBPcGVyYXRlQ3NzUHJvcGVyKHt9LCB0bywgZWwpO1xuICAgIHJldHVybiBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgIG9wZXJhdG9yLm9wZXJhdGUoZWwsIHByb2dyZXNzKTtcbiAgICB9O1xuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGFjdGlvbjtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJmYWlscyIsInJlcXVpcmUkJDAiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IiLCJ0b1N0cmluZyIsImNsYXNzb2ZSYXciLCJjbGFzc29mIiwicmVxdWlyZSQkMSIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJJbmRleGVkT2JqZWN0IiwidG9JbmRleGVkT2JqZWN0IiwiaXNPYmplY3QiLCJ0b1ByaW1pdGl2ZSIsInRvT2JqZWN0IiwiaGFzIiwiREVTQ1JJUFRPUlMiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDQiLCJyZXF1aXJlJCQ1IiwiSUU4X0RPTV9ERUZJTkUiLCJyZXF1aXJlJCQ2IiwiYW5PYmplY3QiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsImNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSIsInNldEdsb2JhbCIsInN0b3JlIiwiaW5zcGVjdFNvdXJjZSIsIldlYWtNYXAiLCJzaGFyZWRNb2R1bGUiLCJ1aWQiLCJzaGFyZWQiLCJzaGFyZWRLZXkiLCJoaWRkZW5LZXlzIiwicmVxdWlyZSQkNyIsInJlZGVmaW5lTW9kdWxlIiwicGF0aCIsImFGdW5jdGlvbiIsImdldEJ1aWx0SW4iLCJ0b0ludGVnZXIiLCJtaW4iLCJ0b0xlbmd0aCIsInRvQWJzb2x1dGVJbmRleCIsImNyZWF0ZU1ldGhvZCIsImVudW1CdWdLZXlzIiwiaW50ZXJuYWxPYmplY3RLZXlzIiwib3duS2V5cyIsImNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMiLCJpc0ZvcmNlZCIsInJlZGVmaW5lIiwiJCIsInVzZXJBZ2VudCIsImlzQXJyYXkiLCJWOF9WRVJTSU9OIiwiTkFUSVZFX1NZTUJPTCIsIlN5bWJvbCIsIndlbGxLbm93blN5bWJvbCIsIlNQRUNJRVMiLCJhcnJheVNwZWNpZXNDcmVhdGUiLCJhcnJheU1ldGhvZElzU3RyaWN0IiwiU1RSSUNUX01FVEhPRCIsImZvckVhY2giLCJUT19TVFJJTkdfVEFHIiwiVE9fU1RSSU5HX1RBR19TVVBQT1JUIiwicmVnZXhwRmxhZ3MiLCJyZWdleHBFeGVjIiwiYWR2YW5jZVN0cmluZ0luZGV4IiwianNUeXBlIiwiVHlwZSIsInR5cGUiLCJvYmoiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwibWF0Y2giLCJpbmRleE9mIiwiY2xvbmUiLCJzb3VyY2UiLCJyZXN1bHQiLCJpbmRleCIsIml0ZW0iLCJpc1R5cGVkQXJyYXkiLCJDdG9yIiwiY29uc3RydWN0b3IiLCJmcm9tIiwibGVuZ3RoIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJtZXJnZSIsInRhcmdldCIsIm92ZXJ3cml0ZSIsInRhcmdldFByb3AiLCJzb3VyY2VQcm9wIiwiU1RSQVRFR1lfTElTVCIsImxpbmVhciIsInByb2dyZXNzIiwiZWFzZUluIiwiZWFzZUluUXVhZCIsInByb2dvcmVzcyIsIk1hdGgiLCJwb3ciLCJlYXNlSW5DdWJpYyIsImVhc2VJblF1YXJ0IiwiZWFzZUluUXVpbnQiLCJlYXNlT3V0IiwiZWFzZU91dFF1YWQiLCJlYXNlT3V0Q3ViaWMiLCJlYXNlT3V0UXVhcnQiLCJlYXNlT3V0UXVpbnQiLCJTVFJBVEVHWSIsImtleXMiLCJkZWZhdWx0T3B0aW9ucyIsImRlbGF5IiwicmVzZXQiLCJkdXJhdGlvbiIsInJhY2UiLCJiZWdpbiIsImNvbnNvbGUiLCJsb2ciLCJlbmQiLCJzdHJhdGVneSIsImNhbGN1bGF0ZVByb2dyZXNzIiwiYWN0aW9uIiwiX3Byb2dyZXNzIiwiYW5pbWF0aW9uV2l0aFJhZiIsIm9wdGlvbnMiLCJzdGFydCIsIkRhdGUiLCJub3ciLCJjYWxjdWxhdGVDYiIsImZuIiwicGFzc2VkIiwiaWQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImFuaW1hdGlvbldpdGhJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImFuaW1hdGlvbiIsImlzRnVuY3Rpb24iLCJ3aW5kb3ciLCJhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0IiwiQ3NzUHJvcGVyIiwibWFwIiwiaW5pdCIsInByb3AiLCJpbml0aWFsIiwicHJlZml4IiwiZWxlIiwidmFsdWUiLCJlbmRWYWwiLCJzdGFydFZhbCIsImluaXRpYWxWYWwiLCJzdHlsZSIsInN1ZmZpeCIsIkRpbWVuc2lvbkNzc1Byb3BlciIsInNlbGZJbml0Iiwic3RhcnRNYXRjaCIsImV4ZWMiLCJlbmRNYXRjaCIsImluaXRpYWxNYXRjaCIsIk9wZXJhdGVDc3NQcm9wZXIiLCJmcm9tUHJvcGVyIiwidG9Qcm9wZXIiLCJlbCIsIm1lcmdlUHJvcGVyQmV0d2VlbkZyb21BbmRUbyIsInByb3Blckxpc3QiLCJwcm9wZXIiLCJnZXRDb21wdXRlZFN0eWxlIiwicHVzaCIsInNldFZhbHVlIiwiZnJvbVRvIiwidG8iLCJvcGVyYXRvciIsIm9wZXJhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0NBQUEsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDMUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Q0FDckMsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQTtLQUNBQSxRQUFjO0NBQ2Q7Q0FDQSxFQUFFLEtBQUssQ0FBQyxPQUFPLFVBQVUsSUFBSSxRQUFRLElBQUksVUFBVSxDQUFDO0NBQ3BELEVBQUUsS0FBSyxDQUFDLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUM7Q0FDNUM7Q0FDQSxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDO0NBQ3hDLEVBQUUsS0FBSyxDQUFDLE9BQU9BLGNBQU0sSUFBSSxRQUFRLElBQUlBLGNBQU0sQ0FBQztDQUM1QztDQUNBLEVBQUUsQ0FBQyxZQUFZLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFOzs7O0tDYi9EQyxPQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDakMsRUFBRSxJQUFJO0NBQ04sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUNwQixHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSSxPQUFPLElBQUksQ0FBQztDQUNoQixHQUFHO0NBQ0gsQ0FBQzs7Q0NORCxJQUFJQSxPQUFLLEdBQUdDLE9BQTZCLENBQUM7QUFDMUM7Q0FDQTtLQUNBLFdBQWMsR0FBRyxDQUFDRCxPQUFLLENBQUMsWUFBWTtDQUNwQztDQUNBLEVBQUUsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2xGLENBQUMsQ0FBQzs7OztDQ0xGLElBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0NBQ3BEO0NBQ0EsSUFBSUUsMEJBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0FBQy9EO0NBQ0E7Q0FDQSxJQUFJLFdBQVcsR0FBR0EsMEJBQXdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkY7Q0FDQTtDQUNBOzZCQUNTLEdBQUcsV0FBVyxHQUFHLFNBQVMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFO0NBQzNELEVBQUUsSUFBSSxVQUFVLEdBQUdBLDBCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNyRCxFQUFFLE9BQU8sQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDO0NBQy9DLENBQUMsR0FBRzs7S0NiSkMsMEJBQWMsR0FBRyxVQUFVLE1BQU0sRUFBRSxLQUFLLEVBQUU7Q0FDMUMsRUFBRSxPQUFPO0NBQ1QsSUFBSSxVQUFVLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQzdCLElBQUksWUFBWSxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUMvQixJQUFJLFFBQVEsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDM0IsSUFBSSxLQUFLLEVBQUUsS0FBSztDQUNoQixHQUFHLENBQUM7Q0FDSixDQUFDOztDQ1BELElBQUlDLFVBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQzNCO0tBQ0FDLFlBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU9ELFVBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hDLENBQUM7O0NDSkQsSUFBSUosT0FBSyxHQUFHQyxPQUE2QixDQUFDO0NBQzFDLElBQUlLLFNBQU8sR0FBR0MsWUFBbUMsQ0FBQztBQUNsRDtDQUNBLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDckI7Q0FDQTtLQUNBLGFBQWMsR0FBR1AsT0FBSyxDQUFDLFlBQVk7Q0FDbkM7Q0FDQTtDQUNBLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNuQixFQUFFLE9BQU9NLFNBQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ25FLENBQUMsR0FBRyxNQUFNOztDQ1pWO0NBQ0E7S0FDQUUsd0JBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLElBQUksRUFBRSxJQUFJLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUMsQ0FBQztDQUNyRSxFQUFFLE9BQU8sRUFBRSxDQUFDO0NBQ1osQ0FBQzs7Q0NMRDtDQUNBLElBQUlDLGVBQWEsR0FBR1IsYUFBc0MsQ0FBQztDQUMzRCxJQUFJTyx3QkFBc0IsR0FBR0Qsd0JBQWdELENBQUM7QUFDOUU7S0FDQUcsaUJBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU9ELGVBQWEsQ0FBQ0Qsd0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNuRCxDQUFDOztLQ05ERyxVQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxPQUFPLE9BQU8sRUFBRSxLQUFLLFFBQVEsR0FBRyxFQUFFLEtBQUssSUFBSSxHQUFHLE9BQU8sRUFBRSxLQUFLLFVBQVUsQ0FBQztDQUN6RSxDQUFDOztDQ0ZELElBQUlBLFVBQVEsR0FBR1YsVUFBaUMsQ0FBQztBQUNqRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0tBQ0FXLGFBQWMsR0FBRyxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsRUFBRTtDQUNwRCxFQUFFLElBQUksQ0FBQ0QsVUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDO0NBQ2QsRUFBRSxJQUFJLGdCQUFnQixJQUFJLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQ0EsVUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUM7Q0FDcEgsRUFBRSxJQUFJLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQ0EsVUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUM7Q0FDL0YsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLElBQUksUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDQSxVQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQztDQUNySCxFQUFFLE1BQU0sU0FBUyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7Q0FDN0QsQ0FBQzs7Q0NiRCxJQUFJSCx3QkFBc0IsR0FBR1Asd0JBQWdELENBQUM7QUFDOUU7Q0FDQTtDQUNBO0tBQ0FZLFVBQWMsR0FBRyxVQUFVLFFBQVEsRUFBRTtDQUNyQyxFQUFFLE9BQU8sTUFBTSxDQUFDTCx3QkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0NBQ2xELENBQUM7O0NDTkQsSUFBSUssVUFBUSxHQUFHWixVQUFpQyxDQUFDO0FBQ2pEO0NBQ0EsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztBQUN2QztLQUNBYSxLQUFjLEdBQUcsU0FBUyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTtDQUMxQyxFQUFFLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQ0QsVUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ2hELENBQUM7O0NDTkQsSUFBSWQsUUFBTSxHQUFHRSxRQUE4QixDQUFDO0NBQzVDLElBQUlVLFVBQVEsR0FBR0osVUFBaUMsQ0FBQztBQUNqRDtDQUNBLElBQUksUUFBUSxHQUFHUixRQUFNLENBQUMsUUFBUSxDQUFDO0NBQy9CO0NBQ0EsSUFBSSxNQUFNLEdBQUdZLFVBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSUEsVUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNwRTtLQUNBLHFCQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxPQUFPLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNsRCxDQUFDOztDQ1RELElBQUlJLGFBQVcsR0FBR2QsV0FBbUMsQ0FBQztDQUN0RCxJQUFJRCxPQUFLLEdBQUdPLE9BQTZCLENBQUM7Q0FDMUMsSUFBSSxhQUFhLEdBQUdTLHFCQUErQyxDQUFDO0FBQ3BFO0NBQ0E7S0FDQSxZQUFjLEdBQUcsQ0FBQ0QsYUFBVyxJQUFJLENBQUNmLE9BQUssQ0FBQyxZQUFZO0NBQ3BEO0NBQ0EsRUFBRSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRTtDQUMxRCxJQUFJLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRTtDQUNsQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ1osQ0FBQyxDQUFDOztDQ1ZGLElBQUllLGFBQVcsR0FBR2QsV0FBbUMsQ0FBQztDQUN0RCxJQUFJLDBCQUEwQixHQUFHTSwwQkFBcUQsQ0FBQztDQUN2RixJQUFJSiwwQkFBd0IsR0FBR2EsMEJBQWtELENBQUM7Q0FDbEYsSUFBSU4saUJBQWUsR0FBR08saUJBQXlDLENBQUM7Q0FDaEUsSUFBSUwsYUFBVyxHQUFHTSxhQUFvQyxDQUFDO0NBQ3ZELElBQUlKLEtBQUcsR0FBR0ssS0FBMkIsQ0FBQztDQUN0QyxJQUFJQyxnQkFBYyxHQUFHQyxZQUFzQyxDQUFDO0FBQzVEO0NBQ0E7Q0FDQSxJQUFJLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztBQUNoRTtDQUNBO0NBQ0E7aUNBQ1MsR0FBR04sYUFBVyxHQUFHLHlCQUF5QixHQUFHLFNBQVMsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUM5RixFQUFFLENBQUMsR0FBR0wsaUJBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6QixFQUFFLENBQUMsR0FBR0UsYUFBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMzQixFQUFFLElBQUlRLGdCQUFjLEVBQUUsSUFBSTtDQUMxQixJQUFJLE9BQU8seUJBQXlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzNDLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxlQUFlO0NBQ2pDLEVBQUUsSUFBSU4sS0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPWCwwQkFBd0IsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pHOzs7O0NDcEJBLElBQUlRLFVBQVEsR0FBR1YsVUFBaUMsQ0FBQztBQUNqRDtLQUNBcUIsVUFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxDQUFDWCxVQUFRLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDckIsSUFBSSxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztDQUN0RCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDZCxDQUFDOztDQ05ELElBQUlJLGFBQVcsR0FBR2QsV0FBbUMsQ0FBQztDQUN0RCxJQUFJLGNBQWMsR0FBR00sWUFBc0MsQ0FBQztDQUM1RCxJQUFJZSxVQUFRLEdBQUdOLFVBQWlDLENBQUM7Q0FDakQsSUFBSSxXQUFXLEdBQUdDLGFBQW9DLENBQUM7QUFDdkQ7Q0FDQTtDQUNBLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDNUM7Q0FDQTtDQUNBO3VCQUNTLEdBQUdGLGFBQVcsR0FBRyxlQUFlLEdBQUcsU0FBUyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUU7Q0FDdEYsRUFBRU8sVUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2QsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMzQixFQUFFQSxVQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDdkIsRUFBRSxJQUFJLGNBQWMsRUFBRSxJQUFJO0NBQzFCLElBQUksT0FBTyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM3QyxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUUsZUFBZTtDQUNqQyxFQUFFLElBQUksS0FBSyxJQUFJLFVBQVUsSUFBSSxLQUFLLElBQUksVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Q0FDN0YsRUFBRSxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7Q0FDckQsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNYOztDQ3BCQSxJQUFJLFdBQVcsR0FBR3JCLFdBQW1DLENBQUM7Q0FDdEQsSUFBSXNCLHNCQUFvQixHQUFHaEIsb0JBQThDLENBQUM7Q0FDMUUsSUFBSSx3QkFBd0IsR0FBR1MsMEJBQWtELENBQUM7QUFDbEY7S0FDQVEsNkJBQWMsR0FBRyxXQUFXLEdBQUcsVUFBVSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUM3RCxFQUFFLE9BQU9ELHNCQUFvQixDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2pGLENBQUMsR0FBRyxVQUFVLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0NBQ2xDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUN0QixFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUM7Ozs7Q0NURCxJQUFJeEIsUUFBTSxHQUFHRSxRQUE4QixDQUFDO0NBQzVDLElBQUl1Qiw2QkFBMkIsR0FBR2pCLDZCQUFzRCxDQUFDO0FBQ3pGO0tBQ0FrQixXQUFjLEdBQUcsVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFO0NBQ3ZDLEVBQUUsSUFBSTtDQUNOLElBQUlELDZCQUEyQixDQUFDekIsUUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNwRCxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSUEsUUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUN4QixHQUFHLENBQUMsT0FBTyxLQUFLLENBQUM7Q0FDakIsQ0FBQzs7Q0NURCxJQUFJQSxRQUFNLEdBQUdFLFFBQThCLENBQUM7Q0FDNUMsSUFBSXdCLFdBQVMsR0FBR2xCLFdBQWtDLENBQUM7QUFDbkQ7Q0FDQSxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztDQUNsQyxJQUFJbUIsT0FBSyxHQUFHM0IsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJMEIsV0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRDtLQUNBLFdBQWMsR0FBR0MsT0FBSzs7Q0NOdEIsSUFBSUEsT0FBSyxHQUFHekIsV0FBb0MsQ0FBQztBQUNqRDtDQUNBLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUN6QztDQUNBO0NBQ0EsSUFBSSxPQUFPeUIsT0FBSyxDQUFDLGFBQWEsSUFBSSxVQUFVLEVBQUU7Q0FDOUMsRUFBRUEsT0FBSyxDQUFDLGFBQWEsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUN0QyxJQUFJLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3JDLEdBQUcsQ0FBQztDQUNKLENBQUM7QUFDRDtLQUNBQyxlQUFjLEdBQUdELE9BQUssQ0FBQyxhQUFhOztDQ1hwQyxJQUFJM0IsUUFBTSxHQUFHRSxRQUE4QixDQUFDO0NBQzVDLElBQUkwQixlQUFhLEdBQUdwQixlQUFzQyxDQUFDO0FBQzNEO0NBQ0EsSUFBSXFCLFNBQU8sR0FBRzdCLFFBQU0sQ0FBQyxPQUFPLENBQUM7QUFDN0I7S0FDQSxhQUFjLEdBQUcsT0FBTzZCLFNBQU8sS0FBSyxVQUFVLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQ0QsZUFBYSxDQUFDQyxTQUFPLENBQUMsQ0FBQzs7OztDQ0o1RixJQUFJRixPQUFLLEdBQUduQixXQUFvQyxDQUFDO0FBQ2pEO0NBQ0EsQ0FBQ3NCLGdCQUFjLEdBQUcsVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFO0NBQ3hDLEVBQUUsT0FBT0gsT0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLQSxPQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxLQUFLLFNBQVMsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDdkUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Q0FDeEIsRUFBRSxPQUFPLEVBQUUsUUFBUTtDQUNuQixFQUFFLElBQUksRUFBcUIsUUFBUTtDQUNuQyxFQUFFLFNBQVMsRUFBRSxzQ0FBc0M7Q0FDbkQsQ0FBQyxDQUFDOztDQ1RGLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNYLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QjtLQUNBSSxLQUFjLEdBQUcsVUFBVSxHQUFHLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxLQUFLLFNBQVMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNqRyxDQUFDOztDQ0xELElBQUlDLFFBQU0sR0FBRzlCLGdCQUE4QixDQUFDO0NBQzVDLElBQUk2QixLQUFHLEdBQUd2QixLQUEyQixDQUFDO0FBQ3RDO0NBQ0EsSUFBSSxJQUFJLEdBQUd3QixRQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUI7S0FDQUMsV0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFO0NBQ2hDLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHRixLQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM3QyxDQUFDOztLQ1BERyxZQUFjLEdBQUcsRUFBRTs7Q0NBbkIsSUFBSSxlQUFlLEdBQUdoQyxhQUF1QyxDQUFDO0NBQzlELElBQUlGLFFBQU0sR0FBR1EsUUFBOEIsQ0FBQztDQUM1QyxJQUFJSSxVQUFRLEdBQUdLLFVBQWlDLENBQUM7Q0FDakQsSUFBSVEsNkJBQTJCLEdBQUdQLDZCQUFzRCxDQUFDO0NBQ3pGLElBQUksU0FBUyxHQUFHQyxLQUEyQixDQUFDO0NBQzVDLElBQUlhLFFBQU0sR0FBR1osV0FBb0MsQ0FBQztDQUNsRCxJQUFJLFNBQVMsR0FBR0UsV0FBa0MsQ0FBQztDQUNuRCxJQUFJWSxZQUFVLEdBQUdDLFlBQW1DLENBQUM7QUFDckQ7Q0FDQSxJQUFJLDBCQUEwQixHQUFHLDRCQUE0QixDQUFDO0NBQzlELElBQUksT0FBTyxHQUFHbkMsUUFBTSxDQUFDLE9BQU8sQ0FBQztDQUM3QixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUVlLEtBQUcsQ0FBQztBQUNsQjtDQUNBLElBQUksT0FBTyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQzVCLEVBQUUsT0FBT0EsS0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3pDLENBQUMsQ0FBQztBQUNGO0NBQ0EsSUFBSSxTQUFTLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLFVBQVUsRUFBRSxFQUFFO0NBQ3ZCLElBQUksSUFBSSxLQUFLLENBQUM7Q0FDZCxJQUFJLElBQUksQ0FBQ0gsVUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEtBQUssSUFBSSxFQUFFO0NBQzFELE1BQU0sTUFBTSxTQUFTLENBQUMseUJBQXlCLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDO0NBQ3RFLEtBQUssQ0FBQyxPQUFPLEtBQUssQ0FBQztDQUNuQixHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7QUFDRjtDQUNBLElBQUksZUFBZSxJQUFJb0IsUUFBTSxDQUFDLEtBQUssRUFBRTtDQUNyQyxFQUFFLElBQUksS0FBSyxHQUFHQSxRQUFNLENBQUMsS0FBSyxLQUFLQSxRQUFNLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztDQUM3RCxFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Q0FDeEIsRUFBRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO0NBQ3hCLEVBQUUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztDQUN4QixFQUFFLEdBQUcsR0FBRyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUU7Q0FDaEMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztDQUMvRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3pCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3BDLElBQUksT0FBTyxRQUFRLENBQUM7Q0FDcEIsR0FBRyxDQUFDO0NBQ0osRUFBRSxHQUFHLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDdEIsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUN2QyxHQUFHLENBQUM7Q0FDSixFQUFFakIsS0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3RCLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNqQyxHQUFHLENBQUM7Q0FDSixDQUFDLE1BQU07Q0FDUCxFQUFFLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNqQyxFQUFFbUIsWUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztDQUMzQixFQUFFLEdBQUcsR0FBRyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUU7Q0FDaEMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0NBQzlFLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDekIsSUFBSVQsNkJBQTJCLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNyRCxJQUFJLE9BQU8sUUFBUSxDQUFDO0NBQ3BCLEdBQUcsQ0FBQztDQUNKLEVBQUUsR0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3RCLElBQUksT0FBTyxTQUFTLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDakQsR0FBRyxDQUFDO0NBQ0osRUFBRVYsS0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3RCLElBQUksT0FBTyxTQUFTLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLEdBQUcsQ0FBQztDQUNKLENBQUM7QUFDRDtLQUNBLGFBQWMsR0FBRztDQUNqQixFQUFFLEdBQUcsRUFBRSxHQUFHO0NBQ1YsRUFBRSxHQUFHLEVBQUUsR0FBRztDQUNWLEVBQUUsR0FBRyxFQUFFQSxLQUFHO0NBQ1YsRUFBRSxPQUFPLEVBQUUsT0FBTztDQUNsQixFQUFFLFNBQVMsRUFBRSxTQUFTO0NBQ3RCLENBQUM7O0NDbEVELElBQUlmLFFBQU0sR0FBR0UsUUFBOEIsQ0FBQztDQUM1QyxJQUFJdUIsNkJBQTJCLEdBQUdqQiw2QkFBc0QsQ0FBQztDQUN6RixJQUFJTyxLQUFHLEdBQUdFLEtBQTJCLENBQUM7Q0FDdEMsSUFBSVMsV0FBUyxHQUFHUixXQUFrQyxDQUFDO0NBQ25ELElBQUksYUFBYSxHQUFHQyxlQUFzQyxDQUFDO0NBQzNELElBQUksbUJBQW1CLEdBQUdDLGFBQXNDLENBQUM7QUFDakU7Q0FDQSxJQUFJLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztDQUMvQyxJQUFJLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztDQUN2RCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDO0NBQ0EsQ0FBQ2dCLGtCQUFjLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7Q0FDcEQsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0NBQ2xELEVBQUUsSUFBSSxNQUFNLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztDQUN0RCxFQUFFLElBQUksV0FBVyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Q0FDNUQsRUFBRSxJQUFJLEtBQUssQ0FBQztDQUNaLEVBQUUsSUFBSSxPQUFPLEtBQUssSUFBSSxVQUFVLEVBQUU7Q0FDbEMsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsSUFBSSxDQUFDckIsS0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRTtDQUN2RCxNQUFNVSw2QkFBMkIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3RELEtBQUs7Q0FDTCxJQUFJLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN4QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO0NBQ3ZCLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDdEUsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLElBQUksQ0FBQyxLQUFLekIsUUFBTSxFQUFFO0NBQ3BCLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUMvQixTQUFTMEIsV0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMvQixJQUFJLE9BQU87Q0FDWCxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRTtDQUN0QixJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtDQUNyQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7Q0FDbEIsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUM3QixPQUFPRCw2QkFBMkIsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2xEO0NBQ0EsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsUUFBUSxHQUFHO0NBQ3ZELEVBQUUsT0FBTyxPQUFPLElBQUksSUFBSSxVQUFVLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzRixDQUFDLENBQUM7O0NDdkNGLElBQUl6QixRQUFNLEdBQUdFLFFBQThCLENBQUM7QUFDNUM7S0FDQW1DLE1BQWMsR0FBR3JDLFFBQU07O0NDRnZCLElBQUksSUFBSSxHQUFHRSxNQUE0QixDQUFDO0NBQ3hDLElBQUlGLFFBQU0sR0FBR1EsUUFBOEIsQ0FBQztBQUM1QztDQUNBLElBQUk4QixXQUFTLEdBQUcsVUFBVSxRQUFRLEVBQUU7Q0FDcEMsRUFBRSxPQUFPLE9BQU8sUUFBUSxJQUFJLFVBQVUsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO0NBQzlELENBQUMsQ0FBQztBQUNGO0tBQ0FDLFlBQWMsR0FBRyxVQUFVLFNBQVMsRUFBRSxNQUFNLEVBQUU7Q0FDOUMsRUFBRSxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHRCxXQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUlBLFdBQVMsQ0FBQ3RDLFFBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUMxRixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUlBLFFBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSUEsUUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ25HLENBQUM7Ozs7Q0NWRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0NBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkI7Q0FDQTtDQUNBO0tBQ0F3QyxXQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUU7Q0FDckMsRUFBRSxPQUFPLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDbkYsQ0FBQzs7Q0NQRCxJQUFJQSxXQUFTLEdBQUd0QyxXQUFrQyxDQUFDO0FBQ25EO0NBQ0EsSUFBSXVDLEtBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ25CO0NBQ0E7Q0FDQTtLQUNBQyxVQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUU7Q0FDckMsRUFBRSxPQUFPLFFBQVEsR0FBRyxDQUFDLEdBQUdELEtBQUcsQ0FBQ0QsV0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZFLENBQUM7O0NDUkQsSUFBSUEsV0FBUyxHQUFHdEMsV0FBa0MsQ0FBQztBQUNuRDtDQUNBLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Q0FDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNuQjtDQUNBO0NBQ0E7Q0FDQTtLQUNBeUMsaUJBQWMsR0FBRyxVQUFVLEtBQUssRUFBRSxNQUFNLEVBQUU7Q0FDMUMsRUFBRSxJQUFJLE9BQU8sR0FBR0gsV0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2pDLEVBQUUsT0FBTyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDdkUsQ0FBQzs7Q0NYRCxJQUFJN0IsaUJBQWUsR0FBR1QsaUJBQXlDLENBQUM7Q0FDaEUsSUFBSXdDLFVBQVEsR0FBR2xDLFVBQWlDLENBQUM7Q0FDakQsSUFBSSxlQUFlLEdBQUdTLGlCQUF5QyxDQUFDO0FBQ2hFO0NBQ0E7Q0FDQSxJQUFJMkIsY0FBWSxHQUFHLFVBQVUsV0FBVyxFQUFFO0NBQzFDLEVBQUUsT0FBTyxVQUFVLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFO0NBQ3pDLElBQUksSUFBSSxDQUFDLEdBQUdqQyxpQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ25DLElBQUksSUFBSSxNQUFNLEdBQUcrQixVQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3BDLElBQUksSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUNuRCxJQUFJLElBQUksS0FBSyxDQUFDO0NBQ2Q7Q0FDQTtDQUNBLElBQUksSUFBSSxXQUFXLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLE1BQU0sR0FBRyxLQUFLLEVBQUU7Q0FDeEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDekI7Q0FDQSxNQUFNLElBQUksS0FBSyxJQUFJLEtBQUssRUFBRSxPQUFPLElBQUksQ0FBQztDQUN0QztDQUNBLEtBQUssTUFBTSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDMUMsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLFdBQVcsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQzNGLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUNGO0tBQ0EsYUFBYyxHQUFHO0NBQ2pCO0NBQ0E7Q0FDQSxFQUFFLFFBQVEsRUFBRUUsY0FBWSxDQUFDLElBQUksQ0FBQztDQUM5QjtDQUNBO0NBQ0EsRUFBRSxPQUFPLEVBQUVBLGNBQVksQ0FBQyxLQUFLLENBQUM7Q0FDOUIsQ0FBQzs7Q0MvQkQsSUFBSTdCLEtBQUcsR0FBR2IsS0FBMkIsQ0FBQztDQUN0QyxJQUFJLGVBQWUsR0FBR00saUJBQXlDLENBQUM7Q0FDaEUsSUFBSSxPQUFPLEdBQUdTLGFBQXNDLENBQUMsT0FBTyxDQUFDO0NBQzdELElBQUlpQixZQUFVLEdBQUdoQixZQUFtQyxDQUFDO0FBQ3JEO0tBQ0Esa0JBQWMsR0FBRyxVQUFVLE1BQU0sRUFBRSxLQUFLLEVBQUU7Q0FDMUMsRUFBRSxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDbEMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDWixFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixFQUFFLElBQUksR0FBRyxDQUFDO0NBQ1YsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQ0gsS0FBRyxDQUFDbUIsWUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJbkIsS0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzFFO0NBQ0EsRUFBRSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUlBLEtBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Q0FDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM5QyxHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDOztDQ2hCRDtLQUNBOEIsYUFBYyxHQUFHO0NBQ2pCLEVBQUUsYUFBYTtDQUNmLEVBQUUsZ0JBQWdCO0NBQ2xCLEVBQUUsZUFBZTtDQUNqQixFQUFFLHNCQUFzQjtDQUN4QixFQUFFLGdCQUFnQjtDQUNsQixFQUFFLFVBQVU7Q0FDWixFQUFFLFNBQVM7Q0FDWCxDQUFDOztDQ1RELElBQUlDLG9CQUFrQixHQUFHNUMsa0JBQTRDLENBQUM7Q0FDdEUsSUFBSTJDLGFBQVcsR0FBR3JDLGFBQXFDLENBQUM7QUFDeEQ7Q0FDQSxJQUFJLFVBQVUsR0FBR3FDLGFBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNEO0NBQ0E7Q0FDQTtDQUNBOzRCQUNTLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixJQUFJLFNBQVMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFO0NBQzFFLEVBQUUsT0FBT0Msb0JBQWtCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQzNDOzs7O0NDVkE7OEJBQ1MsR0FBRyxNQUFNLENBQUM7O0NDRG5CLElBQUlQLFlBQVUsR0FBR3JDLFlBQW9DLENBQUM7Q0FDdEQsSUFBSSx5QkFBeUIsR0FBR00seUJBQXFELENBQUM7Q0FDdEYsSUFBSSwyQkFBMkIsR0FBR1MsMkJBQXVELENBQUM7Q0FDMUYsSUFBSU0sVUFBUSxHQUFHTCxVQUFpQyxDQUFDO0FBQ2pEO0NBQ0E7S0FDQTZCLFNBQWMsR0FBR1IsWUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxTQUFTLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Q0FDMUUsRUFBRSxJQUFJLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxDQUFDLENBQUNoQixVQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2RCxFQUFFLElBQUkscUJBQXFCLEdBQUcsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0NBQzVELEVBQUUsT0FBTyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQy9FLENBQUM7O0NDVkQsSUFBSVIsS0FBRyxHQUFHYixLQUEyQixDQUFDO0NBQ3RDLElBQUksT0FBTyxHQUFHTSxTQUFnQyxDQUFDO0NBQy9DLElBQUksOEJBQThCLEdBQUdTLDhCQUEwRCxDQUFDO0NBQ2hHLElBQUksb0JBQW9CLEdBQUdDLG9CQUE4QyxDQUFDO0FBQzFFO0tBQ0E4QiwyQkFBYyxHQUFHLFVBQVUsTUFBTSxFQUFFLE1BQU0sRUFBRTtDQUMzQyxFQUFFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM3QixFQUFFLElBQUksY0FBYyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQztDQUM5QyxFQUFFLElBQUksd0JBQXdCLEdBQUcsOEJBQThCLENBQUMsQ0FBQyxDQUFDO0NBQ2xFLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEIsSUFBSSxJQUFJLENBQUNqQyxLQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQzlGLEdBQUc7Q0FDSCxDQUFDOztDQ2JELElBQUlkLE9BQUssR0FBR0MsT0FBNkIsQ0FBQztBQUMxQztDQUNBLElBQUksV0FBVyxHQUFHLGlCQUFpQixDQUFDO0FBQ3BDO0NBQ0EsSUFBSStDLFVBQVEsR0FBRyxVQUFVLE9BQU8sRUFBRSxTQUFTLEVBQUU7Q0FDN0MsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDdkMsRUFBRSxPQUFPLEtBQUssSUFBSSxRQUFRLEdBQUcsSUFBSTtDQUNqQyxNQUFNLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBSztDQUM3QixNQUFNLE9BQU8sU0FBUyxJQUFJLFVBQVUsR0FBR2hELE9BQUssQ0FBQyxTQUFTLENBQUM7Q0FDdkQsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO0NBQ2xCLENBQUMsQ0FBQztBQUNGO0NBQ0EsSUFBSSxTQUFTLEdBQUdnRCxVQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsTUFBTSxFQUFFO0NBQ3ZELEVBQUUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztDQUNoRSxDQUFDLENBQUM7QUFDRjtDQUNBLElBQUksSUFBSSxHQUFHQSxVQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztDQUM5QixJQUFJLE1BQU0sR0FBR0EsVUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7Q0FDbkMsSUFBSSxRQUFRLEdBQUdBLFVBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0FBQ3ZDO0tBQ0EsVUFBYyxHQUFHQSxVQUFROztDQ3BCekIsSUFBSWpELFFBQU0sR0FBR0UsUUFBOEIsQ0FBQztDQUM1QyxJQUFJLHdCQUF3QixHQUFHTSw4QkFBMEQsQ0FBQyxDQUFDLENBQUM7Q0FDNUYsSUFBSWlCLDZCQUEyQixHQUFHUiw2QkFBc0QsQ0FBQztDQUN6RixJQUFJaUMsVUFBUSxHQUFHaEMsa0JBQWdDLENBQUM7Q0FDaEQsSUFBSSxTQUFTLEdBQUdDLFdBQWtDLENBQUM7Q0FDbkQsSUFBSSx5QkFBeUIsR0FBR0MsMkJBQW1ELENBQUM7Q0FDcEYsSUFBSSxRQUFRLEdBQUdFLFVBQWlDLENBQUM7QUFDakQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0tBQ0EsT0FBYyxHQUFHLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtDQUM1QyxFQUFFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDOUIsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzlCLEVBQUUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztDQUM1QixFQUFFLElBQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUM7Q0FDdEUsRUFBRSxJQUFJLE1BQU0sRUFBRTtDQUNkLElBQUksTUFBTSxHQUFHdEIsUUFBTSxDQUFDO0NBQ3BCLEdBQUcsTUFBTSxJQUFJLE1BQU0sRUFBRTtDQUNyQixJQUFJLE1BQU0sR0FBR0EsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDckQsR0FBRyxNQUFNO0NBQ1QsSUFBSSxNQUFNLEdBQUcsQ0FBQ0EsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUM7Q0FDOUMsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLEVBQUUsS0FBSyxHQUFHLElBQUksTUFBTSxFQUFFO0NBQ2xDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNqQyxJQUFJLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtDQUM3QixNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDekQsTUFBTSxjQUFjLEdBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUM7Q0FDdEQsS0FBSyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDeEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMxRjtDQUNBLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO0NBQ2pELE1BQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxPQUFPLGNBQWMsRUFBRSxTQUFTO0NBQ3BFLE1BQU0seUJBQXlCLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQ2hFLEtBQUs7Q0FDTDtDQUNBLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGNBQWMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Q0FDakUsTUFBTXlCLDZCQUEyQixDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDaEUsS0FBSztDQUNMO0NBQ0EsSUFBSXlCLFVBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNuRCxHQUFHO0NBQ0gsQ0FBQzs7Q0NyREQsSUFBSUMsR0FBQyxHQUFHakQsT0FBOEIsQ0FBQztBQUN2QztDQUNBO0NBQ0E7QUFDQWlELElBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO0NBQ2xDLEVBQUUsR0FBRyxFQUFFLFNBQVMsR0FBRyxHQUFHO0NBQ3RCLElBQUksT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0NBQ2hDLEdBQUc7Q0FDSCxDQUFDLENBQUM7O0NDUkYsSUFBSUQsVUFBUSxHQUFHaEQsa0JBQWdDLENBQUM7QUFDaEQ7Q0FDQSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0NBQ25DLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQztDQUNsQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUM7Q0FDM0IsSUFBSSxrQkFBa0IsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDbEQsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUNwQztDQUNBO0NBQ0E7Q0FDQSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxZQUFZLEVBQUU7Q0FDeEMsRUFBRWdELFVBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLFNBQVMsUUFBUSxHQUFHO0NBQ3pELElBQUksSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNuQztDQUNBLElBQUksT0FBTyxLQUFLLEtBQUssS0FBSyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7Q0FDMUUsR0FBRyxDQUFDLENBQUM7Q0FDTDs7Q0NoQkEsSUFBSSxVQUFVLEdBQUdoRCxZQUFvQyxDQUFDO0FBQ3REO0tBQ0EsZUFBYyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRTs7Q0NGM0QsSUFBSWlELEdBQUMsR0FBR2pELE9BQThCLENBQUM7Q0FDdkMsSUFBSUYsUUFBTSxHQUFHUSxRQUE4QixDQUFDO0NBQzVDLElBQUk0QyxXQUFTLEdBQUduQyxlQUF5QyxDQUFDO0FBQzFEO0NBQ0EsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNyQixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDbUMsV0FBUyxDQUFDLENBQUM7QUFDdEM7Q0FDQSxJQUFJLElBQUksR0FBRyxVQUFVLFNBQVMsRUFBRTtDQUNoQyxFQUFFLE9BQU8sVUFBVSxPQUFPLEVBQUUsT0FBTyx1QkFBdUI7Q0FDMUQsSUFBSSxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUN6QyxJQUFJLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDaEUsSUFBSSxPQUFPLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBWTtDQUM3QztDQUNBLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSSxVQUFVLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3JGLEtBQUssR0FBRyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDMUIsR0FBRyxDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBQ0Y7Q0FDQTtDQUNBO0FBQ0FELElBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7Q0FDOUM7Q0FDQTtDQUNBLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQ25ELFFBQU0sQ0FBQyxVQUFVLENBQUM7Q0FDckM7Q0FDQTtDQUNBLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQ0EsUUFBTSxDQUFDLFdBQVcsQ0FBQztDQUN2QyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0MzQkZzQyxXQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLE9BQU8sRUFBRSxJQUFJLFVBQVUsRUFBRTtDQUMvQixJQUFJLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO0NBQ3ZELEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUNkLENBQUM7O0NDSkQsSUFBSSxTQUFTLEdBQUdwQyxXQUFrQyxDQUFDO0FBQ25EO0NBQ0E7S0FDQSxtQkFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7Q0FDN0MsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDaEIsRUFBRSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUM7Q0FDcEMsRUFBRSxRQUFRLE1BQU07Q0FDaEIsSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLFlBQVk7Q0FDL0IsTUFBTSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDM0IsS0FBSyxDQUFDO0NBQ04sSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFO0NBQ2hDLE1BQU0sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM5QixLQUFLLENBQUM7Q0FDTixJQUFJLEtBQUssQ0FBQyxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0NBQ25DLE1BQU0sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDakMsS0FBSyxDQUFDO0NBQ04sSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDdEMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDcEMsS0FBSyxDQUFDO0NBQ04sR0FBRztDQUNILEVBQUUsT0FBTyx5QkFBeUI7Q0FDbEMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3JDLEdBQUcsQ0FBQztDQUNKLENBQUM7O0NDdkJELElBQUlLLFNBQU8sR0FBR0wsWUFBbUMsQ0FBQztBQUNsRDtDQUNBO0NBQ0E7Q0FDQTtLQUNBbUQsU0FBYyxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFO0NBQ3hELEVBQUUsT0FBTzlDLFNBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7Q0FDakMsQ0FBQzs7Q0NQRCxJQUFJUCxRQUFNLEdBQUdFLFFBQThCLENBQUM7Q0FDNUMsSUFBSSxTQUFTLEdBQUdNLGVBQXlDLENBQUM7QUFDMUQ7Q0FDQSxJQUFJLE9BQU8sR0FBR1IsUUFBTSxDQUFDLE9BQU8sQ0FBQztDQUM3QixJQUFJLFFBQVEsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUMzQyxJQUFJLEVBQUUsR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQztDQUNqQyxJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7QUFDbkI7Q0FDQSxJQUFJLEVBQUUsRUFBRTtDQUNSLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDeEIsRUFBRSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuRCxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7Q0FDdEIsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUN6QyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtDQUNoQyxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0NBQzdDLElBQUksSUFBSSxLQUFLLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsQyxHQUFHO0NBQ0gsQ0FBQztBQUNEO0tBQ0EsZUFBYyxHQUFHLE9BQU8sSUFBSSxDQUFDLE9BQU87Ozs7Q0NsQnBDLElBQUlzRCxZQUFVLEdBQUdwRCxlQUF5QyxDQUFDO0NBQzNELElBQUlELE9BQUssR0FBR08sT0FBNkIsQ0FBQztBQUMxQztDQUNBO0tBQ0EsWUFBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLElBQUksQ0FBQ1AsT0FBSyxDQUFDLFlBQVk7Q0FDdEUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0NBQzFCO0NBQ0E7Q0FDQSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSXFELFlBQVUsSUFBSUEsWUFBVSxHQUFHLEVBQUUsQ0FBQztDQUNsRCxDQUFDLENBQUM7Ozs7Q0NURixJQUFJQyxlQUFhLEdBQUdyRCxZQUFxQyxDQUFDO0FBQzFEO0tBQ0EsY0FBYyxHQUFHcUQsZUFBYTtDQUM5QixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUk7Q0FDakIsS0FBSyxPQUFPLE1BQU0sQ0FBQyxRQUFRLElBQUksUUFBUTs7Q0NMdkMsSUFBSXZELFFBQU0sR0FBR0UsUUFBOEIsQ0FBQztDQUM1QyxJQUFJOEIsUUFBTSxHQUFHeEIsZ0JBQThCLENBQUM7Q0FDNUMsSUFBSSxHQUFHLEdBQUdTLEtBQTJCLENBQUM7Q0FDdEMsSUFBSSxHQUFHLEdBQUdDLEtBQTJCLENBQUM7Q0FDdEMsSUFBSSxhQUFhLEdBQUdDLFlBQXFDLENBQUM7Q0FDMUQsSUFBSSxpQkFBaUIsR0FBR0MsY0FBeUMsQ0FBQztBQUNsRTtDQUNBLElBQUkscUJBQXFCLEdBQUdZLFFBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxQyxJQUFJd0IsUUFBTSxHQUFHeEQsUUFBTSxDQUFDLE1BQU0sQ0FBQztDQUMzQixJQUFJLHFCQUFxQixHQUFHLGlCQUFpQixHQUFHd0QsUUFBTSxHQUFHQSxRQUFNLElBQUlBLFFBQU0sQ0FBQyxhQUFhLElBQUksR0FBRyxDQUFDO0FBQy9GO0tBQ0FDLGlCQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDakMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxJQUFJLE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEVBQUU7Q0FDL0csSUFBSSxJQUFJLGFBQWEsSUFBSSxHQUFHLENBQUNELFFBQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtDQUM1QyxNQUFNLHFCQUFxQixDQUFDLElBQUksQ0FBQyxHQUFHQSxRQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDakQsS0FBSyxNQUFNO0NBQ1gsTUFBTSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDNUUsS0FBSztDQUNMLEdBQUcsQ0FBQyxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZDLENBQUM7O0NDbkJELElBQUksUUFBUSxHQUFHdEQsVUFBaUMsQ0FBQztDQUNqRCxJQUFJLE9BQU8sR0FBR00sU0FBZ0MsQ0FBQztDQUMvQyxJQUFJaUQsaUJBQWUsR0FBR3hDLGlCQUF5QyxDQUFDO0FBQ2hFO0NBQ0EsSUFBSXlDLFNBQU8sR0FBR0QsaUJBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QztDQUNBO0NBQ0E7S0FDQUUsb0JBQWMsR0FBRyxVQUFVLGFBQWEsRUFBRSxNQUFNLEVBQUU7Q0FDbEQsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNSLEVBQUUsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7Q0FDOUIsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztDQUNsQztDQUNBLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxVQUFVLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUN2RixTQUFTLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0QsU0FBTyxDQUFDLENBQUM7Q0FDckIsTUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUNwQyxLQUFLO0NBQ0wsR0FBRyxDQUFDLE9BQU8sS0FBSyxDQUFDLEtBQUssU0FBUyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7Q0FDeEUsQ0FBQzs7Q0NuQkQsSUFBSSxJQUFJLEdBQUd4RCxtQkFBNkMsQ0FBQztDQUN6RCxJQUFJLGFBQWEsR0FBR00sYUFBc0MsQ0FBQztDQUMzRCxJQUFJTSxVQUFRLEdBQUdHLFVBQWlDLENBQUM7Q0FDakQsSUFBSXlCLFVBQVEsR0FBR3hCLFVBQWlDLENBQUM7Q0FDakQsSUFBSSxrQkFBa0IsR0FBR0Msb0JBQTRDLENBQUM7QUFDdEU7Q0FDQSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ25CO0NBQ0E7Q0FDQSxJQUFJeUIsY0FBWSxHQUFHLFVBQVUsSUFBSSxFQUFFO0NBQ25DLEVBQUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztDQUN6QixFQUFFLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7Q0FDNUIsRUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO0NBQzFCLEVBQUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztDQUMzQixFQUFFLElBQUksYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7Q0FDaEMsRUFBRSxJQUFJLGFBQWEsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO0NBQ2hDLEVBQUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUM7Q0FDNUMsRUFBRSxPQUFPLFVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFO0NBQzVELElBQUksSUFBSSxDQUFDLEdBQUc5QixVQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDNUIsSUFBSSxJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDaEMsSUFBSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNsRCxJQUFJLElBQUksTUFBTSxHQUFHNEIsVUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN2QyxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNsQixJQUFJLElBQUksTUFBTSxHQUFHLGNBQWMsSUFBSSxrQkFBa0IsQ0FBQztDQUN0RCxJQUFJLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQVMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDNUcsSUFBSSxJQUFJLEtBQUssRUFBRSxNQUFNLENBQUM7Q0FDdEIsSUFBSSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtDQUNsRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDMUIsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDOUMsTUFBTSxJQUFJLElBQUksRUFBRTtDQUNoQixRQUFRLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7Q0FDM0MsYUFBYSxJQUFJLE1BQU0sRUFBRSxRQUFRLElBQUk7Q0FDckMsVUFBVSxLQUFLLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQztDQUM5QixVQUFVLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQy9CLFVBQVUsS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDL0IsVUFBVSxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMzQyxTQUFTLE1BQU0sUUFBUSxJQUFJO0NBQzNCLFVBQVUsS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDL0IsVUFBVSxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMzQyxTQUFTO0NBQ1QsT0FBTztDQUNQLEtBQUs7Q0FDTCxJQUFJLE9BQU8sYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztDQUN4RSxHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7QUFDRjtLQUNBLGNBQWMsR0FBRztDQUNqQjtDQUNBO0NBQ0EsRUFBRSxPQUFPLEVBQUVFLGNBQVksQ0FBQyxDQUFDLENBQUM7Q0FDMUI7Q0FDQTtDQUNBLEVBQUUsR0FBRyxFQUFFQSxjQUFZLENBQUMsQ0FBQyxDQUFDO0NBQ3RCO0NBQ0E7Q0FDQSxFQUFFLE1BQU0sRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUN6QjtDQUNBO0NBQ0EsRUFBRSxJQUFJLEVBQUVBLGNBQVksQ0FBQyxDQUFDLENBQUM7Q0FDdkI7Q0FDQTtDQUNBLEVBQUUsS0FBSyxFQUFFQSxjQUFZLENBQUMsQ0FBQyxDQUFDO0NBQ3hCO0NBQ0E7Q0FDQSxFQUFFLElBQUksRUFBRUEsY0FBWSxDQUFDLENBQUMsQ0FBQztDQUN2QjtDQUNBO0NBQ0EsRUFBRSxTQUFTLEVBQUVBLGNBQVksQ0FBQyxDQUFDLENBQUM7Q0FDNUI7Q0FDQTtDQUNBLEVBQUUsU0FBUyxFQUFFQSxjQUFZLENBQUMsQ0FBQyxDQUFDO0NBQzVCLENBQUM7O0NDdEVELElBQUkzQyxPQUFLLEdBQUdDLE9BQTZCLENBQUM7QUFDMUM7S0FDQTBELHFCQUFjLEdBQUcsVUFBVSxXQUFXLEVBQUUsUUFBUSxFQUFFO0NBQ2xELEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQy9CLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJM0QsT0FBSyxDQUFDLFlBQVk7Q0FDdkM7Q0FDQSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsSUFBSSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9ELEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQzs7Q0NSRCxJQUFJLFFBQVEsR0FBR0MsY0FBdUMsQ0FBQyxPQUFPLENBQUM7Q0FDL0QsSUFBSTBELHFCQUFtQixHQUFHcEQscUJBQThDLENBQUM7QUFDekU7Q0FDQSxJQUFJcUQsZUFBYSxHQUFHRCxxQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuRDtDQUNBO0NBQ0E7S0FDQSxZQUFjLEdBQUcsQ0FBQ0MsZUFBYSxHQUFHLFNBQVMsT0FBTyxDQUFDLFVBQVUsa0JBQWtCO0NBQy9FLEVBQUUsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7Q0FDckY7Q0FDQSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU87O0NDVmQsSUFBSVYsR0FBQyxHQUFHakQsT0FBOEIsQ0FBQztDQUN2QyxJQUFJNEQsU0FBTyxHQUFHdEQsWUFBc0MsQ0FBQztBQUNyRDtDQUNBO0NBQ0E7Q0FDQTtBQUNBMkMsSUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxJQUFJVyxTQUFPLEVBQUUsRUFBRTtDQUNuRSxFQUFFLE9BQU8sRUFBRUEsU0FBTztDQUNsQixDQUFDLENBQUM7O0NDVEYsSUFBSUwsaUJBQWUsR0FBR3ZELGlCQUF5QyxDQUFDO0FBQ2hFO0NBQ0EsSUFBSTZELGVBQWEsR0FBR04saUJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUNuRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZDtDQUNBLElBQUksQ0FBQ00sZUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzFCO0tBQ0Esa0JBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssWUFBWTs7Q0NQOUMsSUFBSUMsdUJBQXFCLEdBQUc5RCxrQkFBNkMsQ0FBQztDQUMxRSxJQUFJLFVBQVUsR0FBR00sWUFBbUMsQ0FBQztDQUNyRCxJQUFJaUQsaUJBQWUsR0FBR3hDLGlCQUF5QyxDQUFDO0FBQ2hFO0NBQ0EsSUFBSSxhQUFhLEdBQUd3QyxpQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ25EO0NBQ0EsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsWUFBWSxFQUFFLE9BQU8sU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFDO0FBQ3ZGO0NBQ0E7Q0FDQSxJQUFJLE1BQU0sR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUU7Q0FDaEMsRUFBRSxJQUFJO0NBQ04sSUFBSSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNuQixHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUUsZUFBZTtDQUNqQyxDQUFDLENBQUM7QUFDRjtDQUNBO0tBQ0FsRCxTQUFjLEdBQUd5RCx1QkFBcUIsR0FBRyxVQUFVLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDcEUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDO0NBQ3JCLEVBQUUsT0FBTyxFQUFFLEtBQUssU0FBUyxHQUFHLFdBQVcsR0FBRyxFQUFFLEtBQUssSUFBSSxHQUFHLE1BQU07Q0FDOUQ7Q0FDQSxNQUFNLFFBQVEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLElBQUksUUFBUSxHQUFHLEdBQUc7Q0FDNUU7Q0FDQSxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Q0FDdkM7Q0FDQSxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDO0NBQ25HLENBQUM7O0NDeEJELElBQUlBLHVCQUFxQixHQUFHOUQsa0JBQTZDLENBQUM7Q0FDMUUsSUFBSUssU0FBTyxHQUFHQyxTQUErQixDQUFDO0FBQzlDO0NBQ0E7Q0FDQTtLQUNBLGNBQWMsR0FBR3dELHVCQUFxQixHQUFHLEVBQUUsQ0FBQyxRQUFRLEdBQUcsU0FBUyxRQUFRLEdBQUc7Q0FDM0UsRUFBRSxPQUFPLFVBQVUsR0FBR3pELFNBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDMUMsQ0FBQzs7Q0NSRCxJQUFJLHFCQUFxQixHQUFHTCxrQkFBNkMsQ0FBQztDQUMxRSxJQUFJZ0QsVUFBUSxHQUFHMUMsa0JBQWdDLENBQUM7Q0FDaEQsSUFBSSxRQUFRLEdBQUdTLGNBQXdDLENBQUM7QUFDeEQ7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxDQUFDLHFCQUFxQixFQUFFO0NBQzVCLEVBQUVpQyxVQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDckU7O0NDUEE7Q0FDQSxJQUFJQyxHQUFDLEdBQUdqRCxPQUE4QixDQUFDO0NBQ3ZDLElBQUksUUFBUSxHQUFHTSxhQUFzQyxDQUFDLE9BQU8sQ0FBQztDQUM5RCxJQUFJLG1CQUFtQixHQUFHUyxxQkFBOEMsQ0FBQztBQUN6RTtDQUNBLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7QUFDL0I7Q0FDQSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbEUsSUFBSSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkQ7Q0FDQTtDQUNBO0FBQ0FrQyxJQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO0NBQzdFLEVBQUUsT0FBTyxFQUFFLFNBQVMsT0FBTyxDQUFDLGFBQWEsd0JBQXdCO0NBQ2pFLElBQUksT0FBTyxhQUFhO0NBQ3hCO0NBQ0EsUUFBUSxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDO0NBQ2pELFFBQVEsUUFBUSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0NBQ3ZGLEdBQUc7Q0FDSCxDQUFDLENBQUM7O0NDbkJGLElBQUk1QixVQUFRLEdBQUdyQixVQUFpQyxDQUFDO0FBQ2pEO0NBQ0E7Q0FDQTtLQUNBK0QsYUFBYyxHQUFHLFlBQVk7Q0FDN0IsRUFBRSxJQUFJLElBQUksR0FBRzFDLFVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM1QixFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNsQixFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksR0FBRyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUM7Q0FDckMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxJQUFJLEdBQUcsQ0FBQztDQUNwQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksR0FBRyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUM7Q0FDbEMsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLEdBQUcsQ0FBQztDQUNqQyxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCLENBQUM7Ozs7Q0NiRCxJQUFJdEIsT0FBSyxHQUFHQyxPQUFrQixDQUFDO0FBQy9CO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDbEIsRUFBRSxPQUFPLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDdEIsQ0FBQztBQUNEO2tDQUNxQixHQUFHRCxPQUFLLENBQUMsWUFBWTtDQUMxQztDQUNBLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN4QixFQUFFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0NBQ25CLEVBQUUsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztDQUNqQyxDQUFDLEVBQUU7QUFDSDtpQ0FDb0IsR0FBR0EsT0FBSyxDQUFDLFlBQVk7Q0FDekM7Q0FDQSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDMUIsRUFBRSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUNuQixFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUM7Q0FDaEMsQ0FBQzs7Q0NyQkQ7Q0FDQTtDQUNBLElBQUksV0FBVyxHQUFHQyxhQUF5QixDQUFDO0NBQzVDLElBQUksYUFBYSxHQUFHTSxtQkFBa0MsQ0FBQztDQUN2RCxJQUFJLE1BQU0sR0FBR1MsZ0JBQW1CLENBQUM7QUFDakM7Q0FDQSxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztDQUN2QyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5RTtDQUNBLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQztBQUM3QjtDQUNBLElBQUksd0JBQXdCLEdBQUcsQ0FBQyxZQUFZO0NBQzVDLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0NBQ2hCLEVBQUUsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO0NBQ2xCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDNUIsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUM1QixFQUFFLE9BQU8sR0FBRyxDQUFDLFNBQVMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUM7Q0FDcEQsQ0FBQyxHQUFHLENBQUM7QUFDTDtDQUNBLElBQUksYUFBYSxHQUFHLGFBQWEsQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLFlBQVksQ0FBQztBQUM5RTtDQUNBO0NBQ0EsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7QUFDckQ7Q0FDQSxJQUFJLEtBQUssR0FBRyx3QkFBd0IsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDO0FBQ3ZFO0NBQ0EsSUFBSSxLQUFLLEVBQUU7Q0FDWCxFQUFFLFdBQVcsR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUU7Q0FDbkMsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7Q0FDbEIsSUFBSSxJQUFJLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztDQUNwQyxJQUFJLElBQUksTUFBTSxHQUFHLGFBQWEsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO0NBQzVDLElBQUksSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyQyxJQUFJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7Q0FDM0IsSUFBSSxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7Q0FDdkIsSUFBSSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDdEI7Q0FDQSxJQUFJLElBQUksTUFBTSxFQUFFO0NBQ2hCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0NBQ3JDLFFBQVEsS0FBSyxJQUFJLEdBQUcsQ0FBQztDQUNyQixPQUFPO0FBQ1A7Q0FDQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUNoRDtDQUNBLE1BQU0sSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtDQUNqRyxRQUFRLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztDQUN2QyxRQUFRLE9BQU8sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDO0NBQ2hDLFFBQVEsVUFBVSxFQUFFLENBQUM7Q0FDckIsT0FBTztDQUNQO0NBQ0E7Q0FDQSxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN4RCxLQUFLO0FBQ0w7Q0FDQSxJQUFJLElBQUksYUFBYSxFQUFFO0NBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzVELEtBQUs7Q0FDTCxJQUFJLElBQUksd0JBQXdCLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7QUFDM0Q7Q0FDQSxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNEO0NBQ0EsSUFBSSxJQUFJLE1BQU0sRUFBRTtDQUNoQixNQUFNLElBQUksS0FBSyxFQUFFO0NBQ2pCLFFBQVEsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNwRCxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzlDLFFBQVEsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO0NBQ25DLFFBQVEsRUFBRSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0NBQ3hDLE9BQU8sTUFBTSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUM5QixLQUFLLE1BQU0sSUFBSSx3QkFBd0IsSUFBSSxLQUFLLEVBQUU7Q0FDbEQsTUFBTSxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztDQUMzRSxLQUFLO0NBQ0wsSUFBSSxJQUFJLGFBQWEsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Q0FDcEQ7Q0FDQTtDQUNBLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVk7Q0FDdkQsUUFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0NBQ25ELFVBQVUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDL0QsU0FBUztDQUNULE9BQU8sQ0FBQyxDQUFDO0NBQ1QsS0FBSztBQUNMO0NBQ0EsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHLENBQUM7Q0FDSixDQUFDO0FBQ0Q7S0FDQWlELFlBQWMsR0FBRyxXQUFXOztDQ3JGNUIsSUFBSWYsR0FBQyxHQUFHakQsT0FBOEIsQ0FBQztDQUN2QyxJQUFJLElBQUksR0FBR00sWUFBbUMsQ0FBQztBQUMvQztDQUNBO0NBQ0E7QUFDQTJDLElBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsRUFBRTtDQUNoRSxFQUFFLElBQUksRUFBRSxJQUFJO0NBQ1osQ0FBQyxDQUFDOztDQ1BGO0FBQ3FDO0NBQ3JDLElBQUksUUFBUSxHQUFHakQsa0JBQWdDLENBQUM7Q0FDaEQsSUFBSWdFLFlBQVUsR0FBRzFELFlBQW1DLENBQUM7Q0FDckQsSUFBSVAsT0FBSyxHQUFHZ0IsT0FBNkIsQ0FBQztDQUMxQyxJQUFJd0MsaUJBQWUsR0FBR3ZDLGlCQUF5QyxDQUFDO0NBQ2hFLElBQUlPLDZCQUEyQixHQUFHTiw2QkFBc0QsQ0FBQztBQUN6RjtDQUNBLElBQUl1QyxTQUFPLEdBQUdELGlCQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDekMsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUN2QztDQUNBLElBQUksNkJBQTZCLEdBQUcsQ0FBQ3hELE9BQUssQ0FBQyxZQUFZO0NBQ3ZEO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0NBQ2YsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLFlBQVk7Q0FDeEIsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDcEIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQy9CLElBQUksT0FBTyxNQUFNLENBQUM7Q0FDbEIsR0FBRyxDQUFDO0NBQ0osRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQztDQUN4QyxDQUFDLENBQUMsQ0FBQztBQUNIO0NBQ0E7Q0FDQTtDQUNBLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxZQUFZO0NBQ3BDO0NBQ0EsRUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztDQUN6QyxDQUFDLEdBQUcsQ0FBQztBQUNMO0NBQ0EsSUFBSSxPQUFPLEdBQUd3RCxpQkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3pDO0NBQ0EsSUFBSSw0Q0FBNEMsR0FBRyxDQUFDLFlBQVk7Q0FDaEUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtDQUNwQixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDMUMsR0FBRztDQUNILEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDZixDQUFDLEdBQUcsQ0FBQztBQUNMO0NBQ0E7Q0FDQTtDQUNBLElBQUksaUNBQWlDLEdBQUcsQ0FBQ3hELE9BQUssQ0FBQyxZQUFZO0NBQzNEO0NBQ0EsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7Q0FDbEIsRUFBRSxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0NBQzdCLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxZQUFZLEVBQUUsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDeEUsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzlCLEVBQUUsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7Q0FDdkUsQ0FBQyxDQUFDLENBQUM7QUFDSDtLQUNBLDZCQUFjLEdBQUcsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7Q0FDcEQsRUFBRSxJQUFJLE1BQU0sR0FBR3dELGlCQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEM7Q0FDQSxFQUFFLElBQUksbUJBQW1CLEdBQUcsQ0FBQ3hELE9BQUssQ0FBQyxZQUFZO0NBQy9DO0NBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDZixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQzFDLElBQUksT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNCLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7Q0FDQSxFQUFFLElBQUksaUJBQWlCLEdBQUcsbUJBQW1CLElBQUksQ0FBQ0EsT0FBSyxDQUFDLFlBQVk7Q0FDcEU7Q0FDQSxJQUFJLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztDQUMzQixJQUFJLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUNqQjtDQUNBLElBQUksSUFBSSxHQUFHLEtBQUssT0FBTyxFQUFFO0NBQ3pCO0NBQ0E7Q0FDQTtDQUNBLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUNkO0NBQ0E7Q0FDQSxNQUFNLEVBQUUsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0NBQzFCLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQ3lELFNBQU8sQ0FBQyxHQUFHLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FDM0QsTUFBTSxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNwQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDL0IsS0FBSztBQUNMO0NBQ0EsSUFBSSxFQUFFLENBQUMsSUFBSSxHQUFHLFlBQVksRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzlEO0NBQ0EsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDbkIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDO0NBQ3ZCLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7Q0FDQSxFQUFFO0NBQ0YsSUFBSSxDQUFDLG1CQUFtQjtDQUN4QixJQUFJLENBQUMsaUJBQWlCO0NBQ3RCLEtBQUssR0FBRyxLQUFLLFNBQVMsSUFBSTtDQUMxQixNQUFNLDZCQUE2QjtDQUNuQyxNQUFNLGdCQUFnQjtDQUN0QixNQUFNLENBQUMsNENBQTRDO0NBQ25ELEtBQUssQ0FBQztDQUNOLEtBQUssR0FBRyxLQUFLLE9BQU8sSUFBSSxDQUFDLGlDQUFpQyxDQUFDO0NBQzNELElBQUk7Q0FDSixJQUFJLElBQUksa0JBQWtCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3pDLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7Q0FDdEcsTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0NBQzlCLE1BQU0sSUFBSSxLQUFLLEtBQUtRLFlBQVUsSUFBSSxLQUFLLEtBQUssZUFBZSxDQUFDLElBQUksRUFBRTtDQUNsRSxRQUFRLElBQUksbUJBQW1CLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtDQUN2RDtDQUNBO0NBQ0E7Q0FDQSxVQUFVLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0NBQ25GLFNBQVM7Q0FDVCxRQUFRLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUMzRSxPQUFPO0NBQ1AsTUFBTSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQzdCLEtBQUssRUFBRTtDQUNQLE1BQU0sZ0JBQWdCLEVBQUUsZ0JBQWdCO0NBQ3hDLE1BQU0sNENBQTRDLEVBQUUsNENBQTRDO0NBQ2hHLEtBQUssQ0FBQyxDQUFDO0NBQ1AsSUFBSSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsSUFBSSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakM7Q0FDQSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNsRCxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDO0NBQ2pEO0NBQ0E7Q0FDQSxRQUFRLFVBQVUsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Q0FDOUU7Q0FDQTtDQUNBLFFBQVEsVUFBVSxNQUFNLEVBQUUsRUFBRSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7Q0FDcEUsS0FBSyxDQUFDO0NBQ04sR0FBRztBQUNIO0NBQ0EsRUFBRSxJQUFJLElBQUksRUFBRXpDLDZCQUEyQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDL0UsQ0FBQzs7Q0NoSUQsSUFBSSxTQUFTLEdBQUd2QixXQUFrQyxDQUFDO0NBQ25ELElBQUlPLHdCQUFzQixHQUFHRCx3QkFBZ0QsQ0FBQztBQUM5RTtDQUNBO0NBQ0EsSUFBSSxZQUFZLEdBQUcsVUFBVSxpQkFBaUIsRUFBRTtDQUNoRCxFQUFFLE9BQU8sVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQy9CLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDQyx3QkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2xELElBQUksSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2xDLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztDQUN4QixJQUFJLElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQztDQUN0QixJQUFJLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFLE9BQU8saUJBQWlCLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztDQUNwRixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ25DLElBQUksT0FBTyxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLElBQUksUUFBUSxHQUFHLENBQUMsS0FBSyxJQUFJO0NBQ3BFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLE1BQU0sR0FBRyxNQUFNO0NBQzFFLFVBQVUsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLO0NBQ3hELFVBQVUsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxFQUFFLEtBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztDQUNySCxHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7QUFDRjtLQUNBLGVBQWMsR0FBRztDQUNqQjtDQUNBO0NBQ0EsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQztDQUM3QjtDQUNBO0NBQ0EsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQztDQUM1QixDQUFDOztDQ3pCRCxJQUFJLE1BQU0sR0FBR1AsZUFBd0MsQ0FBQyxNQUFNLENBQUM7QUFDN0Q7Q0FDQTtDQUNBO0tBQ0FpRSxvQkFBYyxHQUFHLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7Q0FDOUMsRUFBRSxPQUFPLEtBQUssSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDekQsQ0FBQzs7Q0NQRCxJQUFJLE9BQU8sR0FBR2pFLFlBQXdCLENBQUM7Q0FDdkMsSUFBSSxVQUFVLEdBQUdNLFlBQXdCLENBQUM7QUFDMUM7Q0FDQTtDQUNBO0tBQ0Esa0JBQWMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDakMsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0NBQ3BCLEVBQUUsSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLEVBQUU7Q0FDbEMsSUFBSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqQyxJQUFJLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO0NBQ3BDLE1BQU0sTUFBTSxTQUFTLENBQUMsb0VBQW9FLENBQUMsQ0FBQztDQUM1RixLQUFLO0NBQ0wsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHO0FBQ0g7Q0FDQSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtDQUMvQixJQUFJLE1BQU0sU0FBUyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Q0FDbkUsR0FBRztBQUNIO0NBQ0EsRUFBRSxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9CLENBQUM7O0NDbkJELElBQUksNkJBQTZCLEdBQUdOLDZCQUEwRCxDQUFDO0NBQy9GLElBQUksUUFBUSxHQUFHTSxVQUFpQyxDQUFDO0NBQ2pELElBQUksUUFBUSxHQUFHUyxVQUFpQyxDQUFDO0NBQ2pELElBQUksc0JBQXNCLEdBQUdDLHdCQUFnRCxDQUFDO0NBQzlFLElBQUksa0JBQWtCLEdBQUdDLG9CQUE0QyxDQUFDO0NBQ3RFLElBQUksVUFBVSxHQUFHQyxrQkFBNEMsQ0FBQztBQUM5RDtDQUNBO0NBQ0EsNkJBQTZCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO0NBQ3pGLEVBQUUsT0FBTztDQUNUO0NBQ0E7Q0FDQSxJQUFJLFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRTtDQUMzQixNQUFNLElBQUksQ0FBQyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNDLE1BQU0sSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLFNBQVMsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3BFLE1BQU0sT0FBTyxPQUFPLEtBQUssU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3BHLEtBQUs7Q0FDTDtDQUNBO0NBQ0EsSUFBSSxVQUFVLE1BQU0sRUFBRTtDQUN0QixNQUFNLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzNELE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNyQztDQUNBLE1BQU0sSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2hDLE1BQU0sSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCO0NBQ0EsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0M7Q0FDQSxNQUFNLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Q0FDbkMsTUFBTSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztDQUN2QixNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNqQixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLElBQUksTUFBTSxDQUFDO0NBQ2pCLE1BQU0sT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRTtDQUNwRCxRQUFRLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6QyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7Q0FDeEIsUUFBUSxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztDQUN2RyxRQUFRLENBQUMsRUFBRSxDQUFDO0NBQ1osT0FBTztDQUNQLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7Q0FDaEMsS0FBSztDQUNMLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQzs7Q0MzQ0Y7Q0FDQTtLQUNBLFlBQWMsR0FBRztDQUNqQixFQUFFLFdBQVcsRUFBRSxDQUFDO0NBQ2hCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztDQUN4QixFQUFFLFlBQVksRUFBRSxDQUFDO0NBQ2pCLEVBQUUsY0FBYyxFQUFFLENBQUM7Q0FDbkIsRUFBRSxXQUFXLEVBQUUsQ0FBQztDQUNoQixFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsWUFBWSxFQUFFLENBQUM7Q0FDakIsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO0NBQ3pCLEVBQUUsUUFBUSxFQUFFLENBQUM7Q0FDYixFQUFFLGlCQUFpQixFQUFFLENBQUM7Q0FDdEIsRUFBRSxjQUFjLEVBQUUsQ0FBQztDQUNuQixFQUFFLGVBQWUsRUFBRSxDQUFDO0NBQ3BCLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztDQUN0QixFQUFFLFNBQVMsRUFBRSxDQUFDO0NBQ2QsRUFBRSxhQUFhLEVBQUUsQ0FBQztDQUNsQixFQUFFLFlBQVksRUFBRSxDQUFDO0NBQ2pCLEVBQUUsUUFBUSxFQUFFLENBQUM7Q0FDYixFQUFFLGdCQUFnQixFQUFFLENBQUM7Q0FDckIsRUFBRSxNQUFNLEVBQUUsQ0FBQztDQUNYLEVBQUUsV0FBVyxFQUFFLENBQUM7Q0FDaEIsRUFBRSxhQUFhLEVBQUUsQ0FBQztDQUNsQixFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsY0FBYyxFQUFFLENBQUM7Q0FDbkIsRUFBRSxZQUFZLEVBQUUsQ0FBQztDQUNqQixFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztDQUNyQixFQUFFLGdCQUFnQixFQUFFLENBQUM7Q0FDckIsRUFBRSxjQUFjLEVBQUUsQ0FBQztDQUNuQixFQUFFLGdCQUFnQixFQUFFLENBQUM7Q0FDckIsRUFBRSxhQUFhLEVBQUUsQ0FBQztDQUNsQixFQUFFLFNBQVMsRUFBRSxDQUFDO0NBQ2QsQ0FBQzs7Q0NsQ0QsSUFBSXBCLFFBQU0sR0FBR0UsUUFBOEIsQ0FBQztDQUM1QyxJQUFJLFlBQVksR0FBR00sWUFBcUMsQ0FBQztDQUN6RCxJQUFJLE9BQU8sR0FBR1MsWUFBc0MsQ0FBQztDQUNyRCxJQUFJLDJCQUEyQixHQUFHQyw2QkFBc0QsQ0FBQztBQUN6RjtDQUNBLEtBQUssSUFBSSxlQUFlLElBQUksWUFBWSxFQUFFO0NBQzFDLEVBQUUsSUFBSSxVQUFVLEdBQUdsQixRQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FDM0MsRUFBRSxJQUFJLG1CQUFtQixHQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDO0NBQy9EO0NBQ0EsRUFBRSxJQUFJLG1CQUFtQixJQUFJLG1CQUFtQixDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUUsSUFBSTtDQUMxRSxJQUFJLDJCQUEyQixDQUFDLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUN6RSxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQzFDLEdBQUc7Q0FDSDs7Q0NkQSxJQUFNb0UsTUFBTSxHQUFHLENBQUMsUUFBRCxFQUFXLE9BQVgsRUFBb0IsUUFBcEIsRUFBOEIsUUFBOUIsRUFBd0MsTUFBeEMsRUFBZ0QsU0FBaEQsRUFBMkQsVUFBM0QsRUFBdUUsV0FBdkUsRUFBb0YsTUFBcEYsRUFBNEYsUUFBNUYsRUFBc0csWUFBdEcsQ0FBZjtDQUNBLElBQU1DLElBQUksR0FBRyxFQUFiO0NBQ0FELE1BQU0sQ0FBQ04sT0FBUCxDQUFlLFVBQUNRLElBQUQsRUFBVTtDQUN2QkQsRUFBQUEsSUFBSSxDQUFDLE9BQU9DLElBQVIsQ0FBSixHQUFvQixVQUFVQyxHQUFWLEVBQWU7Q0FDakMsV0FBT0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCcEUsUUFBakIsQ0FBMEJxRSxJQUExQixDQUErQkgsR0FBL0IsTUFBd0MsYUFBYUQsSUFBYixHQUFvQixHQUFuRTtDQUNELEdBRkQ7O0NBR0FBLEVBQUFBLElBQUksS0FBSyxZQUFULEtBQ0dELElBQUksQ0FBQyxPQUFPQyxJQUFSLENBQUosR0FBb0IsVUFBVUMsR0FBVixFQUFlO0NBQ2xDLFdBQ0VDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQnBFLFFBQWpCLENBQ0dxRSxJQURILENBQ1FILEdBRFIsRUFFR0ksS0FGSCxDQUVTLGdCQUZULEVBR0dDLE9BSEgsQ0FHVyxPQUhYLE1BR3dCLENBSjFCO0NBTUQsR0FSSDtDQVNELENBYkQ7O0NBZUEsU0FBU0MsS0FBVCxDQUFlQyxNQUFmLEVBQXVCO0NBQ3JCLE1BQUlBLE1BQU0sS0FBSyxJQUFYLElBQW1CLFFBQU9BLE1BQVAsTUFBa0IsUUFBekMsRUFBbUQ7Q0FDakQsV0FBT0EsTUFBUDtDQUNEOztDQUNELE1BQUlDLE1BQU0sR0FBR0QsTUFBYjs7Q0FDQSxNQUFJVCxJQUFJLENBQUNoQixPQUFMLENBQWF5QixNQUFiLENBQUosRUFBMEI7Q0FDeEJDLElBQUFBLE1BQU0sR0FBRyxFQUFUO0NBQ0FELElBQUFBLE1BQU0sQ0FBQ2hCLE9BQVAsQ0FBZSxVQUFDa0IsS0FBRCxFQUFRQyxJQUFSLEVBQWlCO0NBQzlCRixNQUFBQSxNQUFNLENBQUNDLEtBQUQsQ0FBTixHQUFnQkgsS0FBSyxDQUFDSSxJQUFELENBQXJCO0NBQ0QsS0FGRDtDQUdEOztDQUNELE1BQUlaLElBQUksQ0FBQ2EsWUFBTCxDQUFrQkosTUFBbEIsQ0FBSixFQUErQjtDQUM3QkMsSUFBQUEsTUFBTSxHQUFHLEVBQVQ7Q0FDQSxRQUFJSSxJQUFJLEdBQUdMLE1BQU0sQ0FBQ00sV0FBbEI7O0NBQ0EsUUFBSU4sTUFBTSxDQUFDTSxXQUFQLENBQW1CQyxJQUF2QixFQUE2QjtDQUMzQk4sTUFBQUEsTUFBTSxHQUFHSSxJQUFJLENBQUNFLElBQUwsQ0FBVVAsTUFBVixDQUFUO0NBQ0QsS0FGRCxNQUVPO0NBQ0xDLE1BQUFBLE1BQU0sR0FBRyxJQUFJSSxJQUFKLENBQVNMLE1BQU0sQ0FBQ1EsTUFBaEIsQ0FBVDtDQUNBUixNQUFBQSxNQUFNLENBQUNoQixPQUFQLENBQWUsVUFBQ2tCLEtBQUQsRUFBUUMsSUFBUixFQUFpQjtDQUM5QkYsUUFBQUEsTUFBTSxDQUFDQyxLQUFELENBQU4sR0FBZ0JILEtBQUssQ0FBQ0ksSUFBRCxDQUFyQjtDQUNELE9BRkQ7Q0FHRDtDQUNGOztDQUNELE1BQUlaLElBQUksQ0FBQ3pELFFBQUwsQ0FBY2tFLE1BQWQsQ0FBSixFQUEyQjtDQUN6QkMsSUFBQUEsTUFBTSxHQUFHLEVBQVQ7O0NBQ0EsU0FBSyxJQUFJUSxHQUFULElBQWdCVCxNQUFoQixFQUF3QjtDQUN0QjtDQUNBLFVBQUlBLE1BQU0sQ0FBQ1UsY0FBUCxDQUFzQkQsR0FBdEIsQ0FBSixFQUFnQztDQUM5QlIsUUFBQUEsTUFBTSxDQUFDUSxHQUFELENBQU4sR0FBY1YsS0FBSyxDQUFDQyxNQUFNLENBQUNTLEdBQUQsQ0FBUCxDQUFuQjtDQUNEO0NBQ0Y7Q0FDRjtDQUNGOztDQVdELFNBQVNFLEtBQVQsQ0FBZUMsTUFBZixFQUF1QlosTUFBdkIsRUFBK0JhLFNBQS9CLEVBQTBDO0NBQ3hDLE1BQUksQ0FBQ3RCLElBQUksQ0FBQ3pELFFBQUwsQ0FBY2tFLE1BQWQsQ0FBRCxJQUEwQixDQUFDVCxJQUFJLENBQUN6RCxRQUFMLENBQWM4RSxNQUFkLENBQS9CLEVBQXNEO0NBQ3BELFdBQU9DLFNBQVMsR0FBR2QsS0FBSyxDQUFDQyxNQUFELENBQVIsR0FBbUJZLE1BQW5DO0NBQ0Q7O0NBQ0QsT0FBSyxJQUFJSCxHQUFULElBQWdCVCxNQUFoQixFQUF3QjtDQUN0QixRQUFJYyxVQUFVLEdBQUdGLE1BQU0sQ0FBQ0gsR0FBRCxDQUF2QjtDQUFBLFFBQ0VNLFVBQVUsR0FBR2YsTUFBTSxDQUFDUyxHQUFELENBRHJCOztDQUVBLFFBQUtsQixJQUFJLENBQUN6RCxRQUFMLENBQWNnRixVQUFkLEtBQTZCdkIsSUFBSSxDQUFDekQsUUFBTCxDQUFjaUYsVUFBZCxDQUE5QixJQUE2RHhCLElBQUksQ0FBQ2hCLE9BQUwsQ0FBYXVDLFVBQWIsS0FBNEJ2QixJQUFJLENBQUNoQixPQUFMLENBQWF3QyxVQUFiLENBQTdGLEVBQXdIO0NBQ3RISixNQUFBQSxLQUFLLENBQUNHLFVBQUQsRUFBYUMsVUFBYixFQUF5QkYsU0FBekIsQ0FBTDtDQUNELEtBRkQsTUFFTyxJQUFJQSxTQUFTLElBQUksRUFBRUosR0FBRyxJQUFJRyxNQUFULENBQWpCLEVBQW1DO0NBQ3hDQSxNQUFBQSxNQUFNLENBQUNILEdBQUQsQ0FBTixHQUFjVixLQUFLLENBQUNDLE1BQU0sQ0FBQ1MsR0FBRCxDQUFQLENBQW5CO0NBQ0Q7Q0FDRjs7Q0FDRCxTQUFPRyxNQUFQO0NBQ0Q7O0NDMUVELElBQUksa0JBQWtCLEdBQUd4RixrQkFBNEMsQ0FBQztDQUN0RSxJQUFJLFdBQVcsR0FBR00sYUFBcUMsQ0FBQztBQUN4RDtDQUNBO0NBQ0E7Q0FDQTtLQUNBLFVBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRTtDQUNqRCxFQUFFLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0NBQzVDLENBQUM7O0NDUkQsSUFBSTJDLEdBQUMsR0FBR2pELE9BQThCLENBQUM7Q0FDdkMsSUFBSSxRQUFRLEdBQUdNLFVBQWlDLENBQUM7Q0FDakQsSUFBSSxVQUFVLEdBQUdTLFVBQW1DLENBQUM7Q0FDckQsSUFBSWhCLE9BQUssR0FBR2lCLE9BQTZCLENBQUM7QUFDMUM7Q0FDQSxJQUFJLG1CQUFtQixHQUFHakIsT0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEU7Q0FDQTtDQUNBO0FBQ0FrRCxJQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUU7Q0FDakUsRUFBRSxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0NBQzFCLElBQUksT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDcEMsR0FBRztDQUNILENBQUMsQ0FBQzs7Q0NiRixJQUFNMkMsYUFBYSxHQUFHO0NBQ3BCQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQUNDLFFBQUQsRUFBYztDQUNwQixXQUFPQSxRQUFQO0NBQ0QsR0FIbUI7Q0FJcEJDLEVBQUFBLE1BQU0sRUFBRSxnQkFBQ0QsUUFBRCxFQUFjO0NBQ3BCLFdBQU9GLGFBQWEsQ0FBQ0ksVUFBZCxDQUF5QkYsUUFBekIsQ0FBUDtDQUNELEdBTm1CO0NBT3BCRSxFQUFBQSxVQUFVLEVBQUUsb0JBQUNDLFNBQUQsRUFBZTtDQUN6QixXQUFPQyxJQUFJLENBQUNDLEdBQUwsQ0FBU0YsU0FBVCxFQUFvQixDQUFwQixDQUFQO0NBQ0QsR0FUbUI7Q0FVcEJHLEVBQUFBLFdBQVcsRUFBRSxxQkFBQ04sUUFBRCxFQUFjO0NBQ3pCLFdBQU9JLElBQUksQ0FBQ0MsR0FBTCxDQUFTTCxRQUFULEVBQW1CLENBQW5CLENBQVA7Q0FDRCxHQVptQjtDQWFwQk8sRUFBQUEsV0FBVyxFQUFFLHFCQUFDUCxRQUFELEVBQWM7Q0FDekIsV0FBT0ksSUFBSSxDQUFDQyxHQUFMLENBQVNMLFFBQVQsRUFBbUIsQ0FBbkIsQ0FBUDtDQUNELEdBZm1CO0NBZ0JwQlEsRUFBQUEsV0FBVyxFQUFFLHFCQUFDUixRQUFELEVBQWM7Q0FDekIsV0FBT0ksSUFBSSxDQUFDQyxHQUFMLENBQVNMLFFBQVQsRUFBbUIsQ0FBbkIsQ0FBUDtDQUNELEdBbEJtQjtDQW1CcEJTLEVBQUFBLE9BQU8sRUFBRSxpQkFBQ1QsUUFBRCxFQUFjO0NBQ3JCLFdBQU9GLGFBQWEsQ0FBQ1ksV0FBZCxDQUEwQlYsUUFBMUIsQ0FBUDtDQUNELEdBckJtQjtDQXNCcEJVLEVBQUFBLFdBQVcsRUFBRSxxQkFBQ1YsUUFBRCxFQUFjO0NBQ3pCLFdBQU9BLFFBQVEsR0FBRyxDQUFYLEdBQWVJLElBQUksQ0FBQ0MsR0FBTCxDQUFTTCxRQUFULEVBQW1CLENBQW5CLENBQXRCO0NBQ0QsR0F4Qm1CO0NBeUJwQlcsRUFBQUEsWUFBWSxFQUFFLHNCQUFDWCxRQUFELEVBQWM7Q0FDMUIsV0FBT0ksSUFBSSxDQUFDQyxHQUFMLENBQVNMLFFBQVEsR0FBRyxDQUFwQixFQUF1QixDQUF2QixJQUE0QixDQUFuQztDQUNELEdBM0JtQjtDQTRCcEJZLEVBQUFBLFlBQVksRUFBRSxzQkFBQ1osUUFBRCxFQUFjO0NBQzFCLFdBQU8sSUFBSUksSUFBSSxDQUFDQyxHQUFMLENBQVNMLFFBQVEsR0FBRyxDQUFwQixFQUF1QixDQUF2QixDQUFYO0NBQ0QsR0E5Qm1CO0NBK0JwQmEsRUFBQUEsWUFBWSxFQUFFLHNCQUFDYixRQUFELEVBQWM7Q0FDMUIsV0FBT0ksSUFBSSxDQUFDQyxHQUFMLENBQVNMLFFBQVEsR0FBRyxDQUFwQixFQUF1QixDQUF2QixJQUE0QixDQUFuQztDQUNEO0NBakNtQixDQUF0QjtLQW1DTWMsUUFBUSxHQUFHO0NBQ2pCdEMsTUFBTSxDQUFDdUMsSUFBUCxDQUFZakIsYUFBWixFQUEyQmhDLE9BQTNCLENBQW1DLFVBQUN5QixHQUFELEVBQVM7Q0FDMUN1QixFQUFBQSxRQUFRLENBQUN2QixHQUFELENBQVIsR0FBZ0JBLEdBQWhCO0NBQ0QsQ0FGRDs7Q0NqQ0EsSUFBTXlCLGNBQWMsR0FBRztDQUNyQkMsRUFBQUEsS0FBSyxFQUFFLEVBRGM7Q0FFckJDLEVBQUFBLEtBQUssRUFBRSxDQUZjO0NBR3JCQyxFQUFBQSxRQUFRLEVBQUUsSUFIVztDQUlyQkMsRUFBQUEsSUFBSSxFQUFFLGNBQUNwQixRQUFELEVBQVdrQixLQUFYLEVBQXFCO0NBQ3pCLFdBQU9sQixRQUFRLElBQUlrQixLQUFuQjtDQUNELEdBTm9CO0NBT3JCRyxFQUFBQSxLQUFLLEVBQUUsaUJBQU07Q0FBQ0MsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtDQUFxQixHQVBkO0NBUXJCQyxFQUFBQSxHQUFHLEVBQUUsZUFBTTtDQUFDRixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaO0NBQW1CLEdBUlY7Q0FTckJFLEVBQUFBLFFBQVEsRUFBRTtDQVRXLENBQXZCOztDQVlBLFNBQVNDLGlCQUFULEdBQTZCO0NBQzNCLE1BQUlSLEtBQUssR0FBRyxDQUFaO0NBQ0EsU0FBTyxVQUFVbEIsUUFBVixFQUFvQnlCLFFBQXBCLEVBQThCRSxNQUE5QixFQUFzQztDQUMzQyxRQUFJQyxTQUFTLEdBQUcsQ0FBaEI7O0NBQ0EsUUFBSVYsS0FBSyxHQUFHLENBQVIsS0FBYyxDQUFsQixFQUFxQjtDQUNuQlUsTUFBQUEsU0FBUyxHQUFHNUIsUUFBUSxJQUFJa0IsS0FBWixJQUFxQkEsS0FBSyxJQUFJLENBQTlCLElBQW1DQSxLQUFLLEdBQUdsQixRQUF2RDtDQUNELEtBRkQsTUFFTztDQUNMNEIsTUFBQUEsU0FBUyxHQUFHNUIsUUFBUSxJQUFJa0IsS0FBWixJQUFxQkEsS0FBSyxJQUFJLENBQTlCLElBQW1DbEIsUUFBUSxJQUFJa0IsS0FBSyxHQUFHLENBQVosQ0FBdkQ7Q0FDRDs7Q0FDRFUsSUFBQUEsU0FBUyxHQUFHSCxRQUFRLENBQUNHLFNBQUQsQ0FBcEI7Q0FDQUQsSUFBQUEsTUFBTSxDQUFDQyxTQUFELENBQU47Q0FDRCxHQVREO0NBVUQ7O0NBRUQsU0FBU0MsZ0JBQVQsQ0FBMEJDLE9BQTFCLEVBQW1DO0NBQ2pDLE1BQUlDLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFMLEVBQVo7Q0FBQSxNQUNFQyxXQUFXLEdBQUdSLGlCQUFpQixFQURqQztDQUVBLE1BQVFQLFFBQVIsR0FBb0RXLE9BQXBELENBQVFYLFFBQVI7Q0FBQSxNQUFrQlEsTUFBbEIsR0FBb0RHLE9BQXBELENBQWtCSCxNQUFsQjtDQUFBLE1BQTBCUCxJQUExQixHQUFvRFUsT0FBcEQsQ0FBMEJWLElBQTFCO0NBQUEsTUFBZ0NLLFFBQWhDLEdBQW9ESyxPQUFwRCxDQUFnQ0wsUUFBaEM7Q0FBQSxNQUEwQ1AsS0FBMUMsR0FBb0RZLE9BQXBELENBQTBDWixLQUExQzs7Q0FDQSxNQUFJaUIsRUFBRSxHQUFHLFNBQUxBLEVBQUssR0FBTTtDQUNiLFFBQUlDLE1BQU0sR0FBR0osSUFBSSxDQUFDQyxHQUFMLEtBQWFGLEtBQTFCO0NBQUEsUUFDRS9CLFFBQVEsR0FBR29DLE1BQU0sR0FBR2pCLFFBRHRCO0NBQUEsUUFFRWtCLEVBQUUsR0FBRyxJQUZQOztDQUdBLFFBQUlqQixJQUFJLENBQUNwQixRQUFELEVBQVdrQixLQUFYLENBQVIsRUFBMkI7Q0FDekJnQixNQUFBQSxXQUFXLENBQUNsQyxRQUFELEVBQVd5QixRQUFYLEVBQXFCRSxNQUFyQixDQUFYO0NBQ0FVLE1BQUFBLEVBQUUsR0FBR0MscUJBQXFCLENBQUNILEVBQUQsQ0FBMUI7Q0FDRCxLQUhELE1BR087Q0FDTEksTUFBQUEsb0JBQW9CLENBQUNGLEVBQUQsQ0FBcEI7Q0FDQUgsTUFBQUEsV0FBVyxDQUFDbEMsUUFBRCxFQUFXeUIsUUFBWCxFQUFxQkUsTUFBckIsQ0FBWDtDQUNBRyxNQUFBQSxPQUFPLENBQUNOLEdBQVI7Q0FDRDtDQUNGLEdBWkQ7O0NBYUFXLEVBQUFBLEVBQUU7Q0FDRkwsRUFBQUEsT0FBTyxDQUFDVCxLQUFSO0NBQ0Q7O0NBRUQsU0FBU21CLHFCQUFULENBQStCVixPQUEvQixFQUF3QztDQUN0QyxNQUFJQyxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxFQUFaO0NBQUEsTUFDRUMsV0FBVyxHQUFHUixpQkFBaUIsRUFEakM7Q0FFQSxNQUFRVCxLQUFSLEdBQTJEYSxPQUEzRCxDQUFRYixLQUFSO0NBQUEsTUFBZUUsUUFBZixHQUEyRFcsT0FBM0QsQ0FBZVgsUUFBZjtDQUFBLE1BQXlCUSxNQUF6QixHQUEyREcsT0FBM0QsQ0FBeUJILE1BQXpCO0NBQUEsTUFBaUNQLElBQWpDLEdBQTJEVSxPQUEzRCxDQUFpQ1YsSUFBakM7Q0FBQSxNQUF1Q0ssUUFBdkMsR0FBMkRLLE9BQTNELENBQXVDTCxRQUF2QztDQUFBLE1BQWlEUCxLQUFqRCxHQUEyRFksT0FBM0QsQ0FBaURaLEtBQWpEO0NBQ0EsTUFBSW1CLEVBQUUsR0FBR0ksV0FBVyxDQUFDLFlBQU07Q0FDekIsUUFBSUwsTUFBTSxHQUFHSixJQUFJLENBQUNDLEdBQUwsS0FBYUYsS0FBMUI7Q0FBQSxRQUNFL0IsUUFBUSxHQUFHb0MsTUFBTSxHQUFHakIsUUFEdEI7O0NBRUEsUUFBSUMsSUFBSSxDQUFDcEIsUUFBRCxFQUFXa0IsS0FBWCxDQUFSLEVBQTJCO0NBQ3pCZ0IsTUFBQUEsV0FBVyxDQUFDbEMsUUFBRCxFQUFXeUIsUUFBWCxFQUFxQkUsTUFBckIsQ0FBWDtDQUNELEtBRkQsTUFFTztDQUNMZSxNQUFBQSxhQUFhLENBQUNMLEVBQUQsQ0FBYjtDQUNBSCxNQUFBQSxXQUFXLENBQUNsQyxRQUFELEVBQVd5QixRQUFYLEVBQXFCRSxNQUFyQixDQUFYO0NBQ0FHLE1BQUFBLE9BQU8sQ0FBQ04sR0FBUjtDQUNEO0NBQ0YsR0FWbUIsRUFVakJQLEtBVmlCLENBQXBCO0NBV0FhLEVBQUFBLE9BQU8sQ0FBQ1QsS0FBUjtDQUNEOztDQUVELFNBQVNzQixTQUFULENBQW1CYixPQUFuQixFQUE0QjtDQUMxQkEsRUFBQUEsT0FBTyxHQUFHckMsS0FBSyxDQUFDdUIsY0FBRCxFQUFpQmMsT0FBakIsRUFBMEIsSUFBMUIsQ0FBZjs7Q0FDQSxNQUFJLENBQUN6RCxJQUFJLENBQUN1RSxVQUFMLENBQWdCZCxPQUFPLENBQUNMLFFBQXhCLENBQUwsRUFBd0M7Q0FDdENLLElBQUFBLE9BQU8sQ0FBQ0wsUUFBUixHQUFtQjNCLGFBQWEsQ0FBQ2dDLE9BQU8sQ0FBQ0wsUUFBVCxDQUFoQztDQUNEOztDQUNELE1BQUlvQixNQUFNLENBQUNQLHFCQUFYLEVBQWtDO0NBQ2hDVCxJQUFBQSxnQkFBZ0IsQ0FBQ0MsT0FBRCxDQUFoQjtDQUNELEdBRkQsTUFFTztDQUNMVSxJQUFBQSxxQkFBcUIsQ0FBQ1YsT0FBRCxDQUFyQjtDQUNEO0NBQ0Y7O0NDOUVELElBQUksS0FBSyxHQUFHNUgsT0FBNkIsQ0FBQztDQUMxQyxJQUFJLGVBQWUsR0FBR00saUJBQXlDLENBQUM7Q0FDaEUsSUFBSSxVQUFVLEdBQUdTLGVBQXlDLENBQUM7QUFDM0Q7Q0FDQSxJQUFJLE9BQU8sR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekM7S0FDQTZILDhCQUFjLEdBQUcsVUFBVSxXQUFXLEVBQUU7Q0FDeEM7Q0FDQTtDQUNBO0NBQ0EsRUFBRSxPQUFPLFVBQVUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtDQUNoRCxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNuQixJQUFJLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0NBQzdDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFlBQVk7Q0FDdkMsTUFBTSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0NBQ3hCLEtBQUssQ0FBQztDQUNOLElBQUksT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztDQUNqRCxHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7O0NDakJELElBQUksQ0FBQyxHQUFHNUksT0FBOEIsQ0FBQztDQUN2QyxJQUFJLElBQUksR0FBR00sY0FBdUMsQ0FBQyxHQUFHLENBQUM7Q0FDdkQsSUFBSSw0QkFBNEIsR0FBR1MsOEJBQXdELENBQUM7QUFDNUY7Q0FDQSxJQUFJLG1CQUFtQixHQUFHLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7Q0FDbEUsRUFBRSxHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsVUFBVSxrQkFBa0I7Q0FDaEQsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztDQUNuRixHQUFHO0NBQ0gsQ0FBQyxDQUFDOztLQ2RJOEg7Q0FDSixxQkFBWUMsR0FBWixFQUFpQjtDQUFBOztDQUNmLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDtDQUNBLFNBQUtDLElBQUw7Q0FDRDs7OztZQUNELGdCQUFPO0NBQ0wsV0FBS0MsSUFBTCxHQUFZLEtBQUtGLEdBQUwsQ0FBU0UsSUFBckI7Q0FDQSxXQUFLbkIsS0FBTCxHQUFhLEtBQUtpQixHQUFMLENBQVNqQixLQUF0QjtDQUNBLFdBQUtQLEdBQUwsR0FBVyxLQUFLd0IsR0FBTCxDQUFTeEIsR0FBcEI7Q0FDQSxXQUFLMkIsT0FBTCxHQUFlLEtBQUtILEdBQUwsQ0FBU0csT0FBeEI7Q0FDRDs7O1lBQ0QsbUJBQVU7Q0FDUixhQUFPLEtBQUtDLE1BQVo7Q0FDRDs7O1lBQ0Qsb0JBQVc7Q0FDVCxhQUFPLEtBQUtGLElBQVo7Q0FDRDs7O1lBQ0Qsa0JBQVNHLEdBQVQsRUFBY3JELFFBQWQsRUFBd0I7Q0FDdEIsVUFBSXNELEtBQUssR0FBRyxDQUFDLEtBQUtDLE1BQUwsR0FBYyxLQUFLQyxRQUFwQixJQUFnQ3hELFFBQWhDLEdBQTJDLEtBQUt5RCxVQUE1RDtDQUNBSixNQUFBQSxHQUFHLENBQUNLLEtBQUosQ0FBVSxLQUFLUixJQUFmLElBQXVCSSxLQUFLLEdBQUcsS0FBS0ssTUFBcEM7Q0FDRDs7Ozs7O0tDbkJHQzs7Ozs7Q0FDSiw4QkFBWVosR0FBWixFQUFpQjtDQUFBOztDQUFBOztDQUNmLDhCQUFNQSxHQUFOOztDQUNBLFVBQUthLFFBQUw7O0NBRmU7Q0FHaEI7Ozs7WUFDRCxvQkFBVztDQUNULFVBQUlDLFVBQVUsR0FBRyxtQkFBbUJDLElBQW5CLENBQXdCLEtBQUtoQyxLQUE3QixDQUFqQjtDQUFBLFVBQ0VpQyxRQUFRLEdBQUcsbUJBQW1CRCxJQUFuQixDQUF3QixLQUFLdkMsR0FBN0IsQ0FEYjtDQUFBLFVBRUV5QyxZQUFZLEdBQUcsbUJBQW1CRixJQUFuQixDQUF3QixLQUFLWixPQUE3QixDQUZqQjtDQUdBLFdBQUtRLE1BQUwsR0FBY0csVUFBVSxDQUFDLENBQUQsQ0FBVixJQUFpQixJQUEvQjtDQUNBLFdBQUtOLFFBQUwsR0FBZ0JNLFVBQVUsQ0FBQyxDQUFELENBQTFCO0NBQ0EsV0FBS1AsTUFBTCxHQUFjUyxRQUFRLENBQUMsQ0FBRCxDQUF0QjtDQUNBLFdBQUtQLFVBQUwsR0FBa0JRLFlBQVksQ0FBQyxDQUFELENBQVosR0FBa0IsQ0FBcEM7Q0FDRDs7OztHQWI4QmxCOztLQ0UzQm1CO0NBQ0osNEJBQVlDLFVBQVosRUFBd0JDLFFBQXhCLEVBQWtDQyxFQUFsQyxFQUFzQztDQUFBOztDQUNwQyxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7O0NBRG9DLGdDQUVYLEtBQUtDLDJCQUFMLENBQWlDSCxVQUFqQyxFQUE2Q0MsUUFBN0MsQ0FGVzs7Q0FBQTs7Q0FFbkNELElBQUFBLFVBRm1DO0NBRXZCQyxJQUFBQSxRQUZ1QjtDQUdwQyxTQUFLbkIsSUFBTCxDQUFVa0IsVUFBVixFQUFzQkMsUUFBdEI7Q0FDRDs7OztZQUNELGNBQUtELFVBQUwsRUFBaUJDLFFBQWpCLEVBQTJCO0NBQUE7O0NBQ3pCLFdBQUtHLFVBQUwsR0FBa0IsRUFBbEI7Q0FDQS9GLE1BQUFBLE1BQU0sQ0FBQ3VDLElBQVAsQ0FBWW9ELFVBQVosRUFBd0JyRyxPQUF4QixDQUFnQyxVQUFDb0YsSUFBRCxFQUFVO0NBQ3hDLFlBQUlzQixNQUFNLEdBQUc7Q0FDWHRCLFVBQUFBLElBQUksRUFBRUEsSUFESztDQUVYQyxVQUFBQSxPQUFPLEVBQUVOLE1BQU0sQ0FBQzRCLGdCQUFQLENBQXdCLEtBQUksQ0FBQ0osRUFBN0IsRUFBaUNuQixJQUFqQyxDQUZFO0NBR1huQixVQUFBQSxLQUFLLEVBQUVvQyxVQUFVLENBQUNqQixJQUFELENBSE47Q0FJWDFCLFVBQUFBLEdBQUcsRUFBRTRDLFFBQVEsQ0FBQ2xCLElBQUQ7Q0FKRixTQUFiOztDQU1BLFFBQUEsS0FBSSxDQUFDcUIsVUFBTCxDQUFnQkcsSUFBaEIsQ0FBcUIsSUFBSWQsa0JBQUosQ0FBdUJZLE1BQXZCLENBQXJCO0NBQ0QsT0FSRDtDQVNEOzs7WUFFRCxpQkFBUW5CLEdBQVIsRUFBYXJELFFBQWIsRUFBdUI7Q0FDckIsV0FBS3VFLFVBQUwsQ0FBZ0J6RyxPQUFoQixDQUF3QixVQUFDMEcsTUFBRCxFQUFZO0NBQ2xDQSxRQUFBQSxNQUFNLENBQUNHLFFBQVAsQ0FBZ0J0QixHQUFoQixFQUFxQnJELFFBQXJCO0NBQ0QsT0FGRDtDQUdEOzs7WUFDRCxxQ0FBNEJtRSxVQUE1QixFQUF3Q0MsUUFBeEMsRUFBa0Q7Q0FBQTs7Q0FDaEQ1RixNQUFBQSxNQUFNLENBQUN1QyxJQUFQLENBQVlxRCxRQUFaLEVBQXNCdEcsT0FBdEIsQ0FBOEIsVUFBQ29GLElBQUQsRUFBVTtDQUN0QyxZQUFJLENBQUNpQixVQUFVLENBQUNqQixJQUFELENBQWYsRUFBdUI7Q0FDckJpQixVQUFBQSxVQUFVLENBQUNqQixJQUFELENBQVYsR0FBbUJMLE1BQU0sQ0FBQzRCLGdCQUFQLENBQXdCLE1BQUksQ0FBQ0osRUFBN0IsRUFBaUNuQixJQUFqQyxDQUFuQjtDQUNEO0NBQ0YsT0FKRDtDQUtBa0IsTUFBQUEsUUFBUSxHQUFHM0UsS0FBSyxDQUFDMkUsUUFBRCxFQUFXRCxVQUFYLEVBQXVCLEtBQXZCLENBQWhCO0NBQ0EsYUFBTyxDQUFDQSxVQUFELEVBQWFDLFFBQWIsQ0FBUDtDQUNEOzs7Ozs7S0NqQ0d6QyxNQUFNLEdBQUc7Q0FDYmlELEVBQUFBLE1BQU0sRUFBRSxnQkFBQ1AsRUFBRCxFQUFLaEYsSUFBTCxFQUFXd0YsRUFBWCxFQUFrQjtDQUN4QixRQUFJQyxRQUFRLEdBQUcsSUFBSVosZ0JBQUosQ0FBcUI3RSxJQUFyQixFQUEyQndGLEVBQTNCLEVBQStCUixFQUEvQixDQUFmO0NBQ0EsV0FBTyxVQUFVckUsUUFBVixFQUFvQjtDQUN6QjhFLE1BQUFBLFFBQVEsQ0FBQ0MsT0FBVCxDQUFpQlYsRUFBakIsRUFBcUJyRSxRQUFyQjtDQUNELEtBRkQ7Q0FHRCxHQU5ZO0NBT2I2RSxFQUFBQSxFQUFFLEVBQUUsWUFBQ1IsRUFBRCxFQUFLUSxHQUFMLEVBQVk7Q0FDZCxRQUFJQyxRQUFRLEdBQUcsSUFBSVosZ0JBQUosQ0FBcUIsRUFBckIsRUFBeUJXLEdBQXpCLEVBQTZCUixFQUE3QixDQUFmO0NBQ0EsV0FBTyxVQUFVckUsUUFBVixFQUFvQjtDQUN6QjhFLE1BQUFBLFFBQVEsQ0FBQ0MsT0FBVCxDQUFpQlYsRUFBakIsRUFBcUJyRSxRQUFyQjtDQUNELEtBRkQ7Q0FHRDtDQVpZOzs7Ozs7Ozs7Ozs7In0=
