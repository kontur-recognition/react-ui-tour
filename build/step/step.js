"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Step = /** @class */ (function (_super) {
    tslib_1.__extends(Step, _super);
    function Step() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Step.prototype.render = function () {
        var _a = this.props, render = _a.render, onNext = _a.onNext, onPrev = _a.onPrev, onClose = _a.onClose, stepIndex = _a.stepIndex, stepsCount = _a.stepsCount;
        if (!render) {
            onNext();
            return null;
        }
        return render({ onNext: onNext, onPrev: onPrev, onClose: onClose, stepIndex: stepIndex, stepsCount: stepsCount });
    };
    return Step;
}(React.Component));
exports.Step = Step;
