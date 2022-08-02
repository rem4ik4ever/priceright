import { BubbleMenu, Editor } from "@tiptap/react"
import clx from 'classnames'
import styles from './Menu.module.css'

interface Props {
  editor: Editor | null
}
export const Menu = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu className={styles.root} editor={editor} tippyOptions={{ duration: 100 }}>
      {editor.isEditable && (
        <>
          <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clx(editor.isActive('bold') ? 'is-active' : '', styles.item)}
          >
          bold
        </button>
        <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={clx(editor.isActive('italic') ? 'is-active' : '', styles.item)}
        >
          italic
        </button>
        <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={clx(editor.isActive('strike') ? 'is-active' : '', styles.item)}
        >
          strike
        </button>
        <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={clx(editor.isActive('left') ? 'is-active' : '', styles.item)}
        >
          left
        </button>
        <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={clx(editor.isActive('center') ? 'is-active' : '', styles.item)}
        >
          center
        </button>
        <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={clx(editor.isActive('right') ? 'is-active' : '', styles.item)}
        >
          right
        </button>
        </>
      )}
    </BubbleMenu>
  )
}
