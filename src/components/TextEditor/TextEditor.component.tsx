import { useEditor, EditorContent, BubbleMenu, Editor, EditorEvents, HTMLContent } from '@tiptap/react'
import { Typography } from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import editorStyles from './TextEditor.module.css'
import { Menu } from './Menu'
import { useEffect } from 'react'
import Command from './commands-extension'
import {suggestion} from './commands-extension'
import {TextAlign} from '@tiptap/extension-text-align'
import Button from './nodes/button/button'

interface Props {
  content: string | undefined;
  preview: boolean
}
export const TextEditor = ({
  content, 
  preview 
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left'
      }),
      Button,
      Command.configure({
        HTMLAttributes: {
          class: 'mention'
        },
        suggestion
      }),
      Placeholder.configure({
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
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class: editorStyles.root as string,
      }
    },
  }, [])

  useEffect(() => {
    if (!editor) {
      return undefined
    }
    console.log({preview})
    editor.setEditable(!preview)
  }, [editor, preview])

  return (
    <>
      <Menu editor={editor} />
      <EditorContent className={editorStyles.root} editor={editor} />
    </>
  )
}
