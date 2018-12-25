"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var RenderLayer_1 = require("@skbkontur/react-ui/components/RenderLayer");
var Popup_1 = require("@skbkontur/react-ui/components/Popup");
var styles = require('./Tooltip.less');
var Tooltip = /** @class */ (function (_super) {
    tslib_1.__extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.render = function () {
        return (React.createElement(RenderLayer_1.default, { onClickOutside: this.props.onClose, onFocusOutside: function () { }, active: true },
            React.createElement(Popup_1.default, tslib_1.__assign({ anchorElement: this.props.targetGetter(), positions: this.props.positions, margin: this.props.offset }, this.props.pinOptions, { opened: true, hasShadow: true }),
                React.createElement("div", { className: styles.tooltip, style: { width: this.props.width } },
                    React.createElement("span", { className: styles.closeBtn, onClick: this.props.onClose }),
                    this.props.children))));
    };
    Tooltip.defaultProps = {
        positions: ['bottom middle'],
        width: 500,
        pinOptions: {
            hasPin: true,
            pinSize: 16,
            pinOffset: 32
        },
        onClose: function () { }
    };
    Tooltip.Container = Container;
    Tooltip.Header = Header;
    Tooltip.Body = Content;
    Tooltip.Footer = Footer;
    return Tooltip;
}(React.Component));
exports.Tooltip = Tooltip;
function Container(_a) {
    var children = _a.children, padding = _a.padding;
    return React.createElement("div", { className: styles.container, style: { padding: padding } }, children);
}
exports.Container = Container;
function Header(_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.header }, children);
}
exports.Header = Header;
function Content(_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.body }, children);
}
exports.Content = Content;
function Footer(_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.footer }, children);
}
