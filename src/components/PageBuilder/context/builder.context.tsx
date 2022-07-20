import { Editor } from '@tiptap/react';
import React, { createContext, useContext, useReducer } from 'react';
import { getActions, BuilderActions } from './actions';
import { Action, reducer } from './reducer';

function createCtx() {
  const ctx = createContext(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider];
}

const [_useBuilerContext, _BuilderContextProvider] = createCtx();

export const usePageBuilder =
  _useBuilerContext as () => BuilderContextValue & BuilderActions


export interface BuilderState {
  editorIds: string[],
  editorsMap: { [id: string]: Editor },
  preview: boolean
}
export interface BuilderContextValue {
  state: BuilderState;
}

const initialState = {
  editorIds: [],
  editorsMap: {},
  preview: false
}

const debugReducer = (reducer: any) => (state: BuilderState, action: Action): BuilderState => {
  const next = reducer(state, action)
  console.log({ prev: state, next, action })
  return next;
}

export const useBuilder = () => {
  const [state, dispatch] = useReducer(debugReducer(reducer), {
    ...initialState,
  });
  const actions = getActions(dispatch);

  return {
    state,
    ...actions
  };
};

interface IPageBuilderContextProvider {
  children: React.ReactNode;
}

export const PageBuilderContextProvider = ({
  children,
}: IPageBuilderContextProvider): JSX.Element => {
  const state = useBuilder();
  const Provider = _BuilderContextProvider as React.FC<{ value: BuilderContextValue, children: React.ReactNode }>
  return (
    <Provider value={state}>
      {children}
    </Provider>
  );
};
