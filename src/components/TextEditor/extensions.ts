import Typography from "@tiptap/extension-typography"
import StarterKit from "@tiptap/starter-kit"
import Command from './commands-extension'
import {suggestion} from './commands-extension'
import {TextAlign} from '@tiptap/extension-text-align'
import Button from './nodes/button/button'
import Placeholder from '@tiptap/extension-placeholder'
import Blockquote from '@tiptap/extension-blockquote'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'

export const extensions = [
  StarterKit,
  Image,
  Typography,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'button'],
    defaultAlignment: 'left'
  }),
  Button,
  Command.configure({
    HTMLAttributes: {
      class: 'command'
    },
    suggestion
  }),
  Placeholder.configure({
    emptyNodeClass: 'empty-node',
    placeholder: ({ node, editor }) => {
      if (editor.isFocused) {
        if (node.type.name === 'heading') {
          return 'Add heading'
        }
        return 'Insert elements by typing "/"'
      }
      return ''
    },
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: 'blockquote',
    },
  }),
  TextStyle,
  Color.configure({
    types: ['textStyle'],
  }),
  Dropcursor.configure({
    color: 'red'
  })
]
