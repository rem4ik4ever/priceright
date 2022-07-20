import { Editor } from "@tiptap/react";
import Document from '@tiptap/extension-document'
import type {TextBlock} from './types'
import {v4} from 'uuid';
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import editorStyles from '../TextEditor/TextEditor.module.css'


export const findIndexById = (list: TextBlock[], id: string): number => {
  let idx = 0;
  while(idx < list.length){
    if(list[idx]?.id === id) {
      return idx;
    }
    idx += 1
  } 
  return -1;
}

interface CreateOptions {
  onEnter: (id: string) => void;
  onDestroy: (id: string) => void;
}
export const createEditor = ({ onEnter }: CreateOptions) => {
  const id = v4()
  const editor = new Editor({
    extensions: [
      StarterKit.configure({ document: false }),
      Typography,
      Document.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              this.editor.commands.blur();
              onEnter(id)
              return true;
            },
            Backspace: () => {
              if (this.editor.getText().length === 0) {
                this.editor.commands.clearNodes()
                this.editor.destroy();
                return true;
              } else {
                return false;
              }
            }
          }
        },
        addAttributes() {
          return {
            'data-id': id
          }
        }
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Add heading'
          }

          return 'Insert elements by typing "/"'
        },
      }),
    ],
    content: ``,
    editorProps: {
      attributes: {
        class: editorStyles.root as string,
      }
    }
  })
  return { id, editor }
}

