// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/cross-fetch/dist/browser-ponyfill.js":[function(require,module,exports) {

var global = typeof self !== 'undefined' ? self : this;
var __self__ = (function () {
function F() {
this.fetch = false;
this.DOMException = global.DOMException
}
F.prototype = global;
return new F();
})();
(function(self) {

var irrelevant = (function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
exports.default = ctx.fetch // For TypeScript consumers without esModuleInterop.
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
exports.Headers = ctx.Headers
exports.Request = ctx.Request
exports.Response = ctx.Response
module.exports = exports

},{}],"node_modules/graphql/jsutils/isObjectLike.js":[function(require,module,exports) {
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isObjectLike = isObjectLike;
/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */

function isObjectLike(value) {
  return _typeof(value) == 'object' && value !== null;
}
},{}],"node_modules/graphql/jsutils/invariant.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.invariant = invariant;

function invariant(condition, message) {
  var booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message != null ? message : 'Unexpected invariant triggered.');
  }
}
},{}],"node_modules/graphql/language/location.js":[function(require,module,exports) {
'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getLocation = getLocation;

var _invariant = require('../jsutils/invariant.js');

var LineRegExp = /\r\n|[\n\r]/g;
/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */

function getLocation(source, position) {
  var lastLineStart = 0;
  var line = 1;

  var _iterator = _createForOfIteratorHelper(source.body.matchAll(LineRegExp)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var match = _step.value;
      typeof match.index === 'number' || (0, _invariant.invariant)(false);

      if (match.index >= position) {
        break;
      }

      lastLineStart = match.index + match[0].length;
      line += 1;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return {
    line: line,
    column: position + 1 - lastLineStart
  };
}
},{"../jsutils/invariant.js":"node_modules/graphql/jsutils/invariant.js"}],"node_modules/graphql/language/printLocation.js":[function(require,module,exports) {
'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printLocation = printLocation;
exports.printSourceLocation = printSourceLocation;

var _location = require('./location.js');
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */


function printLocation(location) {
  return printSourceLocation(location.source, (0, _location.getLocation)(location.source, location.start));
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */


function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = ''.padStart(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];

    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return locationStr + printPrefixedLines([["".concat(lineNum, " |"), subLines[0]]].concat(_toConsumableArray(subLines.slice(1, subLineIndex + 1).map(function (subLine) {
      return ['|', subLine];
    })), [['|', '^'.padStart(subLineColumnNum)], ['|', subLines[subLineIndex + 1]]]));
  }

  return locationStr + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
  ["".concat(lineNum - 1, " |"), lines[lineIndex - 1]], ["".concat(lineNum, " |"), locationLine], ['|', '^'.padStart(columnNum)], ["".concat(lineNum + 1, " |"), lines[lineIndex + 1]]]);
}

function printPrefixedLines(lines) {
  var existingLines = lines.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        _ = _ref2[0],
        line = _ref2[1];

    return line !== undefined;
  });
  var padLen = Math.max.apply(Math, _toConsumableArray(existingLines.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        prefix = _ref4[0];

    return prefix.length;
  })));
  return existingLines.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        prefix = _ref6[0],
        line = _ref6[1];

    return prefix.padStart(padLen) + (line ? ' ' + line : '');
  }).join('\n');
}
},{"./location.js":"node_modules/graphql/language/location.js"}],"node_modules/graphql/error/GraphQLError.js":[function(require,module,exports) {
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.GraphQLError = void 0;
exports.formatError = formatError;
exports.printError = printError;

var _isObjectLike = require('../jsutils/isObjectLike.js');

var _location = require('../language/location.js');

var _printLocation = require('../language/printLocation.js');

function toNormalizedArgs(args) {
  var firstArg = args[0];

  if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }

  return firstArg;
}
/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */


var GraphQLError = /*#__PURE__*/function (_Error, _Symbol$toStringTag) {
  _inherits(GraphQLError, _Error);

  var _super = _createSuper(GraphQLError);

  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */

  /**
   * @deprecated Please use the `GraphQLErrorArgs` constructor overload instead.
   */
  function GraphQLError(message) {
    var _this;

    _classCallCheck(this, GraphQLError);

    var _this$nodes, _nodeLocations$, _ref;

    for (var _len = arguments.length, rawArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rawArgs[_key - 1] = arguments[_key];
    }

    var _toNormalizedArgs = toNormalizedArgs(rawArgs),
        nodes = _toNormalizedArgs.nodes,
        source = _toNormalizedArgs.source,
        positions = _toNormalizedArgs.positions,
        path = _toNormalizedArgs.path,
        originalError = _toNormalizedArgs.originalError,
        extensions = _toNormalizedArgs.extensions;

    _this = _super.call(this, message);
    _this.name = 'GraphQLError';
    _this.path = path !== null && path !== void 0 ? path : undefined;
    _this.originalError = originalError !== null && originalError !== void 0 ? originalError : undefined; // Compute list of blame nodes.

    _this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined);
    var nodeLocations = undefinedIfEmpty((_this$nodes = _this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map(function (node) {
      return node.loc;
    }).filter(function (loc) {
      return loc != null;
    })); // Compute locations in the source for the given nodes/positions.

    _this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
    _this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map(function (loc) {
      return loc.start;
    });
    _this.locations = positions && source ? positions.map(function (pos) {
      return (0, _location.getLocation)(source, pos);
    }) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map(function (loc) {
      return (0, _location.getLocation)(loc.source, loc.start);
    });
    var originalExtensions = (0, _isObjectLike.isObjectLike)(originalError === null || originalError === void 0 ? void 0 : originalError.extensions) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : undefined;
    _this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : Object.create(null); // Only properties prescribed by the spec should be enumerable.
    // Keep the rest as non-enumerable.

    Object.defineProperties(_assertThisInitialized(_this), {
      message: {
        writable: true,
        enumerable: true
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    }); // Include (non-enumerable) stack trace.

    /* c8 ignore start */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317

    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
    /* c8 ignore stop */


    return _this;
  }

  _createClass(GraphQLError, [{
    key: _Symbol$toStringTag,
    get: function get() {
      return 'GraphQLError';
    }
  }, {
    key: "toString",
    value: function toString() {
      var output = this.message;

      if (this.nodes) {
        var _iterator = _createForOfIteratorHelper(this.nodes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;

            if (node.loc) {
              output += '\n\n' + (0, _printLocation.printLocation)(node.loc);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (this.source && this.locations) {
        var _iterator2 = _createForOfIteratorHelper(this.locations),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var location = _step2.value;
            output += '\n\n' + (0, _printLocation.printSourceLocation)(this.source, location);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return output;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var formattedError = {
        message: this.message
      };

      if (this.locations != null) {
        formattedError.locations = this.locations;
      }

      if (this.path != null) {
        formattedError.path = this.path;
      }

      if (this.extensions != null && Object.keys(this.extensions).length > 0) {
        formattedError.extensions = this.extensions;
      }

      return formattedError;
    }
  }]);

  return GraphQLError;
}( /*#__PURE__*/_wrapNativeSuper(Error), Symbol.toStringTag);

exports.GraphQLError = GraphQLError;

function undefinedIfEmpty(array) {
  return array === undefined || array.length === 0 ? undefined : array;
}
/**
 * See: https://spec.graphql.org/draft/#sec-Errors
 */

/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 *
 * @deprecated Please use `error.toString` instead. Will be removed in v17
 */


function printError(error) {
  return error.toString();
}
/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 *
 * @deprecated Please use `error.toString` instead. Will be removed in v17
 */


function formatError(error) {
  return error.toJSON();
}
},{"../jsutils/isObjectLike.js":"node_modules/graphql/jsutils/isObjectLike.js","../language/location.js":"node_modules/graphql/language/location.js","../language/printLocation.js":"node_modules/graphql/language/printLocation.js"}],"node_modules/graphql/error/syntaxError.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.syntaxError = syntaxError;

var _GraphQLError = require('./GraphQLError.js');
/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */


function syntaxError(source, position, description) {
  return new _GraphQLError.GraphQLError("Syntax Error: ".concat(description), undefined, source, [position]);
}
},{"./GraphQLError.js":"node_modules/graphql/error/GraphQLError.js"}],"node_modules/graphql/language/ast.js":[function(require,module,exports) {
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Token = exports.QueryDocumentKeys = exports.OperationTypeNode = exports.Location = void 0;
exports.isNode = isNode;
/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */

var Location = /*#__PURE__*/function (_Symbol$toStringTag) {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  function Location(startToken, endToken, source) {
    _classCallCheck(this, Location);

    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  _createClass(Location, [{
    key: _Symbol$toStringTag,
    get: function get() {
      return 'Location';
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        start: this.start,
        end: this.end
      };
    }
  }]);

  return Location;
}(Symbol.toStringTag);
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */


exports.Location = Location;

var Token = /*#__PURE__*/function (_Symbol$toStringTag2) {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  function Token(kind, start, end, line, column, value) {
    _classCallCheck(this, Token);

    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    this.value = value;
    this.prev = null;
    this.next = null;
  }

  _createClass(Token, [{
    key: _Symbol$toStringTag2,
    get: function get() {
      return 'Token';
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column
      };
    }
  }]);

  return Token;
}(Symbol.toStringTag);
/**
 * The list of all possible AST node types.
 */


exports.Token = Token;
/**
 * @internal
 */

var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
exports.QueryDocumentKeys = QueryDocumentKeys;
var kindValues = new Set(Object.keys(QueryDocumentKeys));
/**
 * @internal
 */

function isNode(maybeNode) {
  var maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */


var OperationTypeNode;
exports.OperationTypeNode = OperationTypeNode;

(function (OperationTypeNode) {
  OperationTypeNode['QUERY'] = 'query';
  OperationTypeNode['MUTATION'] = 'mutation';
  OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (exports.OperationTypeNode = OperationTypeNode = {}));
},{}],"node_modules/graphql/language/directiveLocation.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.DirectiveLocation = void 0;
/**
 * The set of allowed directive location values.
 */

var DirectiveLocation;
/**
 * The enum type representing the directive location values.
 *
 * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
 */

exports.DirectiveLocation = DirectiveLocation;

(function (DirectiveLocation) {
  DirectiveLocation['QUERY'] = 'QUERY';
  DirectiveLocation['MUTATION'] = 'MUTATION';
  DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
  DirectiveLocation['FIELD'] = 'FIELD';
  DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
  DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
  DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
  DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
  DirectiveLocation['SCHEMA'] = 'SCHEMA';
  DirectiveLocation['SCALAR'] = 'SCALAR';
  DirectiveLocation['OBJECT'] = 'OBJECT';
  DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
  DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
  DirectiveLocation['INTERFACE'] = 'INTERFACE';
  DirectiveLocation['UNION'] = 'UNION';
  DirectiveLocation['ENUM'] = 'ENUM';
  DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
  DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
  DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
})(DirectiveLocation || (exports.DirectiveLocation = DirectiveLocation = {}));
},{}],"node_modules/graphql/language/kinds.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Kind = void 0;
/**
 * The set of allowed kind values for AST nodes.
 */

var Kind;
/**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */

exports.Kind = Kind;

(function (Kind) {
  Kind['NAME'] = 'Name';
  Kind['DOCUMENT'] = 'Document';
  Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
  Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
  Kind['SELECTION_SET'] = 'SelectionSet';
  Kind['FIELD'] = 'Field';
  Kind['ARGUMENT'] = 'Argument';
  Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
  Kind['INLINE_FRAGMENT'] = 'InlineFragment';
  Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
  Kind['VARIABLE'] = 'Variable';
  Kind['INT'] = 'IntValue';
  Kind['FLOAT'] = 'FloatValue';
  Kind['STRING'] = 'StringValue';
  Kind['BOOLEAN'] = 'BooleanValue';
  Kind['NULL'] = 'NullValue';
  Kind['ENUM'] = 'EnumValue';
  Kind['LIST'] = 'ListValue';
  Kind['OBJECT'] = 'ObjectValue';
  Kind['OBJECT_FIELD'] = 'ObjectField';
  Kind['DIRECTIVE'] = 'Directive';
  Kind['NAMED_TYPE'] = 'NamedType';
  Kind['LIST_TYPE'] = 'ListType';
  Kind['NON_NULL_TYPE'] = 'NonNullType';
  Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
  Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
  Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
  Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
  Kind['FIELD_DEFINITION'] = 'FieldDefinition';
  Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
  Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
  Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
  Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
  Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
  Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
  Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
  Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
  Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
  Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
  Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
  Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
  Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
  Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (exports.Kind = Kind = {}));
},{}],"node_modules/graphql/language/characterClasses.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isDigit = isDigit;
exports.isLetter = isLetter;
exports.isNameContinue = isNameContinue;
exports.isNameStart = isNameStart;
exports.isWhiteSpace = isWhiteSpace;
/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */

function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */


function isDigit(code) {
  return code >= 0x0030 && code <= 0x0039;
}
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */


function isLetter(code) {
  return code >= 0x0061 && code <= 0x007a || // A-Z
  code >= 0x0041 && code <= 0x005a // a-z
  ;
}
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */


function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */


function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 0x005f;
}
},{}],"node_modules/graphql/language/blockString.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.dedentBlockStringLines = dedentBlockStringLines;
exports.isPrintableAsBlockString = isPrintableAsBlockString;
exports.printBlockString = printBlockString;

var _characterClasses = require('./characterClasses.js');
/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */


function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;

  var commonIndent = Number.MAX_SAFE_INTEGER;
  var firstNonEmptyLine = null;
  var lastNonEmptyLine = -1;

  for (var i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;

    var line = lines[i];
    var indent = leadingWhitespace(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;

    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }

  return lines // Remove common indentation from all lines but first.
  .map(function (line, i) {
    return i === 0 ? line : line.slice(commonIndent);
  }) // Remove leading and trailing blank lines.
  .slice((_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0, lastNonEmptyLine + 1);
}

function leadingWhitespace(str) {
  var i = 0;

  while (i < str.length && (0, _characterClasses.isWhiteSpace)(str.charCodeAt(i))) {
    ++i;
  }

  return i;
}
/**
 * @internal
 */


function isPrintableAsBlockString(value) {
  if (value === '') {
    return true; // empty string is printable
  }

  var isEmptyLine = true;
  var hasIndent = false;
  var hasCommonIndent = true;
  var seenNonEmptyLine = false;

  for (var i = 0; i < value.length; ++i) {
    switch (value.codePointAt(i)) {
      case 0x0000:
      case 0x0001:
      case 0x0002:
      case 0x0003:
      case 0x0004:
      case 0x0005:
      case 0x0006:
      case 0x0007:
      case 0x0008:
      case 0x000b:
      case 0x000c:
      case 0x000e:
      case 0x000f:
        return false;
      // Has non-printable characters

      case 0x000d:
        //  \r
        return false;
      // Has \r or \r\n which will be replaced as \n

      case 10:
        //  \n
        if (isEmptyLine && !seenNonEmptyLine) {
          return false; // Has leading new line
        }

        seenNonEmptyLine = true;
        isEmptyLine = true;
        hasIndent = false;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        hasIndent || (hasIndent = isEmptyLine);
        break;

      default:
        hasCommonIndent && (hasCommonIndent = hasIndent);
        isEmptyLine = false;
    }
  }

  if (isEmptyLine) {
    return false; // Has trailing empty lines
  }

  if (hasCommonIndent && seenNonEmptyLine) {
    return false; // Has internal indent
  }

  return true;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */


function printBlockString(value, options) {
  var escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

  var lines = escapedValue.split(/\r\n|[\n\r]/g);
  var isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

  var forceLeadingNewLine = lines.length > 1 && lines.slice(1).every(function (line) {
    return line.length === 0 || (0, _characterClasses.isWhiteSpace)(line.charCodeAt(0));
  }); // Trailing triple quotes just looks confusing but doesn't force trailing new line

  var hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

  var hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  var hasTrailingSlash = value.endsWith('\\');
  var forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  var printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && ( // add leading and trailing new lines only if it improves readability
  !isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
  var result = ''; // Format a multi-line block quote to account for leading space.

  var skipLeadingNewLine = isSingleLine && (0, _characterClasses.isWhiteSpace)(value.charCodeAt(0));

  if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
    result += '\n';
  }

  result += escapedValue;

  if (printAsMultipleLines || forceTrailingNewline) {
    result += '\n';
  }

  return '"""' + result + '"""';
}
},{"./characterClasses.js":"node_modules/graphql/language/characterClasses.js"}],"node_modules/graphql/language/tokenKind.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.TokenKind = void 0;
/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */

var TokenKind;
/**
 * The enum type representing the token kinds values.
 *
 * @deprecated Please use `TokenKind`. Will be remove in v17.
 */

exports.TokenKind = TokenKind;

(function (TokenKind) {
  TokenKind['SOF'] = '<SOF>';
  TokenKind['EOF'] = '<EOF>';
  TokenKind['BANG'] = '!';
  TokenKind['DOLLAR'] = '$';
  TokenKind['AMP'] = '&';
  TokenKind['PAREN_L'] = '(';
  TokenKind['PAREN_R'] = ')';
  TokenKind['SPREAD'] = '...';
  TokenKind['COLON'] = ':';
  TokenKind['EQUALS'] = '=';
  TokenKind['AT'] = '@';
  TokenKind['BRACKET_L'] = '[';
  TokenKind['BRACKET_R'] = ']';
  TokenKind['BRACE_L'] = '{';
  TokenKind['PIPE'] = '|';
  TokenKind['BRACE_R'] = '}';
  TokenKind['NAME'] = 'Name';
  TokenKind['INT'] = 'Int';
  TokenKind['FLOAT'] = 'Float';
  TokenKind['STRING'] = 'String';
  TokenKind['BLOCK_STRING'] = 'BlockString';
  TokenKind['COMMENT'] = 'Comment';
})(TokenKind || (exports.TokenKind = TokenKind = {}));
},{}],"node_modules/graphql/language/lexer.js":[function(require,module,exports) {
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Lexer = void 0;
exports.isPunctuatorTokenKind = isPunctuatorTokenKind;

var _syntaxError = require('../error/syntaxError.js');

var _ast = require('./ast.js');

var _blockString = require('./blockString.js');

var _characterClasses = require('./characterClasses.js');

var _tokenKind = require('./tokenKind.js');
/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */


var Lexer = /*#__PURE__*/function (_Symbol$toStringTag) {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  function Lexer(source) {
    _classCallCheck(this, Lexer);

    var startOfFileToken = new _ast.Token(_tokenKind.TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }

  _createClass(Lexer, [{
    key: _Symbol$toStringTag,
    get: function get() {
      return 'Lexer';
    }
    /**
     * Advances the token stream to the next non-ignored token.
     */

  }, {
    key: "advance",
    value: function advance() {
      this.lastToken = this.token;
      var token = this.token = this.lookahead();
      return token;
    }
    /**
     * Looks ahead and returns the next non-ignored token, but does not change
     * the state of Lexer.
     */

  }, {
    key: "lookahead",
    value: function lookahead() {
      var token = this.token;

      if (token.kind !== _tokenKind.TokenKind.EOF) {
        do {
          if (token.next) {
            token = token.next;
          } else {
            // Read the next token and form a link in the token linked-list.
            var nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.

            token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.

            nextToken.prev = token;
            token = nextToken;
          }
        } while (token.kind === _tokenKind.TokenKind.COMMENT);
      }

      return token;
    }
  }]);

  return Lexer;
}(Symbol.toStringTag);
/**
 * @internal
 */


exports.Lexer = Lexer;

function isPunctuatorTokenKind(kind) {
  return kind === _tokenKind.TokenKind.BANG || kind === _tokenKind.TokenKind.DOLLAR || kind === _tokenKind.TokenKind.AMP || kind === _tokenKind.TokenKind.PAREN_L || kind === _tokenKind.TokenKind.PAREN_R || kind === _tokenKind.TokenKind.SPREAD || kind === _tokenKind.TokenKind.COLON || kind === _tokenKind.TokenKind.EQUALS || kind === _tokenKind.TokenKind.AT || kind === _tokenKind.TokenKind.BRACKET_L || kind === _tokenKind.TokenKind.BRACKET_R || kind === _tokenKind.TokenKind.BRACE_L || kind === _tokenKind.TokenKind.PIPE || kind === _tokenKind.TokenKind.BRACE_R;
}
/**
 * A Unicode scalar value is any Unicode code point except surrogate code
 * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
 * 0xE000 to 0x10FFFF.
 *
 * SourceCharacter ::
 *   - "Any Unicode scalar value"
 */


function isUnicodeScalarValue(code) {
  return code >= 0x0000 && code <= 0xd7ff || code >= 0xe000 && code <= 0x10ffff;
}
/**
 * The GraphQL specification defines source text as a sequence of unicode scalar
 * values (which Unicode defines to exclude surrogate code points). However
 * JavaScript defines strings as a sequence of UTF-16 code units which may
 * include surrogates. A surrogate pair is a valid source character as it
 * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
 * code points are not valid source characters.
 */


function isSupplementaryCodePoint(body, location) {
  return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}

function isLeadingSurrogate(code) {
  return code >= 0xd800 && code <= 0xdbff;
}

function isTrailingSurrogate(code) {
  return code >= 0xdc00 && code <= 0xdfff;
}
/**
 * Prints the code point (or end of file reference) at a given location in a
 * source for use in error messages.
 *
 * Printable ASCII is printed quoted, while other points are printed in Unicode
 * code point form (ie. U+1234).
 */


function printCodePointAt(lexer, location) {
  var code = lexer.source.body.codePointAt(location);

  if (code === undefined) {
    return _tokenKind.TokenKind.EOF;
  } else if (code >= 0x0020 && code <= 0x007e) {
    // Printable ASCII
    var char = String.fromCodePoint(code);
    return char === '"' ? "'\"'" : "\"".concat(char, "\"");
  } // Unicode code point


  return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Create a token with line and column location information.
 */


function createToken(lexer, kind, start, end, value) {
  var line = lexer.line;
  var col = 1 + start - lexer.lineStart;
  return new _ast.Token(kind, start, end, line, col, value);
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */


function readNextToken(lexer, start) {
  var body = lexer.source.body;
  var bodyLength = body.length;
  var position = start;

  while (position < bodyLength) {
    var code = body.charCodeAt(position); // SourceCharacter

    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 0xfeff: // <BOM>

      case 0x0009: // \t

      case 0x0020: // <space>

      case 0x002c:
        // ,
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"

      case 0x000a:
        // \n
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;

      case 0x000d:
        // \r
        if (body.charCodeAt(position + 1) === 0x000a) {
          position += 2;
        } else {
          ++position;
        }

        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment

      case 0x0023:
        // #
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }

      case 0x0021:
        // !
        return createToken(lexer, _tokenKind.TokenKind.BANG, position, position + 1);

      case 0x0024:
        // $
        return createToken(lexer, _tokenKind.TokenKind.DOLLAR, position, position + 1);

      case 0x0026:
        // &
        return createToken(lexer, _tokenKind.TokenKind.AMP, position, position + 1);

      case 0x0028:
        // (
        return createToken(lexer, _tokenKind.TokenKind.PAREN_L, position, position + 1);

      case 0x0029:
        // )
        return createToken(lexer, _tokenKind.TokenKind.PAREN_R, position, position + 1);

      case 0x002e:
        // .
        if (body.charCodeAt(position + 1) === 0x002e && body.charCodeAt(position + 2) === 0x002e) {
          return createToken(lexer, _tokenKind.TokenKind.SPREAD, position, position + 3);
        }

        break;

      case 0x003a:
        // :
        return createToken(lexer, _tokenKind.TokenKind.COLON, position, position + 1);

      case 0x003d:
        // =
        return createToken(lexer, _tokenKind.TokenKind.EQUALS, position, position + 1);

      case 0x0040:
        // @
        return createToken(lexer, _tokenKind.TokenKind.AT, position, position + 1);

      case 0x005b:
        // [
        return createToken(lexer, _tokenKind.TokenKind.BRACKET_L, position, position + 1);

      case 0x005d:
        // ]
        return createToken(lexer, _tokenKind.TokenKind.BRACKET_R, position, position + 1);

      case 0x007b:
        // {
        return createToken(lexer, _tokenKind.TokenKind.BRACE_L, position, position + 1);

      case 0x007c:
        // |
        return createToken(lexer, _tokenKind.TokenKind.PIPE, position, position + 1);

      case 0x007d:
        // }
        return createToken(lexer, _tokenKind.TokenKind.BRACE_R, position, position + 1);
      // StringValue

      case 0x0022:
        // "
        if (body.charCodeAt(position + 1) === 0x0022 && body.charCodeAt(position + 2) === 0x0022) {
          return readBlockString(lexer, position);
        }

        return readString(lexer, position);
    } // IntValue | FloatValue (Digit | -)


    if ((0, _characterClasses.isDigit)(code) || code === 0x002d) {
      return readNumber(lexer, position, code);
    } // Name


    if ((0, _characterClasses.isNameStart)(code)) {
      return readName(lexer, position);
    }

    throw (0, _syntaxError.syntaxError)(lexer.source, position, code === 0x0027 ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?' : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? "Unexpected character: ".concat(printCodePointAt(lexer, position), ".") : "Invalid character: ".concat(printCodePointAt(lexer, position), "."));
  }

  return createToken(lexer, _tokenKind.TokenKind.EOF, bodyLength, bodyLength);
}
/**
 * Reads a comment token from the source file.
 *
 * ```
 * Comment :: # CommentChar* [lookahead != CommentChar]
 *
 * CommentChar :: SourceCharacter but not LineTerminator
 * ```
 */


function readComment(lexer, start) {
  var body = lexer.source.body;
  var bodyLength = body.length;
  var position = start + 1;

  while (position < bodyLength) {
    var code = body.charCodeAt(position); // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter


    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }

  return createToken(lexer, _tokenKind.TokenKind.COMMENT, start, position, body.slice(start + 1, position));
}
/**
 * Reads a number token from the source file, either a FloatValue or an IntValue
 * depending on whether a FractionalPart or ExponentPart is encountered.
 *
 * ```
 * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
 *
 * IntegerPart ::
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit Digit*
 *
 * NegativeSign :: -
 *
 * NonZeroDigit :: Digit but not `0`
 *
 * FloatValue ::
 *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *
 * FractionalPart :: . Digit+
 *
 * ExponentPart :: ExponentIndicator Sign? Digit+
 *
 * ExponentIndicator :: one of `e` `E`
 *
 * Sign :: one of + -
 * ```
 */


function readNumber(lexer, start, firstCode) {
  var body = lexer.source.body;
  var position = start;
  var code = firstCode;
  var isFloat = false; // NegativeSign (-)

  if (code === 0x002d) {
    code = body.charCodeAt(++position);
  } // Zero (0)


  if (code === 0x0030) {
    code = body.charCodeAt(++position);

    if ((0, _characterClasses.isDigit)(code)) {
      throw (0, _syntaxError.syntaxError)(lexer.source, position, "Invalid number, unexpected digit after 0: ".concat(printCodePointAt(lexer, position), "."));
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Full stop (.)


  if (code === 0x002e) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // E e


  if (code === 0x0045 || code === 0x0065) {
    isFloat = true;
    code = body.charCodeAt(++position); // + -

    if (code === 0x002b || code === 0x002d) {
      code = body.charCodeAt(++position);
    }

    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart


  if (code === 0x002e || (0, _characterClasses.isNameStart)(code)) {
    throw (0, _syntaxError.syntaxError)(lexer.source, position, "Invalid number, expected digit but got: ".concat(printCodePointAt(lexer, position), "."));
  }

  return createToken(lexer, isFloat ? _tokenKind.TokenKind.FLOAT : _tokenKind.TokenKind.INT, start, position, body.slice(start, position));
}
/**
 * Returns the new position in the source after reading one or more digits.
 */


function readDigits(lexer, start, firstCode) {
  if (!(0, _characterClasses.isDigit)(firstCode)) {
    throw (0, _syntaxError.syntaxError)(lexer.source, start, "Invalid number, expected digit but got: ".concat(printCodePointAt(lexer, start), "."));
  }

  var body = lexer.source.body;
  var position = start + 1; // +1 to skip first firstCode

  while ((0, _characterClasses.isDigit)(body.charCodeAt(position))) {
    ++position;
  }

  return position;
}
/**
 * Reads a single-quote string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `""` [lookahead != `"`]
 *   - `"` StringCharacter+ `"`
 *
 * StringCharacter ::
 *   - SourceCharacter but not `"` or `\` or LineTerminator
 *   - `\u` EscapedUnicode
 *   - `\` EscapedCharacter
 *
 * EscapedUnicode ::
 *   - `{` HexDigit+ `}`
 *   - HexDigit HexDigit HexDigit HexDigit
 *
 * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
 * ```
 */


function readString(lexer, start) {
  var body = lexer.source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var chunkStart = position;
  var value = '';

  while (position < bodyLength) {
    var code = body.charCodeAt(position); // Closing Quote (")

    if (code === 0x0022) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, _tokenKind.TokenKind.STRING, start, position + 1, value);
    } // Escape Sequence (\)


    if (code === 0x005c) {
      value += body.slice(chunkStart, position);

      var _escape = body.charCodeAt(position + 1) === 0x0075 // u
      ? body.charCodeAt(position + 2) === 0x007b // {
      ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);

      value += _escape.value;
      position += _escape.size;
      chunkStart = position;
      continue;
    } // LineTerminator (\n | \r)


    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter


    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw (0, _syntaxError.syntaxError)(lexer.source, position, "Invalid character within String: ".concat(printCodePointAt(lexer, position), "."));
    }
  }

  throw (0, _syntaxError.syntaxError)(lexer.source, position, 'Unterminated string.');
} // The string value and lexed size of an escape sequence.


function readEscapedUnicodeVariableWidth(lexer, position) {
  var body = lexer.source.body;
  var point = 0;
  var size = 3; // Cannot be larger than 12 chars (\u{00000000}).

  while (size < 12) {
    var code = body.charCodeAt(position + size++); // Closing Brace (})

    if (code === 0x007d) {
      // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }

      return {
        value: String.fromCodePoint(point),
        size: size
      };
    } // Append this hex digit to the code point.


    point = point << 4 | readHexDigit(code);

    if (point < 0) {
      break;
    }
  }

  throw (0, _syntaxError.syntaxError)(lexer.source, position, "Invalid Unicode escape sequence: \"".concat(body.slice(position, position + size), "\"."));
}

function readEscapedUnicodeFixedWidth(lexer, position) {
  var body = lexer.source.body;
  var code = read16BitHexCode(body, position + 2);

  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
  // a valid pair is formed.


  if (isLeadingSurrogate(code)) {
    // \u
    if (body.charCodeAt(position + 6) === 0x005c && body.charCodeAt(position + 7) === 0x0075) {
      var trailingCode = read16BitHexCode(body, position + 8);

      if (isTrailingSurrogate(trailingCode)) {
        // JavaScript defines strings as a sequence of UTF-16 code units and
        // encodes Unicode code points above U+FFFF using a surrogate pair of
        // code units. Since this is a surrogate pair escape sequence, just
        // include both codes into the JavaScript string value. Had JavaScript
        // not been internally based on UTF-16, then this surrogate pair would
        // be decoded to retrieve the supplementary code point.
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }

  throw (0, _syntaxError.syntaxError)(lexer.source, position, "Invalid Unicode escape sequence: \"".concat(body.slice(position, position + 6), "\"."));
}
/**
 * Reads four hexadecimal characters and returns the positive integer that 16bit
 * hexadecimal string represents. For example, "000f" will return 15, and "dead"
 * will return 57005.
 *
 * Returns a negative number if any char was not a valid hexadecimal digit.
 */


function read16BitHexCode(body, position) {
  // readHexDigit() returns -1 on error. ORing a negative value with any other
  // value always produces a negative value.
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
/**
 * Reads a hexadecimal character and returns its positive integer value (0-15).
 *
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 if the provided character code was not a valid hexadecimal digit.
 *
 * HexDigit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 *   - `A` `B` `C` `D` `E` `F`
 *   - `a` `b` `c` `d` `e` `f`
 */


function readHexDigit(code) {
  return code >= 0x0030 && code <= 0x0039 // 0-9
  ? code - 0x0030 : code >= 0x0041 && code <= 0x0046 // A-F
  ? code - 0x0037 : code >= 0x0061 && code <= 0x0066 // a-f
  ? code - 0x0057 : -1;
}
/**
 * | Escaped Character | Code Point | Character Name               |
 * | ----------------- | ---------- | ---------------------------- |
 * | `"`               | U+0022     | double quote                 |
 * | `\`               | U+005C     | reverse solidus (back slash) |
 * | `/`               | U+002F     | solidus (forward slash)      |
 * | `b`               | U+0008     | backspace                    |
 * | `f`               | U+000C     | form feed                    |
 * | `n`               | U+000A     | line feed (new line)         |
 * | `r`               | U+000D     | carriage return              |
 * | `t`               | U+0009     | horizontal tab               |
 */


function readEscapedCharacter(lexer, position) {
  var body = lexer.source.body;
  var code = body.charCodeAt(position + 1);

  switch (code) {
    case 0x0022:
      // "
      return {
        value: "\"",
        size: 2
      };

    case 0x005c:
      // \
      return {
        value: "\\",
        size: 2
      };

    case 0x002f:
      // /
      return {
        value: "/",
        size: 2
      };

    case 0x0062:
      // b
      return {
        value: "\b",
        size: 2
      };

    case 0x0066:
      // f
      return {
        value: "\f",
        size: 2
      };

    case 0x006e:
      // n
      return {
        value: "\n",
        size: 2
      };

    case 0x0072:
      // r
      return {
        value: "\r",
        size: 2
      };

    case 0x0074:
      // t
      return {
        value: "\t",
        size: 2
      };
  }

  throw (0, _syntaxError.syntaxError)(lexer.source, position, "Invalid character escape sequence: \"".concat(body.slice(position, position + 2), "\"."));
}
/**
 * Reads a block string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `"""` BlockStringCharacter* `"""`
 *
 * BlockStringCharacter ::
 *   - SourceCharacter but not `"""` or `\"""`
 *   - `\"""`
 * ```
 */


function readBlockString(lexer, start) {
  var body = lexer.source.body;
  var bodyLength = body.length;
  var lineStart = lexer.lineStart;
  var position = start + 3;
  var chunkStart = position;
  var currentLine = '';
  var blockLines = [];

  while (position < bodyLength) {
    var code = body.charCodeAt(position); // Closing Triple-Quote (""")

    if (code === 0x0022 && body.charCodeAt(position + 1) === 0x0022 && body.charCodeAt(position + 2) === 0x0022) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      var token = createToken(lexer, _tokenKind.TokenKind.BLOCK_STRING, start, position + 3, // Return a string of the lines joined with U+000A.
      (0, _blockString.dedentBlockStringLines)(blockLines).join('\n'));
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    } // Escaped Triple-Quote (\""")


    if (code === 0x005c && body.charCodeAt(position + 1) === 0x0022 && body.charCodeAt(position + 2) === 0x0022 && body.charCodeAt(position + 3) === 0x0022) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1; // skip only slash

      position += 4;
      continue;
    } // LineTerminator


    if (code === 0x000a || code === 0x000d) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);

      if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
        position += 2;
      } else {
        ++position;
      }

      currentLine = '';
      chunkStart = position;
      lineStart = position;
      continue;
    } // SourceCharacter


    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw (0, _syntaxError.syntaxError)(lexer.source, position, "Invalid character within String: ".concat(printCodePointAt(lexer, position), "."));
    }
  }

  throw (0, _syntaxError.syntaxError)(lexer.source, position, 'Unterminated string.');
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * ```
 * Name ::
 *   - NameStart NameContinue* [lookahead != NameContinue]
 * ```
 */


function readName(lexer, start) {
  var body = lexer.source.body;
  var bodyLength = body.length;
  var position = start + 1;

  while (position < bodyLength) {
    var code = body.charCodeAt(position);

    if ((0, _characterClasses.isNameContinue)(code)) {
      ++position;
    } else {
      break;
    }
  }

  return createToken(lexer, _tokenKind.TokenKind.NAME, start, position, body.slice(start, position));
}
},{"../error/syntaxError.js":"node_modules/graphql/error/syntaxError.js","./ast.js":"node_modules/graphql/language/ast.js","./blockString.js":"node_modules/graphql/language/blockString.js","./characterClasses.js":"node_modules/graphql/language/characterClasses.js","./tokenKind.js":"node_modules/graphql/language/tokenKind.js"}],"node_modules/graphql/jsutils/devAssert.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.devAssert = devAssert;

function devAssert(condition, message) {
  var booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message);
  }
}
},{}],"node_modules/graphql/jsutils/inspect.js":[function(require,module,exports) {
'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.inspect = inspect;
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (_typeof(value)) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? "[function ".concat(value.name, "]") : '[function]';

    case 'object':
      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if (previouslySeenValues.includes(value)) {
    return '[Circular]';
  }

  var seenValues = [].concat(_toConsumableArray(previouslySeenValues), [value]);

  if (isJSONable(value)) {
    var jsonValue = value.toJSON(); // check for infinite recursion

    if (jsonValue !== value) {
      return typeof jsonValue === 'string' ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function isJSONable(value) {
  return typeof value.toJSON === 'function';
}

function formatObject(object, seenValues) {
  var entries = Object.entries(object);

  if (entries.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  var properties = entries.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return key + ': ' + formatValue(value, seenValues);
  });
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];

  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }

  return '[' + items.join(', ') + ']';
}

function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    var name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}
},{}],"node_modules/graphql/jsutils/instanceOf.js":[function(require,module,exports) {
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.instanceOf = void 0;

var _inspect = require('./inspect.js');
/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
 * See: https://webpack.js.org/guides/production/
 */


var instanceOf =
/* c8 ignore next 5 */
// FIXME: https://github.com/graphql/graphql-js/issues/2317
"development" === 'production' ? function instanceOf(value, constructor) {
  return value instanceof constructor;
} : function instanceOf(value, constructor) {
  if (value instanceof constructor) {
    return true;
  }

  if (_typeof(value) === 'object' && value !== null) {
    var _value$constructor; // Prefer Symbol.toStringTag since it is immune to minification.


    var className = constructor.prototype[Symbol.toStringTag];
    var valueClassName = // We still need to support constructor's name to detect conflicts with older versions of this library.
    Symbol.toStringTag in value // @ts-expect-error TS bug see, https://github.com/microsoft/TypeScript/issues/38009
    ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name;

    if (className === valueClassName) {
      var stringifiedValue = (0, _inspect.inspect)(value);
      throw new Error("Cannot use ".concat(className, " \"").concat(stringifiedValue, "\" from another module or realm.\n\nEnsure that there is only one instance of \"graphql\" in the node_modules\ndirectory. If different versions of \"graphql\" are the dependencies of other\nrelied on modules, use \"resolutions\" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate \"graphql\" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results."));
    }
  }

  return false;
};
exports.instanceOf = instanceOf;
},{"./inspect.js":"node_modules/graphql/jsutils/inspect.js"}],"node_modules/graphql/language/source.js":[function(require,module,exports) {
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Source = void 0;
exports.isSource = isSource;

var _devAssert = require('../jsutils/devAssert.js');

var _inspect = require('../jsutils/inspect.js');

var _instanceOf = require('../jsutils/instanceOf.js');
/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */


var Source = /*#__PURE__*/function (_Symbol$toStringTag) {
  function Source(body) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GraphQL request';
    var locationOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      line: 1,
      column: 1
    };

    _classCallCheck(this, Source);

    typeof body === 'string' || (0, _devAssert.devAssert)(false, "Body must be a string. Received: ".concat((0, _inspect.inspect)(body), "."));
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || (0, _devAssert.devAssert)(false, 'line in locationOffset is 1-indexed and must be positive.');
    this.locationOffset.column > 0 || (0, _devAssert.devAssert)(false, 'column in locationOffset is 1-indexed and must be positive.');
  }

  _createClass(Source, [{
    key: _Symbol$toStringTag,
    get: function get() {
      return 'Source';
    }
  }]);

  return Source;
}(Symbol.toStringTag);
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */


exports.Source = Source;

function isSource(source) {
  return (0, _instanceOf.instanceOf)(source, Source);
}
},{"../jsutils/devAssert.js":"node_modules/graphql/jsutils/devAssert.js","../jsutils/inspect.js":"node_modules/graphql/jsutils/inspect.js","../jsutils/instanceOf.js":"node_modules/graphql/jsutils/instanceOf.js"}],"node_modules/graphql/language/parser.js":[function(require,module,exports) {
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Parser = void 0;
exports.parse = parse;
exports.parseConstValue = parseConstValue;
exports.parseType = parseType;
exports.parseValue = parseValue;

var _syntaxError = require('../error/syntaxError.js');

var _ast = require('./ast.js');

var _directiveLocation = require('./directiveLocation.js');

var _kinds = require('./kinds.js');

var _lexer = require('./lexer.js');

var _source = require('./source.js');

var _tokenKind = require('./tokenKind.js');
/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */


function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */


function parseValue(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(_tokenKind.TokenKind.SOF);
  var value = parser.parseValueLiteral(false);
  parser.expectToken(_tokenKind.TokenKind.EOF);
  return value;
}
/**
 * Similar to parseValue(), but raises a parse error if it encounters a
 * variable. The return type will be a constant value.
 */


function parseConstValue(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(_tokenKind.TokenKind.SOF);
  var value = parser.parseConstValueLiteral();
  parser.expectToken(_tokenKind.TokenKind.EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */


function parseType(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(_tokenKind.TokenKind.SOF);
  var type = parser.parseTypeReference();
  parser.expectToken(_tokenKind.TokenKind.EOF);
  return type;
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */


var Parser = /*#__PURE__*/function () {
  function Parser(source, options) {
    _classCallCheck(this, Parser);

    var sourceObj = (0, _source.isSource)(source) ? source : new _source.Source(source);
    this._lexer = new _lexer.Lexer(sourceObj);
    this._options = options;
  }
  /**
   * Converts a name lex token into a name parse node.
   */


  _createClass(Parser, [{
    key: "parseName",
    value: function parseName() {
      var token = this.expectToken(_tokenKind.TokenKind.NAME);
      return this.node(token, {
        kind: _kinds.Kind.NAME,
        value: token.value
      });
    } // Implements the parsing rules in the Document section.

    /**
     * Document : Definition+
     */

  }, {
    key: "parseDocument",
    value: function parseDocument() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.DOCUMENT,
        definitions: this.many(_tokenKind.TokenKind.SOF, this.parseDefinition, _tokenKind.TokenKind.EOF)
      });
    }
    /**
     * Definition :
     *   - ExecutableDefinition
     *   - TypeSystemDefinition
     *   - TypeSystemExtension
     *
     * ExecutableDefinition :
     *   - OperationDefinition
     *   - FragmentDefinition
     *
     * TypeSystemDefinition :
     *   - SchemaDefinition
     *   - TypeDefinition
     *   - DirectiveDefinition
     *
     * TypeDefinition :
     *   - ScalarTypeDefinition
     *   - ObjectTypeDefinition
     *   - InterfaceTypeDefinition
     *   - UnionTypeDefinition
     *   - EnumTypeDefinition
     *   - InputObjectTypeDefinition
     */

  }, {
    key: "parseDefinition",
    value: function parseDefinition() {
      if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
        return this.parseOperationDefinition();
      } // Many definitions begin with a description and require a lookahead.


      var hasDescription = this.peekDescription();
      var keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;

      if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
        switch (keywordToken.value) {
          case 'schema':
            return this.parseSchemaDefinition();

          case 'scalar':
            return this.parseScalarTypeDefinition();

          case 'type':
            return this.parseObjectTypeDefinition();

          case 'interface':
            return this.parseInterfaceTypeDefinition();

          case 'union':
            return this.parseUnionTypeDefinition();

          case 'enum':
            return this.parseEnumTypeDefinition();

          case 'input':
            return this.parseInputObjectTypeDefinition();

          case 'directive':
            return this.parseDirectiveDefinition();
        }

        if (hasDescription) {
          throw (0, _syntaxError.syntaxError)(this._lexer.source, this._lexer.token.start, 'Unexpected description, descriptions are supported only on type definitions.');
        }

        switch (keywordToken.value) {
          case 'query':
          case 'mutation':
          case 'subscription':
            return this.parseOperationDefinition();

          case 'fragment':
            return this.parseFragmentDefinition();

          case 'extend':
            return this.parseTypeSystemExtension();
        }
      }

      throw this.unexpected(keywordToken);
    } // Implements the parsing rules in the Operations section.

    /**
     * OperationDefinition :
     *  - SelectionSet
     *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
     */

  }, {
    key: "parseOperationDefinition",
    value: function parseOperationDefinition() {
      var start = this._lexer.token;

      if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
        return this.node(start, {
          kind: _kinds.Kind.OPERATION_DEFINITION,
          operation: _ast.OperationTypeNode.QUERY,
          name: undefined,
          variableDefinitions: [],
          directives: [],
          selectionSet: this.parseSelectionSet()
        });
      }

      var operation = this.parseOperationType();
      var name;

      if (this.peek(_tokenKind.TokenKind.NAME)) {
        name = this.parseName();
      }

      return this.node(start, {
        kind: _kinds.Kind.OPERATION_DEFINITION,
        operation: operation,
        name: name,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * OperationType : one of query mutation subscription
     */

  }, {
    key: "parseOperationType",
    value: function parseOperationType() {
      var operationToken = this.expectToken(_tokenKind.TokenKind.NAME);

      switch (operationToken.value) {
        case 'query':
          return _ast.OperationTypeNode.QUERY;

        case 'mutation':
          return _ast.OperationTypeNode.MUTATION;

        case 'subscription':
          return _ast.OperationTypeNode.SUBSCRIPTION;
      }

      throw this.unexpected(operationToken);
    }
    /**
     * VariableDefinitions : ( VariableDefinition+ )
     */

  }, {
    key: "parseVariableDefinitions",
    value: function parseVariableDefinitions() {
      return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseVariableDefinition, _tokenKind.TokenKind.PAREN_R);
    }
    /**
     * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
     */

  }, {
    key: "parseVariableDefinition",
    value: function parseVariableDefinition() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.VARIABLE_DEFINITION,
        variable: this.parseVariable(),
        type: (this.expectToken(_tokenKind.TokenKind.COLON), this.parseTypeReference()),
        defaultValue: this.expectOptionalToken(_tokenKind.TokenKind.EQUALS) ? this.parseConstValueLiteral() : undefined,
        directives: this.parseConstDirectives()
      });
    }
    /**
     * Variable : $ Name
     */

  }, {
    key: "parseVariable",
    value: function parseVariable() {
      var start = this._lexer.token;
      this.expectToken(_tokenKind.TokenKind.DOLLAR);
      return this.node(start, {
        kind: _kinds.Kind.VARIABLE,
        name: this.parseName()
      });
    }
    /**
     * ```
     * SelectionSet : { Selection+ }
     * ```
     */

  }, {
    key: "parseSelectionSet",
    value: function parseSelectionSet() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.SELECTION_SET,
        selections: this.many(_tokenKind.TokenKind.BRACE_L, this.parseSelection, _tokenKind.TokenKind.BRACE_R)
      });
    }
    /**
     * Selection :
     *   - Field
     *   - FragmentSpread
     *   - InlineFragment
     */

  }, {
    key: "parseSelection",
    value: function parseSelection() {
      return this.peek(_tokenKind.TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
    }
    /**
     * Field : Alias? Name Arguments? Directives? SelectionSet?
     *
     * Alias : Name :
     */

  }, {
    key: "parseField",
    value: function parseField() {
      var start = this._lexer.token;
      var nameOrAlias = this.parseName();
      var alias;
      var name;

      if (this.expectOptionalToken(_tokenKind.TokenKind.COLON)) {
        alias = nameOrAlias;
        name = this.parseName();
      } else {
        name = nameOrAlias;
      }

      return this.node(start, {
        kind: _kinds.Kind.FIELD,
        alias: alias,
        name: name,
        arguments: this.parseArguments(false),
        directives: this.parseDirectives(false),
        selectionSet: this.peek(_tokenKind.TokenKind.BRACE_L) ? this.parseSelectionSet() : undefined
      });
    }
    /**
     * Arguments[Const] : ( Argument[?Const]+ )
     */

  }, {
    key: "parseArguments",
    value: function parseArguments(isConst) {
      var item = isConst ? this.parseConstArgument : this.parseArgument;
      return this.optionalMany(_tokenKind.TokenKind.PAREN_L, item, _tokenKind.TokenKind.PAREN_R);
    }
    /**
     * Argument[Const] : Name : Value[?Const]
     */

  }, {
    key: "parseArgument",
    value: function parseArgument() {
      var isConst = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var start = this._lexer.token;
      var name = this.parseName();
      this.expectToken(_tokenKind.TokenKind.COLON);
      return this.node(start, {
        kind: _kinds.Kind.ARGUMENT,
        name: name,
        value: this.parseValueLiteral(isConst)
      });
    }
  }, {
    key: "parseConstArgument",
    value: function parseConstArgument() {
      return this.parseArgument(true);
    } // Implements the parsing rules in the Fragments section.

    /**
     * Corresponds to both FragmentSpread and InlineFragment in the spec.
     *
     * FragmentSpread : ... FragmentName Directives?
     *
     * InlineFragment : ... TypeCondition? Directives? SelectionSet
     */

  }, {
    key: "parseFragment",
    value: function parseFragment() {
      var start = this._lexer.token;
      this.expectToken(_tokenKind.TokenKind.SPREAD);
      var hasTypeCondition = this.expectOptionalKeyword('on');

      if (!hasTypeCondition && this.peek(_tokenKind.TokenKind.NAME)) {
        return this.node(start, {
          kind: _kinds.Kind.FRAGMENT_SPREAD,
          name: this.parseFragmentName(),
          directives: this.parseDirectives(false)
        });
      }

      return this.node(start, {
        kind: _kinds.Kind.INLINE_FRAGMENT,
        typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * FragmentDefinition :
     *   - fragment FragmentName on TypeCondition Directives? SelectionSet
     *
     * TypeCondition : NamedType
     */

  }, {
    key: "parseFragmentDefinition",
    value: function parseFragmentDefinition() {
      var _this$_options;

      var start = this._lexer.token;
      this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
      // the grammar of FragmentDefinition:
      //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

      if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.allowLegacyFragmentVariables) === true) {
        return this.node(start, {
          kind: _kinds.Kind.FRAGMENT_DEFINITION,
          name: this.parseFragmentName(),
          variableDefinitions: this.parseVariableDefinitions(),
          typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }

      return this.node(start, {
        kind: _kinds.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    /**
     * FragmentName : Name but not `on`
     */

  }, {
    key: "parseFragmentName",
    value: function parseFragmentName() {
      if (this._lexer.token.value === 'on') {
        throw this.unexpected();
      }

      return this.parseName();
    } // Implements the parsing rules in the Values section.

    /**
     * Value[Const] :
     *   - [~Const] Variable
     *   - IntValue
     *   - FloatValue
     *   - StringValue
     *   - BooleanValue
     *   - NullValue
     *   - EnumValue
     *   - ListValue[?Const]
     *   - ObjectValue[?Const]
     *
     * BooleanValue : one of `true` `false`
     *
     * NullValue : `null`
     *
     * EnumValue : Name but not `true`, `false` or `null`
     */

  }, {
    key: "parseValueLiteral",
    value: function parseValueLiteral(isConst) {
      var token = this._lexer.token;

      switch (token.kind) {
        case _tokenKind.TokenKind.BRACKET_L:
          return this.parseList(isConst);

        case _tokenKind.TokenKind.BRACE_L:
          return this.parseObject(isConst);

        case _tokenKind.TokenKind.INT:
          this._lexer.advance();

          return this.node(token, {
            kind: _kinds.Kind.INT,
            value: token.value
          });

        case _tokenKind.TokenKind.FLOAT:
          this._lexer.advance();

          return this.node(token, {
            kind: _kinds.Kind.FLOAT,
            value: token.value
          });

        case _tokenKind.TokenKind.STRING:
        case _tokenKind.TokenKind.BLOCK_STRING:
          return this.parseStringLiteral();

        case _tokenKind.TokenKind.NAME:
          this._lexer.advance();

          switch (token.value) {
            case 'true':
              return this.node(token, {
                kind: _kinds.Kind.BOOLEAN,
                value: true
              });

            case 'false':
              return this.node(token, {
                kind: _kinds.Kind.BOOLEAN,
                value: false
              });

            case 'null':
              return this.node(token, {
                kind: _kinds.Kind.NULL
              });

            default:
              return this.node(token, {
                kind: _kinds.Kind.ENUM,
                value: token.value
              });
          }

        case _tokenKind.TokenKind.DOLLAR:
          if (isConst) {
            this.expectToken(_tokenKind.TokenKind.DOLLAR);

            if (this._lexer.token.kind === _tokenKind.TokenKind.NAME) {
              var varName = this._lexer.token.value;
              throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Unexpected variable \"$".concat(varName, "\" in constant value."));
            } else {
              throw this.unexpected(token);
            }
          }

          return this.parseVariable();

        default:
          throw this.unexpected();
      }
    }
  }, {
    key: "parseConstValueLiteral",
    value: function parseConstValueLiteral() {
      return this.parseValueLiteral(true);
    }
  }, {
    key: "parseStringLiteral",
    value: function parseStringLiteral() {
      var token = this._lexer.token;

      this._lexer.advance();

      return this.node(token, {
        kind: _kinds.Kind.STRING,
        value: token.value,
        block: token.kind === _tokenKind.TokenKind.BLOCK_STRING
      });
    }
    /**
     * ListValue[Const] :
     *   - [ ]
     *   - [ Value[?Const]+ ]
     */

  }, {
    key: "parseList",
    value: function parseList(isConst) {
      var _this = this;

      var item = function item() {
        return _this.parseValueLiteral(isConst);
      };

      return this.node(this._lexer.token, {
        kind: _kinds.Kind.LIST,
        values: this.any(_tokenKind.TokenKind.BRACKET_L, item, _tokenKind.TokenKind.BRACKET_R)
      });
    }
    /**
     * ```
     * ObjectValue[Const] :
     *   - { }
     *   - { ObjectField[?Const]+ }
     * ```
     */

  }, {
    key: "parseObject",
    value: function parseObject(isConst) {
      var _this2 = this;

      var item = function item() {
        return _this2.parseObjectField(isConst);
      };

      return this.node(this._lexer.token, {
        kind: _kinds.Kind.OBJECT,
        fields: this.any(_tokenKind.TokenKind.BRACE_L, item, _tokenKind.TokenKind.BRACE_R)
      });
    }
    /**
     * ObjectField[Const] : Name : Value[?Const]
     */

  }, {
    key: "parseObjectField",
    value: function parseObjectField(isConst) {
      var start = this._lexer.token;
      var name = this.parseName();
      this.expectToken(_tokenKind.TokenKind.COLON);
      return this.node(start, {
        kind: _kinds.Kind.OBJECT_FIELD,
        name: name,
        value: this.parseValueLiteral(isConst)
      });
    } // Implements the parsing rules in the Directives section.

    /**
     * Directives[Const] : Directive[?Const]+
     */

  }, {
    key: "parseDirectives",
    value: function parseDirectives(isConst) {
      var directives = [];

      while (this.peek(_tokenKind.TokenKind.AT)) {
        directives.push(this.parseDirective(isConst));
      }

      return directives;
    }
  }, {
    key: "parseConstDirectives",
    value: function parseConstDirectives() {
      return this.parseDirectives(true);
    }
    /**
     * ```
     * Directive[Const] : @ Name Arguments[?Const]?
     * ```
     */

  }, {
    key: "parseDirective",
    value: function parseDirective(isConst) {
      var start = this._lexer.token;
      this.expectToken(_tokenKind.TokenKind.AT);
      return this.node(start, {
        kind: _kinds.Kind.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(isConst)
      });
    } // Implements the parsing rules in the Types section.

    /**
     * Type :
     *   - NamedType
     *   - ListType
     *   - NonNullType
     */

  }, {
    key: "parseTypeReference",
    value: function parseTypeReference() {
      var start = this._lexer.token;
      var type;

      if (this.expectOptionalToken(_tokenKind.TokenKind.BRACKET_L)) {
        var innerType = this.parseTypeReference();
        this.expectToken(_tokenKind.TokenKind.BRACKET_R);
        type = this.node(start, {
          kind: _kinds.Kind.LIST_TYPE,
          type: innerType
        });
      } else {
        type = this.parseNamedType();
      }

      if (this.expectOptionalToken(_tokenKind.TokenKind.BANG)) {
        return this.node(start, {
          kind: _kinds.Kind.NON_NULL_TYPE,
          type: type
        });
      }

      return type;
    }
    /**
     * NamedType : Name
     */

  }, {
    key: "parseNamedType",
    value: function parseNamedType() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.NAMED_TYPE,
        name: this.parseName()
      });
    } // Implements the parsing rules in the Type Definition section.

  }, {
    key: "peekDescription",
    value: function peekDescription() {
      return this.peek(_tokenKind.TokenKind.STRING) || this.peek(_tokenKind.TokenKind.BLOCK_STRING);
    }
    /**
     * Description : StringValue
     */

  }, {
    key: "parseDescription",
    value: function parseDescription() {
      if (this.peekDescription()) {
        return this.parseStringLiteral();
      }
    }
    /**
     * ```
     * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
     * ```
     */

  }, {
    key: "parseSchemaDefinition",
    value: function parseSchemaDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('schema');
      var directives = this.parseConstDirectives();
      var operationTypes = this.many(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);
      return this.node(start, {
        kind: _kinds.Kind.SCHEMA_DEFINITION,
        description: description,
        directives: directives,
        operationTypes: operationTypes
      });
    }
    /**
     * OperationTypeDefinition : OperationType : NamedType
     */

  }, {
    key: "parseOperationTypeDefinition",
    value: function parseOperationTypeDefinition() {
      var start = this._lexer.token;
      var operation = this.parseOperationType();
      this.expectToken(_tokenKind.TokenKind.COLON);
      var type = this.parseNamedType();
      return this.node(start, {
        kind: _kinds.Kind.OPERATION_TYPE_DEFINITION,
        operation: operation,
        type: type
      });
    }
    /**
     * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
     */

  }, {
    key: "parseScalarTypeDefinition",
    value: function parseScalarTypeDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('scalar');
      var name = this.parseName();
      var directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.SCALAR_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives
      });
    }
    /**
     * ObjectTypeDefinition :
     *   Description?
     *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
     */

  }, {
    key: "parseObjectTypeDefinition",
    value: function parseObjectTypeDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('type');
      var name = this.parseName();
      var interfaces = this.parseImplementsInterfaces();
      var directives = this.parseConstDirectives();
      var fields = this.parseFieldsDefinition();
      return this.node(start, {
        kind: _kinds.Kind.OBJECT_TYPE_DEFINITION,
        description: description,
        name: name,
        interfaces: interfaces,
        directives: directives,
        fields: fields
      });
    }
    /**
     * ImplementsInterfaces :
     *   - implements `&`? NamedType
     *   - ImplementsInterfaces & NamedType
     */

  }, {
    key: "parseImplementsInterfaces",
    value: function parseImplementsInterfaces() {
      return this.expectOptionalKeyword('implements') ? this.delimitedMany(_tokenKind.TokenKind.AMP, this.parseNamedType) : [];
    }
    /**
     * ```
     * FieldsDefinition : { FieldDefinition+ }
     * ```
     */

  }, {
    key: "parseFieldsDefinition",
    value: function parseFieldsDefinition() {
      return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseFieldDefinition, _tokenKind.TokenKind.BRACE_R);
    }
    /**
     * FieldDefinition :
     *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
     */

  }, {
    key: "parseFieldDefinition",
    value: function parseFieldDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      var name = this.parseName();
      var args = this.parseArgumentDefs();
      this.expectToken(_tokenKind.TokenKind.COLON);
      var type = this.parseTypeReference();
      var directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.FIELD_DEFINITION,
        description: description,
        name: name,
        arguments: args,
        type: type,
        directives: directives
      });
    }
    /**
     * ArgumentsDefinition : ( InputValueDefinition+ )
     */

  }, {
    key: "parseArgumentDefs",
    value: function parseArgumentDefs() {
      return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseInputValueDef, _tokenKind.TokenKind.PAREN_R);
    }
    /**
     * InputValueDefinition :
     *   - Description? Name : Type DefaultValue? Directives[Const]?
     */

  }, {
    key: "parseInputValueDef",
    value: function parseInputValueDef() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      var name = this.parseName();
      this.expectToken(_tokenKind.TokenKind.COLON);
      var type = this.parseTypeReference();
      var defaultValue;

      if (this.expectOptionalToken(_tokenKind.TokenKind.EQUALS)) {
        defaultValue = this.parseConstValueLiteral();
      }

      var directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.INPUT_VALUE_DEFINITION,
        description: description,
        name: name,
        type: type,
        defaultValue: defaultValue,
        directives: directives
      });
    }
    /**
     * InterfaceTypeDefinition :
     *   - Description? interface Name Directives[Const]? FieldsDefinition?
     */

  }, {
    key: "parseInterfaceTypeDefinition",
    value: function parseInterfaceTypeDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('interface');
      var name = this.parseName();
      var interfaces = this.parseImplementsInterfaces();
      var directives = this.parseConstDirectives();
      var fields = this.parseFieldsDefinition();
      return this.node(start, {
        kind: _kinds.Kind.INTERFACE_TYPE_DEFINITION,
        description: description,
        name: name,
        interfaces: interfaces,
        directives: directives,
        fields: fields
      });
    }
    /**
     * UnionTypeDefinition :
     *   - Description? union Name Directives[Const]? UnionMemberTypes?
     */

  }, {
    key: "parseUnionTypeDefinition",
    value: function parseUnionTypeDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('union');
      var name = this.parseName();
      var directives = this.parseConstDirectives();
      var types = this.parseUnionMemberTypes();
      return this.node(start, {
        kind: _kinds.Kind.UNION_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        types: types
      });
    }
    /**
     * UnionMemberTypes :
     *   - = `|`? NamedType
     *   - UnionMemberTypes | NamedType
     */

  }, {
    key: "parseUnionMemberTypes",
    value: function parseUnionMemberTypes() {
      return this.expectOptionalToken(_tokenKind.TokenKind.EQUALS) ? this.delimitedMany(_tokenKind.TokenKind.PIPE, this.parseNamedType) : [];
    }
    /**
     * EnumTypeDefinition :
     *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
     */

  }, {
    key: "parseEnumTypeDefinition",
    value: function parseEnumTypeDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('enum');
      var name = this.parseName();
      var directives = this.parseConstDirectives();
      var values = this.parseEnumValuesDefinition();
      return this.node(start, {
        kind: _kinds.Kind.ENUM_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        values: values
      });
    }
    /**
     * ```
     * EnumValuesDefinition : { EnumValueDefinition+ }
     * ```
     */

  }, {
    key: "parseEnumValuesDefinition",
    value: function parseEnumValuesDefinition() {
      return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseEnumValueDefinition, _tokenKind.TokenKind.BRACE_R);
    }
    /**
     * EnumValueDefinition : Description? EnumValue Directives[Const]?
     */

  }, {
    key: "parseEnumValueDefinition",
    value: function parseEnumValueDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      var name = this.parseEnumValueName();
      var directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.ENUM_VALUE_DEFINITION,
        description: description,
        name: name,
        directives: directives
      });
    }
    /**
     * EnumValue : Name but not `true`, `false` or `null`
     */

  }, {
    key: "parseEnumValueName",
    value: function parseEnumValueName() {
      if (this._lexer.token.value === 'true' || this._lexer.token.value === 'false' || this._lexer.token.value === 'null') {
        throw (0, _syntaxError.syntaxError)(this._lexer.source, this._lexer.token.start, "".concat(getTokenDesc(this._lexer.token), " is reserved and cannot be used for an enum value."));
      }

      return this.parseName();
    }
    /**
     * InputObjectTypeDefinition :
     *   - Description? input Name Directives[Const]? InputFieldsDefinition?
     */

  }, {
    key: "parseInputObjectTypeDefinition",
    value: function parseInputObjectTypeDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('input');
      var name = this.parseName();
      var directives = this.parseConstDirectives();
      var fields = this.parseInputFieldsDefinition();
      return this.node(start, {
        kind: _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        fields: fields
      });
    }
    /**
     * ```
     * InputFieldsDefinition : { InputValueDefinition+ }
     * ```
     */

  }, {
    key: "parseInputFieldsDefinition",
    value: function parseInputFieldsDefinition() {
      return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseInputValueDef, _tokenKind.TokenKind.BRACE_R);
    }
    /**
     * TypeSystemExtension :
     *   - SchemaExtension
     *   - TypeExtension
     *
     * TypeExtension :
     *   - ScalarTypeExtension
     *   - ObjectTypeExtension
     *   - InterfaceTypeExtension
     *   - UnionTypeExtension
     *   - EnumTypeExtension
     *   - InputObjectTypeDefinition
     */

  }, {
    key: "parseTypeSystemExtension",
    value: function parseTypeSystemExtension() {
      var keywordToken = this._lexer.lookahead();

      if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
        switch (keywordToken.value) {
          case 'schema':
            return this.parseSchemaExtension();

          case 'scalar':
            return this.parseScalarTypeExtension();

          case 'type':
            return this.parseObjectTypeExtension();

          case 'interface':
            return this.parseInterfaceTypeExtension();

          case 'union':
            return this.parseUnionTypeExtension();

          case 'enum':
            return this.parseEnumTypeExtension();

          case 'input':
            return this.parseInputObjectTypeExtension();
        }
      }

      throw this.unexpected(keywordToken);
    }
    /**
     * ```
     * SchemaExtension :
     *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
     *  - extend schema Directives[Const]
     * ```
     */

  }, {
    key: "parseSchemaExtension",
    value: function parseSchemaExtension() {
      var start = this._lexer.token;
      this.expectKeyword('extend');
      this.expectKeyword('schema');
      var directives = this.parseConstDirectives();
      var operationTypes = this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);

      if (directives.length === 0 && operationTypes.length === 0) {
        throw this.unexpected();
      }

      return this.node(start, {
        kind: _kinds.Kind.SCHEMA_EXTENSION,
        directives: directives,
        operationTypes: operationTypes
      });
    }
    /**
     * ScalarTypeExtension :
     *   - extend scalar Name Directives[Const]
     */

  }, {
    key: "parseScalarTypeExtension",
    value: function parseScalarTypeExtension() {
      var start = this._lexer.token;
      this.expectKeyword('extend');
      this.expectKeyword('scalar');
      var name = this.parseName();
      var directives = this.parseConstDirectives();

      if (directives.length === 0) {
        throw this.unexpected();
      }

      return this.node(start, {
        kind: _kinds.Kind.SCALAR_TYPE_EXTENSION,
        name: name,
        directives: directives
      });
    }
    /**
     * ObjectTypeExtension :
     *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
     *  - extend type Name ImplementsInterfaces? Directives[Const]
     *  - extend type Name ImplementsInterfaces
     */

  }, {
    key: "parseObjectTypeExtension",
    value: function parseObjectTypeExtension() {
      var start = this._lexer.token;
      this.expectKeyword('extend');
      this.expectKeyword('type');
      var name = this.parseName();
      var interfaces = this.parseImplementsInterfaces();
      var directives = this.parseConstDirectives();
      var fields = this.parseFieldsDefinition();

      if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }

      return this.node(start, {
        kind: _kinds.Kind.OBJECT_TYPE_EXTENSION,
        name: name,
        interfaces: interfaces,
        directives: directives,
        fields: fields
      });
    }
    /**
     * InterfaceTypeExtension :
     *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
     *  - extend interface Name ImplementsInterfaces? Directives[Const]
     *  - extend interface Name ImplementsInterfaces
     */

  }, {
    key: "parseInterfaceTypeExtension",
    value: function parseInterfaceTypeExtension() {
      var start = this._lexer.token;
      this.expectKeyword('extend');
      this.expectKeyword('interface');
      var name = this.parseName();
      var interfaces = this.parseImplementsInterfaces();
      var directives = this.parseConstDirectives();
      var fields = this.parseFieldsDefinition();

      if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }

      return this.node(start, {
        kind: _kinds.Kind.INTERFACE_TYPE_EXTENSION,
        name: name,
        interfaces: interfaces,
        directives: directives,
        fields: fields
      });
    }
    /**
     * UnionTypeExtension :
     *   - extend union Name Directives[Const]? UnionMemberTypes
     *   - extend union Name Directives[Const]
     */

  }, {
    key: "parseUnionTypeExtension",
    value: function parseUnionTypeExtension() {
      var start = this._lexer.token;
      this.expectKeyword('extend');
      this.expectKeyword('union');
      var name = this.parseName();
      var directives = this.parseConstDirectives();
      var types = this.parseUnionMemberTypes();

      if (directives.length === 0 && types.length === 0) {
        throw this.unexpected();
      }

      return this.node(start, {
        kind: _kinds.Kind.UNION_TYPE_EXTENSION,
        name: name,
        directives: directives,
        types: types
      });
    }
    /**
     * EnumTypeExtension :
     *   - extend enum Name Directives[Const]? EnumValuesDefinition
     *   - extend enum Name Directives[Const]
     */

  }, {
    key: "parseEnumTypeExtension",
    value: function parseEnumTypeExtension() {
      var start = this._lexer.token;
      this.expectKeyword('extend');
      this.expectKeyword('enum');
      var name = this.parseName();
      var directives = this.parseConstDirectives();
      var values = this.parseEnumValuesDefinition();

      if (directives.length === 0 && values.length === 0) {
        throw this.unexpected();
      }

      return this.node(start, {
        kind: _kinds.Kind.ENUM_TYPE_EXTENSION,
        name: name,
        directives: directives,
        values: values
      });
    }
    /**
     * InputObjectTypeExtension :
     *   - extend input Name Directives[Const]? InputFieldsDefinition
     *   - extend input Name Directives[Const]
     */

  }, {
    key: "parseInputObjectTypeExtension",
    value: function parseInputObjectTypeExtension() {
      var start = this._lexer.token;
      this.expectKeyword('extend');
      this.expectKeyword('input');
      var name = this.parseName();
      var directives = this.parseConstDirectives();
      var fields = this.parseInputFieldsDefinition();

      if (directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }

      return this.node(start, {
        kind: _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION,
        name: name,
        directives: directives,
        fields: fields
      });
    }
    /**
     * ```
     * DirectiveDefinition :
     *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
     * ```
     */

  }, {
    key: "parseDirectiveDefinition",
    value: function parseDirectiveDefinition() {
      var start = this._lexer.token;
      var description = this.parseDescription();
      this.expectKeyword('directive');
      this.expectToken(_tokenKind.TokenKind.AT);
      var name = this.parseName();
      var args = this.parseArgumentDefs();
      var repeatable = this.expectOptionalKeyword('repeatable');
      this.expectKeyword('on');
      var locations = this.parseDirectiveLocations();
      return this.node(start, {
        kind: _kinds.Kind.DIRECTIVE_DEFINITION,
        description: description,
        name: name,
        arguments: args,
        repeatable: repeatable,
        locations: locations
      });
    }
    /**
     * DirectiveLocations :
     *   - `|`? DirectiveLocation
     *   - DirectiveLocations | DirectiveLocation
     */

  }, {
    key: "parseDirectiveLocations",
    value: function parseDirectiveLocations() {
      return this.delimitedMany(_tokenKind.TokenKind.PIPE, this.parseDirectiveLocation);
    }
    /*
     * DirectiveLocation :
     *   - ExecutableDirectiveLocation
     *   - TypeSystemDirectiveLocation
     *
     * ExecutableDirectiveLocation : one of
     *   `QUERY`
     *   `MUTATION`
     *   `SUBSCRIPTION`
     *   `FIELD`
     *   `FRAGMENT_DEFINITION`
     *   `FRAGMENT_SPREAD`
     *   `INLINE_FRAGMENT`
     *
     * TypeSystemDirectiveLocation : one of
     *   `SCHEMA`
     *   `SCALAR`
     *   `OBJECT`
     *   `FIELD_DEFINITION`
     *   `ARGUMENT_DEFINITION`
     *   `INTERFACE`
     *   `UNION`
     *   `ENUM`
     *   `ENUM_VALUE`
     *   `INPUT_OBJECT`
     *   `INPUT_FIELD_DEFINITION`
     */

  }, {
    key: "parseDirectiveLocation",
    value: function parseDirectiveLocation() {
      var start = this._lexer.token;
      var name = this.parseName();

      if (Object.prototype.hasOwnProperty.call(_directiveLocation.DirectiveLocation, name.value)) {
        return name;
      }

      throw this.unexpected(start);
    } // Core parsing utility functions

    /**
     * Returns a node that, if configured to do so, sets a "loc" field as a
     * location object, used to identify the place in the source that created a
     * given parsed object.
     */

  }, {
    key: "node",
    value: function node(startToken, _node) {
      var _this$_options2;

      if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.noLocation) !== true) {
        _node.loc = new _ast.Location(startToken, this._lexer.lastToken, this._lexer.source);
      }

      return _node;
    }
    /**
     * Determines if the next token is of a given kind
     */

  }, {
    key: "peek",
    value: function peek(kind) {
      return this._lexer.token.kind === kind;
    }
    /**
     * If the next token is of the given kind, return that token after advancing the lexer.
     * Otherwise, do not change the parser state and throw an error.
     */

  }, {
    key: "expectToken",
    value: function expectToken(kind) {
      var token = this._lexer.token;

      if (token.kind === kind) {
        this._lexer.advance();

        return token;
      }

      throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
    }
    /**
     * If the next token is of the given kind, return "true" after advancing the lexer.
     * Otherwise, do not change the parser state and return "false".
     */

  }, {
    key: "expectOptionalToken",
    value: function expectOptionalToken(kind) {
      var token = this._lexer.token;

      if (token.kind === kind) {
        this._lexer.advance();

        return true;
      }

      return false;
    }
    /**
     * If the next token is a given keyword, advance the lexer.
     * Otherwise, do not change the parser state and throw an error.
     */

  }, {
    key: "expectKeyword",
    value: function expectKeyword(value) {
      var token = this._lexer.token;

      if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
        this._lexer.advance();
      } else {
        throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(token), "."));
      }
    }
    /**
     * If the next token is a given keyword, return "true" after advancing the lexer.
     * Otherwise, do not change the parser state and return "false".
     */

  }, {
    key: "expectOptionalKeyword",
    value: function expectOptionalKeyword(value) {
      var token = this._lexer.token;

      if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
        this._lexer.advance();

        return true;
      }

      return false;
    }
    /**
     * Helper function for creating an error when an unexpected lexed token is encountered.
     */

  }, {
    key: "unexpected",
    value: function unexpected(atToken) {
      var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
      return (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
    }
    /**
     * Returns a possibly empty list of parse nodes, determined by the parseFn.
     * This list begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */

  }, {
    key: "any",
    value: function any(openKind, parseFn, closeKind) {
      this.expectToken(openKind);
      var nodes = [];

      while (!this.expectOptionalToken(closeKind)) {
        nodes.push(parseFn.call(this));
      }

      return nodes;
    }
    /**
     * Returns a list of parse nodes, determined by the parseFn.
     * It can be empty only if open token is missing otherwise it will always return non-empty list
     * that begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */

  }, {
    key: "optionalMany",
    value: function optionalMany(openKind, parseFn, closeKind) {
      if (this.expectOptionalToken(openKind)) {
        var nodes = [];

        do {
          nodes.push(parseFn.call(this));
        } while (!this.expectOptionalToken(closeKind));

        return nodes;
      }

      return [];
    }
    /**
     * Returns a non-empty list of parse nodes, determined by the parseFn.
     * This list begins with a lex token of openKind and ends with a lex token of closeKind.
     * Advances the parser to the next lex token after the closing token.
     */

  }, {
    key: "many",
    value: function many(openKind, parseFn, closeKind) {
      this.expectToken(openKind);
      var nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }
    /**
     * Returns a non-empty list of parse nodes, determined by the parseFn.
     * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
     * Advances the parser to the next lex token after last item in the list.
     */

  }, {
    key: "delimitedMany",
    value: function delimitedMany(delimiterKind, parseFn) {
      this.expectOptionalToken(delimiterKind);
      var nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (this.expectOptionalToken(delimiterKind));

      return nodes;
    }
  }]);

  return Parser;
}();
/**
 * A helper function to describe a token as a string for debugging.
 */


exports.Parser = Parser;

function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? " \"".concat(value, "\"") : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */


function getTokenKindDesc(kind) {
  return (0, _lexer.isPunctuatorTokenKind)(kind) ? "\"".concat(kind, "\"") : kind;
}
},{"../error/syntaxError.js":"node_modules/graphql/error/syntaxError.js","./ast.js":"node_modules/graphql/language/ast.js","./directiveLocation.js":"node_modules/graphql/language/directiveLocation.js","./kinds.js":"node_modules/graphql/language/kinds.js","./lexer.js":"node_modules/graphql/language/lexer.js","./source.js":"node_modules/graphql/language/source.js","./tokenKind.js":"node_modules/graphql/language/tokenKind.js"}],"node_modules/graphql/language/printString.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printString = printString;
/**
 * Prints a string as a GraphQL StringValue literal. Replaces control characters
 * and excluded characters (" U+0022 and \\ U+005C) with escape sequences.
 */

function printString(str) {
  return "\"".concat(str.replace(escapedRegExp, escapedReplacer), "\"");
} // eslint-disable-next-line no-control-regex


var escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;

function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
} // prettier-ignore


var escapeSequences = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '\\t', '\\n', "\\u000B", '\\f', '\\r', "\\u000E", "\\u000F", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001A", "\\u001B", "\\u001C", "\\u001D", "\\u001E", "\\u001F", '', '', '\\"', '', '', '', '', '', '', '', '', '', '', '', '', '', // 2F
'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', // 3F
'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', // 4F
'', '', '', '', '', '', '', '', '', '', '', '', '\\\\', '', '', '', // 5F
'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', // 6F
'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', "\\u007F", "\\u0080", "\\u0081", "\\u0082", "\\u0083", "\\u0084", "\\u0085", "\\u0086", "\\u0087", "\\u0088", "\\u0089", "\\u008A", "\\u008B", "\\u008C", "\\u008D", "\\u008E", "\\u008F", "\\u0090", "\\u0091", "\\u0092", "\\u0093", "\\u0094", "\\u0095", "\\u0096", "\\u0097", "\\u0098", "\\u0099", "\\u009A", "\\u009B", "\\u009C", "\\u009D", "\\u009E", "\\u009F"];
},{}],"node_modules/graphql/language/visitor.js":[function(require,module,exports) {
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.BREAK = void 0;
exports.getEnterLeaveForKind = getEnterLeaveForKind;
exports.getVisitFn = getVisitFn;
exports.visit = visit;
exports.visitInParallel = visitInParallel;

var _devAssert = require('../jsutils/devAssert.js');

var _inspect = require('../jsutils/inspect.js');

var _ast = require('./ast.js');

var _kinds = require('./kinds.js');

var BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 * ```ts
 * const editedAST = visit(ast, {
 *   enter(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: skip visiting this node
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   },
 *   leave(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: no action
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   }
 * });
 * ```
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to three permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind(node) {
 *     // enter the "Kind" node
 *   }
 * })
 * ```
 *
 * 2) Named visitors that trigger upon entering and leaving a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind: {
 *     enter(node) {
 *       // enter the "Kind" node
 *     }
 *     leave(node) {
 *       // leave the "Kind" node
 *     }
 *   }
 * })
 * ```
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 * ```ts
 * visit(ast, {
 *   enter(node) {
 *     // enter any node
 *   },
 *   leave(node) {
 *     // leave any node
 *   }
 * })
 * ```
 */

exports.BREAK = BREAK;

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ast.QueryDocumentKeys;
  var enterLeaveMap = new Map();

  for (var _i = 0, _Object$values = Object.values(_kinds.Kind); _i < _Object$values.length; _i++) {
    var kind = _Object$values[_i];
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  /* eslint-disable no-undef-init */


  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = root;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
          var editOffset = 0;

          var _iterator = _createForOfIteratorHelper(edits),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                  editKey = _step$value[0],
                  editValue = _step$value[1];

              var arrayKey = editKey - editOffset;

              if (editValue === null) {
                node.splice(arrayKey, 1);
                editOffset++;
              } else {
                node[arrayKey] = editValue;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          node = Object.defineProperties({}, Object.getOwnPropertyDescriptors(node));

          var _iterator2 = _createForOfIteratorHelper(edits),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  _editKey = _step2$value[0],
                  _editValue = _step2$value[1];

              node[_editKey] = _editValue;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];

      if (node === null || node === undefined) {
        continue;
      }

      path.push(key);
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;

      (0, _ast.isNode)(node) || (0, _devAssert.devAssert)(false, "Invalid AST Node: ".concat((0, _inspect.inspect)(node), "."));
      var visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
      result = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path, ancestors);

      if (result === BREAK) {
        break;
      }

      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== undefined) {
        edits.push([key, result]);

        if (!isLeaving) {
          if ((0, _ast.isNode)(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;

      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    // New root
    return edits[edits.length - 1][1];
  }

  return root;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */


function visitInParallel(visitors) {
  var skipping = new Array(visitors.length).fill(null);
  var mergedVisitor = Object.create(null);

  var _loop = function _loop() {
    var kind = _Object$values2[_i2];
    var hasVisitor = false;
    var enterList = new Array(visitors.length).fill(undefined);
    var leaveList = new Array(visitors.length).fill(undefined);

    for (var i = 0; i < visitors.length; ++i) {
      var _getEnterLeaveForKind = getEnterLeaveForKind(visitors[i], kind),
          enter = _getEnterLeaveForKind.enter,
          leave = _getEnterLeaveForKind.leave;

      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }

    if (!hasVisitor) {
      return "continue";
    }

    var mergedEnterLeave = {
      enter: function enter() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var node = args[0];

        for (var _i3 = 0; _i3 < visitors.length; _i3++) {
          if (skipping[_i3] === null) {
            var _enterList$i;

            var result = (_enterList$i = enterList[_i3]) === null || _enterList$i === void 0 ? void 0 : _enterList$i.apply(visitors[_i3], args);

            if (result === false) {
              skipping[_i3] = node;
            } else if (result === BREAK) {
              skipping[_i3] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      },
      leave: function leave() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var node = args[0];

        for (var _i4 = 0; _i4 < visitors.length; _i4++) {
          if (skipping[_i4] === null) {
            var _leaveList$i;

            var result = (_leaveList$i = leaveList[_i4]) === null || _leaveList$i === void 0 ? void 0 : _leaveList$i.apply(visitors[_i4], args);

            if (result === BREAK) {
              skipping[_i4] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          } else if (skipping[_i4] === node) {
            skipping[_i4] = null;
          }
        }
      }
    };
    mergedVisitor[kind] = mergedEnterLeave;
  };

  for (var _i2 = 0, _Object$values2 = Object.values(_kinds.Kind); _i2 < _Object$values2.length; _i2++) {
    var _ret = _loop();

    if (_ret === "continue") continue;
  }

  return mergedVisitor;
}
/**
 * Given a visitor instance and a node kind, return EnterLeaveVisitor for that kind.
 */


function getEnterLeaveForKind(visitor, kind) {
  var kindVisitor = visitor[kind];

  if (_typeof(kindVisitor) === 'object') {
    // { Kind: { enter() {}, leave() {} } }
    return kindVisitor;
  } else if (typeof kindVisitor === 'function') {
    // { Kind() {} }
    return {
      enter: kindVisitor,
      leave: undefined
    };
  } // { enter() {}, leave() {} }


  return {
    enter: visitor.enter,
    leave: visitor.leave
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 *
 * @deprecated Please use `getEnterLeaveForKind` instead. Will be removed in v17
 */

/* c8 ignore next 8 */


function getVisitFn(visitor, kind, isLeaving) {
  var _getEnterLeaveForKind2 = getEnterLeaveForKind(visitor, kind),
      enter = _getEnterLeaveForKind2.enter,
      leave = _getEnterLeaveForKind2.leave;

  return isLeaving ? leave : enter;
}
},{"../jsutils/devAssert.js":"node_modules/graphql/jsutils/devAssert.js","../jsutils/inspect.js":"node_modules/graphql/jsutils/inspect.js","./ast.js":"node_modules/graphql/language/ast.js","./kinds.js":"node_modules/graphql/language/kinds.js"}],"node_modules/graphql/language/printer.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.print = print;

var _blockString = require('./blockString.js');

var _printString = require('./printString.js');

var _visitor = require('./visitor.js');
/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */


function print(ast) {
  return (0, _visitor.visit)(ast, printDocASTReducer);
}

var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: {
    leave: function leave(node) {
      return node.value;
    }
  },
  Variable: {
    leave: function leave(node) {
      return '$' + node.name;
    }
  },
  // Document
  Document: {
    leave: function leave(node) {
      return join(node.definitions, '\n\n');
    }
  },
  OperationDefinition: {
    leave: function leave(node) {
      var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
      var prefix = join([node.operation, join([node.name, varDefs]), join(node.directives, ' ')], ' '); // Anonymous queries with no directives or variable definitions can use
      // the query short form.

      return (prefix === 'query' ? '' : prefix + ' ') + node.selectionSet;
    }
  },
  VariableDefinition: {
    leave: function leave(_ref) {
      var variable = _ref.variable,
          type = _ref.type,
          defaultValue = _ref.defaultValue,
          directives = _ref.directives;
      return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
    }
  },
  SelectionSet: {
    leave: function leave(_ref2) {
      var selections = _ref2.selections;
      return block(selections);
    }
  },
  Field: {
    leave: function leave(_ref3) {
      var alias = _ref3.alias,
          name = _ref3.name,
          args = _ref3.arguments,
          directives = _ref3.directives,
          selectionSet = _ref3.selectionSet;
      var prefix = wrap('', alias, ': ') + name;
      var argsLine = prefix + wrap('(', join(args, ', '), ')');

      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
      }

      return join([argsLine, join(directives, ' '), selectionSet], ' ');
    }
  },
  Argument: {
    leave: function leave(_ref4) {
      var name = _ref4.name,
          value = _ref4.value;
      return name + ': ' + value;
    }
  },
  // Fragments
  FragmentSpread: {
    leave: function leave(_ref5) {
      var name = _ref5.name,
          directives = _ref5.directives;
      return '...' + name + wrap(' ', join(directives, ' '));
    }
  },
  InlineFragment: {
    leave: function leave(_ref6) {
      var typeCondition = _ref6.typeCondition,
          directives = _ref6.directives,
          selectionSet = _ref6.selectionSet;
      return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
    }
  },
  FragmentDefinition: {
    leave: function leave(_ref7 // Note: fragment variable definitions are experimental and may be changed
    ) {
      var name = _ref7.name,
          typeCondition = _ref7.typeCondition,
          variableDefinitions = _ref7.variableDefinitions,
          directives = _ref7.directives,
          selectionSet = _ref7.selectionSet;
      return (// or removed in the future.
        "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
      );
    }
  },
  // Value
  IntValue: {
    leave: function leave(_ref8) {
      var value = _ref8.value;
      return value;
    }
  },
  FloatValue: {
    leave: function leave(_ref9) {
      var value = _ref9.value;
      return value;
    }
  },
  StringValue: {
    leave: function leave(_ref10) {
      var value = _ref10.value,
          isBlockString = _ref10.block;
      return isBlockString ? (0, _blockString.printBlockString)(value) : (0, _printString.printString)(value);
    }
  },
  BooleanValue: {
    leave: function leave(_ref11) {
      var value = _ref11.value;
      return value ? 'true' : 'false';
    }
  },
  NullValue: {
    leave: function leave() {
      return 'null';
    }
  },
  EnumValue: {
    leave: function leave(_ref12) {
      var value = _ref12.value;
      return value;
    }
  },
  ListValue: {
    leave: function leave(_ref13) {
      var values = _ref13.values;
      return '[' + join(values, ', ') + ']';
    }
  },
  ObjectValue: {
    leave: function leave(_ref14) {
      var fields = _ref14.fields;
      return '{' + join(fields, ', ') + '}';
    }
  },
  ObjectField: {
    leave: function leave(_ref15) {
      var name = _ref15.name,
          value = _ref15.value;
      return name + ': ' + value;
    }
  },
  // Directive
  Directive: {
    leave: function leave(_ref16) {
      var name = _ref16.name,
          args = _ref16.arguments;
      return '@' + name + wrap('(', join(args, ', '), ')');
    }
  },
  // Type
  NamedType: {
    leave: function leave(_ref17) {
      var name = _ref17.name;
      return name;
    }
  },
  ListType: {
    leave: function leave(_ref18) {
      var type = _ref18.type;
      return '[' + type + ']';
    }
  },
  NonNullType: {
    leave: function leave(_ref19) {
      var type = _ref19.type;
      return type + '!';
    }
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: function leave(_ref20) {
      var description = _ref20.description,
          directives = _ref20.directives,
          operationTypes = _ref20.operationTypes;
      return wrap('', description, '\n') + join(['schema', join(directives, ' '), block(operationTypes)], ' ');
    }
  },
  OperationTypeDefinition: {
    leave: function leave(_ref21) {
      var operation = _ref21.operation,
          type = _ref21.type;
      return operation + ': ' + type;
    }
  },
  ScalarTypeDefinition: {
    leave: function leave(_ref22) {
      var description = _ref22.description,
          name = _ref22.name,
          directives = _ref22.directives;
      return wrap('', description, '\n') + join(['scalar', name, join(directives, ' ')], ' ');
    }
  },
  ObjectTypeDefinition: {
    leave: function leave(_ref23) {
      var description = _ref23.description,
          name = _ref23.name,
          interfaces = _ref23.interfaces,
          directives = _ref23.directives,
          fields = _ref23.fields;
      return wrap('', description, '\n') + join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
    }
  },
  FieldDefinition: {
    leave: function leave(_ref24) {
      var description = _ref24.description,
          name = _ref24.name,
          args = _ref24.arguments,
          type = _ref24.type,
          directives = _ref24.directives;
      return wrap('', description, '\n') + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + ': ' + type + wrap(' ', join(directives, ' '));
    }
  },
  InputValueDefinition: {
    leave: function leave(_ref25) {
      var description = _ref25.description,
          name = _ref25.name,
          type = _ref25.type,
          defaultValue = _ref25.defaultValue,
          directives = _ref25.directives;
      return wrap('', description, '\n') + join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
    }
  },
  InterfaceTypeDefinition: {
    leave: function leave(_ref26) {
      var description = _ref26.description,
          name = _ref26.name,
          interfaces = _ref26.interfaces,
          directives = _ref26.directives,
          fields = _ref26.fields;
      return wrap('', description, '\n') + join(['interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
    }
  },
  UnionTypeDefinition: {
    leave: function leave(_ref27) {
      var description = _ref27.description,
          name = _ref27.name,
          directives = _ref27.directives,
          types = _ref27.types;
      return wrap('', description, '\n') + join(['union', name, join(directives, ' '), wrap('= ', join(types, ' | '))], ' ');
    }
  },
  EnumTypeDefinition: {
    leave: function leave(_ref28) {
      var description = _ref28.description,
          name = _ref28.name,
          directives = _ref28.directives,
          values = _ref28.values;
      return wrap('', description, '\n') + join(['enum', name, join(directives, ' '), block(values)], ' ');
    }
  },
  EnumValueDefinition: {
    leave: function leave(_ref29) {
      var description = _ref29.description,
          name = _ref29.name,
          directives = _ref29.directives;
      return wrap('', description, '\n') + join([name, join(directives, ' ')], ' ');
    }
  },
  InputObjectTypeDefinition: {
    leave: function leave(_ref30) {
      var description = _ref30.description,
          name = _ref30.name,
          directives = _ref30.directives,
          fields = _ref30.fields;
      return wrap('', description, '\n') + join(['input', name, join(directives, ' '), block(fields)], ' ');
    }
  },
  DirectiveDefinition: {
    leave: function leave(_ref31) {
      var description = _ref31.description,
          name = _ref31.name,
          args = _ref31.arguments,
          repeatable = _ref31.repeatable,
          locations = _ref31.locations;
      return wrap('', description, '\n') + 'directive @' + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + (repeatable ? ' repeatable' : '') + ' on ' + join(locations, ' | ');
    }
  },
  SchemaExtension: {
    leave: function leave(_ref32) {
      var directives = _ref32.directives,
          operationTypes = _ref32.operationTypes;
      return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
    }
  },
  ScalarTypeExtension: {
    leave: function leave(_ref33) {
      var name = _ref33.name,
          directives = _ref33.directives;
      return join(['extend scalar', name, join(directives, ' ')], ' ');
    }
  },
  ObjectTypeExtension: {
    leave: function leave(_ref34) {
      var name = _ref34.name,
          interfaces = _ref34.interfaces,
          directives = _ref34.directives,
          fields = _ref34.fields;
      return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
    }
  },
  InterfaceTypeExtension: {
    leave: function leave(_ref35) {
      var name = _ref35.name,
          interfaces = _ref35.interfaces,
          directives = _ref35.directives,
          fields = _ref35.fields;
      return join(['extend interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
    }
  },
  UnionTypeExtension: {
    leave: function leave(_ref36) {
      var name = _ref36.name,
          directives = _ref36.directives,
          types = _ref36.types;
      return join(['extend union', name, join(directives, ' '), wrap('= ', join(types, ' | '))], ' ');
    }
  },
  EnumTypeExtension: {
    leave: function leave(_ref37) {
      var name = _ref37.name,
          directives = _ref37.directives,
          values = _ref37.values;
      return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
    }
  },
  InputObjectTypeExtension: {
    leave: function leave(_ref38) {
      var name = _ref38.name,
          directives = _ref38.directives,
          fields = _ref38.fields;
      return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
    }
  }
};
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */

function join(maybeArray) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var _maybeArray$filter$jo;

  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function (x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : '';
}
/**
 * Given array, print each item on its own line, wrapped in an indented `{ }` block.
 */


function block(array) {
  return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */


function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return maybeString != null && maybeString !== '' ? start + maybeString + end : '';
}

function indent(str) {
  return wrap('  ', str.replace(/\n/g, '\n  '));
}

function hasMultilineItems(maybeArray) {
  var _maybeArray$some; // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */


  return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some(function (str) {
    return str.includes('\n');
  })) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
}
},{"./blockString.js":"node_modules/graphql/language/blockString.js","./printString.js":"node_modules/graphql/language/printString.js","./visitor.js":"node_modules/graphql/language/visitor.js"}],"node_modules/extract-files/public/ReactNativeFile.js":[function(require,module,exports) {
'use strict';

module.exports = function ReactNativeFile(_ref) {
  var uri = _ref.uri,
      name = _ref.name,
      type = _ref.type;
  this.uri = uri;
  this.name = name;
  this.type = type;
};
},{}],"node_modules/extract-files/public/isExtractableFile.js":[function(require,module,exports) {
'use strict';

var ReactNativeFile = require('./ReactNativeFile');

module.exports = function isExtractableFile(value) {
  return typeof File !== 'undefined' && value instanceof File || typeof Blob !== 'undefined' && value instanceof Blob || value instanceof ReactNativeFile;
};
},{"./ReactNativeFile":"node_modules/extract-files/public/ReactNativeFile.js"}],"node_modules/extract-files/public/extractFiles.js":[function(require,module,exports) {
'use strict';

var defaultIsExtractableFile = require('./isExtractableFile');

module.exports = function extractFiles(value, path, isExtractableFile) {
  if (path === void 0) {
    path = '';
  }

  if (isExtractableFile === void 0) {
    isExtractableFile = defaultIsExtractableFile;
  }

  var clone;
  var files = new Map();

  function addFile(paths, file) {
    var storedPaths = files.get(file);
    if (storedPaths) storedPaths.push.apply(storedPaths, paths);else files.set(file, paths);
  }

  if (isExtractableFile(value)) {
    clone = null;
    addFile([path], value);
  } else {
    var prefix = path ? path + '.' : '';
    if (typeof FileList !== 'undefined' && value instanceof FileList) clone = Array.prototype.map.call(value, function (file, i) {
      addFile(['' + prefix + i], file);
      return null;
    });else if (Array.isArray(value)) clone = value.map(function (child, i) {
      var result = extractFiles(child, '' + prefix + i, isExtractableFile);
      result.files.forEach(addFile);
      return result.clone;
    });else if (value && value.constructor === Object) {
      clone = {};

      for (var i in value) {
        var result = extractFiles(value[i], '' + prefix + i, isExtractableFile);
        result.files.forEach(addFile);
        clone[i] = result.clone;
      }
    } else clone = value;
  }

  return {
    clone: clone,
    files: files
  };
};
},{"./isExtractableFile":"node_modules/extract-files/public/isExtractableFile.js"}],"node_modules/extract-files/public/index.js":[function(require,module,exports) {
'use strict';

exports.ReactNativeFile = require('./ReactNativeFile');
exports.extractFiles = require('./extractFiles');
exports.isExtractableFile = require('./isExtractableFile');
},{"./ReactNativeFile":"node_modules/extract-files/public/ReactNativeFile.js","./extractFiles":"node_modules/extract-files/public/extractFiles.js","./isExtractableFile":"node_modules/extract-files/public/isExtractableFile.js"}],"node_modules/form-data/lib/browser.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/* eslint-env browser */
module.exports = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' ? self.FormData : window.FormData;
},{}],"node_modules/graphql-request/dist/createRequestBody.js":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var extract_files_1 = require("extract-files");
var form_data_1 = __importDefault(require("form-data"));
/**
 * Duck type if NodeJS stream
 * https://github.com/sindresorhus/is-stream/blob/3750505b0727f6df54324784fe369365ef78841e/index.js#L3
 */
var isExtractableFileEnhanced = function (value) {
    return extract_files_1.isExtractableFile(value) ||
        (value !== null && typeof value === 'object' && typeof value.pipe === 'function');
};
/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 * Otherwise returns JSON
 */
function createRequestBody(query, variables, operationName) {
    var _a = extract_files_1.extractFiles({ query: query, variables: variables, operationName: operationName }, '', isExtractableFileEnhanced), clone = _a.clone, files = _a.files;
    if (files.size === 0) {
        if (!Array.isArray(query)) {
            return JSON.stringify(clone);
        }
        if (typeof variables !== 'undefined' && !Array.isArray(variables)) {
            throw new Error('Cannot create request body with given variable type, array expected');
        }
        // Batch support
        var payload = query.reduce(function (accu, currentQuery, index) {
            accu.push({ query: currentQuery, variables: variables ? variables[index] : undefined });
            return accu;
        }, []);
        return JSON.stringify(payload);
    }
    var Form = typeof FormData === 'undefined' ? form_data_1.default : FormData;
    var form = new Form();
    form.append('operations', JSON.stringify(clone));
    var map = {};
    var i = 0;
    files.forEach(function (paths) {
        map[++i] = paths;
    });
    form.append('map', JSON.stringify(map));
    i = 0;
    files.forEach(function (paths, file) {
        form.append("" + ++i, file);
    });
    return form;
}
exports.default = createRequestBody;

},{"extract-files":"node_modules/extract-files/public/index.js","form-data":"node_modules/form-data/lib/browser.js"}],"node_modules/graphql-request/dist/parseArgs.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBatchRequestsExtendedArgs = exports.parseRawRequestExtendedArgs = exports.parseRequestExtendedArgs = exports.parseBatchRequestArgs = exports.parseRawRequestArgs = exports.parseRequestArgs = void 0;
function parseRequestArgs(documentOrOptions, variables, requestHeaders) {
    return documentOrOptions.document
        ? documentOrOptions
        : {
            document: documentOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRequestArgs = parseRequestArgs;
function parseRawRequestArgs(queryOrOptions, variables, requestHeaders) {
    return queryOrOptions.query
        ? queryOrOptions
        : {
            query: queryOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRawRequestArgs = parseRawRequestArgs;
function parseBatchRequestArgs(documentsOrOptions, requestHeaders) {
    return documentsOrOptions.documents
        ? documentsOrOptions
        : {
            documents: documentsOrOptions,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseBatchRequestArgs = parseBatchRequestArgs;
function parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders) {
    return urlOrOptions.document
        ? urlOrOptions
        : {
            url: urlOrOptions,
            document: document,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRequestExtendedArgs = parseRequestExtendedArgs;
function parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders) {
    return urlOrOptions.query
        ? urlOrOptions
        : {
            url: urlOrOptions,
            query: query,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRawRequestExtendedArgs = parseRawRequestExtendedArgs;
function parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders) {
    return urlOrOptions.documents
        ? urlOrOptions
        : {
            url: urlOrOptions,
            documents: documents,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseBatchRequestsExtendedArgs = parseBatchRequestsExtendedArgs;

},{}],"node_modules/graphql-request/dist/types.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError(response, request) {
        var _this = this;
        var message = ClientError.extractMessage(response) + ": " + JSON.stringify({
            response: response,
            request: request,
        });
        _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ClientError.prototype);
        _this.response = response;
        _this.request = request;
        // this is needed as Safari doesn't support .captureStackTrace
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, ClientError);
        }
        return _this;
    }
    ClientError.extractMessage = function (response) {
        try {
            return response.errors[0].message;
        }
        catch (e) {
            return "GraphQL Error (Code: " + response.status + ")";
        }
    };
    return ClientError;
}(Error));
exports.ClientError = ClientError;

},{}],"node_modules/graphql-request/dist/index.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gql = exports.batchRequests = exports.request = exports.rawRequest = exports.GraphQLClient = exports.ClientError = void 0;
var cross_fetch_1 = __importStar(require("cross-fetch")), CrossFetch = cross_fetch_1;
var parser_1 = require("graphql/language/parser");
var printer_1 = require("graphql/language/printer");
var createRequestBody_1 = __importDefault(require("./createRequestBody"));
var parseArgs_1 = require("./parseArgs");
var types_1 = require("./types");
Object.defineProperty(exports, "ClientError", { enumerable: true, get: function () { return types_1.ClientError; } });
/**
 * Convert the given headers configuration into a plain object.
 */
var resolveHeaders = function (headers) {
    var oHeaders = {};
    if (headers) {
        if ((typeof Headers !== 'undefined' && headers instanceof Headers) ||
            headers instanceof CrossFetch.Headers) {
            oHeaders = HeadersInstanceToPlainObject(headers);
        }
        else if (Array.isArray(headers)) {
            headers.forEach(function (_a) {
                var name = _a[0], value = _a[1];
                oHeaders[name] = value;
            });
        }
        else {
            oHeaders = headers;
        }
    }
    return oHeaders;
};
/**
 * Clean a GraphQL document to send it via a GET query
 *
 * @param {string} str GraphQL query
 * @returns {string} Cleaned query
 */
var queryCleanner = function (str) { return str.replace(/([\s,]|#[^\n\r]+)+/g, ' ').trim(); };
/**
 * Create query string for GraphQL request
 *
 * @param {object} param0 -
 *
 * @param {string|string[]} param0.query the GraphQL document or array of document if it's a batch request
 * @param {string|undefined} param0.operationName the GraphQL operation name
 * @param {any|any[]} param0.variables the GraphQL variables to use
 */
var buildGetQueryParams = function (_a) {
    var query = _a.query, variables = _a.variables, operationName = _a.operationName;
    if (!Array.isArray(query)) {
        var search = ["query=" + encodeURIComponent(queryCleanner(query))];
        if (variables) {
            search.push("variables=" + encodeURIComponent(JSON.stringify(variables)));
        }
        if (operationName) {
            search.push("operationName=" + encodeURIComponent(operationName));
        }
        return search.join('&');
    }
    if (typeof variables !== 'undefined' && !Array.isArray(variables)) {
        throw new Error('Cannot create query with given variable type, array expected');
    }
    // Batch support
    var payload = query.reduce(function (accu, currentQuery, index) {
        accu.push({
            query: queryCleanner(currentQuery),
            variables: variables ? JSON.stringify(variables[index]) : undefined,
        });
        return accu;
    }, []);
    return "query=" + encodeURIComponent(JSON.stringify(payload));
};
/**
 * Fetch data using POST method
 */
var post = function (_a) {
    var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions;
    return __awaiter(void 0, void 0, void 0, function () {
        var body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = createRequestBody_1.default(query, variables, operationName);
                    return [4 /*yield*/, fetch(url, __assign({ method: 'POST', headers: __assign(__assign({}, (typeof body === 'string' ? { 'Content-Type': 'application/json' } : {})), headers), body: body }, fetchOptions))];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
/**
 * Fetch data using GET method
 */
var get = function (_a) {
    var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions;
    return __awaiter(void 0, void 0, void 0, function () {
        var queryParams;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queryParams = buildGetQueryParams({
                        query: query,
                        variables: variables,
                        operationName: operationName,
                    });
                    return [4 /*yield*/, fetch(url + "?" + queryParams, __assign({ method: 'GET', headers: headers }, fetchOptions))];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
/**
 * GraphQL Client.
 */
var GraphQLClient = /** @class */ (function () {
    function GraphQLClient(url, options) {
        this.url = url;
        this.options = options || {};
    }
    GraphQLClient.prototype.rawRequest = function (queryOrOptions, variables, requestHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var rawRequestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url, operationName;
            return __generator(this, function (_d) {
                rawRequestOptions = parseArgs_1.parseRawRequestArgs(queryOrOptions, variables, requestHeaders);
                _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                url = this.url;
                if (rawRequestOptions.signal !== undefined) {
                    fetchOptions.signal = rawRequestOptions.signal;
                }
                operationName = resolveRequestDocument(rawRequestOptions.query).operationName;
                return [2 /*return*/, makeRequest({
                        url: url,
                        query: rawRequestOptions.query,
                        variables: rawRequestOptions.variables,
                        headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(rawRequestOptions.requestHeaders)),
                        operationName: operationName,
                        fetch: fetch,
                        method: method,
                        fetchOptions: fetchOptions,
                    })];
            });
        });
    };
    GraphQLClient.prototype.request = function (documentOrOptions, variables, requestHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url, _d, query, operationName, data;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        requestOptions = parseArgs_1.parseRequestArgs(documentOrOptions, variables, requestHeaders);
                        _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                        url = this.url;
                        if (requestOptions.signal !== undefined) {
                            fetchOptions.signal = requestOptions.signal;
                        }
                        _d = resolveRequestDocument(requestOptions.document), query = _d.query, operationName = _d.operationName;
                        return [4 /*yield*/, makeRequest({
                                url: url,
                                query: query,
                                variables: requestOptions.variables,
                                headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(requestOptions.requestHeaders)),
                                operationName: operationName,
                                fetch: fetch,
                                method: method,
                                fetchOptions: fetchOptions,
                            })];
                    case 1:
                        data = (_e.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GraphQLClient.prototype.batchRequests = function (documentsOrOptions, requestHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var batchRequestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url, queries, variables, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        batchRequestOptions = parseArgs_1.parseBatchRequestArgs(documentsOrOptions, requestHeaders);
                        _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                        url = this.url;
                        if (batchRequestOptions.signal !== undefined) {
                            fetchOptions.signal = batchRequestOptions.signal;
                        }
                        queries = batchRequestOptions.documents.map(function (_a) {
                            var document = _a.document;
                            return resolveRequestDocument(document).query;
                        });
                        variables = batchRequestOptions.documents.map(function (_a) {
                            var variables = _a.variables;
                            return variables;
                        });
                        return [4 /*yield*/, makeRequest({
                                url: url,
                                query: queries,
                                variables: variables,
                                headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(batchRequestOptions.requestHeaders)),
                                operationName: undefined,
                                fetch: fetch,
                                method: method,
                                fetchOptions: fetchOptions,
                            })];
                    case 1:
                        data = (_d.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GraphQLClient.prototype.setHeaders = function (headers) {
        this.options.headers = headers;
        return this;
    };
    /**
     * Attach a header to the client. All subsequent requests will have this header.
     */
    GraphQLClient.prototype.setHeader = function (key, value) {
        var _a;
        var headers = this.options.headers;
        if (headers) {
            // todo what if headers is in nested array form... ?
            //@ts-ignore
            headers[key] = value;
        }
        else {
            this.options.headers = (_a = {}, _a[key] = value, _a);
        }
        return this;
    };
    /**
     * Change the client endpoint. All subsequent requests will send to this endpoint.
     */
    GraphQLClient.prototype.setEndpoint = function (value) {
        this.url = value;
        return this;
    };
    return GraphQLClient;
}());
exports.GraphQLClient = GraphQLClient;
function makeRequest(_a) {
    var url = _a.url, query = _a.query, variables = _a.variables, headers = _a.headers, operationName = _a.operationName, fetch = _a.fetch, _b = _a.method, method = _b === void 0 ? 'POST' : _b, fetchOptions = _a.fetchOptions;
    return __awaiter(this, void 0, void 0, function () {
        var fetcher, isBathchingQuery, response, result, successfullyReceivedData, headers_1, status_1, errorResult;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fetcher = method.toUpperCase() === 'POST' ? post : get;
                    isBathchingQuery = Array.isArray(query);
                    return [4 /*yield*/, fetcher({
                            url: url,
                            query: query,
                            variables: variables,
                            operationName: operationName,
                            headers: headers,
                            fetch: fetch,
                            fetchOptions: fetchOptions,
                        })];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, getResult(response)];
                case 2:
                    result = _c.sent();
                    successfullyReceivedData = isBathchingQuery && Array.isArray(result) ? !result.some(function (_a) {
                        var data = _a.data;
                        return !data;
                    }) : !!result.data;
                    if (response.ok && !result.errors && successfullyReceivedData) {
                        headers_1 = response.headers, status_1 = response.status;
                        return [2 /*return*/, __assign(__assign({}, (isBathchingQuery ? { data: result } : result)), { headers: headers_1, status: status_1 })];
                    }
                    else {
                        errorResult = typeof result === 'string' ? { error: result } : result;
                        throw new types_1.ClientError(__assign(__assign({}, errorResult), { status: response.status, headers: response.headers }), { query: query, variables: variables });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function rawRequest(urlOrOptions, query, variables, requestHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var requestOptions, client;
        return __generator(this, function (_a) {
            requestOptions = parseArgs_1.parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders);
            client = new GraphQLClient(requestOptions.url);
            return [2 /*return*/, client.rawRequest(__assign({}, requestOptions))];
        });
    });
}
exports.rawRequest = rawRequest;
function request(urlOrOptions, document, variables, requestHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var requestOptions, client;
        return __generator(this, function (_a) {
            requestOptions = parseArgs_1.parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders);
            client = new GraphQLClient(requestOptions.url);
            return [2 /*return*/, client.request(__assign({}, requestOptions))];
        });
    });
}
exports.request = request;
function batchRequests(urlOrOptions, documents, requestHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var requestOptions, client;
        return __generator(this, function (_a) {
            requestOptions = parseArgs_1.parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders);
            client = new GraphQLClient(requestOptions.url);
            return [2 /*return*/, client.batchRequests(__assign({}, requestOptions))];
        });
    });
}
exports.batchRequests = batchRequests;
exports.default = request;
/**
 * todo
 */
function getResult(response) {
    var contentType;
    response.headers.forEach(function (value, key) {
        if (key.toLowerCase() === 'content-type') {
            contentType = value;
        }
    });
    if (contentType && contentType.toLowerCase().startsWith('application/json')) {
        return response.json();
    }
    else {
        return response.text();
    }
}
/**
 * helpers
 */
function extractOperationName(document) {
    var _a;
    var operationName = undefined;
    var operationDefinitions = document.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; });
    if (operationDefinitions.length === 1) {
        operationName = (_a = operationDefinitions[0].name) === null || _a === void 0 ? void 0 : _a.value;
    }
    return operationName;
}
function resolveRequestDocument(document) {
    if (typeof document === 'string') {
        var operationName_1 = undefined;
        try {
            var parsedDocument = parser_1.parse(document);
            operationName_1 = extractOperationName(parsedDocument);
        }
        catch (err) {
            // Failed parsing the document, the operationName will be undefined
        }
        return { query: document, operationName: operationName_1 };
    }
    var operationName = extractOperationName(document);
    return { query: printer_1.print(document), operationName: operationName };
}
/**
 * Convenience passthrough template tag to get the benefits of tooling for the gql template tag. This does not actually parse the input into a GraphQL DocumentNode like graphql-tag package does. It just returns the string with any variables given interpolated. Can save you a bit of performance and having to install another package.
 *
 * @example
 *
 * import { gql } from 'graphql-request'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 *
 * @remarks
 *
 * Several tools in the Node GraphQL ecosystem are hardcoded to specially treat any template tag named "gql". For example see this prettier issue: https://github.com/prettier/prettier/issues/4360. Using this template tag has no runtime effect beyond variable interpolation.
 */
function gql(chunks) {
    var variables = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        variables[_i - 1] = arguments[_i];
    }
    return chunks.reduce(function (accumulator, chunk, index) { return "" + accumulator + chunk + (index in variables ? variables[index] : ''); }, '');
}
exports.gql = gql;
/**
 * Convert Headers instance into regular object
 */
function HeadersInstanceToPlainObject(headers) {
    var o = {};
    headers.forEach(function (v, k) {
        o[k] = v;
    });
    return o;
}

},{"cross-fetch":"node_modules/cross-fetch/dist/browser-ponyfill.js","graphql/language/parser":"node_modules/graphql/language/parser.js","graphql/language/printer":"node_modules/graphql/language/printer.js","./createRequestBody":"node_modules/graphql-request/dist/createRequestBody.js","./parseArgs":"node_modules/graphql-request/dist/parseArgs.js","./types":"node_modules/graphql-request/dist/types.js"}],"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"index.js":[function(require,module,exports) {
"use strict";

require("regenerator-runtime/runtime");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require("graphql-request"),
    GraphQLClient = _require.GraphQLClient;

console.log('Hello World'); //Relpace Client assertion

var CLIENT_ASSERTION = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkUzMDZBOTg4NDIwNjZBQkU5QzQ1QjQ0MjIyNTU0NjlFNTMwNEE2RTQifQ.eyJpYXQiOjE2NDc1NTc3NzQsIm5iZiI6MTY0NzU1Nzc3NCwiZXhwIjoxNjQ3NTU4MDc0LCJhdWQiOiJodHRwczovL3NlY3VyZS5zdGl0Y2gubW9uZXkvY29ubmVjdC90b2tlbiIsImlzcyI6InRlc3QtMzdkMDlmMTYtZDVmNS00MjI5LThiMTgtMGU5NjE2ZDM3YmM3Iiwic3ViIjoidGVzdC0zN2QwOWYxNi1kNWY1LTQyMjktOGIxOC0wZTk2MTZkMzdiYzciLCJqdGkiOiIxNjM4MjRkNGFhM2Q3OWFmZDhiNzdiYjE3NTI5YzA5MyJ9.IaIBklMOXaU6_6f3NBvvTtii0_MU-udekH8L94D6BxUArHCGlcLn2tiDVlUbUHk7YDUKwzTfT0SxWrtpRwRoMQp50RGs41kF-gAxXLP-pwQWPM0C70Pf2MTzLNrhKH8euOJYUqDXwqQtrT6GmC7VWng3TNoJoyEFaQPoFLcKWZIKoAlIbxV8E9z7XapmcZMVEI0lmtagNrbnOuu-wSNcbzZjh8GIN1DLtPNlsOneOTK3co1vxWN5dxu3DYVhTUUTC4JYDW04yDcw1YxecjFLGEmrG56YUesF7I75zjq2ge72THXDlIKMTDWd7NWZp6kYHOT0tX70ZuSl6taHclzczzQ3JOs1w7X16uFlM7hzzyMXMn0OAlNT20tX38aXzfhmAEeL4060E-H9uVAwgXMBJIx5dBYOTWQtwUUj-Z3Gt9sqaTmnzBz9AZPtbeO05QppGgZ5eeAxAMbUZRcia4FzghV4nQtJwBCOIdn3dyHyrVajqzeZELRRaOZCh3NF-U_lNizd6WxXZjN_wcBgQ3OhJ6zloK-hjXHxWjwKANBbhUXh_nyW5Y5cySczX434yRSC5Rk53KsGj2EO949S7lsEsAixpUd6XaGtj1ChPyrdDJOG-4ekbCTXVJc60jjO8yGnk4EjLq2HgH2Duc8JeoXV7EYTpF97Wv-trijLha6z7iI";
var CLIENT_ID = "test-37d09f16-d5f5-4229-8b18-0e9616d37bc7";

function retrieveTokenUsingClientAssertion(_x, _x2, _x3) {
  return _retrieveTokenUsingClientAssertion.apply(this, arguments);
} //Whenever you need a new token, uncomment section below, it will generate a new token, then check console on the browser to get the token


function _retrieveTokenUsingClientAssertion() {
  _retrieveTokenUsingClientAssertion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(clientId, clientAssertion, scopes) {
    var body, bodyString, response, responseBody;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = {
              grant_type: "client_credentials",
              client_id: clientId,
              scope: scopes,
              audience: "https://secure.stitch.money/connect/token",
              client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
              client_assertion: clientAssertion
            };
            bodyString = Object.entries(body).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  k = _ref2[0],
                  v = _ref2[1];

              return "".concat(k, "=").concat(encodeURIComponent(v));
            }).join("&");
            _context.next = 4;
            return fetch("https://secure.stitch.money/connect/token", {
              method: "post",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: bodyString
            });

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            responseBody = _context.sent;
            console.log("Tokens: ", responseBody);
            return _context.abrupt("return", responseBody.access_token);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _retrieveTokenUsingClientAssertion.apply(this, arguments);
}

var token = retrieveTokenUsingClientAssertion(CLIENT_ID, CLIENT_ASSERTION, "client_paymentrequest"); //Replace with newly generated token
//const token = "kU2NhCiPQ--TB_0A9tDqweZg-Wf6APjspvtVLjUaN1g";

var paybutton = document.getElementById('pay-button');
paybutton.addEventListener("click", function () {
  console.log(token);
  var token = "F8AupvzF-62tjodXgwS-Y0zRMTcNi7TVdxAxwpXkzW4";
  var graphQLClient = new GraphQLClient("https://api.stitch.money/graphql", {
    headers: {
      authorization: "Bearer ".concat(token)
    }
  });
  var createPaymentRequestMutation = "\n    mutation CreatePaymentRequest(\n        $amount: MoneyInput!,\n        $payerReference: String!,\n        $beneficiaryReference: String!,\n        $externalReference: String,\n        $beneficiaryName: String!,\n        $beneficiaryBankId: BankBeneficiaryBankId!,\n        $beneficiaryAccountNumber: String!) {\n      clientPaymentInitiationRequestCreate(input: {\n          amount: $amount,\n          payerReference: $payerReference,\n          beneficiaryReference: $beneficiaryReference,\n          externalReference: $externalReference,\n          beneficiary: {\n              bankAccount: {\n                  name: $beneficiaryName,\n                  bankId: $beneficiaryBankId,\n                  accountNumber: $beneficiaryAccountNumber\n              }\n          }\n        }) {\n        paymentInitiationRequest {\n          id\n          url\n        }\n      }\n    }";
  var urlResponse = '';
  graphQLClient.request(createPaymentRequestMutation, {
    amount: {
      quantity: 1,
      currency: "ZAR"
    },
    payerReference: "Joe-Fizz-01",
    beneficiaryReference: "KombuchaFizz",
    externalReference: "example-e32e5478-325b-4869-a53e-2021727d2afe",
    beneficiaryName: "FizzBuzz Co.",
    beneficiaryBankId: "fnb",
    beneficiaryAccountNumber: "123456789"
  }).then(function (data) {
    console.log("THE DATA: ", data.clientPaymentInitiationRequestCreate.paymentInitiationRequest);
    urlResponse = data.clientPaymentInitiationRequestCreate.paymentInitiationRequest;
    console.log(urlResponse);
    var url = "".concat(urlResponse.url, "?redirect_uri=http%3A%2F%2Flocalhost%3A3000");
    window.location.href = url;
  });
});
},{"graphql-request":"node_modules/graphql-request/dist/index.js","regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54478" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/PaymentRequest.e31bb0bc.js.map