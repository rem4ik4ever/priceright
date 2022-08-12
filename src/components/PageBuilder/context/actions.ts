import { Action } from "./reducer";

export interface BuilderActions {
  togglePreview: (toggle: boolean) => void;
}

export const getActions = (dispatch: (action: Action) => void): BuilderActions => {
  return {
    togglePreview: (toggle) => dispatch({type: 'TOGGLE_PREVIEW', toggle}),
  }
}
