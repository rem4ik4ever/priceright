import { BuilderState } from "../builder.context";
import { Editor } from "@tiptap/react";
import {
  addBlock,
  updateEditorContent,
  focusNext,
  focusPrevious,
  removeBlock,
  setFocused,
  undoState,
  redoState
} from './editor'

export type Action = {type: 'ADD_BLOCK', afterId: string | -1} 
  | {type: 'MAP_EDITOR', payload: {id: string, editor: Editor}}
  | {type: 'REMOVE_BLOCK', id: string}
  | {type: 'TOGGLE_PREVIEW', toggle: boolean}
  | {type: 'SET_FOCUSED', id: string | undefined}
  | {type: 'FOCUS_NEXT' }
  | {type: 'FOCUS_PREVIOUS' }
  | {type: 'UPDATE_EDITOR_CONTENT', id: string}
  | {type: 'UNDO'}
  | {type: 'REDO'}


export const reducer = (state: BuilderState, action: Action): BuilderState=> {
  switch(action.type){
    case 'ADD_BLOCK': {
      return addBlock(state, action.afterId)
    }
    case 'MAP_EDITOR': {
      return {
        ...state,
        editorsMap: {
          ...state.editorsMap,
          [action.payload.id]: {
            id: action.payload.id,
            editor: action.payload.editor,
            content: action.payload.editor.getHTML(),
          }
        }
      }
    }
    case 'TOGGLE_PREVIEW': {
      return {
        ...state,
        preview: action.toggle
      }
    }
    case 'REMOVE_BLOCK': {
      return removeBlock(state, action.id)
    }
    case 'SET_FOCUSED': {
      return setFocused(state, action.id)
    }
    case 'FOCUS_NEXT': {
      return focusNext(state)
    }
    case 'FOCUS_PREVIOUS': {
      return focusPrevious(state)
    }
    case 'UPDATE_EDITOR_CONTENT': {
      return updateEditorContent(state, action.id)
    }
    case 'UNDO': {
      return undoState(state);
    }
    case 'REDO': {
      return redoState(state)
    }
    default:
      return state;
  }
}
