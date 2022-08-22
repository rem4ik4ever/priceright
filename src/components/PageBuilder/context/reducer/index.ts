import { BuilderState, NodeStyles } from "../builder.context";

export type Action = { type: 'ADD_BLOCK', afterId: string | undefined }
  | { type: 'TOGGLE_PREVIEW', toggle: boolean }
  | { type: 'SET_STYLES', payload: { styles: NodeStyles, id: string } }
  | { type: 'UPDATE_STYLES', payload: { styles: NodeStyles, id: string } }


export const reducer = (state: BuilderState, action: Action): BuilderState => {
  switch (action.type) {
    case 'TOGGLE_PREVIEW': {
      return {
        ...state,
        preview: action.toggle
      }
    }
    case 'SET_STYLES': { // sets currently editign node styles to state
      return {
        ...state,
        nodeId: action.payload.id,
        nodeStyles: { ...action.payload.styles }
      }
    }
    case 'UPDATE_STYLES': { // updates currently editign node styles
      return {
        ...state,
        nodeStyles: { ...action.payload.styles }
      }
    }
    default:
      return state;
  }
}
