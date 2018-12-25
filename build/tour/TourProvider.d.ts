import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface TourProviderProps {
    predicate?: (id: string) => boolean;
    onTourShown?: (id: string) => void;
}
export declare class TourProvider extends React.Component<TourProviderProps, {}> {
    static contextName: string;
    static childContextTypes: {
        [x: string]: PropTypes.Validator<object>;
    };
    currentId: string | undefined;
    queue: string[];
    listeners: {
        [id: string]: () => void;
    };
    render(): React.ReactElement<any>;
    getChildContext(): {
        [x: string]: {
            subscribe: (id: any, callback: any) => void;
            unsubscribe: (id: any) => void;
            onShown: (id: any) => Promise<void>;
        };
    };
    subscribe: (id: any, callback: any) => void;
    unsubscribe: (id: any) => void;
    onShown: (id: any) => Promise<void>;
    isPredicate: (id: any) => boolean;
    notify(id: any): void;
    removeFromQueue(id: any): void;
    pushToQueue(id: any): void;
}
