import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { FlexRow } from './FlexRow'

export interface TaskListOptions {
  itemTypeName: string,
  HTMLAttributes: Record<string, any>,
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    columns: {
      focusPreviousColumn: () => ReturnType,
      focusNextColumn: () => ReturnType,
    }
  }
}


/**
 * @todo
 * 1. track focused column
 * 2. add shortcut shift + tab and tab to navigate between columns
 */
export const Columns = Node.create<TaskListOptions>({
  name: 'columns',

  addOptions() {
    return {
      itemTypeName: 'column',
      HTMLAttributes: {},
    }
  },

  group: 'block list',

  content() {
    return `${this.options.itemTypeName}+`
  },

  parseHTML() {
    return [
      {
        tag: `columns`,
        priority: 51,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['columns', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FlexRow)
  },

  addCommands() {
    return {
      focusNextColumn: () => (props) => {
        //return commands.toggleList(this.name, this.options.itemTypeName)
        console.log("Focusing next column", props)
        return false;
      },
      focusPreviousColumn: () => (props) => {
        console.log("focusing previous column", props)
        return false
      }
    }
  },

  addKeyboardShortcuts() {
    return {
      'Tab': () => this.editor.commands.focusNextColumn(),
      'Shift + Tab': () => this.editor.commands.focusPreviousColumn(),
    }
  },
})
