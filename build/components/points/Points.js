"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles = require('./Points.less');
function Points(props) {
    var points = [];
    for (var i = 1; i <= props.count; i++) {
        if (i === props.activePointIndex) {
            points.push(React.createElement("span", { key: i, className: styles.tooltipPoint + " " + styles.tooltipPointActive }));
        }
        else {
            points.push(React.createElement("span", { key: i, className: styles.tooltipPoint }));
        }
    }
    return React.createElement("div", { className: styles.tooltipSelector }, points);
}
exports.Points = Points;
