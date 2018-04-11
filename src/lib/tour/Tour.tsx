import * as React from 'react';

import { TourProvider } from './TourProvider';
import { processMove } from './processMove';
import { TourContainer } from '../../../__tests__/tour.test';

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

export interface TourProps {
  id: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const SAFETY_EMPTY_INDEX = 10000;

//todo: avoid extra rerendering
export class TourComponent extends React.Component<TourProps, {}> {
  steps = null;
  fallbackStepIndex = null;
  state = {
    stepIndex: 0,
    active: false
  };

  constructor(props: TourProps) {
    super(props);
    //todo: warning for two final steps
    this.steps = this.processSteps(props.children);
    this.fallbackStepIndex = this.steps.findIndex(
      step => step.props.isFallback
    );
  }

  componentWillReceiveProps(nextProps: TourProps) {
    this.steps = this.processSteps(nextProps.children);
  }

  processSteps = (children: React.ReactNode) => {
    const steps = React.Children.toArray(children) as React.ReactElement<
      StepProps & StepInternalProps
    >[];
    return steps.sort((a, b) => (a.props.isFallback ? 1 : 0));
  };

  render() {
    const { id } = this.props;
    if (!this.state.active) {
      return null;
    }
    const { stepIndex } = this.state;
    const step = this.steps[stepIndex];
    const stepsCount = this.steps.length;

    const currentStepWithProps =
      step &&
      React.cloneElement(step, {
        onClose: this.handleClose,
        onNext: this.handleNext,
        onPrev: this.handlePrev,
        stepIndex: this.state.stepIndex,
        stepsCount: this.fallbackStepIndex !== -1 ? stepsCount - 1 : stepsCount
      });
      
    return <div>{currentStepWithProps}</div>;
  }

  showTour = (clb: () => void) => {
    this.setState({ active: true, stepIndex: 0 }, () => clb && clb());
  };

  updateIndex = (index: number) => {
    this.setState({ stepIndex: index }, () => {
      if (this.state.stepIndex === this.steps.length && this.props.onClose) {
        this.props.onClose();
      }
    });
  };

  run = () => {
    const firstStep = this.steps[0];
    const { onBefore, onOpen } = firstStep.props;

    if (onBefore) {
      return onBefore().then(() => {
        this.showTour(onOpen);
      });
    }

    this.showTour(onOpen);
  };

  handleNext = () => this.move(this.state.stepIndex, (a, b) => a + b);
  handlePrev = () => this.move(this.state.stepIndex, (a, b) => a - b);

  move = (ind, moveFunc) => {
    const nextStep = this.steps[moveFunc(ind, 1)];
    if (nextStep && nextStep.props.isFallback) {
      this.move(moveFunc(ind, 1), moveFunc);
    } else {
      this.moveTo(moveFunc(ind, 1), ind);
    }
  };

  moveTo = (ind, prevInd) => {
    const step = this.steps[ind];
    const prevStep = this.steps[prevInd];

    processMove(
      prevStep,
      step,
      () => {
        this.updateIndex(ind);
        step && step.props.onOpen && step.props.onOpen();
      },
      () => this.updateIndex(SAFETY_EMPTY_INDEX)
    );
  };

  handleClose = () => {
    const { stepIndex } = this.state;
    const hasFallbackStepToGo =
      this.fallbackStepIndex >= 0 &&
      this.fallbackStepIndex !== stepIndex &&
      stepIndex + 1 < this.fallbackStepIndex;

    if (hasFallbackStepToGo) {
      this.moveTo(this.fallbackStepIndex, stepIndex);
    } else {
      this.moveTo(this.steps.length, stepIndex);
    }
  };
}

export class Tour extends React.Component<TourProps> {
  static contextTypes = {
    [TourProvider.contextName]: React.PropTypes.object.isRequired
  };

  tour = null;

  render() {
    return (
      <TourComponent 
        {...this.props} 
        ref={el => this.tour = el}
        onClose={this.closeTour}
      />
    );
  }

  componentDidMount() {
    this.context[TourProvider.contextName].subscribe(
      this.props.id, 
      () => this.run()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  run = () => this.tour.run();

  unsubscribe = () => this.context[TourProvider.contextName].unsubscribe(this.props.id);

  closeTour = () => {
    this.unsubscribe();
    this.context[TourProvider.contextName].onShown(this.props.id);
    this.props.onClose && this.props.onClose();
  }
} 
