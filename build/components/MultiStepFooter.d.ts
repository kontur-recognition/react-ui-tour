/// <reference types="react" />
export interface MultiStepFooterProps {
    points: number;
    activePoint: number;
    prevButtonText?: string;
    nextButtonText?: string;
    onNext?: () => void;
    onPrev?: () => void;
}
export declare function MultiStepFooter(props: MultiStepFooterProps): JSX.Element;
