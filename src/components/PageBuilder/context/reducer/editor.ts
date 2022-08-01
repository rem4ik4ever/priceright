import { PageBlock } from '@components/PageBuilder/types';
import {v4} from 'uuid'
import { BuilderState } from '../builder.context'

const addEditorsMapEntry = (editorsMap: BuilderState['editorsMap'], id: string, afterId: string | undefined): BuilderState['editorsMap'] => {
  if(!afterId || !editorsMap[afterId]?.editor){
    return {
      ...editorsMap
    }
  }
  const prevEditor = editorsMap[afterId]?.editor;
  if(!prevEditor){
    return {
      ...editorsMap
    }
  }
  const type = prevEditor.state.doc.lastChild?.type.name.toLocaleLowerCase()
  console.log({type})
  switch(type) {
    case "bulletlist": 
      return {
        ...editorsMap,
        [id]: { id, content: '<ul><li></li></ul>', editor: undefined as any }
      }
    default: 
      return {
        ...editorsMap
      }
  }
}

export const addBlock = (state: BuilderState, afterId: string | undefined): BuilderState => {
  const {editorIds} = state;
  let newState = {...state}
  const id = v4()
  if(!afterId){
    newState = {
      ...state,
      editorIds: [
        id,
        ...editorIds
      ]
    }
  } else {
    const index = editorIds.indexOf(afterId)
    newState = {
      ...state,
      lastEditorId: afterId,
      editorIds: [
        ...editorIds.slice(0, index + 1),
        id,
        ...editorIds.slice(index + 1)
      ],
      editorsMap: addEditorsMapEntry(state.editorsMap, id, afterId)
    }
  }
  return recordHistory(newState)
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
  return recordHistory({
    ...state,
    focusedId: focusId
  })
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
  return recordHistory({
    ...state,
    focusedId: focusId
  })
}

export const updateEditorContent = (state: BuilderState, id: string) => {
  const newState = {...state}
  const block = newState.editorsMap[id]
  if(block){
    block.content = newState.editorsMap[id]?.editor.getHTML()
    newState.editorsMap[id] = block
    return recordHistory(newState);
  }
  return state;
}

export const removeBlock = (state: BuilderState, id: string) => {
  return recordHistory({
    ...state,
    editorIds: state.editorIds.filter(editorId => editorId !== id)
  })
}

export const setFocused = (state: BuilderState, id: string | undefined) => {
  return {
    ...state,
    focusedId: id
  }
}

export const recordHistory = (state: BuilderState) => {
  const newState = {...state}; 

  //@TODO not simply push but update based on cursor position
  newState.history.stack.push({
    editorIds: [...state.editorIds],
    editorsMap: {...state.editorsMap},
    focusedId: state.focusedId
  })
  newState.history.cursor = newState.history.stack.length - 1;
  return newState;
}

export const undoState = (state: BuilderState) => {
  const newState = {...state}
  if(newState.history.cursor - 1 < 0) return newState;

  newState.history.cursor -= 1;
  // change editors state here
  newState.editorIds = [...newState.history.stack[newState.history.cursor]?.editorIds as string[]]
  newState.editorsMap = {...newState.history.stack[newState.history.cursor]?.editorsMap as {[id: string]: PageBlock}}
  newState.focusedId = newState.history.stack[newState.history.cursor]?.focusedId
  return newState;
}

export const redoState = (state: BuilderState) => {
  const newState = {...state}
  if(newState.history.cursor + 1 >= newState.history.stack.length) return newState;

  newState.history.cursor += 1;
  // change editors state here
  newState.editorIds = [...newState.history.stack[newState.history.cursor]?.editorIds as string[]]
  newState.editorsMap = {...newState.history.stack[newState.history.cursor]?.editorsMap as {[id: string]: PageBlock}}
  newState.focusedId = newState.history.stack[newState.history.cursor]?.focusedId
  return newState;
}

