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
    </BubbleMenu>
  )
}
