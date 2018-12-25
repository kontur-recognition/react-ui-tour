import * as React from 'react';
export interface TourButtonProps {
    color: string;
    arrow?: string;
    style?: Object;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactText;
}
export declare function TourButton(props: TourButtonProps): JSX.Element;
