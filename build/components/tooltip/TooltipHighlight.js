"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var LayoutEvents_1 = require("@skbkontur/react-ui/lib/LayoutEvents");
var RenderContainer_1 = require("@skbkontur/react-ui/components/RenderContainer");
var Highlight_1 = require("../highlight/Highlight");
var initialRect = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};
var TooltipHighlight = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipHighlight, _super);
    function TooltipHighlight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { pos: initialRect };
        _this.reflow = function () {
            var pos = _this.target.getBoundingClientRect();
            _this.setState({ pos: pos });
        };
        return _this;
    }
    TooltipHighlight.prototype.render = function () {
        return (React.createElement("div", null,
            this.props.children,
            React.createElement(RenderContainer_1.default, null,
                React.createElement(Highlight_1.Highlight, { pos: this.state.pos, highlight: this.props.highlight }))));
    };
    TooltipHighlight.prototype.componentDidMount = function () {
        this.target = this.props.targetGetter();
        this.reflow();
        //add throttle
        this._layoutEventsToken = LayoutEvents_1.default.addListener(this.reflow);
    };
    TooltipHighlight.prototype.componentWillUnmount = function () {
        this._layoutEventsToken.remove();
    };
    return TooltipHighlight;
}(React.Component));
exports.TooltipHighlight = TooltipHighlight;
