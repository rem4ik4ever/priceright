import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Node as ProseMirrorNode } from 'prosemirror-model'
import { Flex } from './Flex'
import styles from './column.module.css'

export interface TaskItemOptions {
  onReadOnlyChecked?: (node: ProseMirrorNode, checked: boolean) => boolean
  nested: boolean
  HTMLAttributes: Record<string, any>
}

export const inputRegex = /^\s*(\[([( |x])?\])\s$/

export const Column = Node.create<TaskItemOptions>({
  name: 'column',

  addOptions() {
    return {
      nested: false,
      HTMLAttributes: {},
    }
  },

  content() {
    return 'block+'
  },

  defining: true,

  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: element => element.getAttribute('data-checked') === 'true',
        renderHTML: attributes => ({
          'data-checked': attributes.checked,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `column`,
        priority: 51,
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'column',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
      }),
      0
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Flex, { className: styles.root })
  },
})
