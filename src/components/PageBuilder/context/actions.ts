import { Editor } from "@tiptap/react";
import { Action } from "./reducer";

export interface BuilderActions {
  addEditor: (id: string | -1) => void;
  mapEditor: (id: string, editor: Editor) => void;
  removeBlock: (id: string) => void;
  togglePreview: (toggle: boolean) => void;
  setFocused: (id: string | undefined) => void;
  focusNext: () => void;
  focusPrevious: () => void;
  updateEditorContent: (id: string) => void;
}

export const getActions = (dispatch: (action: Action) => void): BuilderActions => {
  return {
    addEditor: (id) => dispatch({type: "ADD_BLOCK", afterId: id}),
    mapEditor: (id, editor) => dispatch({type: 'MAP_EDITOR', payload: {id, editor}}),
    removeBlock: (id) =>dispatch({type: "REMOVE_BLOCK", id}),
    togglePreview: (toggle) => dispatch({type: 'TOGGLE_PREVIEW', toggle}),
    setFocused: (id) => dispatch({type: 'SET_FOCUSED', id}),
    focusNext: () => dispatch({type: 'FOCUS_NEXT'}),
    focusPrevious: () => dispatch({type: 'FOCUS_PREVIOUS'}),
    updateEditorContent: (id) => dispatch({type: 'UPDATE_EDITOR_CONTENT', id})
  }
}
