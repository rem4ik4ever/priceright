import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import {Button} from './react-button'

interface ButtonProps {
  url: string;
  label: string;
}
export default Node.create<ButtonProps>({
  name: 'button',

  group: 'block',

  draggable: true,

  content: '',
  
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
    return ['tip-button', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Button)
  },
})
