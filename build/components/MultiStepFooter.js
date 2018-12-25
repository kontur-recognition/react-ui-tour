"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Points_1 = require("./points/Points");
var TourButton_1 = require("./tourButton/TourButton");
var Footer_1 = require("./footer/Footer");
function MultiStepFooter(props) {
    if (!props.points) {
        return null;
    }
    var renderNextButton = function (innerText, needArrow) {
        if (needArrow === void 0) { needArrow = true; }
        return (React.createElement(TourButton_1.TourButton, { onClick: props.onNext, color: "blue", arrow: needArrow && 'right' }, props.nextButtonText || innerText || 'Далее'));
    };
    var renderPrevButton = function (innerText, needArrow) {
        if (needArrow === void 0) { needArrow = true; }
        return (React.createElement(TourButton_1.TourButton, { color: "grey", onClick: props.onPrev, arrow: needArrow && 'left' }, props.prevButtonText || innerText || 'Назад'));
    };
    var points = (React.createElement(Points_1.Points, { count: props.points, activePointIndex: props.activePoint }));
    var leftPartContent;
    var centerPartContent = points;
    var rightPartContent;
    if (props.points === 1) {
        centerPartContent = null;
        leftPartContent = renderNextButton('Приступить', false);
    }
    else if (props.activePoint === 1) {
        rightPartContent = renderNextButton();
    }
    else if (props.activePoint === props.points) {
        leftPartContent = renderPrevButton();
        rightPartContent = renderNextButton('Приступить', false);
    }
    else if (props.activePoint > props.points) {
        leftPartContent = renderPrevButton();
        centerPartContent = null;
        rightPartContent = renderNextButton('Приступить', false);
    }
    else {
        leftPartContent = renderPrevButton();
        rightPartContent = renderNextButton();
    }
    return (React.createElement(Footer_1.Footer, null,
        React.createElement(Footer_1.Footer.LeftPart, null, leftPartContent),
        React.createElement(Footer_1.Footer.CenterPart, null, centerPartContent),
        React.createElement(Footer_1.Footer.RightPart, null, rightPartContent)));
}
exports.MultiStepFooter = MultiStepFooter;
