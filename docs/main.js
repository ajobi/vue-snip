(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueSnip = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var defaultOptions = {
    directiveName: 'snip',
    snipMethod: 'css',
    maxLines: 3,
    separators: ['. ', ', ', ' ', ''],
    ellipsis: ".\u200A.\u200A.",
    debugMode: false,
    exposeSnipFunction: false,
    snipFunctionName: 'snipText'
  };

  // https://css-tricks.com/almanac/properties/l/line-clamp/
  var snipByCSS = function snipByCSS(state, el) {
    var _state$elementMap$get = state.elementMap.get(el),
        fullText = _state$elementMap$get.fullText,
        maxLines = _state$elementMap$get.maxLines;

    el.textContent = fullText;
    el.style.display = '-webkit-box';
    el.style.webkitLineClamp = maxLines;
    el.style.webkitBoxOrient = 'vertical';
    el.style.overflow = 'hidden';
  };

  var UA_LINE_HEIGHT = 1.2;
  var elementLines = function elementLines(el) {
    var computedStyle = window.getComputedStyle(el);
    var computedHeight = parseFloat(computedStyle.height);
    var computedLineHeight = computedStyle.lineHeight === 'normal' ? parseFloat(computedStyle.fontSize) * UA_LINE_HEIGHT : parseFloat(computedStyle.lineHeight);

    if (computedHeight === 0 && computedLineHeight === 0) {
      return 0;
    }

    return Math.ceil(computedHeight / computedLineHeight);
  };

  var snipByJS = function snipByJS(state, el) {
    var _state$elementMap$get = state.elementMap.get(el),
        fullText = _state$elementMap$get.fullText,
        maxLines = _state$elementMap$get.maxLines;

    var _state$options = state.options,
        ellipsis = _state$options.ellipsis,
        separators = _state$options.separators;
    el.textContent = fullText;
    el.style.display = null;
    el.style.webkitLineClamp = null;
    el.style.webkitBoxOrient = null;
    el.style.overflow = null;

    if (maxLines <= 0 || elementLines(el) <= maxLines) {
      return;
    }

    var snipProgress = {
      unprocessed: fullText,
      processed: ''
    };
    separators.forEach(function (separator) {
      var _iterator = _createForOfIteratorHelper(snipProgress.unprocessed.split(separator)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var chunk = _step.value;
          el.textContent = "".concat(snipProgress.processed).concat(chunk).concat(separator).concat(ellipsis);

          if (elementLines(el) > maxLines) {
            snipProgress.unprocessed = chunk;
            break;
          }

          snipProgress.processed = "".concat(snipProgress.processed).concat(chunk).concat(separator);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    el.textContent = "".concat(snipProgress.processed.trim()).concat(ellipsis);
  };

  var getSnipText = function getSnipText(state) {
    return function (el) {
      var elState = state.elementMap.get(el);

      if (elState.snipMethod === 'css') {
        snipByCSS(state, el);
        return;
      }

      if (elState.snipMethod === 'js') {
        snipByJS(state, el);
        elState.prevWidth = el.clientWidth;
        elState.prevHeight = el.clientHeight;
      }
    };
  };

  var normalizeMaxLines = function normalizeMaxLines(state, maxLines) {
    var parsedMaxLines = parseInt(maxLines);

    if (!isNaN(parsedMaxLines)) {
      return parsedMaxLines;
    }

    var globalMaxLines = state.options.maxLines;
    var parsedGlobalMaxLines = parseInt(globalMaxLines);

    if (!isNaN(parsedGlobalMaxLines)) {
      return parsedGlobalMaxLines;
    }

    return defaultOptions.maxLines;
  };

  var supportsCSSMethod = function supportsCSSMethod() {
    return typeof CSS !== 'undefined' && CSS.supports('display', '-webkit-box') && CSS.supports('-webkit-line-clamp', '3') && CSS.supports('-webkit-box-orient', 'vertical');
  };

  var normalizeSnipMethod = function normalizeSnipMethod(state, snipMethod) {
    if (!supportsCSSMethod()) {
      return 'js';
    }

    if (snipMethod === 'css' || snipMethod === 'js') {
      return snipMethod;
    }

    var globalSnipMethod = state.options.snipMethod;

    if (globalSnipMethod === 'css' || globalSnipMethod === 'js') {
      return globalSnipMethod;
    }

    return defaultOptions.snipMethod;
  };

  var addObserver = function addObserver(state, snipText, el) {
    var elState = state.elementMap.get(el);
    var observer = elState.observer || new ResizeObserver(function () {
      if (el.clientWidth !== elState.prevWidth || el.clientHeight !== elState.prevHeight) {
        snipText(el);
      }
    });
    observer.observe(el);
    elState.observer = observer;
  };

  var destroyObserver = function destroyObserver(state, el) {
    var elState = state.elementMap.get(el);
    elState.observer && elState.observer.disconnect();
    elState.observer && delete elState.prevWidth;
    elState.observer && delete elState.prevHeight;
    elState.observer && delete elState.observer;
  };

  var getInserted = function getInserted(state, snipText) {
    return function (el, _ref) {
      var value = _ref.value,
          arg = _ref.arg;
      var elementMap = state.elementMap;
      var elState = {
        fullText: el.textContent,
        maxLines: normalizeMaxLines(state, value),
        snipMethod: normalizeSnipMethod(state, arg)
      };
      elementMap.set(el, elState);
      var needsObserver = elState.snipMethod === 'js';
      needsObserver && typeof ResizeObserver !== 'undefined' ? addObserver(state, snipText, el) : snipText(el);
    };
  };

  var getUpdate = function getUpdate(state, snipText) {
    return function (el, _ref) {
      var value = _ref.value,
          arg = _ref.arg;
      var elState = state.elementMap.get(el);
      var prevMaxlines = elState.maxLines;
      var prevMethod = elState.snipMethod;
      elState.maxLines = normalizeMaxLines(state, value);
      elState.snipMethod = normalizeSnipMethod(state, arg);
      var needsObserver = elState.snipMethod === 'js';
      needsObserver && typeof ResizeObserver !== 'undefined' ? addObserver(state, snipText, el) : destroyObserver(state, el);
      var needsSnipping = prevMaxlines !== elState.maxLines || prevMethod !== elState.snipMethod && elState.snipMethod === 'css';
      needsSnipping && snipText(el);
    };
  };

  var getUnbind = function getUnbind(state) {
    return function (el) {
      var elementMap = state.elementMap;
      destroyObserver(state, el);
      elementMap.delete(el);
    };
  };

  var index = {
    install: function install(Vue, options) {
      var _Vue$directive;

      options = _objectSpread2(_objectSpread2({}, defaultOptions), options);
      var elementMap = new WeakMap();
      var state = {
        elementMap: elementMap,
        options: options
      };
      var snipText = getSnipText(state);
      var inserted = getInserted(state, snipText);
      var update = getUpdate(state, snipText);
      var unbind = getUnbind(state);
      var isVue3 = Vue.version[0] > 2;
      Vue.directive(options.directiveName, (_Vue$directive = {}, _defineProperty(_Vue$directive, isVue3 ? 'mounted' : 'inserted', inserted), _defineProperty(_Vue$directive, isVue3 ? 'updated' : 'update', update), _defineProperty(_Vue$directive, isVue3 ? 'unmounted' : 'unbind', unbind), _Vue$directive));

      if (options.exposeSnipFunction) {
        Vue.prototype["$".concat(options.snipFunctionName)] = snipText;
      }

      if (options.debugMode) {
        window.__VueSnipState = state;
      }
    }
  };

  return index;

}));
