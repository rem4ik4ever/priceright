import { ReducerAction } from "react";
import { BuilderState } from "./builder.context";
import {v4} from 'uuid'
import { Editor } from "@tiptap/react";

export type Action = {type: 'ADD_BLOCK', afterId: string | -1} 
  | {type: 'MAP_EDITOR', payload: {id: string, editor: Editor}}
  | {type: 'REMOVE_BLOCK', id: string}

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
    case 'REMOVE_BLOCK': {
      return {
        ...state,
        editorIds: state.editorIds.filter(editorId => editorId !== action.id)
      }
    }
    default:
      return state;
  }
}
