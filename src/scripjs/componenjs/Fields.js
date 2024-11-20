"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fields = void 0;
var _ProjectState = require("../store/ProjectState.js");
var _validation_helpers = require("../utils/validation/validation_helpers.js");
var _Base2 = require("./Base.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Fields = exports.Fields = /*#__PURE__*/function (_Base) {
  function Fields() {
    var _this;
    _classCallCheck(this, Fields);
    _this = _callSuper(this, Fields, ["fields", "app", "form", true]);
    _this._addProject();
    return _this;
  }
  _inherits(Fields, _Base);
  return _createClass(Fields, [{
    key: "_addProject",
    value: function _addProject() {
      this.element.addEventListener("submit", this._handleAddProject.bind(this));
    }
  }, {
    key: "_handleAddProject",
    value: function _handleAddProject(e) {
      e.preventDefault();
      var _this$_targetInputs = this._targetInputs(),
        _this$_targetInputs2 = _slicedToArray(_this$_targetInputs, 2),
        titleInput = _this$_targetInputs2[0],
        descInput = _this$_targetInputs2[1];
      var _this$_getInputValues = this._getInputValues(titleInput, descInput),
        _this$_getInputValues2 = _slicedToArray(_this$_getInputValues, 2),
        titleValue = _this$_getInputValues2[0],
        descValue = _this$_getInputValues2[1];
      if (this._validateInputsValues(titleValue, descValue)) {
        _ProjectState.projectState.createProject(titleValue, descValue);
        this._clearInputsValues(titleInput, descInput);
      }
    }
  }, {
    key: "_targetInputs",
    value: function _targetInputs() {
      var titleInput = document.getElementById("title");
      var descInput = document.getElementById("desc");
      return [titleInput, descInput];
    }
  }, {
    key: "_getInputValues",
    value: function _getInputValues(titleInput, descInput) {
      var titleValue = titleInput.value;
      var descValue = descInput.value;
      return [titleValue, descValue];
    }
  }, {
    key: "_validateInputsValues",
    value: function _validateInputsValues(titleValue, descValue) {
      var _assignValidateInputs = (0, _validation_helpers.assignValidateInputs)(titleValue, descValue),
        _assignValidateInputs2 = _slicedToArray(_assignValidateInputs, 2),
        titleInputRule = _assignValidateInputs2[0],
        descInputRule = _assignValidateInputs2[1];
      var titleErrorMsg = (0, _validation_helpers.handleValidationErrors)(titleInputRule);
      var descErrorMsg = (0, _validation_helpers.handleValidationErrors)(descInputRule);
      var popupContainer = document.getElementById("popup_container");
      var descPopup = document.querySelector(".desc_popup");
      if (titleErrorMsg.length) {
        popupContainer.classList.add("visible_popup");
        descPopup.textContent = titleErrorMsg;
        return false;
      } else if (descErrorMsg.length) {
        popupContainer.classList.add("visible_popup");
        descPopup.textContent = descErrorMsg;
        return false;
      }
      return true;
    }
  }, {
    key: "_clearInputsValues",
    value: function _clearInputsValues(titleInput, descInput) {
      titleInput.value = "";
      descInput.value = "";
    }
  }]);
}(_Base2.Base);