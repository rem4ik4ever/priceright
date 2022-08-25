import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Section } from './section'
import { NodeStyles } from '@components/PageBuilder/context'

export interface SectionOptions extends NodeStyles {
  color: string;
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
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      color: 'inherit',
      backgroundColor: 'none',
      width: '100%',
    }
  },

  addStorage() {
    return {
      isFocused: false
    }
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
      width: {
        default: this.options?.width
      },
      backgroundColor: {
        default: this.options?.backgroundColor
      },
      paddingTop: {
        default: this.options?.padding?.[0] || 0
      },
      paddingRight: {
        default: this.options?.padding?.[1] || 0
      },
      paddingBottom: {
        default: this.options?.padding?.[2] || 0
      },
      paddingLeft: {
        default: this.options?.padding?.[3] || 0
      },

      marginTop: {
        default: this.options?.margin?.[0] || 0
      },
      marginRight: {
        default: this.options?.margin?.[1] || 0
      },
      marginBottom: {
        default: this.options?.margin?.[2] || 0
      },
      marginLeft: {
        default: this.options?.margin?.[3] || 0
      },
      color: {
        default: this.options.color
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['page-section', HTMLAttributes, 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Section, { as: 'section' })
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
