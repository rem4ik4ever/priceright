import { BuilderState } from "../builder.context";

export type Action = {type: 'ADD_BLOCK', afterId: string | undefined} 
  | {type: 'TOGGLE_PREVIEW', toggle: boolean}


export const reducer = (state: BuilderState, action: Action): BuilderState=> {
  switch(action.type){
    case 'TOGGLE_PREVIEW': {
      return {
        ...state,
        preview: action.toggle
      }
    }
    default:
      return state;
  }
}
