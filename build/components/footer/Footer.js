"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles = require('./Footer.less');
var Footer = /** @class */ (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        return (React.createElement("div", { className: styles.footer, style: this.props.style }, this.props.children));
    };
    Footer.LeftPart = FooterLeftPart;
    Footer.CenterPart = FooterCenterPart;
    Footer.RightPart = FooterRightPart;
    Footer.Image = FooterImage;
    return Footer;
}(React.Component));
exports.Footer = Footer;
function FooterLeftPart(_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.footerLeftPart }, children);
}
exports.FooterLeftPart = FooterLeftPart;
function FooterCenterPart(_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.footerCenterPart }, children);
}
exports.FooterCenterPart = FooterCenterPart;
function FooterRightPart(_a) {
    var children = _a.children;
    return React.createElement("div", { className: styles.footerRightPart }, children);
}
exports.FooterRightPart = FooterRightPart;
function FooterImage(_a) {
    var url = _a.url, style = _a.style;
    return (React.createElement("div", { className: styles.footerImage, style: style },
        React.createElement("img", { src: url })));
}
exports.FooterImage = FooterImage;
