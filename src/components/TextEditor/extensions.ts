import Document from "@tiptap/extension-document"
import Typography from "@tiptap/extension-typography"
import StarterKit from "@tiptap/starter-kit"
import Command from './commands-extension'
import {suggestion} from './commands-extension'
import {TextAlign} from '@tiptap/extension-text-align'
import Button from './nodes/button/button'
import {Placeholder} from '@tiptap/extension-placeholder'
import Blockquote from '@tiptap/extension-blockquote'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import {Paragraph} from '@tiptap/extension-paragraph'
import styles from './extensions.module.css'
import { DragHandle } from "./drag-handle-extension"
import Heading from '@tiptap/extension-heading'
import Columns from './nodes/columns'
import Column from './nodes/column'
import Focus from '@tiptap/extension-focus'
import { SectionNode } from "./nodes/section"


export const extensions = [
  StarterKit.configure({paragraph: false, heading: false, document: false}),
  Document.extend({
    content: 'section+'
  }),
  SectionNode,
  Columns,
  Column.configure({
    nested: true
  }),
  //DragHandle,
  Paragraph.extend({
    draggable: false
  }).configure({
    HTMLAttributes: {
      class: styles.paragraph
    } 
  }),
  Heading.extend({
    draggable: true
  }),
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
    placeholder: ({ node, editor }) => {
      if (node.type.name === 'heading') {
        return 'Add heading'
      }
      return 'Insert elements by typing "/"'
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
  Focus.configure({
    className: styles.hasFocus,
    mode: "deepest" 
  })
  //Dropcursor.configure({
  //  color: 'red'
  //})
]
