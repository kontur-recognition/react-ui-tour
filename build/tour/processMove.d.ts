import * as React from 'react';
import { StepProps } from './Tour';
export declare const processMove: (prevStep: React.ReactElement<StepProps>, step: React.ReactElement<StepProps>, onMove: () => void, onClear: () => void) => Promise<void>;
