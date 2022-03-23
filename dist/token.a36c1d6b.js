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
})({"token.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function retrieveTokenUsingClientAssertion(_x, _x2, _x3) {
  return _retrieveTokenUsingClientAssertion.apply(this, arguments);
}

function _retrieveTokenUsingClientAssertion() {
  _retrieveTokenUsingClientAssertion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(clientId, clientAssertion, scopes) {
    var CLIENT_ASSERTION, CLIENT_ID, retrieveTokenUsingClientAssertion, _retrieveTokenUsingClientAssertion2, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _retrieveTokenUsingClientAssertion2 = function _retrieveTokenUsingCl2() {
              _retrieveTokenUsingClientAssertion2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(clientId, clientAssertion, scopes) {
                var body, bodyString, response, responseBody;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        body = {
                          grant_type: 'client_credentials',
                          client_id: 'test-37d09f16-d5f5-4229-8b18-0e9616d37bc7',
                          scope: scopes.join(' '),
                          audience: 'https://secure.stitch.money/connect/token',
                          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                          client_assertion: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkUzMDZBOTg4NDIwNjZBQkU5QzQ1QjQ0MjIyNTU0NjlFNTMwNEE2RTQifQ.eyJpYXQiOjE2NDc1MzAxMDMsIm5iZiI6MTY0NzUzMDEwMywiZXhwIjoxNjQ3NTMwNDAzLCJhdWQiOiJodHRwczovL3NlY3VyZS5zdGl0Y2gubW9uZXkvY29ubmVjdC90b2tlbiIsImlzcyI6InRlc3QtMzdkMDlmMTYtZDVmNS00MjI5LThiMTgtMGU5NjE2ZDM3YmM3Iiwic3ViIjoidGVzdC0zN2QwOWYxNi1kNWY1LTQyMjktOGIxOC0wZTk2MTZkMzdiYzciLCJqdGkiOiI3MzQwYzJmMTNmZDUzZGVkOTZkZGIwMjk2NzI1ZTZiZCJ9.ZhhqL0ldjpkZWI9cV3PvAKi3yNeAePoqMouBkE9EoSqyBY3CHi23RzQUJJxyvX0OdBDzFRhP-B51te50jwJpmCirkD3V31Qi11-KF8dx2bMdVdk2ZY7LUIgSy8wludME4Bv-VmJ7QT6DFNpBQB8QcrP7mI-o75JfQcw6ziQDRq1u0fqC0KWnTROebjusD3fLPg_r5wT9nuGtEFvRUxxADyaYh-B0jepQ516N9u8PkIv8C5SNIaWveypqJVSVugbx9AtHosgOZlKNf4iQD_YMV7r_wwwohMGthVF7Bq3fsJPcNMHce6DL8PqPQQUK7cOTpVCI5p62Ne-fJPMp0HODaoT-w2c9EvagG1VJx0BFRzkcNtQ2x4eBKBF5hYuoQ4G1povJXpYqEsJYPaLS35wMkD4x49Q9qVg_ViA2u0SweurVVR2ZN-FeON_8MloDnXsT_hgAJgmBT7eFZ7z7CULEimSkBlz-isG_KGxnLcojwKofQcPkhwbP3nCgWKuRk2CM4J273woffyoP5jb2CR9FRILjidzw_VlrZI9zKHiapLiNs-IN1qHe_f1fcJ4NK1HPxBLyxuucPanYG8ffVPmoLmW9RhRiE3_sWiFl9742aarYVIgCE1roBZbopfX82RWojxB29HjGaRbbA1uJTWIkBRiOomlhjj1LGrSFEoxXdbU'
                        };
                        bodyString = Object.entries(body).map(function (_ref) {
                          var _ref2 = _slicedToArray(_ref, 2),
                              k = _ref2[0],
                              v = _ref2[1];

                          return "".concat(k, "=").concat(encodeURIComponent(v));
                        }).join('&');
                        _context.next = 4;
                        return fetch('https://secure.stitch.money/connect/token', {
                          method: 'post',
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                          },
                          body: bodyString
                        });

                      case 4:
                        response = _context.sent;
                        _context.next = 7;
                        return response.json();

                      case 7:
                        responseBody = _context.sent;
                        console.log('Tokens: ', responseBody);
                        return _context.abrupt("return", responseBody);

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _retrieveTokenUsingClientAssertion2.apply(this, arguments);
            };

            retrieveTokenUsingClientAssertion = function _retrieveTokenUsingCl(_x4, _x5, _x6) {
              return _retrieveTokenUsingClientAssertion2.apply(this, arguments);
            };

            CLIENT_ASSERTION = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkUzMDZBOTg4NDIwNjZBQkU5QzQ1QjQ0MjIyNTU0NjlFNTMwNEE2RTQifQ.eyJpYXQiOjE2NDc1Mjk1NTcsIm5iZiI6MTY0NzUyOTU1NywiZXhwIjoxNjQ3NTI5ODU3LCJhdWQiOiJodHRwczovL3NlY3VyZS5zdGl0Y2gubW9uZXkvY29ubmVjdC90b2tlbiIsImlzcyI6InRlc3QtMzdkMDlmMTYtZDVmNS00MjI5LThiMTgtMGU5NjE2ZDM3YmM3Iiwic3ViIjoidGVzdC0zN2QwOWYxNi1kNWY1LTQyMjktOGIxOC0wZTk2MTZkMzdiYzciLCJqdGkiOiIwOTFkMjdmYWMwMjQ2YWY2NDQ0NzBkYjljZmQxY2YxMyJ9.m24panWBK8Xv5ucUFWzAI14K2qvH0r4YLfPgRqZvanmZgdEfoutwjj23T95mWLb8tbCGTFNH3rDvkopvvUUgn8MjY8IutHIAqwAgnTKNzlYedGbClGC1DqzoiAyyYHfABLR7YoqkI3FUHH8mBuh7k7ZP1PlahSyKMV9cRcnDynaXqHOHTEBXyW8RrHLs7twN1dtpEv2nEDlW_OHqHC2C_BodCFNOEduicfCqc-sBu0V6JvMVjZlhOERqp2sSj00Xr8dausRxcjA01-JydYZB-gWqLdTKqnuRcTIp-goqQ_imINH4kxlg5UJav0wTDhfoOE1awGy_eQrItJjHjGNzIuHxq_LtaTPynciGw_lGMuDJAMM9Io_2JbVWqewgYFqH3B3xsU-VB9qYYrQgpQ0-Oqj-ga_MTrQ9lw029iVW16x5UfJThKzBcZa8aqlT3GMsLeer8Nw18n6XY_lC0FDRE77oSJhGQRocRCXzGN-d5hhYtT2Bzha5rQR3YIKOvZD5ctgyokf2wqb5lJPUZnnJh8xhSQ7q6Jlu8VMmsyidUeTfIKMJabxaGW5erIhwUOST5XbyjIii3CkHMDntRG5VFGhh_rlmIqV7-N08cwpto9hYKKMU-DURscUv5LFDxGP773Bpp8R6sCXUQIXbMnhOhYa-fEXWb9yTR3Mbb-_U_T4";
            CLIENT_ID = "test-37d09f16-d5f5-4229-8b18-0e9616d37bc7";
            token = retrieveTokenUsingClientAssertion(CLIENT_ID, CLIENT_ASSERTION, "client_paymentrequest");

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _retrieveTokenUsingClientAssertion.apply(this, arguments);
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64944" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","token.js"], null)
//# sourceMappingURL=/token.a36c1d6b.js.map