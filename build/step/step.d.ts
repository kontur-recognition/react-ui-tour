import * as React from 'react';
import { StepProps, StepInternalProps } from '../tour/Tour';
export interface StepOuterProps {
    render: (props: StepInternalProps) => React.ReactElement<any>;
}
export interface IStep extends StepOuterProps, StepProps, Partial<StepInternalProps> {
}
export declare class Step extends React.Component<IStep, {}> {
    render(): React.ReactElement<any>;
}
