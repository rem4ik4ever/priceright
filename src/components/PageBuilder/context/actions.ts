import { NodeStyles } from "./builder.context";
import { Action } from "./reducer";

export interface BuilderActions {
  togglePreview: (toggle: boolean) => void;
  setStyles: (id: string, styles: NodeStyles) => void;
  updateStyles: (id: string, styles: NodeStyles) => void;
}

export const getActions = (dispatch: (action: Action) => void): BuilderActions => {
  return {
    togglePreview: (toggle) => dispatch({ type: 'TOGGLE_PREVIEW', toggle }),
    setStyles: (id, styles) => dispatch({ type: 'SET_STYLES', payload: { id, styles } }),
    updateStyles: (id, styles) => dispatch({ type: 'UPDATE_STYLES', payload: { id, styles } }),
  }
}
