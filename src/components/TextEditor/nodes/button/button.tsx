import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import {Button} from './react-button'

export default Node.create({
  name: 'button',

  group: 'block',

  atom: true,

  draggable: true,
  
  addAttributes() {
    return {
      url: {
        default: '',
      },
      label: {
        default: 'button'
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'tip-button',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['tip-button', mergeAttributes(HTMLAttributes), 0]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Button)
  },
})
