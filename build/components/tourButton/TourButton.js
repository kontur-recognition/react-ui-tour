"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles = require('./TourButton.less');
function TourButton(props) {
    var className = styles.tourButton + " " + styles[props.color + 'TourButton'];
    if (props.arrow === 'right' || props.arrow === 'left') {
        className = className + " " + styles.tourButtonArrow + " " + styles[props.arrow + 'TourButtonArrow'];
    }
    return (React.createElement("div", { style: { display: 'inline-block' } },
        React.createElement("button", { style: props.style, className: className, onClick: props.onClick },
            React.createElement("div", { style: { position: 'relative' } }, props.children))));
}
exports.TourButton = TourButton;
