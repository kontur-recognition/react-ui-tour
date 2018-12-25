import * as React from 'react';
export interface FooterProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
export declare class Footer extends React.Component<FooterProps> {
    static LeftPart: typeof FooterLeftPart;
    static CenterPart: typeof FooterCenterPart;
    static RightPart: typeof FooterRightPart;
    static Image: typeof FooterImage;
    render(): JSX.Element;
}
export interface FooterPartProps {
    children?: React.ReactNode;
}
export declare function FooterLeftPart({ children }: FooterPartProps): JSX.Element;
export declare function FooterCenterPart({ children }: FooterPartProps): JSX.Element;
export declare function FooterRightPart({ children }: FooterPartProps): JSX.Element;
export interface FooterImageProps {
    url: string;
    style?: React.CSSProperties;
}
export declare function FooterImage({ url, style }: FooterImageProps): JSX.Element;
