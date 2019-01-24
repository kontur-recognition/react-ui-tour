"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ZIndex_1 = require("@skbkontur/react-ui/components/ZIndex/ZIndex");
var styles = require('./Highlight.less');
function Highlight(props) {
    var pos = props.pos, highlight = props.highlight, color = props.color;
    var highlightRoot = React.cloneElement(highlight, tslib_1.__assign({}, highlight.props, { style: tslib_1.__assign({}, highlight.props.style, { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }) }));
    var width = pos.right - pos.left;
    var height = pos.bottom - pos.top;
    var borderTopWidth = pos.top + document.documentElement.scrollTop;
    var borderLeftWidth = pos.left + document.documentElement.scrollLeft;
    var computedStyles = {
        borderColor: color,
        borderTopWidth: borderTopWidth,
        borderLeftWidth: borderLeftWidth,
        borderRightWidth: document.documentElement.offsetWidth - (borderLeftWidth + width),
        borderBottomWidth: document.documentElement.offsetHeight - (borderTopWidth + height),
        width: width,
        height: height
    };
    return (React.createElement(ZIndex_1.default, { delta: 100, className: styles.wrapper, style: computedStyles }, highlightRoot));
}
exports.Highlight = Highlight;
