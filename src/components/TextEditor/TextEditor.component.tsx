import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import { Typography } from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import editorStyles from './TextEditor.module.css'
import clx from 'classnames'
import { ElementInserter } from './ElementInserter'
import { Menu } from './Menu'
import { MutableRefObject, useEffect, useRef } from 'react'
import { TextBlock } from '@components/PageBuilder/types'

//const CustomDocument = Document.extend({
//  content: 'heading block*',
//})

interface Props {
  id: string;
  index: number;
  onEnter: (id: string) => void
  onDelete: (id: string) => void
  setNodeRef: (ref: MutableRefObject<TextBlock>) => void
  preview: boolean
}
export const TextEditor = ({ id, index, onEnter, onDelete, setNodeRef, preview }: Props) => {
  const ref = useRef<TextBlock>()
  const editor = useEditor({
    editable: !preview,
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
              if (this.editor.getText().length === 0 && index !== 0) {
                this.editor.commands.clearContent()
                this.editor.commands.clearNodes()
                this.editor.destroy();
                onDelete(id)
                return true;
              } else {
                return false;
              }
            }
          }
        },
      }),
      Placeholder.configure({
        placeholder: ({ node, editor }) => {
          if(editor.isFocused){
            if (node.type.name === 'heading') {
              return 'Add heading'
            }
            return 'Insert elements by typing "/"'
          }
          return ''
        },
      }),
    ],
    content: ``,
    editorProps: {
      attributes: {
        class: editorStyles.root as string,
      }
    },
  })

  useEffect(() => {
    if (editor) {
      editor?.commands.focus();
      ref.current = { id, editor }
      setNodeRef(ref as MutableRefObject<TextBlock>)
    }
  }, [editor])

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
      <ElementInserter editor={editor} />
    </>
  )
}