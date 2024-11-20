"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectState = void 0;
var _projectStatus = require("../utils/project-status.js");
var _ListnerType = require("./ListnerType.js");
var _ProjectRules = require("./ProjectRules.js");
var _ProjectState;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ProjectState = /*#__PURE__*/function () {
  function ProjectState() {
    _classCallCheck(this, ProjectState);
    _defineProperty(this, "_listners", []);
    _defineProperty(this, "_projects", []);
    _defineProperty(this, "_localStorageProjects", localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : []);
    this._projects = this._localStorageProjects;
  }
  // create singleton instance
  return _createClass(ProjectState, [{
    key: "createProject",
    value: function createProject(title, desc) {
      var newProject = new _ProjectRules.ProjectRules(Math.random().toString(), title, desc, _projectStatus.projectStatus.Intial);
      this._projects.push(newProject);
      this._runListners();
      localStorage.setItem("projects", JSON.stringify(this._projects));
    }
  }, {
    key: "deletProject",
    value: function deletProject(projectId) {
      var projectsAfterDelet = this._projects.filter(function (project) {
        return project.id !== projectId;
      });
      this._projects = projectsAfterDelet;
      this._runListners();
      localStorage.setItem("projects", JSON.stringify(this._projects));
    }
  }, {
    key: "_runListners",
    value: function _runListners() {
      var _iterator = _createForOfIteratorHelper(this._listners),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listner = _step.value;
          listner(_toConsumableArray(this._projects));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "pushListner",
    value: function pushListner(Listner) {
      this._listners.push(Listner);
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!this._instance) {
        this._instance = new ProjectState();
        return new ProjectState();
      }
      return this._instance;
    }
  }]);
}();
_ProjectState = ProjectState;
_defineProperty(ProjectState, "_instance", void 0);
var projectState = exports.projectState = ProjectState.getInstance();