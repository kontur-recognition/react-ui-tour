"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMove = function (prevStep, step, onMove, onClear) {
    var onBefore = step && step.props.onBefore;
    var onAfter = prevStep && prevStep.props.onAfter;
    var stepGroup = step && step.props.group;
    var prevStepGroup = prevStep && prevStep.props.group;
    if ((!onBefore && !onAfter) || (!!stepGroup && stepGroup === prevStepGroup)) {
        onMove();
        return Promise.resolve();
    }
    return processMoveAsync(onMove, onClear, onBefore, onAfter);
};
var processMoveAsync = function (onMove, onClear, onBefore, onAfter) {
    var resolve = function () { return Promise.resolve(); };
    var before = onBefore || resolve;
    var after = onAfter || resolve;
    onClear();
    return after()
        .then(function () { return before(); })
        .then(function () {
        onMove();
    });
};
