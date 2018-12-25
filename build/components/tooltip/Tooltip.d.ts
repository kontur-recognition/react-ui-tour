import * as React from 'react';
export interface PinOptions {
    hasPin?: boolean;
    pinSize?: number;
    pinOffset?: number;
}
export declare type TooltipPartElement = React.ReactElement<any> | React.ReactText;
export interface TooltipProps {
    targetGetter: () => Element;
    positions?: string[];
    offset?: number;
    onClose?: () => void;
    pinOptions?: PinOptions;
    width?: number;
}
export declare class Tooltip extends React.Component<TooltipProps> {
    static defaultProps: {
        positions: string[];
        width: number;
        pinOptions: {
            hasPin: boolean;
            pinSize: number;
            pinOffset: number;
        };
        onClose: () => void;
    };
    static Container: typeof Container;
    static Header: typeof Header;
    static Body: typeof Content;
    static Footer: typeof Footer;
    render(): JSX.Element;
}
export interface TooltipContainerProps {
    children?: React.ReactNode;
    padding?: string;
}
export interface TooltipPartProps {
    children?: React.ReactNode;
}
export declare function Container({ children, padding }: TooltipContainerProps): JSX.Element;
export declare function Header({ children }: TooltipPartProps): JSX.Element;
export declare function Content({ children }: TooltipPartProps): JSX.Element;
declare function Footer({ children }: TooltipPartProps): JSX.Element;
export {};
