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
      insertSection: (getPos: boolean | (() => number), nodeSize: number) => ReturnType,
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

  draggable: true,

  group: "block",

  content: "block*",

  addOptions() {
    return {
      id: v4(),
      itemTypeName: 'column',
      HTMLAttributes: {},
    }
  },

  //content() {
  //  return `paragraph block*`
  //},

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
      insertSection: (getPos, nodeSize) => (props) => {
        if(typeof getPos === 'function') {
          const insertAt = getPos() + nodeSize
          props.editor.chain().insertContentAt(insertAt, [{
            type: 'section',
            content: [{type: 'paragraph'}]
          }])
          .run();
          return true;
        }
        return false;
      }
    }
  }

})
