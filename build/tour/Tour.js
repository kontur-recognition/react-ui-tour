"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _a;
var React = require("react");
var PropTypes = require("prop-types");
var TourProvider_1 = require("./TourProvider");
var processMove_1 = require("./processMove");
var SAFETY_EMPTY_INDEX = 10000;
//todo: avoid extra rerendering
var TourComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TourComponent, _super);
    function TourComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.steps = null;
        _this.fallbackStepIndex = null;
        _this.state = {
            stepIndex: 0,
            active: false
        };
        _this.processSteps = function (children) {
            var steps = React.Children.toArray(children);
            return steps.sort(function (a, b) { return (a.props.isFallback ? 1 : 0); });
        };
        _this.run = function () {
            var firstStep = _this.steps[0];
            var _a = firstStep.props, onBefore = _a.onBefore, onOpen = _a.onOpen;
            if (onBefore) {
                return onBefore().then(function () {
                    _this.showTour(onOpen);
                });
            }
            _this.showTour(onOpen);
        };
        _this.showTour = function (clb) {
            _this.setState({ active: true, stepIndex: 0 }, function () { return clb && clb(); });
        };
        _this.updateIndex = function (index) {
            _this.setState({ stepIndex: index }, function () {
                if (_this.state.stepIndex === _this.steps.length && _this.props.onClose) {
                    _this.props.onClose();
                }
            });
        };
        _this.handleNext = function () { return _this.move(_this.state.stepIndex, function (a, b) { return a + b; }); };
        _this.handlePrev = function () { return _this.move(_this.state.stepIndex, function (a, b) { return a - b; }); };
        _this.move = function (ind, moveFunc) {
            var nextStep = _this.steps[moveFunc(ind, 1)];
            if (nextStep && nextStep.props.isFallback) {
                _this.move(moveFunc(ind, 1), moveFunc);
            }
            else {
                _this.moveTo(moveFunc(ind, 1), ind);
            }
        };
        _this.moveTo = function (ind, prevInd) {
            var step = _this.steps[ind];
            var prevStep = _this.steps[prevInd];
            processMove_1.processMove(prevStep, step, function () {
                _this.updateIndex(ind);
                step && step.props.onOpen && step.props.onOpen();
            }, function () { return _this.updateIndex(SAFETY_EMPTY_INDEX); });
        };
        _this.handleClose = function () {
            var stepIndex = _this.state.stepIndex;
            var hasFallbackStepToGo = _this.fallbackStepIndex >= 0 &&
                _this.fallbackStepIndex !== stepIndex &&
                stepIndex + 1 < _this.fallbackStepIndex;
            if (hasFallbackStepToGo) {
                _this.moveTo(_this.fallbackStepIndex, stepIndex);
            }
            else {
                _this.moveTo(_this.steps.length, stepIndex);
            }
        };
        //todo: warning for two final steps
        _this.steps = _this.processSteps(props.children);
        _this.fallbackStepIndex = _this.steps.findIndex(function (step) { return step.props.isFallback; });
        return _this;
    }
    TourComponent.prototype.componentDidMount = function () {
        this.run();
    };
    TourComponent.prototype.componentWillReceiveProps = function (nextProps) {
        this.steps = this.processSteps(nextProps.children);
    };
    TourComponent.prototype.render = function () {
        if (!this.state.active) {
            return null;
        }
        var stepIndex = this.state.stepIndex;
        var step = this.steps[stepIndex];
        var stepsCount = this.steps.length;
        var currentStepWithProps = step &&
            React.cloneElement(step, {
                onClose: this.handleClose,
                onNext: this.handleNext,
                onPrev: this.handlePrev,
                stepIndex: this.state.stepIndex,
                stepsCount: this.fallbackStepIndex !== -1 ? stepsCount - 1 : stepsCount
            });
        return React.createElement("div", null, currentStepWithProps);
    };
    return TourComponent;
}(React.Component));
exports.TourComponent = TourComponent;
var Tour = /** @class */ (function (_super) {
    tslib_1.__extends(Tour, _super);
    function Tour() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showTour: false };
        _this.run = function () { return _this.setState({ showTour: true }); };
        _this.unsubscribe = function () {
            return _this.context[TourProvider_1.TourProvider.contextName].unsubscribe(_this.props.id);
        };
        _this.closeTour = function () {
            _this.setState({ showTour: false }, function () {
                _this.props.onClose && _this.props.onClose();
                _this.context[TourProvider_1.TourProvider.contextName]
                    .onShown(_this.props.id)
                    .then(_this.unsubscribe);
            });
        };
        return _this;
    }
    Tour.prototype.render = function () {
        return this.state.showTour ? (React.createElement(TourComponent, tslib_1.__assign({}, this.props, { onClose: this.closeTour }))) : null;
    };
    Tour.prototype.componentDidMount = function () {
        this.context[TourProvider_1.TourProvider.contextName].subscribe(this.props.id, this.run);
    };
    Tour.prototype.componentWillUnmount = function () {
        this.unsubscribe();
    };
    Tour.contextTypes = (_a = {},
        _a[TourProvider_1.TourProvider.contextName] = PropTypes.object.isRequired,
        _a);
    return Tour;
}(React.Component));
exports.Tour = Tour;
