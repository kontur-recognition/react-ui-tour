import * as React from 'react';
import {TourProvider} from './TourProvider';
import {processMove} from './processMove'

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
}

const SAFETY_EMPTY_INDEX = 10000;

//todo: avoid extra rerendering
export class Tour extends React.Component<TourProps, {}> {
  static contextTypes = {
    [TourProvider.contextName]: React.PropTypes.object.isRequired,
  };

  state = {
    stepIndex: 0,
    active: false,
  };

  steps = React.Children.toArray(this.props.children) as React.ReactElement<StepProps & StepInternalProps>[];

  componentWillReceiveProps(nextProps: TourProps) {
    this.steps = React.Children.toArray(nextProps.children) as React.ReactElement<StepProps & StepInternalProps>[];
  }

  //todo: warning for two final steps
  finalStepIndex = this.steps.findIndex((step) => !!step.props.isFallback);

  render() {
    const {id} = this.props;
    if (!this.state.active) {
      return null;
    }
    const {stepIndex} = this.state;
    const step = this.steps[stepIndex];

    const currentStepWithProps = step && React.cloneElement(
      step,
      {
        onClose: this.handleClose,
        onNext: this.handleNext,
        onPrev: this.handlePrev,
        stepIndex: this.state.stepIndex,
        stepsCount: this.steps.length,
      }
    );
    return (
      <div>{currentStepWithProps}</div>
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

  showTour = (clb: () => void) => {
    this.setState(
      {active: true, stepIndex: 0},
      () => clb && clb());
  }

  updateIndex = (index: number) => {
    this.setState({stepIndex: index}, () => {
      if (this.state.stepIndex === this.steps.length) {
        this.closeTour();
      }
    });
  }

  run = () => {
    const firstStep = this.steps[0];
    const {onBefore, onOpen} = firstStep.props;

    if (onBefore) {
      return onBefore().then(() => {
        this.showTour(onOpen);
      })
    }

    this.showTour(onOpen);
  }

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

  //todo: do not show finalStep if step is last
  handleClose = () => {
    const {stepIndex} = this.state;
    const hasFinalStepToGo = this.finalStepIndex >= 0
      && this.finalStepIndex !== stepIndex;
    if (hasFinalStepToGo) {
      this.moveTo(this.finalStepIndex, stepIndex);
    } else {
      this.moveTo(this.steps.length, stepIndex);
    }
  };

  unsubscribe() {
    this.context[TourProvider.contextName].unsubscribe(this.props.id);
  }

  closeTour() {
    this.unsubscribe();
    this.context[TourProvider.contextName].onShown(this.props.id);
  }
}
