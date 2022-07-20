import { Editor } from '@tiptap/react';
import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
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
  preview: boolean,
  focusedId: string | undefined
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

const initialState = {
  editorIds: [],
  editorsMap: {},
  preview: false,
  focusedId: undefined
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

  //const getCurrentlyFocusedId = () => {
  //  const focusId = state.editorIds.filter(editorId => {
  //    if (state.editorsMap[editorId]?.isFocused) {
  //      return editorId
  //    }
  //  }).pop()
  //  console.log({ focusId, text: state.editorsMap[focusId as string]?.getText() })
  //  return focusId
  //}

  //const focusNext = useCallback(() => {
  //  console.log("next")
  //  const { editorIds, editorsMap } = state
  //  const currentlyFocused = getCurrentlyFocusedId()
  //  if (!currentlyFocused) return

  //  console.log({ currentlyFocused })

  //  const idx = editorIds.indexOf(currentlyFocused)

  //  console.log({ idx })

  //  //if (idx + 2 >= editorIds.length) return

  //  const focusId = editorIds[idx + 1] as string;
  //  console.log({focusId})
  //  editorsMap[focusId]?.commands.focus()
  //}, [state.editorIds, state.editorsMap])

  //const focusPrevious = useCallback(() => {
  //  console.log("prev")
  //  const { editorIds, editorsMap } = state
  //  if (!currentlyFocused) return
  //  console.log({ currentlyFocused })

  //  const idx = editorIds.indexOf(currentlyFocused)
  //  console.log({ idx })

  //  if (idx < 0) return

  //  const focusId = editorIds[idx] as string;
  //  console.log({focusId})
  //  editorsMap[focusId]?.commands.focus()
  //}, [currentlyFocused, state.editorIds, state.editorsMap])

  return {
    state,
    ...actions,
    //commands: {
    //  currentlyFocused,
    //  focusNext,
    //  focusPrevious
    //}
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
