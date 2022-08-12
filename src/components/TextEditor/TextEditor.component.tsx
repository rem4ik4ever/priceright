import { useEditor, EditorContent } from '@tiptap/react'
import editorStyles from './TextEditor.module.css'
import { Menu } from './Menu'
import { useEffect } from 'react'
import { extensions } from './extensions'

interface Props {
  content: string | undefined;
  preview: boolean
}
export const TextEditor = ({
  content,
  preview
}: Props) => {
  const editor = useEditor({
    extensions,
    content: `
      <page-section>
        <p>Make something amazing!</p>
      </page-section>
    `,
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
    console.log({ preview })
    editor.setEditable(!preview)
  }, [editor, preview])

  return (
    <>
      <Menu editor={editor} />
      <EditorContent className={editorStyles.root} editor={editor} />
    </>
  )
}
