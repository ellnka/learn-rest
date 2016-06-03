/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(11);
	
	__webpack_require__(13);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(3);
	
	var _usersList = __webpack_require__(4);
	
	var _usersList2 = _interopRequireDefault(_usersList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UsersManager = function () {
	  function UsersManager() {
	    var _this = this;
	
	    _classCallCheck(this, UsersManager);
	
	    this.container = document.querySelector('.js-users-manager');
	    this.preloader = this.container.querySelector('.js-users-manager-preloader');
	
	    this.baseUrl = 'http://test-api.javascript.ru/v1/roughtron/users/';
	
	    this.dataReceivedClass = 'users-manager_state_data-received';
	
	    this.init();
	
	    document.body.addEventListener('patchUser', function (e) {
	      return _this.sendRequest('PATCH', e.detail.data, e.detail.userId);
	    });
	    document.body.addEventListener('removeUser', function (e) {
	      return _this.sendRequest('DELETE', null, e.detail.id);
	    });
	  }
	
	  _createClass(UsersManager, [{
	    key: 'init',
	    value: function init() {
	      this.sendRequest('GET');
	    }
	  }, {
	    key: 'sendRequest',
	    value: function sendRequest(method, data, userId) {
	      var _this2 = this;
	
	      var url = this.baseUrl,
	          xhr = new XMLHttpRequest();
	
	      if (method == 'PATCH' || method == 'DELETE') {
	        url += userId;
	      } else {
	        url += '?delay=1000';
	      }
	
	      xhr.open(method, url);
	
	      if (data) {
	        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	        xhr.send(data);
	      } else {
	        xhr.send();
	      }
	
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState != 4) return;
	
	        if (xhr.status != 200) {
	          console.log(xhr.status + ': ' + xhr.statusText);
	
	          if (xhr.status == 400) {
	            var event = new CustomEvent('editFormValidateError', {
	              detail: {
	                data: xhr.responseText
	              }
	            });
	            document.body.dispatchEvent(event);
	          }
	        } else {
	          switch (method) {
	            case 'GET':
	              _this2.hidePreloader();
	              _this2.render(JSON.parse(xhr.responseText));
	              break;
	
	            case 'PATCH':
	              var event = new CustomEvent('patchUserSuccess', {
	                detail: {
	                  data: xhr.responseText
	                }
	              });
	              document.body.dispatchEvent(event);
	              break;
	          }
	        }
	      };
	    }
	  }, {
	    key: 'hidePreloader',
	    value: function hidePreloader() {
	      this.container.classList.add(this.dataReceivedClass);
	    }
	  }, {
	    key: 'render',
	    value: function render(items) {
	      var usersList = new _usersList2.default();
	      this.container.insertAdjacentHTML("afterBegin", usersList.render(items));
	
	      var event = new CustomEvent('usersLoaded');
	      document.body.dispatchEvent(event);
	    }
	  }]);
	
	  return UsersManager;
	}();
	
	exports.default = UsersManager;
	
	
	window.addEventListener('DOMContentLoaded', new UsersManager());

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _usersList = __webpack_require__(5);
	
	var _usersList2 = _interopRequireDefault(_usersList);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UsersList = function () {
	  function UsersList() {
	    _classCallCheck(this, UsersList);
	
	    this.container = null;
	
	    this.actionButtonClass = 'js-action-link';
	
	    this.items = {};
	
	    this.init = this.init.bind(this);
	    this.patchUser = this.patchUser.bind(this);
	
	    document.body.addEventListener('usersLoaded', this.init);
	    document.body.addEventListener('patchUserSuccess', this.patchUser);
	  }
	
	  _createClass(UsersList, [{
	    key: 'onClick',
	    value: function onClick(e) {
	      var target = e.target;
	
	      if (!target.classList.contains(this.actionButtonClass)) return;
	
	      var userID = target.getAttribute('data-id');
	
	      switch (target.getAttribute('data-action')) {
	        case 'remove':
	          this.removeItem(userID);
	          break;
	
	        case 'edit':
	          this.editItem(userID);
	          break;
	      }
	    }
	  }, {
	    key: 'removeItem',
	    value: function removeItem(id) {
	      if (confirm("Вы уверены?")) {
	        var row = this.container.querySelector('.users-list__item[data-id="' + id + '"]');
	        row.parentNode.removeChild(row);
	
	        var event = new CustomEvent('removeUser', {
	          detail: {
	            id: id
	          }
	        });
	        document.body.dispatchEvent(event);
	      }
	    }
	  }, {
	    key: 'editItem',
	    value: function editItem(id) {
	      var event = new CustomEvent('showPopup', {
	        detail: {
	          popupClass: '.js-edit-popup'
	        }
	      });
	      document.body.dispatchEvent(event);
	
	      var item = this.items.find(function (item) {
	        return item._id == id;
	      });
	      item.birthdate = this.formatDate(item.birthdate);
	
	      event = new CustomEvent('startUserEditing', {
	        detail: {
	          data: item
	        }
	      });
	      document.body.dispatchEvent(event);
	    }
	  }, {
	    key: 'patchUser',
	    value: function patchUser(e) {
	      var data = JSON.parse(e.detail.data),
	          row = this.container.querySelector('.users-list__item[data-id="' + data._id + '"]');
	
	      for (var field in data) {
	        var cell = row.querySelector('[data-name="' + field + '"]');
	        if (cell) {
	          cell.innerHTML = field == 'birthdate' ? this.formatDate(data[field]) : data[field];
	        }
	      }
	    }
	  }, {
	    key: 'formatDate',
	    value: function formatDate(dateString) {
	      var date = new Date(dateString),
	          dd = date.getDate();
	
	      if (dd < 10) dd = '0' + dd;
	
	      var mm = date.getMonth() + 1;
	      if (mm < 10) mm = '0' + mm;
	
	      var yy = date.getFullYear();
	
	      return yy + '-' + mm + '-' + dd;
	    }
	  }, {
	    key: 'render',
	    value: function render(items) {
	      this.items = Array.from(items);
	      return (0, _usersList2.default)({ items: items });
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this.container = document.querySelector('.js-users-list');
	
	      this.container.addEventListener('click', this.onClick.bind(this));
	    }
	  }]);
	
	  return UsersList;
	}();
	
	exports.default = UsersList;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(6);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (Date, items, undefined) {
	jade_mixins["user"] = jade_interp = function(user){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	buf.push("<td data-name=\"fullName\" class=\"user__fullname\">" + (jade.escape(null == (jade_interp = user.fullName) ? "" : jade_interp)) + "</td><td data-name=\"email\" class=\"user__email\">" + (jade.escape(null == (jade_interp = user.email) ? "" : jade_interp)) + "</td><td data-name=\"birthdate\" class=\"user__birthdate\">" + (jade.escape((jade_interp = formatDate(user.birthdate)) == null ? '' : jade_interp)) + "</td><td class=\"user__action\"><a data-action=\"remove\"" + (jade.attr("data-id", user._id, true, true)) + " href=\"#\" class=\"user__action-link js-action-link\">Удалить </a><a data-action=\"edit\"" + (jade.attr("data-id", user._id, true, true)) + " href=\"#\" class=\"user__action-link js-action-link\">Редактировать</a></td>");
	};
	function formatDate(dateString) {
	{
	var date = new Date(dateString);
	var dd = date.getDate();
	if (dd < 10) dd = '0' + dd;
	var mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;
	var yy = date.getFullYear();
	return yy + '-' + mm + '-' + dd;
	}
	}
	buf.push("<table class=\"users-list js-users-list\"><tr><th>Full Name</th><th>Email</th><th>Birthday</th><th> </th></tr>");
	// iterate items
	;(function(){
	  var $$obj = items;
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var item = $$obj[$index];
	
	buf.push("<tr" + (jade.attr("data-id", item._id, true, true)) + " class=\"users-list__item user\">");
	jade_mixins["user"](item);
	buf.push("</tr>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var item = $$obj[$index];
	
	buf.push("<tr" + (jade.attr("data-id", item._id, true, true)) + " class=\"users-list__item user\">");
	jade_mixins["user"](item);
	buf.push("</tr>");
	    }
	
	  }
	}).call(this);
	
	buf.push("</table>");}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(7).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Overlay = function () {
	  function Overlay() {
	    _classCallCheck(this, Overlay);
	
	    this.el = document.querySelector('.js-overlay');
	
	    this.activeClass = 'overlay_state_active';
	
	    document.body.addEventListener('popupClosing', this.hide.bind(this));
	    document.body.addEventListener('popupOpening', this.show.bind(this));
	  }
	
	  _createClass(Overlay, [{
	    key: 'hide',
	    value: function hide() {
	      this.el.classList.remove(this.activeClass);
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.el.classList.add(this.activeClass);
	    }
	  }]);
	
	  return Overlay;
	}();
	
	exports.default = Overlay;
	
	
	window.addEventListener('DOMContentLoad', new Overlay());

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(12);
	
	__webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PopupManager = function () {
	  function PopupManager() {
	    _classCallCheck(this, PopupManager);
	
	    this.currentOpen = null;
	
	    this.popupActiveClass = 'popup_state_active';
	
	    this.showPopup = this.showPopup.bind(this);
	    this.closePopup = this.closePopup.bind(this);
	
	    document.body.addEventListener('showPopup', this.showPopup);
	    document.body.addEventListener('patchUserSuccess', this.closePopup);
	  }
	
	  _createClass(PopupManager, [{
	    key: 'showPopup',
	    value: function showPopup(e) {
	      this.closePopup();
	
	      var popup = document.querySelector(e.detail.popupClass);
	
	      if (popup) {
	        var event = new CustomEvent('popupOpening');
	        document.body.dispatchEvent(event);
	
	        this.currentOpen = popup;
	        this.currentOpen.classList.add(this.popupActiveClass);
	      }
	    }
	  }, {
	    key: 'closePopup',
	    value: function closePopup() {
	      if (this.currentOpen) {
	        var event = new CustomEvent('popupClosing');
	        document.body.dispatchEvent(event);
	
	        this.currentOpen.classList.remove(this.popupActiveClass);
	        this.currentOpen = null;
	      }
	    }
	  }]);
	
	  return PopupManager;
	}();
	
	exports.default = PopupManager;
	
	
	window.addEventListener('DOMContentLoad', new PopupManager());

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(14);
	
	__webpack_require__(15);
	
	__webpack_require__(16);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EditForm = function () {
	  function EditForm() {
	    _classCallCheck(this, EditForm);
	
	    this.container = document.querySelector('.js-edit-form');
	
	    this.inputErrorClass = 'text-input_state_error';
	
	    this.container.addEventListener('submit', this.onSubmit.bind(this));
	    document.body.addEventListener('startUserEditing', this.fill.bind(this));
	    document.body.addEventListener('editFormValidateError', this.onError.bind(this));
	  }
	
	  _createClass(EditForm, [{
	    key: 'fill',
	    value: function fill(e) {
	      for (var field in e.detail.data) {
	        if (this.container.elements[field]) {
	          this.container.elements[field].value = e.detail.data[field];
	        }
	      }
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(e) {
	      e.preventDefault();
	      //FIXME костыли и палки :(
	      var formData = {};
	      for (var i = 0; i < this.container.elements.length; i++) {
	        if (this.container.elements[i].type != 'fieldset' && this.container.elements[i].type != 'submit') {
	          formData[this.container.elements[i].name] = this.container.elements[i].value;
	        }
	      }
	
	      var event = new CustomEvent('patchUser', {
	        detail: {
	          userId: this.container.elements['_id'].value,
	          data: JSON.stringify(formData)
	        }
	      });
	      document.body.dispatchEvent(event);
	    }
	  }, {
	    key: 'onError',
	    value: function onError(e) {
	      var errors = JSON.parse(e.detail.data).errors;
	      for (var field in errors) {
	        var input = this.container.querySelector('[name="' + field + '"]');
	        if (input) {
	          input.classList.add(this.inputErrorClass);
	
	          var errorBlock = this.container.querySelector('[name="' + field + '"] + .js-input-error');
	          if (errorBlock) {
	            errorBlock.innerHTML = errors[field];
	          }
	        }
	      }
	    }
	  }]);
	
	  return EditForm;
	}();
	
	exports.default = EditForm;
	
	
	window.addEventListener('DOMContentLoaded', new EditForm());

/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map