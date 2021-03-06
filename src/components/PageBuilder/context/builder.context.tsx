import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { PageBlock } from '../types';
import { getActions, BuilderActions } from './actions';
import { Action, reducer } from './reducer';
import { v4 } from 'uuid'
import { useHotkeys } from 'react-hotkeys-hook'

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
  stack: Array<Omit<BuilderState, 'preview' | 'history'>>,
  cursor: number
}

export interface BuilderState {
  editorIds: string[],
  editorsMap: { [id: string]: PageBlock },
  preview: boolean,
  focusedId: string | undefined
  history: BuildHistory
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

const _initialState: BuilderState = {
  editorIds: [],
  editorsMap: {},
  preview: false,
  focusedId: undefined,
  history: {
    stack: [],
    cursor: -1,
  },
}

const debugReducer = (reducer: any) => (state: BuilderState, action: Action): BuilderState => {
  const next = reducer(state, action)
  console.log({ prev: state, next, action })
  return next;
}

const initialState = (template?: string[]): BuilderState => {
  const state = { ..._initialState }
  if (template) {
    template.forEach(blockContent => {
      const id = v4()
      state.editorIds.push(id)
      state.editorsMap[id] = {
        id,
        editor: undefined,
        content: blockContent
      } as any
    })
  }
  return state;
}

export const useBuilder = (template?: string[]) => {
  const [state, dispatch] = useReducer(debugReducer(reducer), {
    ...initialState(template),
  });
  const actions = getActions(dispatch);

  return {
    state,
    ...actions,
  };
};

interface IPageBuilderContextProvider {
  children: React.ReactNode;
  template?: string[]
}

export const PageBuilderContextProvider = ({
  children,
  template
}: IPageBuilderContextProvider): JSX.Element => {
  const contextValue = useBuilder(template);
  const Provider = _BuilderContextProvider as React.FC<{ value: BuilderContextValue, children: React.ReactNode }>
//  useHotkeys('cmd + z', () => contextValue.undo())
// useHotkeys('cmd + shift + z', () => contextValue.redo())
  return (
    <Provider value={contextValue}>
      {children}
    </Provider>
  );
};
