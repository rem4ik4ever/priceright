import { mergeAttributes, Node, CommandProps } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Section } from './section'
import { v4 } from 'uuid'
import { NodeStyles } from '@components/PageBuilder/context'

export interface SectionOptions {
  id: string,
  itemTypeName: string,
  HTMLAttributes: Record<string, any>,
  styles?: NodeStyles
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    sections: {
      setSectionFocus: (toggle: boolean) => ReturnType
    }
  }
}


/**
 * @todo
 * 1. track focused column
 * 2. add shortcut shift + tab and tab to navigate between section
 */
export const SectionNode = Node.create<SectionOptions, { isFocused: boolean }>({
  name: 'section',

  draggable: true,

  content: "(paragraph|block)*",

  addOptions() {
    return {
      id: v4(),
      itemTypeName: 'column',
      HTMLAttributes: {},
      styles: {
        padding: '',
        margin: '',
        backgroundColor: 'none',
        width: 'auto'
      }
    }
  },

  addStorage() {
    return {
      isFocused: false
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
      },
      styles: {
        default: this.options.styles
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['page-section', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-id': this.options.id }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Section)
  },

  addCommands() {
    return {
      setSectionFocus: (toggle) => () => {
        this.storage.isFocused = toggle
        return true;
      }
    }
  }

})
