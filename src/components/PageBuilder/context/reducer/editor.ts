import {v4} from 'uuid'
import { BuilderState } from '../builder.context'

export const addBlock = (editorIds: string[], afterId: string | -1) => {
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

export const focusNext = (state: BuilderState): BuilderState => {
  if(!state.focusedId) {
    return {
      ...state
    }
  }
  const index = state.editorIds.indexOf(state.focusedId) 
  if(index + 1 >= state.editorIds.length) return {...state}
  const focusId = state.editorIds[index + 1] as string;
  const editor = state.editorsMap[focusId]?.editor
  editor?.commands.focus();
  return {
    ...state,
    focusedId: focusId
  }
}

export const focusPrevious = (state: BuilderState): BuilderState => {
  if(!state.focusedId) {
    return {
      ...state
    }
  }
  const index = state.editorIds.indexOf(state.focusedId) 
  if(index - 1 < 0) return {...state}
  const focusId = state.editorIds[index - 1] as string;
  const editor = state.editorsMap[focusId]?.editor
  editor?.commands.focus();
  return {
    ...state,
    focusedId: focusId
  }
}

export const updateEditorContent = (state: BuilderState, id: string) => {
  const newState = {...state}
  const block = newState.editorsMap[id]
  if(block){
    block.content = newState.editorsMap[id]?.editor.getHTML()
    newState.editorsMap[id] = block
    return newState;
  }
  return state;
}
