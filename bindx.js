(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = bindContext;

var _MultiKeyMap = __webpack_require__(1);

var _MultiKeyMap2 = _interopRequireDefault(_MultiKeyMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sample:
 *     onClick={this.onClick.bind(this, item)}
 * =>
 *     onClick={bindx(this, this.onClick, item)}
 * Or
 *     onClick={this.onClick.bind(this, item)}
 * =>
 *     onClick={bindx(this, this.onClick, item)}
 * @param  {object}    context : this
 * @param  {function}  func    : to bind function
 * @param  {...args}   rest    : args
 * @return {function}          : return a memorized function
 */
var multiKeyMap = new _MultiKeyMap2.default();
function bindContext(context, func) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
    }

    var cached = multiKeyMap.get([context, func].concat(rest));
    if (!cached) {
        cached = func.bind.apply(func, [context].concat(rest));
        multiKeyMap.set([context, func].concat(rest), cached);
    }

    return cached;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiKeyMap = function () {
    function MultiKeyMap() {
        _classCallCheck(this, MultiKeyMap);

        this.weakMap = new WeakMap();
        this.primitiveMap = new Map();
        this.value = undefined;
    }

    _createClass(MultiKeyMap, [{
        key: 'getMapByKeyType',
        value: function getMapByKeyType(key) {
            // Notice: typeof null === 'object';
            if (key !== null && ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' || typeof key === 'function')) {
                return this.weakMap;
            }
            return this.primitiveMap;
        }
    }, {
        key: 'set',
        value: function set(keys, value) {
            if (keys.length === 0) {
                this.value = value;
            } else {
                var _keys = _toArray(keys),
                    key = _keys[0],
                    rest = _keys.slice(1);

                var map = this.getMapByKeyType(key);
                var childMap = map.get(key);
                if (!childMap) {
                    childMap = new MultiKeyMap();
                    map.set(key, childMap);
                }

                childMap.set(rest, value);
            }

            return this;
        }
    }, {
        key: 'get',
        value: function get(keys) {
            if (keys.length === 0) {
                return this.value;
            }

            var _keys2 = _toArray(keys),
                key = _keys2[0],
                rest = _keys2.slice(1);

            var map = this.getMapByKeyType(key);
            var childMap = map.get(key);
            return childMap ? childMap.get(rest) : undefined;
        }
    }]);

    return MultiKeyMap;
}();

exports.default = MultiKeyMap;

/***/ })
/******/ ]);
});