import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface StepProps {
    isFallback?: boolean;
    onBefore?: () => Promise<any>;
    onAfter?: () => Promise<any>;
    onOpen?: () => void;
    group?: string;
}
export interface StepInternalProps {
    stepIndex: number;
    stepsCount: number;
    onPrev: () => void;
    onNext: () => void;
    onClose: () => void;
}
export interface TourComponentProps {
    children: React.ReactNode;
    onClose?: () => void;
}
export declare class TourComponent extends React.Component<TourComponentProps, {}> {
    steps: any;
    fallbackStepIndex: any;
    state: {
        stepIndex: number;
        active: boolean;
    };
    constructor(props: TourProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: TourProps): void;
    render(): JSX.Element;
    processSteps: (children: React.ReactNode) => React.ReactElement<StepProps & StepInternalProps>[];
    run: () => any;
    showTour: (clb: () => void) => void;
    updateIndex: (index: number) => void;
    handleNext: () => void;
    handlePrev: () => void;
    move: (ind: any, moveFunc: any) => void;
    moveTo: (ind: any, prevInd: any) => void;
    handleClose: () => void;
}
export interface TourProps {
    id: string;
    children: React.ReactNode;
    onClose?: () => void;
}
export interface TourState {
    showTour: boolean;
}
export declare class Tour extends React.Component<TourProps, TourState> {
    static contextTypes: {
        [x: string]: PropTypes.Validator<object>;
    };
    state: {
        showTour: boolean;
    };
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    run: () => void;
    unsubscribe: () => any;
    closeTour: () => void;
}
