import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { PageBlock } from '../types';
import { getActions, BuilderActions } from './actions';
import { Action, reducer } from './reducer';
import { v4 } from 'uuid'
import { useHotkeys } from 'react-hotkeys-hook'
import { string } from 'zod';

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


export interface BuildHistory {
  stack: Array<Omit<BuilderState, 'preview' | 'history' | 'lastEditorId'>>,
  cursor: number
}

export interface BuilderState {
  id: string; 
  content: string;
  preview: boolean,
}
export interface BuilderContextValue {
  state: BuilderState;
}

export interface BuilderCommands {
  commands: {
    currentlyFocused: string | undefined
    focusNext: () => void
    focusPrevious: () => void
  }
}

export interface Page {
  id: string;
  content: string;
}

const _initialState: BuilderState = {
  id: v4(),
  content: '',
  preview: false,
}

const debugReducer = (reducer: any) => (state: BuilderState, action: Action): BuilderState => {
  const next = reducer(state, action)
  console.log({ prev: state, next, action })
  return next;
}

const initialState = (page?: Page): BuilderState => {
  const state = { ..._initialState }
  if (page) {
    state.content = page.content;
    state.id = page.id
  }
  return state;
}

export const useBuilder = (page?: Page) => {
  const [state, dispatch] = useReducer(debugReducer(reducer), {
    ...initialState(page),
  });
  const actions = getActions(dispatch);

  return {
    state,
    ...actions,
  };
};

interface IPageBuilderContextProvider {
  children: React.ReactNode;
  page?: Page
}

export const PageBuilderContextProvider = ({
  children,
  page
}: IPageBuilderContextProvider): JSX.Element => {
  const contextValue = useBuilder(page);
  const Provider = _BuilderContextProvider as React.FC<{ value: BuilderContextValue, children: React.ReactNode }>
//  useHotkeys('cmd + z', () => contextValue.undo())
// useHotkeys('cmd + shift + z', () => contextValue.redo())
  return (
    <Provider value={contextValue}>
      {children}
    </Provider>
  );
};
