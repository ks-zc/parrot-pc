/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-loop-func */
import { createStore as reduxCreateStore, combineReducers, StoreCreator, applyMiddleware } from 'redux';
import { useSelector as reduxUseSelector } from 'react-redux';

export * from 'react-redux';

type SetState<T> = (payload: Partial<T>) => void;

export type Reducers = {
    [key: string]: {
        state: {
            [key: string]: any;
        };
        actions?: {
            [key: string]: (...payload: any) => Object | void;
        };
    };
};

export type StatesType<T extends Reducers> = {
    [key in keyof T]: T[key]['state'];
};

export type ActionsType<T extends Reducers> = {
    [key in keyof T]: T[key]['actions'] & {
        setState: SetState<StatesType<T>[key]>;
    };
};

const actions: Actions = {};
let store: State;

interface Options {
    initialState?: State;
    middlewares?: any[];
}

function createStore(entries: Reducers, options?: Options): ReturnType<StoreCreator> {
    const { initialState, middlewares } = options || {};
    const reducers = {};
    Object.keys(entries).forEach((i) => {
        (actions as any)[i] = {};
        for (const k in entries[i].actions) {
            (actions as any)[i][k] = async (...payload: any) => {
                const result = await entries[i].actions?.[k](...payload);
                // if ((result as any)?.constructor === Object) {
                //     store.dispatch({
                //         type: `${i}.${k}`,
                //         payload: result,
                //     });
                // }
                return result;
            };
        }
        (actions as any)[i].setState = (payload: any) => {
            store.dispatch({
                type: `${i}.setState`,
                payload,
            });
        };
        (reducers as any)[i] = (state = entries[i].state, a: any) => {
            if (a.type.startsWith(`${i}.`)) {
                return { ...state, ...a.payload };
            }
            return state;
        };
    });
    store = reduxCreateStore(combineReducers(reducers), initialState, applyMiddleware(...(middlewares || [])));
    return store;
}

interface GetState {
    <T extends keyof State>(type: T): State[T];
    (): State;
}
const getState: GetState = (type?: any) => (type ? store.getState()[type] : store.getState());

interface UseSelector {
    <T>(mapState: (state: State) => T): T;
}

const useSelector = reduxUseSelector as UseSelector;

export { actions, createStore, getState, useSelector };
