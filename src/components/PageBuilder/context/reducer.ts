import { ReducerAction } from "react";
import { BuilderState } from "./builder.context";
import {v4} from 'uuid'
import { Editor } from "@tiptap/react";

export type Action = {type: 'ADD_BLOCK', afterId: string | -1} 
  | {type: 'MAP_EDITOR', payload: {id: string, editor: Editor}}
  | {type: 'REMOVE_BLOCK', id: string}
  | {type: 'TOGGLE_PREVIEW', toggle: boolean}
  | {type: 'SET_FOCUSED', id: string | undefined}
  | {type: 'FOCUS_NEXT' }
  | {type: 'FOCUS_PREVIOUS' }


const addBlock = (editorIds: string[], afterId: string | -1) => {
  if(afterId === -1){
    return [
      v4(),
      ...editorIds
    ]
  }
  const index = editorIds.indexOf(afterId)
  return [
    ...editorIds.slice(0, index + 1),
    v4(),
    ...editorIds.slice(index + 1)
  ]
}

const focusNext = (state: BuilderState): BuilderState => {
  if(!state.focusedId) {
    return {
      ...state
    }
  }
  const index = state.editorIds.indexOf(state.focusedId) 
  if(index + 1 >= state.editorIds.length) return {...state}
  const focusId = state.editorIds[index + 1] as string;
  const editor = state.editorsMap[focusId]
  editor?.commands.focus();
  return {
    ...state,
    focusedId: focusId
  }
}

const focusPrevious = (state: BuilderState): BuilderState => {
  if(!state.focusedId) {
    return {
      ...state
    }
  }
  const index = state.editorIds.indexOf(state.focusedId) 
  if(index - 1 < 0) return {...state}
  const focusId = state.editorIds[index - 1] as string;
  const editor = state.editorsMap[focusId]
  editor?.commands.focus();
  return {
    ...state,
    focusedId: focusId
  }
}


export const reducer = (state: BuilderState, action: Action): BuilderState=> {
  switch(action.type){
    case 'ADD_BLOCK': {
      return {
        ...state,
        editorIds: addBlock(state.editorIds, action.afterId)
      }
    }
    case 'MAP_EDITOR': {
      return {
        ...state,
        editorsMap: {
          ...state.editorsMap,
          [action.payload.id]: action.payload.editor
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
      return {
        ...state,
        editorIds: state.editorIds.filter(editorId => editorId !== action.id)
      }
    }
    case 'SET_FOCUSED': {
      return {
        ...state,
        focusedId: action.id
      }
    }
    case 'FOCUS_NEXT': {
      return focusNext(state)
    }
    case 'FOCUS_PREVIOUS': {
      return focusPrevious(state)
    }
    default:
      return state;
  }
}
