import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import { Spacer } from "./react-spacer";
import styles from './spacer.module.css'

interface SpacerOptions {
  minHeight: number;
  height: number;
  maxHeight: number;
}

export const SpacerNode = Node.create<SpacerOptions>({
  name: 'spacer',

  atom: true,

  group: 'block',

  defining: true,

  addOptions() {
    return {
      minHeight: 20,
      height: 30,
      maxHeight: 400
    }
  },

  addAttributes() {
    return {
      minHeight: {
        default: this.options.minHeight
      },
      height: {
        default: this.options.height
      },
      maxHeight: {
        default: this.options.maxHeight
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'spacer',
      mergeAttributes(HTMLAttributes)
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Spacer)
  }
}) 
