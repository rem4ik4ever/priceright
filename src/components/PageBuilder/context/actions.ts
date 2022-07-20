import { Editor } from "@tiptap/react";
import { Action } from "./reducer";

export interface BuilderActions {
  addEditor: (id: string | -1) => void;
  mapEditor: (id: string, editor: Editor) => void;
  removeBlock: (id: string) => void;
}

export const getActions = (dispatch: (action: Action) => void): BuilderActions => {
  const addEditor = (id: string | -1) => {
    dispatch({type: "ADD_BLOCK", afterId: id})
  }

  const mapEditor = (id: string, editor: Editor) => {
    dispatch({type: 'MAP_EDITOR', payload: {id, editor}})
  }

  const removeBlock = (id: string) => {
    dispatch({type: "REMOVE_BLOCK", id}) 
  }

  return {
    addEditor,
    mapEditor,
    removeBlock
  }
}
