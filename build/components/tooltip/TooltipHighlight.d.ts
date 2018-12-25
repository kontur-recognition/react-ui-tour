import * as React from 'react';
export interface HighlightProps {
    targetGetter: () => Element;
    highlight: React.ReactElement<any>;
    children: React.ReactElement<any>;
}
export declare class TooltipHighlight extends React.Component<HighlightProps> {
    state: {
        pos: ClientRect;
    };
    _layoutEventsToken: any;
    target: any;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    reflow: () => void;
}
