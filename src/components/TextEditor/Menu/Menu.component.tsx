import { BubbleMenu, Editor, Node } from "@tiptap/react"
import clx from 'classnames'
import styles from './Menu.module.css'
import { useState } from "react";

interface Props {
  editor: Editor | null
}
export const Menu = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  const { node } = editor.state.selection as any;
  return (
    <BubbleMenu className={styles.root} editor={editor} tippyOptions={{ duration: 100, maxWidth: '600px' }}>
      {editor.isEditable && (
        <div className="flex flex-wrap items-center">
          {!node && (<>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={clx(editor.isActive('bold') ? styles.active : '', styles.item)}
            >
              bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={clx(editor.isActive('italic') ? styles.active : '', styles.item)}
            >
              italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={clx(editor.isActive('strike') ? styles.active : '', styles.item)}
            >
              strike
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={clx(editor.isActive('left') ? styles.active : '', styles.item)}
            >
              left
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={clx(editor.isActive('center') ? styles.active : '', styles.item)}
            >
              center
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={clx(editor.isActive('right') ? styles.active : '', styles.item)}
            >
              right
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={clx(editor.isActive('blockquote') ? styles.active : '', styles.item)}
            >
              blockquote
            </button>
            <input
              className="w-12"
              type="color"
              onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
              value={editor.getAttributes('textStyle').color}
            />
          </>)}
          {node && (
            <button type="button" onClick={() => editor.commands.deleteRange(editor.state.selection)}>remove</button>
          )}
        </div>
      )}
    </BubbleMenu>
  )
}
