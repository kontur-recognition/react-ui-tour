import * as React from 'react';
export interface HighlightProps {
    pos: ClientRect;
    highlight: React.ReactElement<any>;
    color?: string;
}
export declare function Highlight(props: HighlightProps): JSX.Element;
