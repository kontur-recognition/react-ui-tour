import * as React from 'react';
import { StepProps, StepInternalProps } from '../tour/Tour';
import { PinOptions, TooltipContainerProps } from '../components/tooltip/Tooltip';
export interface TooltipStepOuterProps {
    target: () => Element;
    positions: string[];
    highlightTarget?: () => Element;
    highlight?: React.ReactElement<any>;
    offset?: number;
    width?: number;
    content?: React.ReactElement<any> | string;
    header?: React.ReactElement<any> | string;
    footer?: (props: StepInternalProps) => React.ReactElement<any>;
    render?: (props: StepInternalProps) => React.ReactElement<any>;
    pinOptions?: PinOptions;
}
export interface TooltipStepProps extends TooltipStepOuterProps, StepProps, TooltipContainerProps, Partial<StepInternalProps> {
}
export declare class TooltipStep extends React.Component<TooltipStepProps> {
    render(): any;
    renderTooltip: () => any;
    renderTooltipFooter: () => any;
    invokeRender: (renderMethod: any) => any;
}
