import { mergeAttributes, Node, CommandProps } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Section } from './section'
import {v4} from 'uuid'

export interface SectionOptions {
  id: string,
  itemTypeName: string,
  HTMLAttributes: Record<string, any>,
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sections: {
      insertSection: (insertAt: number) => ReturnType,
    }
  }
}


/**
 * @todo
 * 1. track focused column
 * 2. add shortcut shift + tab and tab to navigate between section
 */
export const SectionNode = Node.create<SectionOptions>({
  name: 'section',

  addOptions() {
    return {
      id: v4(),
      itemTypeName: 'column',
      HTMLAttributes: {},
    }
  },

  group: 'block',

  content() {
    return `paragraph block*`
  },

  parseHTML() {
    return [
      {
        tag: `page-section`,
      },
    ]
  },

  addAttributes() {
    return {
      id: {
        default: this.options.id
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['page-section', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {'data-id': this.options.id}), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Section)
  },

  addCommands() {
    return {
      insertSection: (insertAt) => (props) => {
        console.log({insertAt, editor: props.editor})
        this.editor.commands.insertContent([
          {
            type: 'section',
            content: [{type: 'paragraph'}]
          }
        ])
        return true;
      }
    }
  }

})
