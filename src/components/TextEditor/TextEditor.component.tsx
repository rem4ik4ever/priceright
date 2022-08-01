import { useEditor, EditorContent, BubbleMenu, Editor, EditorEvents, HTMLContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import { Typography } from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import editorStyles from './TextEditor.module.css'
import clx from 'classnames'
import { ElementInserter } from './ElementInserter'
import { Menu } from './Menu'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { PageBlock } from '@components/PageBuilder/types'
import { useBuilder } from '@components/PageBuilder/context'
import Command from './commands-extension'
import {suggestion} from './commands-extension'

//const CustomDocument = Document.extend({
//  content: 'heading block*',
//})

interface Props {
  id: string;
  content: string | undefined;
  preview: boolean
}
export const TextEditor = ({
  id,
  content, 
  preview 
}: Props) => {
  const ref = useRef<PageBlock>()
  const editor = useEditor({
    editable: !preview,
    extensions: [
      StarterKit,
      Typography,
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

    editor.setEditable(!preview)
  }, [editor, preview])

  return (
    <>
      <Menu editor={editor} />
      <EditorContent className={editorStyles.root} editor={editor} />
    </>
  )
}
