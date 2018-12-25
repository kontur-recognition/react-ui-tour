"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _a;
var React = require("react");
var PropTypes = require("prop-types");
var TourProvider = /** @class */ (function (_super) {
    tslib_1.__extends(TourProvider, _super);
    function TourProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queue = [];
        _this.listeners = {};
        _this.subscribe = function (id, callback) {
            _this.listeners[id] = callback;
            _this.pushToQueue(id);
        };
        _this.unsubscribe = function (id) {
            _this.removeFromQueue(id);
            delete _this.listeners[id];
        };
        _this.onShown = function (id) { return Promise.resolve(id).then(_this.props.onTourShown); };
        _this.isPredicate = function (id) {
            var predicate = _this.props.predicate;
            return predicate ? predicate(id) : true;
        };
        return _this;
    }
    TourProvider.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    TourProvider.prototype.getChildContext = function () {
        var _a;
        return _a = {},
            _a[TourProvider.contextName] = {
                subscribe: this.subscribe,
                unsubscribe: this.unsubscribe,
                onShown: this.onShown
            },
            _a;
    };
    TourProvider.prototype.notify = function (id) {
        this.listeners[id]();
    };
    TourProvider.prototype.removeFromQueue = function (id) {
        var _this = this;
        if (id !== this.currentId)
            return;
        this.currentId = this.queue.find(this.isPredicate);
        this.queue = this.queue.filter(function (id) { return id !== _this.currentId; });
        if (this.currentId) {
            this.notify(this.currentId);
        }
    };
    TourProvider.prototype.pushToQueue = function (id) {
        this.queue = this.currentId ? this.queue.concat(id) : this.queue;
        if (!this.currentId && this.isPredicate(id)) {
            this.currentId = id;
            this.notify(id);
        }
    };
    TourProvider.contextName = '__tour__';
    TourProvider.childContextTypes = (_a = {},
        _a[TourProvider.contextName] = PropTypes.object.isRequired,
        _a);
    return TourProvider;
}(React.Component));
exports.TourProvider = TourProvider;
