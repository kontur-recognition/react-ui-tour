import * as React from 'react';
import { StepProps, StepInternalProps } from '../tour/Tour';
export interface ModalStepOuterProps {
    width?: number;
    content?: React.ReactElement<any> | string;
    header?: React.ReactElement<any> | string;
    footer?: (props: StepInternalProps) => React.ReactElement<any>;
    render?: (props: StepInternalProps) => React.ReactElement<any>;
}
export interface ModalStepProps extends ModalStepOuterProps, StepProps, Partial<StepInternalProps> {
}
export declare class ModalStep extends React.Component<ModalStepProps, {}> {
    render(): JSX.Element;
}
