"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Modal_1 = require("@skbkontur/react-ui/components/Modal");
var Button_1 = require("@skbkontur/react-ui/components/Button");
var ModalStep = /** @class */ (function (_super) {
    tslib_1.__extends(ModalStep, _super);
    function ModalStep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalStep.prototype.render = function () {
        var _a = this.props, header = _a.header, content = _a.content, footer = _a.footer, onNext = _a.onNext, width = _a.width, onPrev = _a.onPrev, onClose = _a.onClose, render = _a.render, stepIndex = _a.stepIndex, stepsCount = _a.stepsCount;
        return (React.createElement(Modal_1.default, { onClose: onClose, width: width }, render ? (render({ onNext: onNext, onPrev: onPrev, onClose: onClose, stepIndex: stepIndex, stepsCount: stepsCount })) : (React.createElement("div", null,
            React.createElement(Modal_1.default.Header, null, header),
            React.createElement(Modal_1.default.Body, null, content),
            footer ? (footer({ onNext: onNext, onPrev: onPrev, onClose: onClose, stepIndex: stepIndex, stepsCount: stepsCount })) : (React.createElement(Modal_1.default.Footer, null,
                React.createElement(Button_1.default, { use: "primary", onClick: onNext }, "\u041F\u043E\u0435\u0445\u0430\u043B\u0438")))))));
    };
    return ModalStep;
}(React.Component));
exports.ModalStep = ModalStep;
