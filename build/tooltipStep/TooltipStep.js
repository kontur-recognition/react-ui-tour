"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var TooltipHighlight_1 = require("../components/tooltip/TooltipHighlight");
var MultiStepFooter_1 = require("../components/MultiStepFooter");
var Tooltip_1 = require("../components/tooltip/Tooltip");
var TooltipStep = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipStep, _super);
    function TooltipStep() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderTooltip = function () {
            return _this.props.render ? (_this.invokeRender(_this.props.render)) : (React.createElement(Tooltip_1.Tooltip, { targetGetter: _this.props.target, positions: _this.props.positions, offset: _this.props.offset, onClose: _this.props.onClose, width: _this.props.width },
                React.createElement(Tooltip_1.Tooltip.Container, { padding: _this.props.padding },
                    React.createElement(Tooltip_1.Tooltip.Header, null, _this.props.header),
                    React.createElement(Tooltip_1.Tooltip.Body, null, _this.props.content),
                    React.createElement(Tooltip_1.Tooltip.Footer, null, _this.renderTooltipFooter()))));
        };
        _this.renderTooltipFooter = function () {
            var stepIndex = _this.props.stepIndex + 1;
            return _this.props.footer ? (_this.invokeRender(_this.props.footer)) : (React.createElement(MultiStepFooter_1.MultiStepFooter, { points: _this.props.stepsCount, activePoint: stepIndex, onPrev: _this.props.onPrev, onNext: _this.props.onNext }));
        };
        _this.invokeRender = function (renderMethod) {
            var props = {
                onNext: _this.props.onNext,
                onPrev: _this.props.onPrev,
                onClose: _this.props.onClose,
                stepsCount: _this.props.stepsCount,
                stepIndex: _this.props.stepIndex + 1
            };
            return renderMethod(props);
        };
        return _this;
    }
    TooltipStep.prototype.render = function () {
        var tooltip = this.renderTooltip();
        var highlightTarget = this.props.highlightTarget || this.props.target;
        return this.props.highlight ? (React.createElement(TooltipHighlight_1.TooltipHighlight, { highlight: this.props.highlight, targetGetter: highlightTarget }, tooltip)) : (tooltip);
    };
    return TooltipStep;
}(React.Component));
exports.TooltipStep = TooltipStep;
